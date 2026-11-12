import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { EventsSection } from '../components/EventsSection';
import { MenuSection } from '../components/MenuSection';
import { ReservationForm } from '../components/ReservationForm';
import { Contact } from '../components/Contact';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Us */}
      <AboutSection />

      {/* 3. Events & Banquets */}
      <EventsSection />

      {/* 4. Menu Showcase */}
      <MenuSection
        onOpenPdfMenu={() => navigate('/menu-pdf')}
      />

      {/* 5. Reservation Form */}
      <ReservationForm />

      {/* 6. Contact & Location */}
      <Contact />
    </div>
  );
};
