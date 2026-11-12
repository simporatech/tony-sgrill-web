import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Tag, 
  Calendar, 
  ArrowRight, 
  Check, 
  Wine, 
  Coffee, 
  UtensilsCrossed, 
  Pizza, 
  Soup, 
  Egg,
  Send,
  Share2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PromoCardData {
  id: string;
  icon: any;
  emoji: string;
  badge: string;
  badgeColor: string;
  title: string;
  highlightPrice: string;
  schedule: string;
  description: string;
  terms: string;
  colSpan: string; // for Bento grid styling
  accentColor: string;
  accentGlow: string;
  popular?: boolean;
}

export const PromosPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promos: PromoCardData[] = [
    {
      id: 'desayuno-super',
      icon: Egg,
      emoji: '🍳',
      badge: 'Lunes a Viernes',
      badgeColor: '#D90302',
      title: 'Desayuno Súper 2xQ59',
      highlightPrice: '2x Q59',
      schedule: 'Lunes a Viernes (Consumo en Restaurante)',
      description: 'Inicia tus mañanas en grande: dos desayunos completos con huevos al gusto, frijoles volteados de la casa, plátanos dulces, queso fresco chiquimulteco, crema artesanal, pan tostado y café caliente de altura.',
      terms: 'Válido exclusivamente para consumo en mesas del restaurante de 7:00 AM a 11:30 AM.',
      colSpan: 'lg:col-span-8',
      accentColor: '#D90302',
      accentGlow: 'rgba(217, 3, 2, 0.25)',
      popular: true,
    },
    {
      id: 'huevos-loroco',
      icon: Sparkles,
      emoji: '🍳',
      badge: 'Toque Chiquimulteco',
      badgeColor: '#03AF45',
      title: 'Huevos con Loroco',
      highlightPrice: '+Q5 Omelet',
      schedule: 'Todos los días desde las 7:00 AM',
      description: 'Huevos de granja revueltos suavemente con auténtico loroco fresco regional salteado en mantequilla. ¡Pídelo preparado en Omelet dorado por solo +Q5 adicionales!',
      terms: 'Incluye guarnición tradicional de frijoles, plátanos y queso de la región.',
      colSpan: 'lg:col-span-4',
      accentColor: '#03AF45',
      accentGlow: 'rgba(3, 175, 69, 0.25)',
    },
    {
      id: 'caldo-res',
      icon: Soup,
      emoji: '🍲',
      badge: 'Sólo Domingos',
      badgeColor: '#EBFA00',
      title: 'Caldo de Res Tradicional',
      highlightPrice: 'Especial Dominical',
      schedule: 'Domingos Familiares desde las 11:30 AM',
      description: 'Nuestra legendaria receta dominical: tazón humeante de carne suave cocida a fuego lento con elote tierno, yuca, güisquil, repollo y hierbabuena fresca. Servido con arroz y chirmol asado.',
      terms: 'Hasta agotar existencias dominicales. Ideal para compartir en mesa familiar.',
      colSpan: 'lg:col-span-5',
      accentColor: '#EBFA00',
      accentGlow: 'rgba(235, 250, 0, 0.25)',
      popular: true,
    },
    {
      id: 'lasana-2x1',
      icon: UtensilsCrossed,
      emoji: '🍝',
      badge: '2x1 Especial',
      badgeColor: '#D90302',
      title: '2x1 Lasaña Boloñesa',
      highlightPrice: '2x Q63',
      schedule: 'Almuerzos & Cenas Seleccionadas',
      description: '¡Doble porción de placer italiano! Capas abundantes de pasta fresca artesanal, salsa boloñesa con carne de res estofada, bechamel cremosa y gratín dorado de quesos mozzarella y parmesano.',
      terms: 'Pagas una lasaña y recibes la segunda gratis por solo Q63 en total.',
      colSpan: 'lg:col-span-7',
      accentColor: '#D90302',
      accentGlow: 'rgba(217, 3, 2, 0.25)',
    },
    {
      id: 'pizza-loroco',
      icon: Pizza,
      emoji: '🍕',
      badge: 'Edición Temporada',
      badgeColor: '#03AF45',
      title: 'Pizza de Loroco de Temporada',
      highlightPrice: 'Receta Exclusiva',
      schedule: 'Disponible todo el día al horno de leña',
      description: 'La consentida de la casa. Masa madre fermentada 48 horas, salsa blanca artesanal, mozzarella abundante y flores tiernas de loroco fresco recién traídas del campo chiquimulteco.',
      terms: 'Disponible por tiempo limitado durante la temporada de cosecha de loroco.',
      colSpan: 'lg:col-span-6',
      accentColor: '#03AF45',
      accentGlow: 'rgba(3, 175, 69, 0.25)',
      popular: true,
    },
    {
      id: 'duo-bebidas',
      icon: Wine,
      emoji: '☕ 🍷',
      badge: 'Dúo de Especialidad',
      badgeColor: '#EBFA00',
      title: 'Capuchino 2xQ29 | Sangría 2xQ49',
      highlightPrice: 'Doble Deleite',
      schedule: 'Tardes de Café & Noches de Brasa',
      description: 'Combina como prefieras tu momento Tony\'s: Dos Capuchinos con café espresso de altura y leche sedosa por Q29, o dos copas de Sangría de la Cava con vino tinto y frutas maceradas por solo Q49.',
      terms: 'Aplica en consumo individual o para compartir en tu visita.',
      colSpan: 'lg:col-span-6',
      accentColor: '#EBFA00',
      accentGlow: 'rgba(235, 250, 0, 0.25)',
    },
  ];

  const handleSharePromo = (promo: PromoCardData) => {
    const text = `¡Mira esta promo en Tony's Grill Chiquimula! ${promo.emoji} ${promo.title} (${promo.highlightPrice}) - ${promo.schedule}.`;
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
            const IconComponent = promo.icon;
            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`${promo.colSpan} group relative rounded-3xl p-7 sm:p-8 glass-panel border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl`}
                style={{
                  boxShadow: `0 10px 40px -15px ${promo.accentGlow}`,
                }}
              >
                {/* Glow accent corner */}
                <div 
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: promo.accentColor }}
                />

                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl sm:text-3xl p-2 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                        {promo.emoji}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-black shadow-md"
                        style={{ backgroundColor: promo.badgeColor }}
                      >
                        {promo.badge}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSharePromo(promo)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
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
                    <span 
                      className="text-xl sm:text-2xl font-black shrink-0 tracking-tight"
                      style={{ color: promo.badgeColor === '#EBFA00' ? '#EBFA00' : '#ffffff' }}
                    >
                      {promo.highlightPrice}
                    </span>
                  </div>

                  {/* Schedule line */}
                  <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 mb-4">
                    <Clock className="w-3.5 h-3.5 text-[#EBFA00]" />
                    <span>{promo.schedule}</span>
                  </p>

                  {/* Description */}
                  <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6">
                    {promo.description}
                  </p>
                </div>

                {/* Bottom Terms & Action Button */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-zinc-500 font-medium italic">
                    * {promo.terms}
                  </span>

                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(`Hola Tony's Grill, deseo consultar o aprovechar la promoción: ${promo.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shrink-0 cursor-pointer"
                    style={{ backgroundColor: promo.accentColor === '#03AF45' ? '#03AF45' : '#D90302' }}
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

        {/* Bottom Banner for Reservation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 sm:p-10 rounded-3xl glass-card border border-white/15 text-center flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#D90302]" />
              ¿Listo para disfrutar de estas promociones?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Visítanos en Zona 6 Las Lomas, Chiquimula o reserva tu mesa con antelación.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="/#reservar"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D90302] to-[#b00201] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#D90302]/30 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#EBFA00]" />
              <span>Reservar Mesa</span>
            </a>

            <a
              href="/menu"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 flex items-center justify-center gap-2"
            >
              <span>Ver Menú Web</span>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

