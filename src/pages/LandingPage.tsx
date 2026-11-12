import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { AboutAndEvents } from '../components/AboutAndEvents';
import { MenuSection } from '../components/MenuSection';
import { Reviews } from '../components/Reviews';
import { ReservationForm } from '../components/ReservationForm';
import { Contact } from '../components/Contact';
import { PdfMenuModal } from '../components/PdfMenuModal';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [prefilledDish, setPrefilledDish] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectDishForReservation = (dishName: string) => {
    setPrefilledDish(dishName);
    const elem = document.getElementById('reservar');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. About Us & Events */}
      <AboutAndEvents />

      {/* Menu Section (Web Showcase) */}
      <MenuSection
        onOpenPdfMenu={() => navigate('/menu-pdf')}
        onSelectItemForReservation={handleSelectDishForReservation}
      />

      {/* 4. Customer Reviews (Google Reviews Simulation) */}
      <Reviews />

      {/* 5. Reserve a Table */}
      <ReservationForm prefilledDish={prefilledDish} />

      {/* 6. Contact Us */}
      <Contact />

      {/* PDF Modal */}
      <PdfMenuModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </>
  );
};

