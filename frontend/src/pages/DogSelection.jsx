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

  // Verfügbare Hundrassen mit deutschen Namen und Beschreibungen
  const breeds = [
    {
      id: 1,
      dbName: 'Deutscher Schäferhund',
      germanName: 'Deutscher Schäferhund',
      emoji: '🐕',
      description: 'Intelligent und treu. Ein großartiger Beschützer!',
      characteristics: 'Stark, klug, loyal',
    },
    {
      id: 2,
      dbName: 'Labrador',
      germanName: 'Labrador',
      emoji: '🐕',
      description: 'Freundlich und verspielt. Perfekt für Abenteuer!',
      characteristics: 'Freundlich, energisch, liebevoll',
    },
    {
      id: 3,
      dbName: 'Golden Retriever',
      germanName: 'Golden Retriever',
      emoji: '🐕',
      description: 'Der goldene Begleiter. Super gutes Wesen!',
      characteristics: 'Sanft, intelligent, zärtlich',
    },
    {
      id: 4,
      dbName: 'Dackel',
      germanName: 'Dackel',
      emoji: '🐕‍🦺',
      description: 'Klein aber oho! Mutig und lustig. ❤️',
      characteristics: 'Klein, mutig, witzig',
    },
    {
      id: 5,
      dbName: 'Beagle',
      germanName: 'Beagle',
      emoji: '🐕',
      description: 'Neugierig und verspielt. Ständig auf Schnüffel-Tour!',
      characteristics: 'Neugierig, lebendig, süß',
    },
    {
      id: 6,
      dbName: 'Pudel',
      germanName: 'Pudel',
      emoji: '🐩',
      description: 'Elegant und intelligent. Ein modischer Freund!',
      characteristics: 'Intelligent, elegant, gehorsam',
    },
    {
      id: 7,
      dbName: 'Husky',
      germanName: 'Husky',
      emoji: '🐕',
      description: 'Wunderschöne blaue Augen. Super aktiv!',
      characteristics: 'Aktiv, wach, unabhängig',
    },
    {
      id: 8,
      dbName: 'Englische Bulldogge',
      germanName: 'Englische Bulldogge',
      emoji: '🐕',
      description: 'Gemütlich und kuschelig. Der perfekte Chill-Partner!',
      characteristics: 'Ruhig, liebevoll, stur',
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
        // Speichere dog-Daten
        localStorage.setItem('dogId', response.data.dog.id);
        localStorage.setItem('dogBreed', response.data.dog.breed);
        localStorage.setItem('dogName', response.data.dog.dog_name);

        // Weiterleitung zum Dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Hund konnte nicht erstellt werden. Versuche es nochmal!';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold text-blue-600 mb-2">🐕 Wähle deinen Hund!</h1>
          <p className="text-xl text-gray-700">
            Hallo <span className="font-bold text-purple-600">{childName}</span>! Welcher Hund soll dein neuer Freund sein?
          </p>
        </motion.div>

        {/* Breed Selection Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {breeds.map((breed) => (
            <motion.div
              key={breed.id}
              variants={itemVariants}
              onClick={() => handleSelectBreed(breed)}
              className={`cursor-pointer rounded-2xl p-6 transition transform hover:scale-105 ${
                selectedBreed?.id === breed.id
                  ? 'bg-blue-500 text-white shadow-2xl scale-105'
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-2xl'
              }`}
            >
              <div className="text-center">
                {/* Emoji */}
                <div className="text-6xl mb-3">{breed.emoji}</div>

                {/* Breed Name */}
                <h3 className="text-lg font-bold mb-2">{breed.germanName}</h3>

                {/* Description */}
                <p className={`text-sm mb-3 ${selectedBreed?.id === breed.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  {breed.description}
                </p>

                {/* Characteristics */}
                <p className={`text-xs font-semibold ${selectedBreed?.id === breed.id ? 'text-blue-200' : 'text-gray-500'}`}>
                  {breed.characteristics}
                </p>

                {/* Selected Badge */}
                {selectedBreed?.id === breed.id && (
                  <div className="mt-4 text-2xl">✅</div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Name Input Section */}
        {selectedBreed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Wie heißt dein {selectedBreed.germanName}?
            </h2>

            <form onSubmit={handleCreateDog} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name deines Hundes
                </label>
                <input
                  type="text"
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  placeholder={`z.B. Max, Bella, Rex...`}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  disabled={loading}
                  autoFocus
                  maxLength="255"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {dogName.length}/255 Zeichen
                </p>
              </div>

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
                disabled={loading || !dogName.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🔄 Erstelle meinen Hund...' : `🐕 ${selectedBreed.germanName} mitnehmen!`}
              </button>

              {/* Info Text */}
              <p className="text-xs text-center text-gray-600">
                💡 Du kannst den Namen später jederzeit ändern!
              </p>
            </form>
          </motion.div>
        )}

        {/* Help Text when no breed selected */}
        {!selectedBreed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10"
          >
            <p className="text-lg text-gray-700 bg-blue-100 rounded-xl p-6 inline-block">
              👆 Klick auf einen Hund oben, um ihn auszuwählen!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
