import React, { useState } from 'react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { useOnboarding } from '../context/OnboardingContext';

interface CleanupConfigsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const cleanupSchedules = [
  { id: 'cleanup-7-days', label: 'Clean up new Configuration every 7 Days' },
  { id: 'cleanup-14-days', label: 'Clean up new Configuration every 14 Days' },
  { id: 'cleanup-30-days', label: 'Clean up new Configuration every 30 Days' },
  { id: 'cleanup-never', label: 'Never clean up (manual only)' },
];

const randomConfigs = [
  { id: 'auto-assist-field', title: 'Create "Enable Auto Assist" Ticket Field', description: 'Adds a custom field to enable Auto Assist on tickets' },
  { id: 'deactivate-email-triggers', title: 'Deactivate default Email Notification Triggers', description: 'Disables default email notifications' },
  { id: 'deactivate-views', title: 'Deactivate default Views', description: 'Hides default Zendesk views' },
  { id: 'create-all-tickets-view', title: 'Create "All Tickets" View', description: 'Creates a comprehensive all tickets view' },
];

const CleanupConfigsStep: React.FC<CleanupConfigsStepProps> = ({ onNext, onBack }) => {
  const { state, setSelectedContext, setCleanupSchedule, toggleRandomConfig } = useOnboarding();
  const [selectedContext, setLocalSelectedContext] = useState(
    state.selectedContextId || (state.aiContexts[0]?.id ?? '')
  );

  const contextOptions = state.aiContexts.map((ctx) => ({
    value: ctx.id,
    label: ctx.name,
  }));

  const handleContextChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contextId = e.target.value;
    setLocalSelectedContext(contextId);
    setSelectedContext(contextId);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center font-inter p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-4xl p-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Step 6 of 7</p>
          <h1 className="text-3xl font-bold text-[#1C1E21] mb-2">
            Activate Cleanup & Random Configs
          </h1>
          <p className="text-gray-600">
            Set up cleanup schedules and enable additional configurations for your business context.
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

        {/* Cleanup Schedules Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#174A5B] rounded"></span>
            Common Cleanup Schedules
          </h2>
          <div className="space-y-2">
            {cleanupSchedules.map((schedule) => (
              <label
                key={schedule.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="cleanup-schedule"
                  value={schedule.id}
                  checked={state.cleanupSchedule === schedule.id}
                  onChange={() => setCleanupSchedule(schedule.id)}
                  className="w-4 h-4 text-[#174A5B] focus:ring-[#174A5B]"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{schedule.label}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Random Configurations Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#174A5B] rounded"></span>
            Common Random Configurations
          </h2>
          <div className="space-y-3">
            {randomConfigs.map((config) => (
              <label
                key={config.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={state.randomConfigs[config.id] || false}
                  onChange={() => toggleRandomConfig(config.id)}
                  className="mt-1 w-4 h-4 text-[#174A5B] focus:ring-[#174A5B] rounded"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-1">{config.title}</div>
                  <div className="text-sm text-gray-500">{config.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6 pt-4">
          <ProgressBar currentStep={5} totalSteps={7} />
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

export default CleanupConfigsStep;
