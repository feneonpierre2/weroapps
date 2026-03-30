import React, { useState, useEffect } from 'react';
import { FormContainer } from './ui/FormContainer';
import { Search, Loader2, Plus } from 'lucide-react';
import { fetchAllBankLogos } from '../utils/api';

interface BankSelectionFormProps {
  onBankSelect: (bankName: string) => void;
  onExternalBankSelect: (bankData: ExternalBankData) => void;
}

interface PartnerBank {
  id: string;
  name: string;
  url: string;
  displayName: string;
}

export interface ExternalBankData {
  name: string;
  url: string;
  logo?: string;
  palette?: string[];
  backgroundColor?: string;
  textColor?: string;
}

const partnerBanks: PartnerBank[] = [
  {
    id: 'bnp',
    name: 'BNP Paribas',
    url: 'https://www.bnpparibas.fr',
    displayName: 'BNP Paribas'
  },
  {
    id: 'sg',
    name: 'Société Générale',
    url: 'https://www.societegenerale.fr',
    displayName: 'Société Générale'
  },
  {
    id: 'laposte',
    name: 'La Banque Postale',
    url: 'https://www.labanquepostale.fr',
    displayName: 'La Banque Postale'
  },
  {
    id: 'bp',
    name: 'Banque Populaire',
    url: 'https://www.banquepopulaire.fr',
    displayName: 'Banque Populaire'
  },
  {
    id: 'ca',
    name: 'Crédit Agricole',
    url: 'https://www.credit-agricole.fr',
    displayName: 'Crédit Agricole'
  },
  {
    id: 'cm',
    name: 'Crédit Mutuel',
    url: 'https://www.credit-mutuel.fr',
    displayName: 'Crédit Mutuel'
  },
  {
    id: 'cic',
    name: 'CIC',
    url: 'https://www.cic.fr',
    displayName: 'CIC'
  },
  {
    id: 'banquepostale',
    name: 'Banque Postale',
    url: 'https://www.banquepostale.fr',
    displayName: 'Banque Postale'
  },
  {
    id: 'axa',
    name: 'AXA Banques',
    url: 'https://www.axa-banque.fr',
    displayName: 'AXA Banques'
  }
];

export function BankSelectionForm({ onBankSelect, onExternalBankSelect }: BankSelectionFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [bankLogos, setBankLogos] = useState<Record<string, string | null>>({});
  const [isLoadingLogos, setIsLoadingLogos] = useState(true);

  useEffect(() => {
    const loadBankLogos = async () => {
      setIsLoadingLogos(true);
      try {
        const logos = await fetchAllBankLogos(partnerBanks);
        setBankLogos(logos);
      } catch (error) {
        console.error('Error loading bank logos:', error);
      } finally {
        setIsLoadingLogos(false);
      }
    };

    loadBankLogos();
  }, []);

  const filteredBanks = partnerBanks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bank.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNoResultsMessage = searchTerm.length > 0 && filteredBanks.length === 0;

  const handleBankClick = (bankId: string) => {
    onBankSelect(bankId);
  };

  const handleExternalBank = () => {
    // Appeler directement onExternalBankSelect sans formulaire intermédiaire
    const externalBankData: ExternalBankData = {
      name: 'Autre banque',
      url: 'https://www.banque.fr',
      palette: ['#4f46e5', '#3b82f6', '#2563eb'],
      backgroundColor: '#4f46e5',
      textColor: '#ffffff'
    };
    onExternalBankSelect(externalBankData);
  };

  const getBankLogo = (bankId: string) => {
    const logoUrl = bankLogos[bankId];
    if (logoUrl) {
      return logoUrl;
    }
    
    // Fallback logos si l'API Microlink échoue
    const fallbackLogos: Record<string, string> = {
      'bnp': 'https://logos-world.net/wp-content/uploads/2021/02/BNP-Paribas-Logo.png',
      'sg': 'https://logos-world.net/wp-content/uploads/2021/02/Societe-Generale-Logo.png',
      'laposte': 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/0b/Logo_La_Banque_postale_2010.svg/1200px-Logo_La_Banque_postale_2010.svg.png',
      'bp': 'https://upload.wikimedia.org/wikipedia/fr/thumb/b/b3/Logo_Banque_Populaire_2020.svg/1200px-Logo_Banque_Populaire_2020.svg.png',
      'ca': 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Logo-Credit-Agricole.svg/1200px-Logo-Credit-Agricole.svg.png',
      'cm': 'https://upload.wikimedia.org/wikipedia/fr/thumb/4/47/Logo_Cr%C3%A9dit_Mutuel.svg/1200px-Logo_Cr%C3%A9dit_Mutuel.svg.png',
      'cic': 'https://upload.wikimedia.org/wikipedia/fr/thumb/8/8c/Logo_CIC_2020.svg/1200px-Logo_CIC_2020.svg.png',
      'banquepostale': 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/0b/Logo_La_Banque_postale_2010.svg/1200px-Logo_La_Banque_postale_2010.svg.png',
      'axa': 'https://upload.wikimedia.org/wikipedia/fr/thumb/b/b1/Logo_AXA_2014.svg/1200px-Logo_AXA_2014.svg.png'
    };
    
    return fallbackLogos[bankId] || '';
  };

  return (
    <FormContainer
      title="Authentification bancaire"
      subtitle="Sélectionnez votre banque partenaire pour vous authentifier en toute sécurité."
      step="ÉTAPE 3"
    >
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher votre banque..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoadingLogos && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-yellow-500 mr-2" />
          <span className="text-gray-600">Chargement des logos bancaires...</span>
        </div>
      )}

      {/* Partner Banks Grid */}
      {!isLoadingLogos && (
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Banques partenaires
          </h3>
          
          <div className="grid gap-4">
            {filteredBanks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleBankClick(bank.id)}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                  {getBankLogo(bank.id) ? (
                    <img
                      src={getBankLogo(bank.id)}
                      alt={`Logo ${bank.name}`}
                      className="max-w-12 max-h-12 object-contain"
                      onError={(e) => {
                        // Si l'image ne charge pas, afficher un placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                            <span class="text-gray-400 text-xs font-bold">${bank.name.substring(0, 3)}</span>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs font-bold">
                        {bank.name.substring(0, 3)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 group-hover:text-yellow-700">
                    {bank.displayName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Authentification sécurisée
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200">
                    <span className="text-yellow-600 font-bold">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Manual Authentication Option (always visible) */}
          {!showNoResultsMessage && (
            <div className="border-t pt-6">
              <div className="text-center">
                <button
                  onClick={handleExternalBank}
                  className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Autres banques</span>
                </button>
              </div>
            </div>
          )}

          {/* No Results Message avec option d'authentification manuelle */}
          {showNoResultsMessage && (
            <div className="text-center py-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  Votre banque n'est pas encore disponible dans nos partenaires.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Utilisez le bouton ci-dessous pour effectuer l'authentification manuellement
                </p>
                <button
                  onClick={handleExternalBank}
                  className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Autres banques</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">🔒</span>
            </div>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-semibold text-blue-800">
              Connexion sécurisée
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Vous serez redirigé vers l'interface sécurisée de votre banque pour vous authentifier. 
              Wero ne stocke jamais vos identifiants bancaires.
            </p>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}