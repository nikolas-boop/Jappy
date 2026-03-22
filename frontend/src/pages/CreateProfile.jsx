import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../services/apiClient';

export default function CreateProfile({ onCreateSuccess }) {
  const navigate = useNavigate();
  const [childName, setChildName] = useState('');
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (childName.trim().length < 2) {
      setError('Dein Name muss mindestens 2 Buchstaben lang sein!');
      return false;
    }

    if (childName.trim().length > 255) {
      setError('Dein Name darf maximal 255 Buchstaben lang sein!');
      return false;
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError('Bitte gib eine 4-stellige PIN ein!');
      return false;
    }

    if (pin !== pinConfirm) {
      setError('Die PINs stimmen nicht überein!');
      return false;
    }

    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/api/children', {
        name: childName.trim(),
        pin,
      });

      if (response.data.success) {
        // Speichere Session-Daten
        localStorage.setItem('childId', response.data.child.id);
        localStorage.setItem('childName', response.data.child.name);

        // Callback aufrufen
        onCreateSuccess(response.data.child);

        // Weiterleitung zur Hund-Auswahl
        navigate('/dog-selection');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profil-Erstellung fehlgeschlagen!';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const isFormValid =
    childName.trim().length >= 2 &&
    childName.trim().length <= 255 &&
    pin.length === 4 &&
    pinConfirm.length === 4 &&
    pin === pinConfirm;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-emerald-200 to-teal-200 p-4 flex items-center justify-center">
      {/* Decorative emojis background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-5 left-10 text-6xl opacity-70">🐶</motion.div>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-20 right-5 text-6xl opacity-70">🦴</motion.div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-20 left-5 text-5xl opacity-70">🌟</motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-4xl shadow-2xl p-8 w-full max-w-lg relative z-10 border-4 border-green-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-7xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.h1>
          <h2 className="text-4xl font-black text-green-600 mb-3">
            Willkommen bei Jappy!
          </h2>
          <p className="text-xl text-emerald-600 font-bold">
            Erstelle dein Geheimnis-Profil! 🤫
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="space-y-6">
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
              className="w-full px-5 py-4 text-xl border-4 border-green-400 rounded-2xl focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-300 transition bg-white font-bold"
              disabled={loading}
              autoFocus
              maxLength="255"
            />
            <p className="text-sm text-emerald-700 mt-2 font-semibold">
              {childName.trim().length}/255 Zeichen ✏️
            </p>
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
              🔐 Deine geheime PIN (4 Ziffern)
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-full px-5 py-4 text-4xl border-4 border-green-400 rounded-2xl focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-300 transition text-center tracking-widest bg-white font-bold"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
            <p className="text-sm text-emerald-700 mt-2 font-semibold">
              {pin.length}/4 Ziffern eingegeben 📱
            </p>
          </div>

          {/* PIN Confirm Input */}
          <div>
            <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
              🔐 PIN wiederholen
            </label>
            <input
              type="password"
              value={pinConfirm}
              onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-full px-5 py-4 text-4xl border-4 border-green-400 rounded-2xl focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-300 transition text-center tracking-widest bg-white font-bold"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
            <p className="text-sm text-emerald-700 mt-2 font-semibold">
              {pinConfirm.length}/4 Ziffern eingegeben 📱
            </p>
          </div>

          {/* PIN Match Indicator */}
          {pin && pinConfirm && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-2xl text-lg font-black border-4 ${
                pin === pinConfirm
                  ? 'bg-green-200 text-green-700 border-green-400'
                  : 'bg-red-200 text-red-700 border-red-400'
              }`}
            >
              {pin === pinConfirm ? '✅ PINs stimmen überein!' : '❌ PINs stimmen nicht überein!'}
            </motion.div>
          )}

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

          {/* Create Button */}
          <motion.button
            type="submit"
            disabled={loading || !isFormValid}
            whileHover={{ scale: isFormValid && !loading ? 1.05 : 1 }}
            whileTap={{ scale: isFormValid && !loading ? 0.95 : 1 }}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-xl py-5 px-6 rounded-2xl hover:shadow-2xl transition transform disabled:opacity-50 disabled:cursor-not-allowed border-4 border-green-600 shadow-lg"
          >
            {loading ? '🔄 Erstelle Profil...' : '🎉 Profil erstellen - Los gehts!'}
          </motion.button>

          {/* Back Button */}
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-yellow-300 text-gray-800 font-black text-lg py-4 px-6 rounded-2xl hover:bg-yellow-400 transition border-4 border-yellow-500 shadow-lg"
          >
            ← Zurück zur Startseite
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-base text-emerald-700 mt-8 font-bold bg-green-100 rounded-2xl p-4 border-2 border-green-400">
          💡 Merke dir deine PIN! Du brauchst sie zum Anmelden. Schreib sie auf! 📝
        </p>
      </motion.div>
    </div>
  );
}
