import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-12"
        >
          <div className="text-8xl drop-shadow-lg">🐕</div>
        </motion.div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-3 tracking-tight">
          Jappy
        </h1>
        <p className="text-2xl text-amber-200 font-semibold mb-8">
          Jarnos Spiel im Handy
        </p>

        {/* Description Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-10 border border-white/20">
          <p className="text-lg text-slate-100 leading-relaxed">
            Wähle dir einen Hund aus und kümmere dich um ihn.  <br />
            <span className="text-amber-200 font-semibold">
              Füttern • Gassi gehen • Spielen • Streicheln
            </span>
          </p>
          <p className="text-md text-slate-300 mt-4">
            Sammle Knochen und kaufe coole Items im Shop! 🛍️
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {[
            { icon: '🐶', label: '8 Hundrassen' },
            { icon: '📋', label: 'Tägliche Aufgaben' },
            { icon: '🛍️', label: 'Item Shop' },
            { icon: '🏆', label: 'Achievements' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10 hover:bg-white/10 transition"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-sm text-slate-300 font-medium">{feature.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition shadow-lg text-lg"
          >
            Anmelden
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/create-profile')}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition shadow-lg text-lg"
          >
            Neues Profil erstellen
          </motion.button>
        </div>

        {/* Info Box */}
        <div className="mt-10 bg-amber-500/20 border border-amber-500/50 rounded-lg p-4">
          <p className="text-sm text-amber-200 font-medium">
            💡 Vergiss deine PIN nicht! Schreib sie auf, um dich später anmelden zu können.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

