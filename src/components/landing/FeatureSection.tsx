'use client';

import React, { useEffect, useRef, useState } from "react";

const FeatureCard: React.FC<{
  title: string;
  description: string;
  imageSrc: string;
  index: number;
}> = ({ title, description, imageSrc, index }) => {
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
      className={`bg-esg-gray/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-esg-blue/10 transition-all duration-300 transform hover:-translate-y-1 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-xs text-esg-blue">더보기 →</span>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      title: "솔루션과 클라우드를 제공합니다",
      description: "모든 기업의 ESG 데이터 수집, 분석, 리포팅을 자동화하고 최적화합니다.",
      imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "멀티플 서비스를 제공합니다",
      description: "다양한 규제 프레임워크에 맞는 맞춤형 ESG 분석을 제공합니다.",
      imageSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "스마트한 도구를 제공합니다",
      description: "생성형 AI를 활용한 ESG 리스크 예측 및 자동 보고서 생성 기능을 제공합니다.",
      imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60"
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
    <section id="features" className="py-20 scroll-snap-section bg-esg-black relative">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4">기능 소개</h2>
          <div className="w-20 h-1 bg-esg-blue mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            저희 플랫폼은 ESG 규제 대응을 위한 다양한 기능을 제공하여 기업의 지속가능한 성장을 지원합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 