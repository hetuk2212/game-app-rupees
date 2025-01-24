"use client";
import Image from "next/image";
import React from "react";
import GAME1 from "@/public/Images/Games/game1.jpg";
import GAME2 from "@/public/Images/Games/game2.jpg";
import GAME3 from "@/public/Images/Games/game3.jpg";
import GAME4 from "@/public/Images/Games/game1.jpg";
import GAME5 from "@/public/Images/Games/game2.jpg";
import GAME6 from "@/public/Images/Games/game3.jpg";

const gameData = [
  { id: 1, title: "Mine Kings", image: GAME1 },
  { id: 2, title: "Treasure Hunt", image: GAME2 },
  { id: 3, title: "Gold Digger", image: GAME3 },
  { id: 4, title: "Diamond Quest", image: GAME4 },
  { id: 5, title: "Pirate Bay", image: GAME5 },
  { id: 6, title: "Hidden Gems", image: GAME6 },
];

const AllGamesList = () => {
  return (
    <div className="py-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {gameData.map((game) => (
        <div
          key={game.id}
          className="bg-white flex flex-col items-center rounded-lg p-4"
        >
          <h2 className="text-black text-xl font-semibold text-center">
            {game.title}
          </h2>
          <Image
            src={game.image}
            alt={game.title}
            className="h-44  mt-2 object-cover"
            width={320}
            height={200}
          />
          <button className="bg-primary text-white my-4 w-full p-3 text-lg font-semibold rounded-lg hover:bg-secondry hover:font-bold hover:scale-105 transition-transform duration-300">
            Play
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllGamesList;
