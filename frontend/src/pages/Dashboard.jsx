import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export default function Dashboard() {
  const navigate = useNavigate();
  const childId = localStorage.getItem('childId');
  const childName = localStorage.getItem('childName');
  const dogId = localStorage.getItem('dogId');
  const dogName = localStorage.getItem('dogName');
  const dogBreed = localStorage.getItem('dogBreed');

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setError('Konnte Hund-Daten nicht laden');
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
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-emerald-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-emerald-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header mit Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">🐕 {dogName || 'Mein Hund'}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
            🎉 Willkommen, {childName}!
          </h2>

          <p className="text-center text-lg text-gray-700 mb-6">
            Dein neuer Freund <span className="font-bold text-green-600">{dogName}</span> ({dogBreed}) wartet auf dich! 
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-yellow-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Hunger</p>
              <p className="text-3xl font-bold text-yellow-600">
                {dog?.hunger || '-'}%
              </p>
            </div>
            <div className="bg-pink-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Freude</p>
              <p className="text-3xl font-bold text-pink-600">
                {dog?.happiness || '-'}%
              </p>
            </div>
            <div className="bg-red-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Gesundheit</p>
              <p className="text-3xl font-bold text-red-600">
                {dog?.health || '-'}%
              </p>
            </div>
            <div className="bg-purple-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Level</p>
              <p className="text-3xl font-bold text-purple-600">
                {dog?.level || '1'}
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            💡 Dieser Dashboard wird noch erweitert!<br />
            Die folgenden Features kommen bald:
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>✅ Aufgaben (Gassi gehen, Füttern, Spielen, Streicheln)</li>
            <li>✅ Shop (Items kaufen)</li>
            <li>✅ Achievements (Errungenschaften freischalten)</li>
            <li>✅ Mini-Games (Speichern & Puzzles)</li>
          </ul>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-8"
          >
            <p className="font-semibold">⚠️ Fehler</p>
            <p>{error}</p>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-100 rounded-2xl p-6 text-center"
        >
          <p className="text-lg text-blue-900 font-semibold">
            🚀 Phase 3 noch nicht komplett!
          </p>
          <p className="text-sm text-blue-800 mt-2">
            Das Dashboard wird in den nächsten Schritten mit Spielelementen, Aufgaben und Shop erweitert.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
