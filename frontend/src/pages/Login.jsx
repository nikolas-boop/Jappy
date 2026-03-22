import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../services/apiClient';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [childName, setChildName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!childName.trim()) {
      setError('Bitte gib deinen Namen ein!');
      return;
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError('Bitte gib eine 4-stellige PIN ein!');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/api/children/login', {
        name: childName.trim(),
        pin,
      });

      if (response.data.success) {
        // Speichere Session-Daten
        localStorage.setItem('childId', response.data.child.id);
        localStorage.setItem('childName', response.data.child.name);

        // Callback aufrufen
        onLoginSuccess(response.data.child);

        // Weiterleitung zur Hund-Auswahl
        navigate('/dog-selection');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Anmeldung fehlgeschlagen. Versuche es nochmal!');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🐕</h1>
          <h2 className="text-3xl font-bold text-purple-600 mb-2">Jappy Anmelden</h2>
          <p className="text-gray-600">Willkommen zurück!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dein Name
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="z.B. Jarno"
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              disabled={loading}
              maxLength="255"
            />
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deine PIN (4 Ziffern)
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-center text-2xl tracking-widest"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
            <p className="text-xs text-gray-500 mt-1">
              PIN ist {pin.length}/4 Ziffern eingegeben
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
              role="alert"
            >
              <p className="font-semibold">⚠️ Fehler</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄 Anmelden...' : '✨ Anmelden'}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition"
          >
            ← Zurück
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Noch kein Konto? Erstelle ein neues Profil auf der Startseite!
        </p>
      </motion.div>
    </div>
  );
}
