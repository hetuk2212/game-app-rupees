"use client";
import React, { useState } from "react";
import RIGHTICON from "@/public/Images/Icons/right.png";
import Image from "next/image";
import Link from "next/link";

const Wallet = () => {
  const [btnValue, setBtnValue] = useState("addMoney");
  return (
    <div className="mt-24 px-24">
      <div className="border-b border-gray-500 pb-2">
        <h1 className="text-white text-xl font-semibold">INR Balance</h1>
        <span className="border-b-4 flex border-border w-16 mt-1 rounded-lg"></span>
      </div>

      <div className="flex items-start gap-3 mt-10">
        <div className="w-4/6 border border-gray-500  rounded-lg">
          <div className="py-8 px-6">
            <p className="text-white text-sm font-semibold">For Play Games,</p>
            <h2 className="text-4xl text-white font-semibold">
              ₹0.<span className="text-sm">00</span>
            </h2>
          </div>
          <span className="border-b flex border-gray-500"></span>
          <div className="py-8 px-6 flex items-center justify-between">
            <p className="text-white text-lg font-semibold">Used balance</p>
            <p className="text-white text-lg font-semibold"> ₹0.00</p>
          </div>
          <span className="border-b flex border-gray-500"></span>
          <Link
            href="/Transactions"
            className="py-8 px-6 flex items-center justify-between"
          >
            <p className="text-white text-lg font-semibold">All transactions</p>
            <Image src={RIGHTICON} alt="Right Icon" className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-2/6 border border-gray-500  rounded-lg">
          <div className="pt-8 px-6 border-b border-gray-500 flex items-center">
            <button
              className={`text-xl font-semibold text-white ${
                btnValue === "addMoney"
                  ? "border-b-4 border-border"
                  : "border-b-4 border-transparent"
              } pb-2 px-2`}
              onClick={() => {
                setBtnValue("addMoney");
              }}
            >
              Add money
            </button>
            <button
              className={`text-xl font-semibold text-white ${
                btnValue === "withdraw"
                  ? "border-b-4 border-border"
                  : "border-b-4 border-transparent"
              } pb-2 px-2`}
              onClick={() => {
                setBtnValue("withdraw");
              }}
            >
              Withdraw
            </button>
          </div>
          {btnValue === "addMoney" && (
            <div className="py-8 px-6 flex items-center justify-between">
              <p className="text-white font-medium">Enter Amount</p>
              <input placeholder="0" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
