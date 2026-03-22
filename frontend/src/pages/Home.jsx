/**
 * Home Page - Welcome / Login Screen
 */

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-pink-100 p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-4">🐕 Happy</h1>
        <p className="text-2xl text-gray-700 mb-8">Mein virtueller Hund</p>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <p className="text-lg text-gray-600 mb-6">
            Willkommen zum Happy-Spiel! Hier kannst du dir einen Hund aussuchen und dich um ihn kümmern.
          </p>
          
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg mb-3">
            Neues Profil
          </button>
          
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg">
            Anmelden
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-8">
          🐾 Kümmere dich um deinen Hund und sammle Knochen! 🦴
        </p>
      </div>
    </div>
  )
}

export default Home

