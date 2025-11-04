import React, { useState } from 'react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { useOnboarding } from '../context/OnboardingContext';

interface ApplyConfigsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ApplyConfigsStep: React.FC<ApplyConfigsStepProps> = ({ onNext, onBack }) => {
  const { state, setSelectedContext } = useOnboarding();
  const [selectedContext, setLocalSelectedContext] = useState(
    state.selectedContextId || (state.aiContexts[0]?.id ?? '')
  );
  const [importingMacros, setImportingMacros] = useState(false);
  const [importingFields, setImportingFields] = useState(false);
  const [importingViews, setImportingViews] = useState(false);
  const [importingArticles, setImportingArticles] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');

  const contextOptions = state.aiContexts.map((ctx) => ({
    value: ctx.id,
    label: ctx.name,
  }));

  const handleContextChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contextId = e.target.value;
    setLocalSelectedContext(contextId);
    setSelectedContext(contextId);
  };

  const handleImportMacros = () => {
    setImportingMacros(true);
    // Simulate import
    setTimeout(() => setImportingMacros(false), 2000);
  };

  const handleImportFields = () => {
    setImportingFields(true);
    setTimeout(() => setImportingFields(false), 1500);
  };

  const handleImportViews = () => {
    setImportingViews(true);
    setTimeout(() => setImportingViews(false), 1500);
  };

  const handleImportArticles = () => {
    setImportingArticles(true);
    setTimeout(() => setImportingArticles(false), 2500);
  };

  const themes = [
    { 
      value: 'copenhagen', 
      label: 'Copenhagen',
      description: 'Clean and modern design with focus on readability',
      color: '#03363D'
    },
    { 
      value: 'gather', 
      label: 'Gather',
      description: 'Warm and inviting community-focused theme',
      color: '#5B3A29'
    },
    { 
      value: 'minimal', 
      label: 'Minimal',
      description: 'Simple and distraction-free interface',
      color: '#2C2C2C'
    },
    { 
      value: 'studio', 
      label: 'Studio',
      description: 'Bold and creative design for visual brands',
      color: '#6B46C1'
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center font-inter p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-4xl p-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Step 4 of 7</p>
          <h1 className="text-3xl font-bold text-[#1C1E21] mb-2">
            Apply Configurations
          </h1>
          <p className="text-gray-600">
            Import AI-generated configurations based on your selected business context. These configurations are tailored to match your chosen business scenario.
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
          <p className="text-sm text-blue-700 mt-2 flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>All imports below will be AI-generated based on the selected business context</span>
          </p>
        </div>

        {/* Import Sections */}
        <div className="space-y-6 mb-8">
          {/* Macros */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  Import Macros
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    AI Generated
                  </span>
                </h3>
                <p className="text-sm text-gray-500">Pre-built macros for common support scenarios</p>
              </div>
              <Button
                onClick={handleImportMacros}
                disabled={importingMacros}
                variant="secondary"
              >
                {importingMacros ? 'Importing...' : 'Import'}
              </Button>
            </div>
            {importingMacros && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-[#174A5B] animate-pulse w-2/3" />
              </div>
            )}
          </div>

          {/* Fields */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  Import Ticket Fields
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    AI Generated
                  </span>
                </h3>
                <p className="text-sm text-gray-500">Custom fields for your demo tickets</p>
              </div>
              <Button
                onClick={handleImportFields}
                disabled={importingFields}
                variant="secondary"
              >
                {importingFields ? 'Importing...' : 'Import'}
              </Button>
            </div>
            {importingFields && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-[#174A5B] animate-pulse w-3/4" />
              </div>
            )}
          </div>

          {/* Views */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  Import Views
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    AI Generated
                  </span>
                </h3>
                <p className="text-sm text-gray-500">Pre-configured ticket views</p>
              </div>
              <Button
                onClick={handleImportViews}
                disabled={importingViews}
                variant="secondary"
              >
                {importingViews ? 'Importing...' : 'Import'}
              </Button>
            </div>
            {importingViews && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-[#174A5B] animate-pulse w-1/2" />
              </div>
            )}
          </div>

          {/* Help Center Articles */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  Import Help Center Articles
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    AI Generated
                  </span>
                </h3>
                <p className="text-sm text-gray-500">Sample knowledge base articles</p>
              </div>
              <Button
                onClick={handleImportArticles}
                disabled={importingArticles}
                variant="secondary"
              >
                {importingArticles ? 'Importing...' : 'Import'}
              </Button>
            </div>
            {importingArticles && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-[#174A5B] animate-pulse w-4/5" />
              </div>
            )}
          </div>

          {/* Theme Selection */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Select Help Center Theme</h3>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setSelectedTheme(theme.value)}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                    selectedTheme === theme.value
                      ? 'border-[#174A5B] bg-[#174A5B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="mb-3 h-24 rounded overflow-hidden border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                    <div className="h-6" style={{ backgroundColor: theme.color }}></div>
                    <div className="p-2 space-y-1">
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  {/* Theme Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{theme.label}</h4>
                      <p className="text-xs text-gray-500">{theme.description}</p>
                    </div>
                    {selectedTheme === theme.value && (
                      <svg className="w-5 h-5 text-[#174A5B] flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 pt-4">
          <ProgressBar currentStep={3} totalSteps={7} />
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

export default ApplyConfigsStep;
