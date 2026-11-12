import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote, ThumbsUp, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/restaurantData';

export const Reviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cortes' | 'eventos'>('all');

  return (
    <section id="resenas" className="relative py-24 sm:py-32 bg-[#0c0c0c] text-white overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#EBFA00]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              Experiencias Reales en Chiquimula
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Lo que opinan nuestros <span className="gold-gradient-text">comensales</span>
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
              La satisfacción de cada familia y visitante es nuestro mayor galardón. Descubre por qué somos la elección número uno en el oriente.
            </p>
          </div>

          {/* Google Rating Hero Card */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-white/15 flex items-center gap-4 shrink-0 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
              {/* Google colored G */}
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white">4.9</span>
                <div className="flex text-[#EBFA00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EBFA00]" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-400">Basado en Google Maps Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Continuous Marquee Layout (Simulating Google Reviews) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0c0c0c] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0c0c0c] to-transparent z-20 pointer-events-none" />

        {/* Marquee Track 1 */}
        <div className="flex space-x-6 animate-marquee hover:[animation-play-state:paused] w-max">
          {[...REVIEWS, ...REVIEWS].map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[340px] sm:w-[420px] rounded-2xl glass-card p-6 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl shrink-0 group"
            >
              <div>
                {/* Header: Author & Google badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-11 h-11 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#EBFA00] transition-colors">
                        {review.author}
                      </h4>
                      <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-[#03AF45]" />
                        {review.role}
                      </p>
                    </div>
                  </div>

                  {/* Google Icon */}
                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-zinc-400 flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </span>
                </div>

                {/* Stars and Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#EBFA00]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EBFA00]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500">{review.date}</span>
                </div>

                {/* Highlight */}
                {review.highlight && (
                  <p className="text-xs font-bold text-white mb-2 italic">
                    "{review.highlight}"
                  </p>
                )}

                {/* Text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {review.text}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <ThumbsUp className="w-3 h-3 text-[#EBFA00]" />
                  Recomendado para familias
                </span>
                <span className="text-zinc-500">Google Maps</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review bottom link */}
      <div className="mt-12 text-center">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-[#EBFA00] transition-colors"
        >
          <span>Ver todas las reseñas en Google Maps</span>
          <span>→</span>
        </a>
      </div>

    </section>
  );
};

