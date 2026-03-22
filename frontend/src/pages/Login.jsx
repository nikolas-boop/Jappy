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
    <div className="min-h-screen bg-gradient-to-b from-purple-200 via-pink-200 to-red-200 p-4 flex items-center justify-center">
      {/* Decorative emojis background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-5 text-6xl opacity-70">🐕</motion.div>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 right-10 text-5xl opacity-70">🌟</motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-4xl shadow-2xl p-8 w-full max-w-lg relative z-10 border-4 border-purple-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-7xl mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐕
          </motion.h1>
          <h2 className="text-4xl font-black text-purple-600 mb-3">
            Willkommen zurück!
          </h2>
          <p className="text-xl text-pink-600 font-bold">
            Dein Hund wartet auf dich! 🐾
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
              👤 Dein Name
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="z.B. Jarno"
              className="w-full px-5 py-4 text-xl border-4 border-purple-400 rounded-2xl focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-300 transition bg-white font-bold"
              disabled={loading}
              maxLength="255"
            />
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
              🔐 Deine PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-full px-5 py-4 text-4xl border-4 border-purple-400 rounded-2xl focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-300 transition text-center tracking-widest bg-white font-bold"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
            <p className="text-sm text-purple-700 mt-2 font-semibold">
              {pin.length}/4 Ziffern 📱
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-300 border-4 border-red-500 text-red-800 p-5 rounded-2xl"
              role="alert"
            >
              <p className="font-black text-lg">⚠️ Achtung!</p>
              <p className="text-base font-bold mt-1">{error}</p>
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: !loading ? 1.05 : 1 }}
            whileTap={{ scale: !loading ? 0.95 : 1 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xl py-5 px-4 rounded-2xl hover:shadow-2xl transition transform disabled:opacity-50 disabled:cursor-not-allowed border-4 border-purple-600 shadow-lg"
          >
            {loading ? '🔄 Anmelden...' : '✨ Anmelden - Los geht\'s!'}
          </motion.button>

          {/* Back Button */}
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-yellow-300 text-gray-800 font-black text-lg py-4 px-4 rounded-2xl hover:bg-yellow-400 transition border-4 border-yellow-500 shadow-lg"
          >
            ← Zurück zur Startseite
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-base text-purple-700 mt-8 font-bold bg-pink-100 rounded-2xl p-4 border-2 border-purple-300">
          ✨ Noch kein Konto? Erstelle ein neues Profil auf der Startseite!
        </p>
      </motion.div>
    </div>
  );
}
