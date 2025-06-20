'use client';

import React, { useEffect, useRef, useState } from "react";

const CTASection: React.FC = () => {
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

  return (
    <section className="py-20 bg-esg-darkblue relative scroll-snap-section">
      <div className="absolute inset-0 bg-gradient-to-r from-esg-blue/20 to-transparent"></div>
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <div className={`bg-gradient-to-r from-esg-gray/30 to-esg-gray/10 backdrop-blur-md rounded-2xl p-8 md:p-12 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                성공을 위한 첫걸음, <br />
                <span className="text-esg-blue">지금 문의하세요</span>
              </h2>
              <p className="text-gray-300 mb-0 md:max-w-md">
                ESG 규제 대응을 위한 혁신적인 AI 솔루션에 대해 상담받고 싶으신가요? 지금 바로 연락주세요.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-esg-blue hover:bg-esg-lightblue transition-all px-8 py-3 rounded-lg text-white font-medium whitespace-nowrap">
                문의하기
              </button>
              <button className="border border-white/30 hover:border-white/70 transition-all px-8 py-3 rounded-lg text-white font-medium whitespace-nowrap">
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 