'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 pb-16 overflow-hidden scroll-snap-section">
      <div className="absolute inset-0 bg-gradient-to-b from-esg-gray/50 to-esg-black z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className={`w-full md:w-1/2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">ESG 규제 대응을 위한</span>
              <span className="block text-esg-blue">생성형 AI 솔루션</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              ESG 규제 대응을 위한 생성형 AI 솔루션으로 효율적인 ESG 규제 대응과 지속 가능한 성장을 지원합니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <button className="bg-esg-blue hover:bg-esg-lightblue transition-colors px-8 py-3 rounded-md text-white font-medium">
                  지금 시작하기
                </button>
              </Link>
              <button className="border border-white/30 hover:border-white px-8 py-3 rounded-md text-white font-medium">
                자세히 알아보기
              </button>
            </div>
          </div>
          
          <div className={`w-full md:w-1/2 mt-12 md:mt-0 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
            <div className="relative">
              <div className="bg-gradient-to-r from-esg-blue/20 to-transparent absolute inset-0 rounded-xl"></div>
              <div className="animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1080&auto=format&fit=crop" 
                  alt="ESG AI Platform" 
                  className="rounded-xl shadow-2xl shadow-esg-blue/20 max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 