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
        localStorage.setItem('childId', response.data.child.id);
        localStorage.setItem('childName', response.data.child.name);

        onLoginSuccess(response.data.child);

        navigate('/dog-selection');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Anmeldung fehlgeschlagen!');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

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
          <h2 className="text-3xl font-bold text-white mb-2">Willkommen zurück!</h2>
          <p className="text-slate-300">Dein Hund wartet auf dich</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
              maxLength="255"
            />
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              PIN
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
            disabled={loading}
            whileHover={{ opacity: !loading ? 0.9 : 1 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? '⏳ Anmelden...' : 'Anmelden'}
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
          Noch kein Konto? Gib auf der Startseite ein neues Profil erstellen!
        </p>
      </motion.div>
    </div>
  );
}
