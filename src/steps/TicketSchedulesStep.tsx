import React, { useState } from 'react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { useOnboarding } from '../context/OnboardingContext';

interface TicketSchedulesStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface Schedule {
  id: string;
  title: string;
  description: string;
  category: string;
}

const schedules: Schedule[] = [
  // Standard Tickets
  { id: 'similar-tickets', title: 'Similar Tickets', description: 'Generate similar ticket suggestions', category: 'Standard Tickets' },
  { id: 'merge-suggestions', title: 'Merge Suggestions', description: 'Suggest tickets that can be merged', category: 'Standard Tickets' },
  { id: 'macro-suggestions-agents', title: 'Macro Suggestions for Agents', description: 'AI-powered macro recommendations for agents', category: 'Standard Tickets' },
  { id: 'macro-suggestions-admins', title: 'Macro Suggestions for Admins', description: 'Macro insights for administrators', category: 'Standard Tickets' },
  
  // Admin
  { id: 'automation-potential', title: 'Automation Potential', description: 'Identify opportunities for automation', category: 'Admin' },
  { id: 'overview-copilot', title: 'Overview: Copilot', description: 'AI copilot overview dashboard', category: 'Admin' },
  { id: 'intelligent-triage', title: 'Intelligent Triage - Intent Suggestions', description: 'Automated ticket intent classification', category: 'Admin' },
  
  // Ultimate Dashboards
  { id: 'general-dashboard', title: 'General (conversations, CSAT, etc)', description: 'Comprehensive metrics dashboard', category: 'Ultimate Dashboards' },
  { id: 'email-bot', title: 'Email Bot', description: 'Email bot performance metrics', category: 'Ultimate Dashboards' },
  { id: 'voice-bot', title: 'Voice Bot (coming soon)', description: 'Voice bot analytics', category: 'Ultimate Dashboards' },
  { id: 'bot-tickets-escalation', title: 'Bot Tickets w/ escalation', description: 'Bot ticket escalation tracking', category: 'Ultimate Dashboards' },
  
  // QA Dashboards
  { id: 'qa-dashboard', title: 'QA Dashboard', description: 'Quality assurance metrics', category: 'QA Dashboards' },
  
  // Tymeshift Dashboards
  { id: 'tymeshift-dashboard', title: 'Tymeshift Dashboard', description: 'Workforce management insights', category: 'Tymeshift Dashboards' },
  
  // Advanced Security
  { id: 'advanced-security', title: 'Advanced Security', description: 'Security monitoring and alerts', category: 'Advanced Security' },
];

const TicketSchedulesStep: React.FC<TicketSchedulesStepProps> = ({ onNext, onBack }) => {
  const { state, setSelectedContext } = useOnboarding();
  const [selectedContext, setLocalSelectedContext] = useState(
    state.selectedContextId || (state.aiContexts[0]?.id ?? '')
  );
  const [selectedSchedules, setSelectedSchedules] = useState<Set<string>>(new Set());

  const contextOptions = state.aiContexts.map((ctx) => ({
    value: ctx.id,
    label: ctx.name,
  }));

  const handleContextChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contextId = e.target.value;
    setLocalSelectedContext(contextId);
    setSelectedContext(contextId);
  };

  const handleScheduleToggle = (scheduleId: string) => {
    const newSelected = new Set(selectedSchedules);
    if (newSelected.has(scheduleId)) {
      newSelected.delete(scheduleId);
    } else {
      newSelected.add(scheduleId);
    }
    setSelectedSchedules(newSelected);
  };

  const handleSelectAll = (category: string) => {
    const categorySchedules = schedules.filter(s => s.category === category);
    const allSelected = categorySchedules.every(s => selectedSchedules.has(s.id));
    
    const newSelected = new Set(selectedSchedules);
    if (allSelected) {
      // Deselect all in category
      categorySchedules.forEach(s => newSelected.delete(s.id));
    } else {
      // Select all in category
      categorySchedules.forEach(s => newSelected.add(s.id));
    }
    setSelectedSchedules(newSelected);
  };

  const categories = Array.from(new Set(schedules.map((s) => s.category)));

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center font-inter p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-4xl p-10 max-h-[90vh] overflow-y-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Step 5 of 7</p>
          <h1 className="text-3xl font-bold text-[#1C1E21] mb-2">
            Activate Common Ticket Schedules
          </h1>
          <p className="text-gray-600">
            Select pre-defined recurring ticket schedules for your business context.
          </p>
        </div>

        {/* Context Selector */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Business Context
          </label>
          <div className="relative">
            <select
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#174A5B] focus:ring-1 focus:ring-[#174A5B] focus:outline-none transition-all duration-200 bg-white appearance-none"
              value={selectedContext}
              onChange={handleContextChange}
            >
              {contextOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden pointer-events-none">
              <img 
                src={`https://logo.clearbit.com/${state.aiContexts.find(ctx => ctx.id === selectedContext)?.website?.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}`}
                alt="logo"
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Schedule Categories */}
        <div className="space-y-8 mb-8">
          {categories.map((category) => {
            const categorySchedules = schedules.filter((s) => s.category === category);
            const allSelected = categorySchedules.every(s => selectedSchedules.has(s.id));
            
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-800 font-semibold flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#174A5B] rounded"></span>
                    {category}
                  </h3>
                  <button
                    onClick={() => handleSelectAll(category)}
                    className="text-sm text-[#174A5B] hover:text-[#1C586C] font-medium transition-colors"
                  >
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="space-y-2">
                  {categorySchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{schedule.title}</div>
                        <div className="text-sm text-gray-500">{schedule.description}</div>
                      </div>
                      <button
                        onClick={() => handleScheduleToggle(schedule.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#174A5B] focus:ring-offset-2 ${
                          selectedSchedules.has(schedule.id) ? 'bg-[#174A5B]' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            selectedSchedules.has(schedule.id) ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-6 pt-4">
          <ProgressBar currentStep={4} totalSteps={7} />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Start Over
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketSchedulesStep;
