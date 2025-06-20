'use client';

import React, { useState, useEffect } from "react";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-esg-black/90 backdrop-blur-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white font-bold text-xl">
            WATCHDOG.CO
          </a>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm">
          <a href="#home" className="text-white hover:text-esg-blue transition-colors">홈</a>
          <a href="#features" className="text-white hover:text-esg-blue transition-colors">특징</a>
          <a href="#pricing" className="text-white hover:text-esg-blue transition-colors">가격</a>
          <a href="#faq" className="text-white hover:text-esg-blue transition-colors">FAQ</a>
        </nav>
        
        <div className="hidden md:flex">
          <button className="bg-esg-blue hover:bg-esg-lightblue transition-colors text-white px-5 py-2 rounded-md">
            문의하기
          </button>
        </div>
        
        <div className="md:hidden">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar; 