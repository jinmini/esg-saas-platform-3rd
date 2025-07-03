'use client';

import NavBar from '@/components/landing/NavBar';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import PartnerSection from '@/components/landing/PartnerSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import ScrollToTop from '@/shared/ui/ScrollToTop';
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    // Set initial page title
    document.title = "ESG GenAI Compliance Platform";
    
    // Initialize intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the reveal-on-scroll class
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-esg-black text-white scroll-snap-container">
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <BenefitsSection />
      <PartnerSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
} 