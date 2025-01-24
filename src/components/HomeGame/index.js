"use client";
import React, { useEffect, useState } from "react";
import KING from "@/public/Images/Icons/king.png";
import HEART from "@/public/Images/Icons/heart.png";
import Image from "next/image";

const HomeGame = () => {
  const [squareCount, setSquareCount] = useState(5);
  const [positions, setPositions] = useState([]);
  const [clickedPositions, setClickedPositions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [gainedAmount, setGainedAmount] = useState(null);
  const totalKings = 23;
  const totalHearts = 2;
  const investedAmount = 300;
  useEffect(() => {
    const totalCells = squareCount * squareCount;
    const randomPositions = new Set();

    while (randomPositions.size < totalKings) {
      randomPositions.add(Math.floor(Math.random() * totalCells));
    }

    while (randomPositions.size < totalKings + totalHearts) {
      randomPositions.add(Math.floor(Math.random() * totalCells));
    }

    setPositions(Array.from(randomPositions));
  }, []);

  const isHeartPostiton = (index) =>
    positions.slice(totalKings).includes(index);
  const isKingPostion = (index) =>
    positions.slice(0, totalKings).includes(index);

  const handleClick = (index) => {
    if (positions.slice(totalKings).includes(index)) {
      setClickedPositions((prev) => [...prev, ...positions]);
      setGainedAmount(0);
      setShowAll(true);
    } else if (!clickedPositions.includes(index)) {
      setClickedPositions((prev) => [...prev, index]);
      setGainedAmount((prev) => prev + investedAmount);
    }
  };

  const grid = Array.from({ length: squareCount }, (_, rowIndex) => (
    <div key={rowIndex} className="flex m-3 gap-3">
      {Array.from({ length: squareCount }, (_, colIndex) => {
        const cellIndex = rowIndex * squareCount + colIndex;
        return (
          <button
            key={colIndex}
            className={`flex items-center justify-center w-24 h-24 rounded-lg ${
              clickedPositions.includes(cellIndex) || showAll
                ? "bg-white"
                : "bg-primary hover:bg-primary/50"
            } transition-transform duration-200 ease-in-out transform hover:scale-110`}
            onClick={() => {
              handleClick(cellIndex);
            }}
          >
            {(clickedPositions.includes(cellIndex) || showAll) &&
            isKingPostion(cellIndex) ? (
              <Image src={KING} alt="King Icon" className="w-16 h-16"/>
            ) : clickedPositions.includes(cellIndex) ||
              (showAll && isHeartPostiton(cellIndex)) ? (
              <Image src={HEART} alt="Heart Icon" className="w-16 h-16"/>
            ) : null}
          </button>
        );
      })}
    </div>
  ));
  return (
    <div className="flex flex-col bg-secondry full-height">
      <div>
        <div>{grid}</div>
        <div className="flex items-center justify-between w-full text-white font-semibold text-2xl">
          <div>Invested: {investedAmount}</div>
          <div>
            Profit:{" "}
            <span
              className={`${
                gainedAmount === 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {gainedAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGame;
