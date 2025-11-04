import React from 'react';
import Button from '../components/Button';
import { useOnboarding } from '../context/OnboardingContext';

interface CompleteStepProps {
  onFinish: () => void;
}

const CompleteStep: React.FC<CompleteStepProps> = ({ onFinish }) => {
  const { state } = useOnboarding();

  const configurationsCount = Object.keys(state.randomConfigs).filter(
    (key) => state.randomConfigs[key]
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center font-inter p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-3xl p-12 text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-[#1C1E21] mb-4">
          Configuration Complete! 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Congratulations! You've successfully configured your Zendesk demo account. Your Demo Studio is ready to go!
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-[#174A5B]/5 rounded-lg p-6 border border-[#174A5B]/10">
            <div className="text-3xl font-bold text-[#174A5B] mb-2">
              {state.aiContexts.length}
            </div>
            <div className="text-sm text-gray-600">Business Contexts</div>
          </div>
          
          <div className="bg-[#174A5B]/5 rounded-lg p-6 border border-[#174A5B]/10">
            <div className="text-3xl font-bold text-[#174A5B] mb-2">
              {Object.keys(state.selectedSchedules).length}
            </div>
            <div className="text-sm text-gray-600">Active Schedules</div>
          </div>
          
          <div className="bg-[#174A5B]/5 rounded-lg p-6 border border-[#174A5B]/10">
            <div className="text-3xl font-bold text-[#174A5B] mb-2">
              {configurationsCount}
            </div>
            <div className="text-sm text-gray-600">Configurations</div>
          </div>
        </div>

        {/* What's Next */}
        <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#174A5B] mt-1">•</span>
              <span>Your demo account is being configured with all selected settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#174A5B] mt-1">•</span>
              <span>AI contexts will be used to generate relevant demo data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#174A5B] mt-1">•</span>
              <span>Scheduled tasks will run automatically based on your selections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#174A5B] mt-1">•</span>
              <span>You can modify these settings anytime from the Demo Studio dashboard</span>
            </li>
          </ul>
        </div>

        <Button onClick={onFinish} className="w-full max-w-md mx-auto">
          Go to Demo Studio Dashboard
        </Button>

        <p className="text-sm text-gray-500 mt-6">
          Need help? Visit our{' '}
          <a href="#" className="text-[#174A5B] hover:text-[#1C586C] underline">
            documentation
          </a>{' '}
          or{' '}
          <a href="#" className="text-[#174A5B] hover:text-[#1C586C] underline">
            contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default CompleteStep;
