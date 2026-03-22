import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-200 via-orange-200 to-pink-200 p-4 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -30, 0], x: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-10 left-5 text-7xl opacity-80">🐕</motion.div>
        <motion.div animate={{ y: [0, 30, 0], x: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-32 right-3 text-6xl opacity-80">🦴</motion.div>
        <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-32 left-10 text-6xl opacity-80">🌟</motion.div>
        <motion.div animate={{ y: [0, 25, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-20 right-5 text-5xl opacity-80">🎾</motion.div>
      </div>

      <motion.div
        className="text-center max-w-2xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1
            className="text-9xl inline-block drop-shadow-lg"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🐕
          </motion.h1>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-6xl font-black text-orange-600 drop-shadow-lg mb-3">
            Jappy!
          </h1>
          <p className="text-4xl font-black text-pink-600 drop-shadow-lg mb-8">
            Jarnos Spiel im Handy
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="text-2xl font-bold text-gray-800 leading-relaxed bg-white bg-opacity-80 rounded-3xl p-6 border-4 border-orange-400 shadow-lg">
            <p className="mb-4">
              🎉 Willkommen zu Jappy!
            </p>
            <p className="mb-2">
              Hier kannst du dir einen wunderschönen Hund aussuchen...
            </p>
            <p className="mb-2">
              🦴 ...und dich um ihn kümmern!
            </p>
            <p className="mb-2">
              🐾 Füttern, Gassi gehen, spielen und streicheln...
            </p>
            <p>
              🛍️ ...und Knochen im coolen Shop sammeln!
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="mb-10 grid grid-cols-2 gap-4 text-lg font-black">
          <div className="bg-blue-300 rounded-2xl p-4 border-2 border-blue-500 shadow-lg hover:scale-105 transition">
            ✅ Hundrassen
          </div>
          <div className="bg-purple-300 rounded-2xl p-4 border-2 border-purple-500 shadow-lg hover:scale-105 transition">
            ✅ Tägliche Aufgaben
          </div>
          <div className="bg-green-300 rounded-2xl p-4 border-2 border-green-500 shadow-lg hover:scale-105 transition">
            ✅ Item Shop
          </div>
          <div className="bg-red-300 rounded-2xl p-4 border-2 border-red-500 shadow-lg hover:scale-105 transition">
            ✅ Errungenschaften
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="space-y-4 w-full">
          {/* Login Button */}
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 text-white font-black text-2xl py-6 px-8 rounded-3xl shadow-2xl border-4 border-purple-700 hover:shadow-3xl transition transform"
          >
            👤 ANMELDEN
          </motion.button>

          {/* Create Profile Button */}
          <motion.button
            onClick={() => navigate('/create-profile')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white font-black text-2xl py-6 px-8 rounded-3xl shadow-2xl border-4 border-green-700 hover:shadow-3xl transition transform"
          >
            ✨ NEUES PROFIL
          </motion.button>
        </motion.div>

        {/* Warning Box */}
        <motion.div
          variants={itemVariants}
          className="mt-10 bg-yellow-300 border-4 border-yellow-600 rounded-3xl p-6 text-center shadow-lg"
        >
          <p className="text-2xl font-black text-yellow-900 mb-2">
            ⚠️ WICHTIG!
          </p>
          <p className="text-lg font-bold text-yellow-900">
            Schreib deine PIN auf! 📝 Du brauchst sie zum Anmelden!
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="mt-10 text-xl font-black text-gray-800 italic"
        >
          🐾 Viel Spaß mit deinem virtuellen Freund! 🐾
        </motion.p>
      </motion.div>
    </div>
  );
}

