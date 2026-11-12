import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Menu as MenuIcon, 
  X, 
  FileText, 
  CalendarDays, 
  Tag, 
  UtensilsCrossed, 
  PhoneCall, 
  Clock, 
  Sparkles,
  Home
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Promos', path: '/promos', badge: 'Ofertas' },
    { name: 'Menú (Web)', path: '/menu' },
    { name: 'Menú (PDF)', path: '/menu-pdf', icon: FileText },
    { name: 'Nosotros & Eventos', path: '/#nosotros' },
    { name: 'Reseñas', path: '/#resenas' },
    { name: 'Contacto', path: '/#contacto' },
  ];

  const isCurrentRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80 py-3.5'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative h-11 flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Tony's Grill Logo" 
                  className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(217,3,2,0.4)] group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-white uppercase flex items-center gap-1.5 leading-none">
                  TONY'S <span className="text-[#D90302]">GRILL</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-medium uppercase mt-1">
                  Chiquimula • Est. Grill
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => {
                const active = isCurrentRoute(link.path);
                
                if (link.path.startsWith('/#')) {
                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 group ${
                      active
                        ? 'bg-gradient-to-r from-[#D90302] to-[#b00201] text-white shadow-md shadow-[#D90302]/40'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {link.icon && (
                      <link.icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-[#EBFA00]'} group-hover:rotate-6 transition-transform`} />
                    )}
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-[#D90302] text-white uppercase tracking-wider animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20hacer%20una%20consulta`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-300 hover:text-[#03AF45] hover:bg-white/5 rounded-full transition-colors"
                title="Escríbenos por WhatsApp"
              >
                <div className="relative">
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#03AF45] rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#03AF45] rounded-full" />
                  <Clock className="w-4 h-4 text-zinc-400" />
                </div>
              </a>

              <a
                href="/#reservar"
                className="relative group overflow-hidden rounded-full p-[1px] font-medium"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#D90302] via-[#EBFA00] to-[#D90302] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a0a0a] group-hover:bg-[#121212] text-xs font-bold text-white uppercase tracking-wider transition-colors duration-200">
                  <CalendarDays className="w-3.5 h-3.5 text-[#EBFA00]" />
                  <span>Reservar</span>
                </span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 xl:hidden">
              <a
                href="/#reservar"
                className="px-3 py-1.5 text-xs font-bold bg-[#D90302] text-white rounded-full flex items-center gap-1.5"
              >
                <CalendarDays className="w-3.5 h-3.5 text-[#EBFA00]" />
                <span>Reservar</span>
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded-xl"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#0c0c0c]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl xl:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <div className="pb-3 border-b border-white/10">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#EBFA00]" />
                  Tony's Grill Chiquimula
                </p>
                <p className="text-xs text-zinc-300 mt-1">
                  Horario de Atención: 7:00 AM – 9:45 PM
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#EBFA00]" />
                    Inicio
                  </span>
                  <span className="text-zinc-500 text-xs">Principal</span>
                </Link>

                <Link
                  to="/promos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#D90302]/15 to-transparent border border-[#D90302]/30 text-white font-medium text-sm flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#EBFA00]" />
                    Promociones & Ofertas
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#D90302] text-white rounded-full">
                    Activas
                  </span>
                </Link>

                <Link
                  to="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-[#D90302]" />
                    Menú Completo (Web)
                  </span>
                  <span className="text-xs text-[#EBFA00] font-bold">Sin imágenes</span>
                </Link>

                <Link
                  to="/menu-pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-sm flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#EBFA00]" />
                    Menú Digital (PDF Oficial)
                  </span>
                  <span className="text-xs text-zinc-400">Visor & Descarga</span>
                </Link>

                <a
                  href="/#nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors"
                >
                  Nosotros & Banquetes
                </a>

                <a
                  href="/#resenas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors"
                >
                  Opiniones de Clientes (Google)
                </a>

                <a
                  href="/#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors"
                >
                  Ubicación & Contacto
                </a>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="/#reservar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-[#D90302] hover:bg-[#b00201] text-white font-bold rounded-xl text-center text-sm shadow-lg shadow-[#D90302]/30 flex items-center justify-center gap-2"
                >
                  <CalendarDays className="w-4 h-4 text-[#EBFA00]" />
                  <span>Reservar Mesa Ahora</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl text-center text-sm flex items-center justify-center gap-2 hover:bg-white/10"
                >
                  <PhoneCall className="w-4 h-4 text-[#03AF45]" />
                  <span>Llamar: {RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
