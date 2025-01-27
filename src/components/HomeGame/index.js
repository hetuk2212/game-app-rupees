"use client";
import React, { useEffect, useState } from "react";
import KING from "@/public/Images/Icons/king.png";
import HEART from "@/public/Images/Icons/heart.png";
import RUPEE from "@/public/Images/Icons/rupee.png";
import Image from "next/image";
import { Howl } from "howler";

const HomeGame = () => {
  const [squareCount, setSquareCount] = useState(5);
  const [positions, setPositions] = useState([]);
  const [clickedPositions, setClickedPositions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [gainedAmount, setGainedAmount] = useState(null);
  const [btnValue, setBtnValue] = useState("manual");
  const totalKings = 23;
  const totalHearts = 2;
  const investedAmount = 300;

  const clickSound = new Howl({
    src: ["/sounds/click.mp3"],
  });

  const lossSound = new Howl({
    src: ["/sounds/loss.mp3"],
  });

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
      lossSound.play();
      setClickedPositions((prev) => [...prev, ...positions]);
      setGainedAmount(0);
      setShowAll(true);
    } else if (!clickedPositions.includes(index)) {
      clickSound.play();
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
              <Image src={KING} alt="King Icon" className="w-16 h-16" />
            ) : clickedPositions.includes(cellIndex) ||
              (showAll && isHeartPostiton(cellIndex)) ? (
              <Image src={HEART} alt="Heart Icon" className="w-16 h-16" />
            ) : null}
          </button>
        );
      })}
    </div>
  ));
  return (
    <div className="flex flex-col bg-secondry full-height ">
      <div className="bg-primary/30 shadow-sm  rounded-lg flex items-start">
        <div className="p-2">
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
        <div className="bg-primary rounded-r-lg px-3 py-2 h-full ">
          <div className="bg-secondry text-white font-semibold text-lg p-2 flex items-center gap-3 rounded-full">
            <button
              className={`px-10 py-2 ${
                btnValue === "manual"
                  ? "bg-primary rounded-full"
                  : "bg-transparent"
              }`}
              onClick={() => setBtnValue("manual")}
            >
              Manual
            </button>
            <button
              className={`px-10 py-2 ${
                btnValue === "auto"
                  ? "bg-primary rounded-full"
                  : "bg-transparent"
              }`}
              onClick={() => setBtnValue("auto")}
            >
              Auto
            </button>
          </div>
          <div>
            <span className="flex items-center justify-between text-gray-300 font-medium mt-5">
              <p>Bet Amount</p>
              <p>₹0.00</p>
            </span>
            <div className="flex items-center shadow-xl bg-secondry/20 mt-1 rounded-md py-1 px-2 gap-2">
              <div className="bg-secondry flex items-center p-1 flex-[4]">
                <input
                  placeholder="0.00"
                  className="bg-secondry outline-none text-white text-sm p-1 w-full"
                />
                <Image src={RUPEE} alt="icon" className="w-5 h-5 ml-2" />
              </div>
              <div className="flex items-center text-gray-300 font-medium gap-2 flex-[1] justify-end">
                <p className="text-sm">1/2</p>
                <p className="text-secondary font-semibold text-xl">|</p>
                <p className="text-sm">2x</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="flex items-center justify-between text-gray-300 font-medium">
              <p>Mines</p>
            </span>
            <div className="mt-1 shadow-xl bg-secondry/20 p-1 rounded-md">
              <select
                className="w-full p-2 rounded-md bg-secondry  text-gray-200 outline-none"
                defaultValue="1"
              >
                {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="bg-btnBg w-full flex items-center justify-center py-3 mt-3  rounded-lg text-lg  font-semibold">
            Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeGame;
