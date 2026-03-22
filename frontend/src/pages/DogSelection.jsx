import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../services/apiClient';

export default function DogSelection() {
  const navigate = useNavigate();
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [dogName, setDogName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const childId = localStorage.getItem('childId');
  const childName = localStorage.getItem('childName');

  const breeds = [
    {
      id: 1,
      dbName: 'Deutscher Schäferhund',
      germanName: 'Deutscher\nSchäferhund',
      emoji: '🐕',
      description: 'Intelligent und treu',
    },
    {
      id: 2,
      dbName: 'Labrador',
      germanName: 'Labrador',
      emoji: '🐕',
      description: 'Freundlich und verspielt',
    },
    {
      id: 3,
      dbName: 'Golden Retriever',
      germanName: 'Golden\nRetriever',
      emoji: '🐕',
      description: 'Sanft und liebevoll',
    },
    {
      id: 4,
      dbName: 'Dackel',
      germanName: 'Dackel',
      emoji: '🐕‍🦺',
      description: 'Klein aber mutig',
    },
    {
      id: 5,
      dbName: 'Beagle',
      germanName: 'Beagle',
      emoji: '🐕',
      description: 'Neugierig und lebendig',
    },
    {
      id: 6,
      dbName: 'Pudel',
      germanName: 'Pudel',
      emoji: '🐩',
      description: 'Elegant und gehorsam',
    },
    {
      id: 7,
      dbName: 'Husky',
      germanName: 'Husky',
      emoji: '🐕',
      description: 'Aktiv und wach',
    },
    {
      id: 8,
      dbName: 'Englische Bulldogge',
      germanName: 'Bulldogge',
      emoji: '🐕',
      description: 'Gemütlich und kuschelig',
    },
  ];

  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed);
    setError('');
  };

  const handleCreateDog = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedBreed) {
      setError('Bitte wähle eine Hundrasse aus!');
      return;
    }

    if (!dogName.trim()) {
      setError('Bitte gib deinem Hund einen Namen!');
      return;
    }

    if (dogName.trim().length < 2 || dogName.trim().length > 255) {
      setError('Der Name muss zwischen 2 und 255 Zeichen lang sein!');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/api/dogs', {
        childId: parseInt(childId),
        dogName: dogName.trim(),
        breed: selectedBreed.dbName,
      });

      if (response.data.success) {
        localStorage.setItem('dogId', response.data.dog.id);
        localStorage.setItem('dogBreed', response.data.dog.breed);
        localStorage.setItem('dogName', response.data.dog.dog_name);

        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Hund konnte nicht erstellt werden!';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Wähle deinen Hund</h1>
          <p className="text-slate-300">
            Hallo <span className="text-amber-200 font-semibold">{childName}</span>! Welcher Freund soll es sein?
          </p>
        </motion.div>

        {/* Breed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {breeds.map((breed, idx) => (
            <motion.button
              key={breed.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleSelectBreed(breed)}
              className={`p-4 rounded-lg transition ${
                selectedBreed?.id === breed.id
                  ? 'bg-blue-600 border-2 border-blue-400 scale-105'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-4xl mb-2">{breed.emoji}</div>
              <h3 className="text-sm font-bold text-white whitespace-pre-line leading-tight mb-1">
                {breed.germanName}
              </h3>
              <p className="text-xs text-slate-300">{breed.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Name Input Section */}
        {selectedBreed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md mx-auto mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Wie heißt dein {selectedBreed.germanName.replace(/\n/g, ' ')}?
            </h2>

            <form onSubmit={handleCreateDog} className="space-y-6">
              <input
                type="text"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="z.B. Max"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:bg-white/20 focus:border-white/40 transition text-white placeholder-slate-400"
                disabled={loading}
                autoFocus
                maxLength="255"
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/30 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading || !dogName.trim()}
                whileHover={{ opacity: dogName.trim() && !loading ? 0.9 : 1 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? '⏳ Erstelle Hund...' : 'Hund erstellen'}
              </motion.button>
            </form>
          </motion.div>
        )}

        {!selectedBreed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10">
            <p className="text-slate-300 bg-white/10 rounded-lg p-4 inline-block">
              ☝️ Klick auf einen Hund, um ihn auszuwählen
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
