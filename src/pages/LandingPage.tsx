import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { EventsSection } from '../components/EventsSection';
import { MenuSection } from '../components/MenuSection';
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
      <MenuSection onOpenPdfMenu={() => navigate('/menu-pdf')} />

      {/* 5. Contact & Location */}
      <Contact />
    </>
  );
};
