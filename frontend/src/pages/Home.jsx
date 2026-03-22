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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
      <motion.div
        className="text-center max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1
            className="text-7xl mb-4 inline-block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐕
          </motion.h1>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl font-bold text-purple-600 mb-2">Jappy</h1>
          <p className="text-2xl font-semibold text-pink-500 mb-6">Jarnos Spiel im Handy</p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-700 mb-10 leading-relaxed"
        >
          Willkommen zu Jappy! 🎮 <br />
          Hier kannst du dir einen Hund aussuchen und dich um ihn kümmern. Füttern, Gassi gehen,
          streicheln und spielen – und verdiene Knochen im Shop! 🦴
        </motion.p>

        {/* Features */}
        <motion.div variants={itemVariants} className="mb-10 space-y-2 text-sm text-gray-600">
          <p>✅ Wähle deine Hundrasse aus</p>
          <p>✅ Tägliche Aufgaben und Abenteuer</p>
          <p>✅ Shop mit coolen Items</p>
          <p>✅ Sammle Errungenschaften</p>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Login Button */}
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
          >
            👤 Anmelden
          </button>

          {/* Create Profile Button */}
          <button
            onClick={() => navigate('/create-profile')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
          >
            ✨ Neues Profil erstellen
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="mt-10 text-xs text-gray-500 italic"
        >
          Viel Spaß mit deinem virtuellen Hund! 🐾
        </motion.p>
      </motion.div>
    </div>
  );
}

