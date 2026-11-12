import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  Tag, 
  ArrowRight, 
  Check, 
  Send,
  Share2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useCmsData, CmsPromoItem } from '../context/CmsContext';

export const PromosPage: React.FC = () => {
  const { data } = useCmsData();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promos = data.promos;

  const getColSpan = (index: number) => {
    const pattern = ['lg:col-span-8', 'lg:col-span-4', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6'];
    return pattern[index % pattern.length];
  };

  const handleSharePromo = (promo: CmsPromoItem) => {
    const text = `¡Mira esta promo en Tony's Grill Chiquimula! ${promo.emoji || '🔥'} ${promo.title} (${promo.highlightPrice}) - ${promo.schedule}.`;
    navigator.clipboard.writeText(text);
    setCopiedId(promo.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-24 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D90302]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#EBFA00]/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#03AF45]/8 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-4 shadow-lg backdrop-blur-md"
          >
            <Tag className="w-3.5 h-3.5 fill-[#EBFA00]" />
            Promociones Oficiales • Tony's Grill
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Sabor Excepcional a <br />
            <span className="gold-gradient-text">Precios Irresistibles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Explora las ofertas activas en nuestro restaurante de Chiquimula. Diseñadas para disfrutar en familia, con amigos o en tus mañanas y fines de semana especiales.
          </motion.p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {promos.map((promo, index) => {
            const colSpan = getColSpan(index);
            const accentColor = promo.accentColor || '#D90302';
            const badgeColor = promo.badgeColor || '#D90302';
            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`${colSpan} group relative rounded-3xl p-7 sm:p-8 glass-panel border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl`}
                style={{
                  boxShadow: `0 10px 40px -15px ${accentColor}40`,
                }}
              >
                {/* Glow accent corner */}
                <div 
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: accentColor }}
                />

                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl sm:text-3xl p-2 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                        {promo.emoji || '🔥'}
                      </span>
                      {promo.badge && (
                        <span 
                          className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-black shadow-md"
                          style={{ backgroundColor: badgeColor }}
                        >
                          {promo.badge}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleSharePromo(promo)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copiar detalles de la promo"
                    >
                      {copiedId === promo.id ? (
                        <Check className="w-4 h-4 text-[#03AF45]" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Title & Price */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#EBFA00] transition-colors">
                      {promo.title}
                    </h2>
                    {promo.highlightPrice && (
                      <span 
                        className="text-xl sm:text-2xl font-black shrink-0 tracking-tight"
                        style={{ color: badgeColor === '#EBFA00' ? '#EBFA00' : '#ffffff' }}
                      >
                        {promo.highlightPrice}
                      </span>
                    )}
                  </div>

                  {/* Schedule line */}
                  {promo.schedule && (
                    <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 mb-4">
                      <Clock className="w-3.5 h-3.5 text-[#EBFA00]" />
                      <span>{promo.schedule}</span>
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6">
                    {promo.description}
                  </p>
                </div>

                {/* Bottom Terms & Action Button */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-zinc-500 font-medium italic">
                    {promo.terms ? `* ${promo.terms}` : '* Válido por tiempo limitado.'}
                  </span>

                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(`Hola Tony's Grill, deseo consultar o aprovechar la promoción: ${promo.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shrink-0 cursor-pointer"
                    style={{ backgroundColor: accentColor === '#03AF45' ? '#03AF45' : '#D90302' }}
                  >
                    <Send className="w-3.5 h-3.5 text-[#EBFA00]" />
                    <span>Aprovechar Promo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#18181b] via-[#121214] to-[#18181b] border border-white/10 text-center relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              ¿Deseas una promo para tu evento o grupo grande?
            </h3>
            <p className="text-sm text-zinc-400 font-light mb-6">
              Creamos paquetes y menús personalizados para empresas, cumpleaños y reuniones familiares con tarifas exclusivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#reservar"
                className="px-8 py-3.5 rounded-full bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#D90302]/30"
              >
                Reservar Mesa
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent("Hola Tony's Grill, me gustaría cotizar una propuesta especial para un evento.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span>Cotizar con Asesor</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EBFA00]" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
