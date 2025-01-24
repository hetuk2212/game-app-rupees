"use client";
import React, { useEffect, useRef, useState } from "react";
import LOGO from "@/public/Images/Icons/logo.png";
import USERICON from "@/public/Images/Icons/user.png";
import DOWNICON from "@/public/Images/Icons/down.png";
import WALLETICON from "@/public/Images/Icons/wallet.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Header = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  console.log("u", userData);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    setToken(userToken);
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    router.push("/login");
  };

  return (
    <div className="bg-primary fixed top-0 left-0 right-0 w-full py-4 md:px-24 px-5 flex items-center justify-between z-50">
      <Link href="/" className="flex items-center gap-4">
        <Image src={LOGO} alt="Game App" className="w-10 h-10" />
        <h1 className="text-white text-2xl font-semibold">Game App</h1>
      </Link>
      {/* onClick={() => setIsDropdownOpen((prev) => !prev)} */}
      {token ? (
        <div className="flex items-center gap-4">
          <Link href="/Wallet">
            <Image src={WALLETICON} alt="Wallet Icon" className="w-6 h-6"/>
          </Link>
          <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 border border-gray-500 py-1 px-2 rounded-full"
          >
            <Image src={USERICON} alt="User Icon" className="w-6 h-6" />
            <h2 className="text-white font-semibold text-lg">
              {userData.firstName}
            </h2>
            <Image src={DOWNICON} alt="User Icon" className="w-6 h-6" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => router.push("/Profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
          </div>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-2 border border-gray-500 rounded-lg py-2 px-4"
          onClick={() => {}}
        >
          <Image src={USERICON} alt="Game App" className="w-6 h-6" />
          <h3 className="text-white text-xl font-semibold">Login</h3>
        </Link>
      )}
    </div>
  );
};

export default Header;
