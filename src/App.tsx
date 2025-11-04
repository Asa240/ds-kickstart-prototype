import React from 'react';
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import Header from './components/Header';
import WelcomeStep from './steps/WelcomeStep';
import AuthenticationStep from './steps/AuthenticationStep';
import AIContextStep from './steps/AIContextStep';
import ApplyConfigsStep from './steps/ApplyConfigsStep';
import TicketSchedulesStep from './steps/TicketSchedulesStep';
import CleanupConfigsStep from './steps/CleanupConfigsStep';
import CompleteStep from './steps/CompleteStep';

const OnboardingFlow: React.FC = () => {
  const { state, nextStep, previousStep, goToStep } = useOnboarding();

  const handleSkip = () => {
    goToStep(6); // Skip to completion
  };

  const handleFinish = () => {
    // Navigate to dashboard or home
    console.log('Onboarding complete!', state);
    alert('Onboarding complete! Redirecting to Demo Studio dashboard...');
  };

  const steps = [
    <WelcomeStep onNext={nextStep} />,
    <AuthenticationStep onNext={nextStep} onBack={previousStep} />,
    <AIContextStep onNext={nextStep} onBack={previousStep} />,
    <ApplyConfigsStep onNext={nextStep} onBack={previousStep} />,
    <TicketSchedulesStep onNext={nextStep} onBack={previousStep} />,
    <CleanupConfigsStep onNext={nextStep} onBack={previousStep} />,
    <CompleteStep onFinish={handleFinish} />,
  ];

  return (
    <div className="font-inter">
      {state.currentStep < 6 && <Header onSkip={handleSkip} />}
      {steps[state.currentStep]}
    </div>
  );
};

function App() {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  );
}

export default App;
