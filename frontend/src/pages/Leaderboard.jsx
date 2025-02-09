import { useState } from "react";
"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Import the profile icon

const Leaderboard = () => {
  const [players] = useState([
    {
      rank: 1,
      name: "NinjaWarrior",
      totalWins: 342,
      winRate: "68%",
      totalPrize: "$980,000",
      country: "USA",
      team: "Cloud9",
      gamesPlayed: 502,
      killDeathRatio: "2.8",
      recentForm: "W W W L W",
      preferredGame: "Valorant",
      tournamentWins: 15,
    },
    {
      rank: 2,
      name: "ProGamer123",
      totalWins: 315,
      winRate: "65%",
      totalPrize: "$850,000",
      country: "South Korea",
      team: "T1",
      gamesPlayed: 484,
      killDeathRatio: "2.6",
      recentForm: "W W L W W",
      preferredGame: "League of Legends",
      tournamentWins: 12,
    },
    {
      rank: 3,
      name: "ShadowMaster",
      totalWins: 290,
      winRate: "60%",
      totalPrize: "$730,000",
      country: "Germany",
      team: "G2 Esports",
      gamesPlayed: 480,
      killDeathRatio: "2.5",
      recentForm: "L W W W W",
      preferredGame: "CS:GO",
      tournamentWins: 10,
    },
    {
      rank: 4,
      name: "SniperElite",
      totalWins: 275,
      winRate: "58%",
      totalPrize: "$650,000",
      country: "Sweden",
      team: "Fnatic",
      gamesPlayed: 470,
      killDeathRatio: "2.3",
      recentForm: "W L W W L",
      preferredGame: "Call of Duty",
      tournamentWins: 8,
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2e] to-[#0f1119] p-6 font-roboto">
      <div className="max-w-6xl mx-auto mt-15">
        <div className="bg-[#242738] rounded-xl shadow-2xl p-6 mt-20">
          <div className="grid grid-cols-12 gap-4 text-[#8a8d9e] text-sm font-semibold mb-4 px-4">
            <div className="col-span-1">Rank</div>
            <div className="col-span-2">Player</div>
            <div className="col-span-1">Team</div>
            <div className="col-span-1">Games</div>
            <div className="col-span-1 text-center">K/D</div>
            <div className="col-span-2 text-center">Recent Form</div>
            <div className="col-span-2 text-center">Main Game</div>
            <div className="col-span-2 text-center">Prize Money</div>
          </div>

          {players.map((player) => (
            <div
              key={player.rank}
              className="grid grid-cols-12 gap-4 items-center bg-[#2a2d42] rounded-lg p-4 mb-3 transition-all hover:transform hover:scale-[1.02] hover:bg-[#31354d]"
            >
              <div className="col-span-1">
                <span
                  className={`inline-block w-8 h-8 rounded-full ${
                    player.rank === 1
                      ? "bg-[#ffd700]"
                      : player.rank === 2
                      ? "bg-[#c0c0c0]"
                      : player.rank === 3
                      ? "bg-[#cd7f32]"
                      : "bg-[#2a2d42]"
                  } text-center leading-8 text-white font-bold`}
                >
                  {player.rank}
                </span>
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <FaUserCircle className="w-10 h-10 text-gray-400" /> {/* Profile Icon */}
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{player.name}</span>
                  <span className="text-xs text-[#8a8d9e]">{player.team}</span>
                </div>
              </div>

              <div className="col-span-1 text-center text-white">{player.team}</div>
              <div className="col-span-1 text-center text-white">{player.gamesPlayed}</div>
              <div className="col-span-1 text-center">
                <span className="px-2 py-1 bg-[#3d4257] rounded-full text-[#00ff9d]">
                  {player.killDeathRatio}
                </span>
              </div>

              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  {player.recentForm.split(" ").map((result, index) => (
                    <span
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        result === "W"
                          ? "bg-[#2ecc71] text-white"
                          : "bg-[#e74c3c] text-white"
                      }`}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-white">{player.preferredGame}</span>
                <div className="text-xs text-[#8a8d9e]">
                  {player.tournamentWins} tournaments
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-[#00ff9d] font-bold">
                  {player.totalPrize}
                </span>
                <div className="text-xs text-[#8a8d9e]">
                  Win Rate: {player.winRate}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[#8a8d9e]">
          <p>Rankings updated daily | All games combined</p>
          <p className="mt-2 text-xs">Total prize pool tracked: $3,780,000</p>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;