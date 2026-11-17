import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { EventsSection } from '../components/EventsSection';
import { MenuSection } from '../components/MenuSection';
import { ReservationForm } from '../components/ReservationForm';
import { Contact } from '../components/Contact';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section');

  if (section === 'hero') {
    return <Hero />;
  }
  if (section === 'nosotros') {
    return <AboutSection />;
  }
  if (section === 'eventos') {
    return <EventsSection />;
  }
  if (section === 'menu-preview') {
    return <MenuSection onOpenPdfMenu={() => navigate('/menu-pdf')} />;
  }
  if (section === 'reservar') {
    return <ReservationForm />;
  }
  if (section === 'contacto') {
    return <Contact />;
  }

  return (
    <>
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
    </>
  );
};
