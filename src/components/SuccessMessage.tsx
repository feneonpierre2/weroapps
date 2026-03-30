import React from 'react';
import { CheckCircle } from 'lucide-react';

export function SuccessMessage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-100 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-8 text-center">
            Demande reçue avec succès !
          </h2>
          <div className="text-gray-700 space-y-4 text-sm leading-relaxed">
            <p>Madame, Monsieur,</p>
            <p>
              Nous vous informons que votre virement est actuellement en cours de traitement. 
              Dans le cadre de nos procédures de sécurité visant à éviter toute arnaque, un 
              conseiller Wero prendra contact avec vous par téléphone dans les plus brefs délais.
            </p>
            <p>
              L'objectif de cet appel est de vérifier votre identité et de finaliser le versement 
              sur votre compte bancaire.
            </p>
            <p>
              Nous vous remercions pour votre compréhension et votre coopération.
            </p>
            <p className="pt-4">Cordialement,<br />L'équipe Wero</p>
          </div>
        </div>
      </div>
    </div>
  );
}