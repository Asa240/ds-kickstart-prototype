import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { useOnboarding } from '../context/OnboardingContext';
import { AIContext } from '../types';

interface AIContextStepProps {
  onNext: () => void;
  onBack: () => void;
}

const AIContextStep: React.FC<AIContextStepProps> = ({ onNext, onBack }) => {
  const { state, addAIContext, removeAIContext } = useOnboarding();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample companies for prototype - in production this would use OpenAI
  const sampleCompanies: Record<string, { name: string; description: string; logo: string }> = {
    'grubhub.com': {
      name: 'Grubhub',
      description: 'Online and mobile food ordering and delivery marketplace connecting diners with local restaurants, offering convenient meal delivery and pickup services.',
      logo: 'https://logo.clearbit.com/grubhub.com',
    },
    'uber.com': {
      name: 'Uber',
      description: 'Global technology platform providing ride-hailing, food delivery (Uber Eats), package delivery, freight transportation, and other mobility services.',
      logo: 'https://logo.clearbit.com/uber.com',
    },
    'netflix.com': {
      name: 'Netflix',
      description: 'Global streaming entertainment service offering TV shows, movies, documentaries, and original content across multiple devices and platforms.',
      logo: 'https://logo.clearbit.com/netflix.com',
    },
    'tesla.com': {
      name: 'Tesla',
      description: 'Electric vehicle and clean energy company designing and manufacturing electric cars, battery energy storage, and solar products.',
      logo: 'https://logo.clearbit.com/tesla.com',
    },
    'draftkings.com': {
      name: 'DraftKings',
      description: 'Digital sports entertainment and gaming company providing daily fantasy sports contests, sports betting, and online casino gaming.',
      logo: 'https://logo.clearbit.com/draftkings.com',
    },
    'squarespace.com': {
      name: 'Squarespace',
      description: 'Website building and hosting platform enabling users to create professional websites, online stores, and portfolios with drag-and-drop tools.',
      logo: 'https://logo.clearbit.com/squarespace.com',
    },
    'etsy.com': {
      name: 'Etsy',
      description: 'Global marketplace for unique and creative goods, connecting independent sellers with buyers seeking handmade, vintage, and craft items.',
      logo: 'https://logo.clearbit.com/etsy.com',
    },
    'levi.com': {
      name: "Levi's",
      description: 'Iconic American clothing company specializing in denim jeans and casual wear, known for quality craftsmanship and classic style since 1853.',
      logo: 'https://logo.clearbit.com/levi.com',
    },
  };

  const handleAddContext = () => {
    if (!websiteUrl.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      // Extract domain from URL
      let domain = websiteUrl.toLowerCase().trim();
      domain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

      // Find matching sample company or use generic
      const companyData = sampleCompanies[domain] || {
        name: domain.charAt(0).toUpperCase() + domain.slice(1).replace(/\.[^/.]+$/, ''),
        description: `Business context generated from ${domain}`,
        logo: `https://logo.clearbit.com/${domain}`,
      };

      const newContext: AIContext = {
        id: Date.now().toString(),
        name: companyData.name,
        source: 'website',
        website: websiteUrl,
        description: companyData.description,
        createdAt: new Date(),
      };

      addAIContext(newContext);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center font-inter p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-4xl p-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Step 3 of 7</p>
          <h1 className="text-3xl font-bold text-[#1C1E21] mb-2">
            AI Business Context Configuration
          </h1>
          <p className="text-gray-600">
            Add business contexts by providing a company website. Our AI will automatically extract the company name and generate a comprehensive description. You have some pre-configured contexts below.
          </p>
        </div>

        {/* Add Context Form */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Input
                    label="Company Website"
                    placeholder="e.g., grubhub.com, uber.com, netflix.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    helperText="Enter a company website URL. Try: grubhub.com, uber.com, netflix.com, tesla.com, draftkings.com, etsy.com"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddContext}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating with AI...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>+</span>
                  <span>Add Business Context from URL</span>
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Context List */}
        {state.aiContexts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Business Contexts ({state.aiContexts.length})
            </h3>
            <div className="space-y-3">
              {state.aiContexts.map((context) => (
                <Card key={context.id} hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {context.website ? (
                          <img 
                            src={`https://logo.clearbit.com/${context.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}`}
                            alt={`${context.name} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              // Fallback to icon if logo fails to load
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <svg className="w-5 h-5 text-[#174A5B] hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{context.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {context.description || `Website: ${context.website}`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAIContext(context.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 pt-4">
          <ProgressBar currentStep={2} totalSteps={7} />
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

export default AIContextStep;
