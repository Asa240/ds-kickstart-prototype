import React from 'react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center font-inter p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-5xl overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          {/* Left side - Illustration placeholder */}
          <div className="bg-gradient-to-br from-[#174A5B] to-[#1C586C] flex items-center justify-center p-12">
            <div className="text-center text-white">
              <div className="w-48 h-48 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Quick Start Your Demos</h3>
              <p className="text-white/80">Automated setup for Demo Studio in minutes</p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="p-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#1C1E21] leading-tight mb-3">
                Welcome to Demo Studio Kickstart
              </h1>
              <p className="text-gray-600 text-lg">
                Your automated onboarding tool to configure and launch Demo Studio quickly. Set up AI-powered business contexts, import configurations, and activate schedules—all in one streamlined flow.
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#174A5B]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#174A5B] text-xs font-semibold">1</span>
                </div>
                <span className="text-gray-700"><strong>Global Authentication Setup</strong> - Connect your Zendesk account</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#174A5B]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#174A5B] text-xs font-semibold">2</span>
                </div>
                <span className="text-gray-700"><strong>AI Business Context Configuration</strong> - Define business scenarios for AI</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#174A5B]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#174A5B] text-xs font-semibold">3</span>
                </div>
                <span className="text-gray-700"><strong>Apply Configurations</strong> - Import AI-generated macros, fields, and content</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#174A5B]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#174A5B] text-xs font-semibold">4</span>
                </div>
                <span className="text-gray-700"><strong>Activate Common Ticket Schedules</strong> - Select recurring demo schedules</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#174A5B]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#174A5B] text-xs font-semibold">5</span>
                </div>
                <span className="text-gray-700"><strong>Cleanup & Random Configs</strong> - Configure maintenance and extras</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#174A5B]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#174A5B] text-xs font-semibold">6</span>
                </div>
                <span className="text-gray-700"><strong>Launch Your Demo</strong> - Review and complete setup</span>
              </li>
            </ul>

            <div className="mb-6">
              <ProgressBar currentStep={0} totalSteps={7} />
              <p className="text-sm text-gray-500 mt-2">Step 1 of 7</p>
            </div>

            <Button onClick={onNext} className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
