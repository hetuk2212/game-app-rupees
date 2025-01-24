"use client";
import HEROBANNER from "@/public/Images/Banners/hero-banner.jpg";
import Image from "next/image";
import AllGamesList from "../components/AllGamesList";
import HomeGame from "../components/HomeGame";

export default function Home() {
  return (
    <main>
      <HomeGame/>
      {/* <div
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${HEROBANNER.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="absolute top-1/3 left-8 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl px-6 sm:px-12 md:px-16 lg:px-20 py-4 flex flex-col justify-start">
          <div className="flex flex-wrap items-center justify-start gap-6 sm:gap-8 mb-8">
            <div className="flex relative">
              <span className="bg-green-500 absolute -left-6 top-2 p-1.5 rounded-full w-1 h-1 flex items-center justify-center shadow-lg shadow-green-500"></span>
              <div>
                <h3 className="text-sm sm:text-base font-bold">
                  Fast Withdrawals
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-400">
                  no more than 1 hour
                </p>
              </div>
            </div>
            <div className="flex relative">
              <span className="bg-green-500 absolute -left-6 top-2 p-1.5 rounded-full w-1 h-1 flex items-center justify-center shadow-lg shadow-green-500"></span>
              <div>
                <h3 className="text-sm sm:text-base font-bold">
                  Instant Payouts
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-400">
                  Earn and withdraw instantly
                </p>
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            MakeRupees – Online Game App in India
          </h1>
          <span className="w-1/3 sm:w-1/2 md:w-1/3 lg:w-1/2 border-b-2 border-red-500 mt-4"></span>
          <p className="text-lg font-semibold mt-6 sm:w-3/4 md:w-2/3 lg:w-1/2">
            MakeRupees offers an exciting opportunity to win real money while
            enjoying your favorite games. With quick payouts and seamless
            gameplay, it's the best platform for real money gaming in India.
            Join now and start winning!
          </p>
        </div>
      </div>
      <div className="py-16 md:px-20 px-5">
        <div className=" w-96">
          <h2 className="text-white text-2xl font-semibold">
            Popular Slots in India
          </h2>
          <span className="border-b-2 flex border-border w-32 mt-3"></span>
        </div>
          <AllGamesList/>
      </div> */}
    </main>
  );
}
