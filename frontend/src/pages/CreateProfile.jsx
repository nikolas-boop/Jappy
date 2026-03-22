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
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-emerald-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2 animate-bounce">🐕</h1>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Willkommen bei Jappy!</h2>
          <p className="text-gray-600">Erstelle dein neues Profil</p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="space-y-6">
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
              className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
              disabled={loading}
              autoFocus
              maxLength="255"
            />
            <p className="text-xs text-gray-500 mt-1">
              {childName.trim().length}/255 Zeichen
            </p>
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
              className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-center text-2xl tracking-widest"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
            <p className="text-xs text-gray-500 mt-1">
              {pin.length}/4 Ziffern eingegeben
            </p>
          </div>

          {/* PIN Confirm Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PIN wiederholen
            </label>
            <input
              type="password"
              value={pinConfirm}
              onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-center text-2xl tracking-widest"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
            <p className="text-xs text-gray-500 mt-1">
              {pinConfirm.length}/4 Ziffern eingegeben
            </p>
          </div>

          {/* PIN Match Indicator */}
          {pin && pinConfirm && (
            <div
              className={`p-3 rounded-lg text-sm font-semibold ${
                pin === pinConfirm
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {pin === pinConfirm ? '✅ PINs stimmen überein!' : '❌ PINs stimmen nicht überein!'}
            </div>
          )}

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

          {/* Create Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄 Erstelle Profil...' : '🎉 Neues Profil erstellen'}
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
          💡 Merke dir deine PIN! Du brauchst sie zum Anmelden.
        </p>
      </motion.div>
    </div>
  );
}
