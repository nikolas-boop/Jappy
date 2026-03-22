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
        localStorage.setItem('childId', response.data.child.id);
        localStorage.setItem('childName', response.data.child.name);

        onCreateSuccess(response.data.child);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐕</div>
          <h2 className="text-3xl font-bold text-white mb-2">Neues Profil</h2>
          <p className="text-slate-300">Willkommen bei Jappy!</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Dein Name
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="z.B. Jarno"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:bg-white/20 focus:border-white/40 transition text-white placeholder-slate-400"
              disabled={loading}
              autoFocus
              maxLength="255"
            />
            <p className="text-xs text-slate-400 mt-1">
              {childName.trim().length}/255
            </p>
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              PIN (4 Ziffern)
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:bg-white/20 focus:border-white/40 transition text-white placeholder-slate-400 text-center text-2xl tracking-widest font-semibold"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
          </div>

          {/* PIN Confirm */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              PIN wiederholen
            </label>
            <input
              type="password"
              value={pinConfirm}
              onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:bg-white/20 focus:border-white/40 transition text-white placeholder-slate-400 text-center text-2xl tracking-widest font-semibold"
              disabled={loading}
              maxLength="4"
              inputMode="numeric"
            />
          </div>

          {/* PIN Match Indicator */}
          {pin && pinConfirm && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-sm font-semibold p-3 rounded-lg ${
                pin === pinConfirm
                  ? 'bg-green-500/30 text-green-200 border border-green-500/50'
                  : 'bg-red-500/30 text-red-200 border border-red-500/50'
              }`}
            >
              {pin === pinConfirm ? '✅ PINs stimmen überein' : '❌ PINs stimmen nicht überein'}
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/30 border border-red-500/50 text-red-200 p-4 rounded-lg text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Buttons */}
          <motion.button
            type="submit"
            disabled={loading || !isFormValid}
            whileHover={{ opacity: isFormValid && !loading ? 0.9 : 1 }}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? '⏳ Erstelle Profil...' : '✨ Profil erstellen'}
          </motion.button>

          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-white/10 hover:bg-white/20 text-slate-200 font-semibold py-3 px-4 rounded-lg transition border border-white/20"
          >
            Zurück
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          💡 Merke dir deine PIN - du brauchst sie zum Anmelden!
        </p>
      </motion.div>
    </div>
  );
}
