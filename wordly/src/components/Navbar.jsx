export default function GameNavbar({setDisplayImg,playerName,gamesWon,gamesLost,totalGames}) {



    return (
      <nav className="bg-gray-900 text-white px-4 py-3 flex flex-col md:flex-row justify-between items-center shadow-lg">
      <div className="text-2xl font-bold tracking-wide text-yellow-400 mb-2 md:mb-0">
        Game Stats
      </div>
    
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm md:text-base mb-2 md:mb-0">
        <div className="flex items-center space-x-2">
          <span className="text-gray-300">🏆 Win:</span>
          <span className="font-semibold text-yellow-400">{gamesWon}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-300">😥 Lose:</span>
          <span className="font-semibold text-yellow-400">{gamesLost}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-300">🎮 Total Games:</span>
          <span className="font-semibold text-blue-400">{totalGames}</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <span
            onClick={() => setDisplayImg(true)}
            className="text-gray-300 hover:font-semibold"
          >
            ℹ️ Game Instructions
          </span>
        </div>
      </div>
    
      <div className="flex items-center space-x-3">
        <img
          src="/avatar.png"
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-yellow-400"
        />
        <span className="font-semibold">{playerName}</span>
      </div>
    </nav>
    );
  }
  