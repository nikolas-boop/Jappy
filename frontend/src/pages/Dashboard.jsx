import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export default function Dashboard() {
  const navigate = useNavigate();
  const childName = localStorage.getItem('childName');
  const dogName = localStorage.getItem('dogName');
  const dogId = localStorage.getItem('dogId');

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      if (!dogId) {
        navigate('/dog-selection');
        return;
      }

      try {
        const response = await apiClient.get(`/api/dogs/${dogId}`);
        if (response.data.success) {
          setDog(response.data.dog);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDog();
  }, [dogId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🐕
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">🐕 {dogName}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8"
        >
          <p className="text-slate-200 mb-4">
            Willkommen zurück, <span className="font-bold text-amber-200">{childName}</span>!
          </p>
          <p className="text-slate-300">Dein Hund wartet auf dich...</p>
        </motion.div>

        {/* Dog Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Hunger', value: dog?.hunger || 50, icon: '🍖', color: 'from-orange-500 to-red-500' },
            { label: 'Freude', value: dog?.happiness || 80, icon: '😊', color: 'from-pink-500 to-red-500' },
            { label: 'Gesundheit', value: dog?.health || 100, icon: '❤️', color: 'from-green-500 to-emerald-500' },
            { label: 'Level', value: dog?.level || 1, icon: '⭐', color: 'from-blue-500 to-purple-500', max: 100 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-sm text-slate-300 font-semibold">{stat.value}%</span>
              </div>
              <div className="text-sm text-slate-300 mb-2">{stat.label}</div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-6 text-center"
        >
          <p className="text-slate-200 font-semibold mb-2">🚀 Dashboard wird erweitert...</p>
          <p className="text-sm text-slate-300">
            Bald: Aufgaben • Shop • Achievements • Mini-Games
          </p>
        </motion.div>
      </div>
    </div>
  );
}
