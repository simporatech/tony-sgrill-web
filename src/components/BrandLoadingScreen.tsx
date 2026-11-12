import React from 'react';
import { motion } from 'framer-motion';

/**
 * Minimalist Luxury Brand Loading Screen
 * Displays ONLY the subtly pulsing Tony's Grill logo on a deep charcoal background
 * while the initial database data is fetched from Supabase, preventing layout flash.
 */
export const BrandLoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] selection:bg-transparent"
    >
      {/* Subtle ambient warm ember bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#D90302]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Tony's Grill Logo with subtle breathing animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{
          opacity: [0.82, 1, 0.82],
          scale: [0.97, 1.03, 0.97],
          filter: [
            'drop-shadow(0 2px 14px rgba(217,3,2,0.35))',
            'drop-shadow(0 4px 26px rgba(217,3,2,0.65))',
            'drop-shadow(0 2px 14px rgba(217,3,2,0.35))',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: 'easeInOut',
        }}
        className="relative z-10"
      >
        <img
          src="/logo.png"
          alt="Tony's Grill"
          className="h-16 sm:h-20 w-auto object-contain select-none"
        />
      </motion.div>
    </motion.div>
  );
};
