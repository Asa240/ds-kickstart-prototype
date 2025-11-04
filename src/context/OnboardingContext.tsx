import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingState, AIContext, AuthConfig } from '../types';

interface OnboardingContextType {
  state: OnboardingState;
  updateAuthConfig: (config: AuthConfig) => void;
  addAIContext: (context: AIContext) => void;
  removeAIContext: (id: string) => void;
  setSelectedContext: (id: string) => void;
  selectSchedule: (category: string, scheduleId: string) => void;
  setCleanupSchedule: (scheduleId: string) => void;
  toggleRandomConfig: (configId: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialState: OnboardingState = {
  currentStep: 0,
  authConfig: null,
  aiContexts: [
    {
      id: 'sample-1',
      name: 'Grubhub',
      source: 'website',
      website: 'grubhub.com',
      description: 'Online and mobile food ordering and delivery marketplace connecting diners with local restaurants, offering convenient meal delivery and pickup services.',
      createdAt: new Date('2025-11-01'),
    },
    {
      id: 'sample-2',
      name: 'Uber',
      source: 'website',
      website: 'uber.com',
      description: 'Global technology platform providing ride-hailing, food delivery (Uber Eats), package delivery, freight transportation, and other mobility services.',
      createdAt: new Date('2025-11-02'),
    },
  ],
  selectedContextId: 'sample-1',
  selectedSchedules: {},
  cleanupSchedule: null,
  randomConfigs: {},
  importProgress: {
    macros: 0,
    fields: 0,
    views: 0,
    articles: 0,
  },
};

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(initialState);

  const updateAuthConfig = (config: AuthConfig) => {
    setState(prev => ({ ...prev, authConfig: config }));
  };

  const addAIContext = (context: AIContext) => {
    setState(prev => ({
      ...prev,
      aiContexts: [...prev.aiContexts, context],
    }));
  };

  const removeAIContext = (id: string) => {
    setState(prev => ({
      ...prev,
      aiContexts: prev.aiContexts.filter(ctx => ctx.id !== id),
      selectedContextId: prev.selectedContextId === id ? null : prev.selectedContextId,
    }));
  };

  const setSelectedContext = (id: string) => {
    setState(prev => ({ ...prev, selectedContextId: id }));
  };

  const selectSchedule = (category: string, scheduleId: string) => {
    setState(prev => ({
      ...prev,
      selectedSchedules: {
        ...prev.selectedSchedules,
        [category]: scheduleId,
      },
    }));
  };

  const setCleanupSchedule = (scheduleId: string) => {
    setState(prev => ({ ...prev, cleanupSchedule: scheduleId }));
  };

  const toggleRandomConfig = (configId: string) => {
    setState(prev => ({
      ...prev,
      randomConfigs: {
        ...prev.randomConfigs,
        [configId]: !prev.randomConfigs[configId],
      },
    }));
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const previousStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  };

  const goToStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        updateAuthConfig,
        addAIContext,
        removeAIContext,
        setSelectedContext,
        selectSchedule,
        setCleanupSchedule,
        toggleRandomConfig,
        nextStep,
        previousStep,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
