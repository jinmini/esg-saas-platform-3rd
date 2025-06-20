'use client';

import React, { useEffect, useRef, useState } from "react";

const PartnerSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: "Partner 1", logo: "P1" },
    { name: "Partner 2", logo: "P2" },
    { name: "Partner 3", logo: "P3" },
    { name: "Partner 4", logo: "P4" },
    { name: "Partner 5", logo: "P5" },
    { name: "Partner 6", logo: "P6" },
    { name: "Partner 7", logo: "P7" },
    { name: "Partner 8", logo: "P8" },
    { name: "Partner 9", logo: "P9" },
    { name: "Partner 10", logo: "P10" },
  ];

  return (
    <section className="py-16 bg-esg-black relative scroll-snap-section">
      <div className="absolute inset-0 bg-gradient-to-b from-esg-black to-esg-gray/30"></div>
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold mb-4">신뢰할 수 있는 파트너십</h2>
          <div className="w-16 h-1 bg-esg-blue mx-auto mb-3"></div>
          <p className="text-gray-400">저희와 함께하는 글로벌 기업들을 만나보세요</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className={`h-16 bg-esg-gray/30 rounded-md flex items-center justify-center backdrop-blur-sm border border-white/10 hover:border-esg-blue/50 transition-all duration-300 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <span className="text-gray-400 font-medium">{partner.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection; 