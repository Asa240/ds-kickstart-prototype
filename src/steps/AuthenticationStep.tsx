import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar';
import { useOnboarding } from '../context/OnboardingContext';

interface AuthenticationStepProps {
  onNext: () => void;
  onBack: () => void;
}

const AuthenticationStep: React.FC<AuthenticationStepProps> = ({ onNext, onBack }) => {
  const { updateAuthConfig } = useOnboarding();
  const [email, setEmail] = useState('');
  const [apiToken, setApiToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded subdomain for prototype - in production this comes from the installed account
    updateAuthConfig({ subdomain: 'demo-studio-sandbox', email, apiToken });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center font-inter p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-2xl p-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Step 2 of 7</p>
          <h1 className="text-3xl font-bold text-[#1C1E21] mb-2">
            Global Authentication Setup
          </h1>
          <p className="text-gray-600">
            Connect your Zendesk account to enable Demo Studio features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subdomain is locked to the installed account */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zendesk Account
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">demo-studio-sandbox.zendesk.com</span>
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 mt-1">Connected to your Zendesk account</p>
          </div>

          <Input
            label="Admin Email"
            type="email"
            placeholder="admin@yourcompany.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="The email address of your Zendesk admin account"
          />

          <div>
            <Input
              label="API Token"
              type="password"
              placeholder="••••••••••••••••"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
            />
            <a
              href="https://support.zendesk.com/hc/en-us/articles/4408889192858"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-[#174A5B] hover:text-[#1C586C] transition-colors"
            >
              How to generate an API token →
            </a>
          </div>

          <div className="mb-6 pt-4">
            <ProgressBar currentStep={1} totalSteps={7} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={onBack} type="button">
              Back
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()} 
              type="button"
            >
              Start Over
            </Button>
            <Button type="submit" className="flex-1">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationStep;
