'use client';

import React, { useEffect, useRef, useState } from "react";

interface Benefit {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const BenefitCard: React.FC<{
  benefit: Benefit;
  index: number;
}> = ({ benefit, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`rounded-lg p-6 transition-all duration-500 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
      style={{ 
        animationDelay: `${index * 0.2}s`,
        background: `linear-gradient(45deg, ${benefit.color}20, transparent)`
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-12 h-12 flex items-center justify-center rounded-full"
          style={{ backgroundColor: `${benefit.color}30` }}
        >
          <span dangerouslySetInnerHTML={{ __html: benefit.icon }} className="text-2xl"></span>
        </div>
        <h3 className="text-xl font-semibold">{benefit.title}</h3>
      </div>
      <p className="text-gray-400">{benefit.description}</p>
    </div>
  );
};

const BenefitsSection: React.FC = () => {
  const benefits: Benefit[] = [
    {
      title: "비용 효율성",
      description: "자동화된 솔루션으로 ESG 규제 대응 비용 최대 40% 절감",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
      color: "#FFD700"
    },
    {
      title: "실시간 모니터링",
      description: "ESG 데이터 실시간 수집 및 모니터링으로 신속한 리스크 대응",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
      color: "#4CAF50"
    },
    {
      title: "규제 준수",
      description: "최신 ESG 규제 프레임워크에 자동 적응하는 지능형 시스템",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      color: "#3B82F6"
    }
  ];

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
    <section className="py-20 bg-esg-gray/20 scroll-snap-section">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4">우리의 서비스가 제공하는 혜택</h2>
          <div className="w-20 h-1 bg-esg-blue mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ESG 규제 대응을 위한 생성형 AI 솔루션이 제공하는 핵심 혜택을 살펴보세요.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 