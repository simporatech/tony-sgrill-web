import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Sparkles,
  Flame,
  ShieldCheck,
  ExternalLink,
  Clock,
  X,
  PhoneCall,
} from 'lucide-react';
import { PDF_MENUS, PdfMenuDocument } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const PdfMenuPage: React.FC = () => {
  const [activeModalPdf, setActiveModalPdf] = useState<PdfMenuDocument | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalPdf) {
        setActiveModalPdf(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalPdf]);

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-20 overflow-hidden relative">
      {/* Background ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#D90302]/12 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#EBFA00]/8 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-4 shadow-lg backdrop-blur-md"
          >
            <FileText className="w-3.5 h-3.5 fill-[#EBFA00]" />
            4 Menús Oficiales en PDF • Edición 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight"
          >
            Menús Digitales <span className="gold-gradient-text">Tony&apos;s Grill</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-zinc-300 text-sm sm:text-base font-light max-w-2xl mx-auto"
          >
            Toca cualquiera de nuestras 4 cartas oficiales para abrirla al instante en pantalla completa o descargarla.
          </motion.p>
        </div>

        {/* Compact Top Grid (2x2 on sm+, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {PDF_MENUS.map((pdf) => (
            <button
              key={pdf.id}
              type="button"
              onClick={() => setActiveModalPdf(pdf)}
              className="group p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#D90302]/70 bg-[#121212] hover:bg-[#17171c] text-left transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D90302]/20 border border-[#D90302]/40 text-[#EBFA00]">
                    {pdf.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {pdf.pagesLabel} • {pdf.sizeLabel}
                  </span>
                </div>

                <h2 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#EBFA00] transition-colors leading-snug">
                  {pdf.title}
                </h2>
                <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                  {pdf.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] mt-auto">
                <span className="w-full py-3.5 px-5 rounded-xl bg-[#D90302] group-hover:bg-[#b00201] border border-[#EBFA00]/40 group-hover:border-[#EBFA00] text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-[#D90302]/25 transition-all">
                  <FileText className="w-5 h-5 text-[#EBFA00] shrink-0" />
                  <span>Ver Menú</span>
                  <ExternalLink className="w-4 h-4 text-[#EBFA00] shrink-0" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#03AF45] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-white">Documento Oficial</p>
              <p className="text-[10px] text-zinc-400">Actualizado 2026</p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <Flame className="w-4 h-4 text-[#D90302] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-white">4 Cartas Separadas</p>
              <p className="text-[10px] text-zinc-400">Almuerzos, Desayunos, Fresh, Eventos</p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#EBFA00] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-white">Optimizado Web</p>
              <p className="text-[10px] text-zinc-400">Carga Ultra Rápida</p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#EBFA00] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-white">Precios en Quetzales</p>
              <p className="text-[10px] text-zinc-400">IVA incluido</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20tengo%20una%20pregunta%20sobre%20los%20platillos%20del%20menú`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#03AF45] font-bold hover:underline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>¿Dudas sobre el menú? Escríbenos por WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Full-Screen Dark Modal for Active PDF */}
      <AnimatePresence>
        {activeModalPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#080808] flex flex-col"
          >
            {/* Sticky Modal Top Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#121212] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#EBFA00] truncate">
                  {activeModalPdf.pagesLabel} • {activeModalPdf.sizeLabel}
                </p>
                <h2 className="font-serif text-sm sm:text-lg font-bold text-white truncate">
                  {activeModalPdf.title}
                </h2>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={activeModalPdf.file}
                  download={activeModalPdf.downloadName}
                  className="py-3.5 px-5 rounded-xl bg-[#D90302] hover:bg-[#b00201] border border-[#EBFA00]/50 text-white text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D90302]/30 transition-colors"
                >
                  <Download className="w-5 h-5 text-[#EBFA00]" />
                  <span>Descargar PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModalPdf(null)}
                  aria-label="Cerrar visor PDF"
                  className="py-3.5 px-5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-sm sm:text-base font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                  <span>Cerrar</span>
                </button>
              </div>
            </div>

            {/* Full-Screen PDF Viewer */}
            <div className="flex-1 w-full bg-[#0a0a0c]">
              <object
                key={activeModalPdf.file}
                data={`${activeModalPdf.file}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full border-0"
              >
                <iframe
                  src={`${activeModalPdf.file}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={activeModalPdf.title}
                  className="w-full h-full border-0"
                />
              </object>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
