import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Pizza, 
  Beef, 
  UtensilsCrossed, 
  Coffee, 
  Sandwich, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  CalendarCheck,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface AboutAndEventsProps {
  onOpenEventsQuote?: () => void;
}

export const AboutAndEvents: React.FC<AboutAndEventsProps> = () => {
  const [activeTab, setActiveTab] = useState<'cortes' | 'pizzas' | 'pastas' | 'hamburguesas' | 'desayunos'>('cortes');

  const specialties = [
    {
      id: 'cortes',
      title: 'Cortes a la Parrilla',
      icon: Beef,
      accent: '#D90302',
      tagline: 'Maduración Óptima & Sello de Brasa',
      description: 'Nuestra especialidad insignia. Seleccionamos cuidadosamente cortes Tomahawk, Ribeye, Picaña y Puyazo, asados lentamente a las brasas de carbón y leña aromática para lograr un sellado crujiente con un corazón jugoso e inolvidable.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
      badge: 'Orgullo Tony\'s'
    },
    {
      id: 'pizzas',
      title: 'Pizzas Artesanales',
      icon: Pizza,
      accent: '#EBFA00',
      tagline: 'Fermentación Lenta & Horno de Piedra',
      description: 'Masas elaboradas con harinas seleccionadas y fermentadas pacientemente por 48 horas. Salsa de tomates San Marzano, quesos fundentes y combinaciones clásicas e innovadoras cocinadas al calor de la leña.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
      badge: 'Horno de Leña'
    },
    {
      id: 'pastas',
      title: 'Pastas Frescas',
      icon: UtensilsCrossed,
      accent: '#03AF45',
      tagline: 'Tradición Italiana con Toque de Fuego',
      description: 'Fettuccine, ravioles y lasagnas amasados en casa. Salsas cremosas al dente, pomodoro casero y el maridaje exclusivo con cortes de carne a la parrilla que elevan cada bocado.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281728?auto=format&fit=crop&w=1000&q=80',
      badge: 'Elaboración Diaria'
    },
    {
      id: 'hamburguesas',
      title: 'Hamburguesas Gourmet',
      icon: Sandwich,
      accent: '#EBFA00',
      tagline: 'Blend Propio de Puyazo y Picaña',
      description: 'Carne molida a diario en nuestra cocina a partir de los mejores cortes. Servidas en pan brioche esponjoso y dorado a la mantequilla, con quesos artesanales y salsas de reducción propia.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
      badge: 'Sabor Brutal'
    },
    {
      id: 'desayunos',
      title: 'Desayunos Tradicionales',
      icon: Coffee,
      accent: '#D90302',
      tagline: 'El Alma y la Riqueza de Nuestra Tierra',
      description: 'Comienza tu mañana desde las 7:00 AM con auténticos desayunos guatemaltecos: frijoles colados, plátanos dulces, queso fresco chiquimulteco, crema artesanal, longanizas asadas y café de altura recién molido.',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80',
      badge: 'Desde las 7:00 AM'
    },
  ];

  const currentSpecialty = specialties.find(s => s.id === activeTab) || specialties[0];

  return (
    <section id="nosotros" className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#D90302]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#EBFA00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            Nuestra Esencia & Legado Familiar
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Restaurante familiar de referencia en <span className="text-[#D90302]">Chiquimula</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            Especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales. Un punto de encuentro donde la pasión por el fuego y el cariño por nuestra gente se viven en cada plato.
          </p>
        </div>

        {/* Interactive Specialties Tabs */}
        <div className="mb-20">
          {/* Tab buttons */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {specialties.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D90302] to-[#b00201] text-white shadow-lg shadow-[#D90302]/30 scale-[1.02]'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#EBFA00]' : 'text-zinc-400'}`} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Specialty Showcase Card */}
          <motion.div
            key={currentSpecialty.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 glass-panel rounded-3xl overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
          >
            {/* Image side */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[340px] overflow-hidden group">
              <img
                src={currentSpecialty.image}
                alt={currentSpecialty.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D90302] text-white shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#EBFA00]" />
                  {currentSpecialty.badge}
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#121212] to-[#0c0c0c]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EBFA00]">
                  {currentSpecialty.tagline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 mb-4">
                  {currentSpecialty.title}
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {currentSpecialty.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#03AF45] shrink-0" />
                    <span>Ingredientes frescos y proveedores locales selectos</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#03AF45] shrink-0" />
                    <span>Preparación al momento con técnicas de alta cocina</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#03AF45] shrink-0" />
                    <span>Porciones generosas para disfrutar en familia o amigos</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#EBFA00] transition-colors"
                >
                  <span>Explorar en el menú</span>
                  <ChevronRight className="w-4 h-4 text-[#D90302]" />
                </a>

                <a
                  href="#reservar"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all"
                >
                  Probar hoy
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* DEDICATED VISUAL BLOCK: SERVICIO DE BANQUETES & EVENTOS */}
        {/* ======================================================== */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#141414] to-[#0c0c0c] shadow-2xl p-8 sm:p-12 lg:p-16">
          {/* Subtle gold lighting overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EBFA00]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D90302]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D90302]/20 border border-[#D90302]/40 text-[#EBFA00] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Exclusividad & Alta Cocina
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Servicio de banquetes y eventos especiales con <span className="gold-gradient-text">menú personalizado</span>
              </h3>

              <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                Haz que tu boda, fiesta de quince años, aniversario, graduación o reunión corporativa sea recordada por su excelencia culinaria. Nuestro equipo culinario diseña una propuesta gastronómica a tu medida, con montaje distinguido, parrilleros en vivo y servicio de meseros de clase mundial.
              </p>

              {/* Event Perks Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D90302]/20 text-[#EBFA00]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Capacidad Flexible</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Desde 15 hasta más de 200 comensales con montaje de gala.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#03AF45]/20 text-[#03AF45]">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Parrilla en Vivo</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Show de cortes al carbón al momento para tus invitados.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EBFA00]/20 text-[#EBFA00]">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Menú a Medida</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Degustación previa de entradas, carnes, vinos y postres.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D90302]/20 text-[#D90302]">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atención VIP Integral</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Coordinador dedicado durante todo el desarrollo de tu evento.</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20cotizar%20un%20evento%20o%20banquete%20personalizado`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D90302] to-[#b00201] hover:from-[#b00201] hover:to-[#900101] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D90302]/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-[#EBFA00]" />
                  <span>Cotizar Banquete vía WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                >
                  Llamar Directo: {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Right Banquet Imagery Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Banquete y Eventos Especiales Tony's Grill"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Overlay Card */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm">Reserva de Fechas Especiales</p>
                      <p className="text-xs text-zinc-300">Bodas • Cumpleaños • Corporativos</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#03AF45] text-white tracking-wider uppercase">
                      Disponible
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

