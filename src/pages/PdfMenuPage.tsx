import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Maximize2, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  Share2, 
  Check, 
  PhoneCall, 
  Eye
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const PdfMenuPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pdfUrl = '/tonys-grill-menu.pdf';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + pdfUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleFullscreen = () => {
    const elem = document.getElementById('pdf-viewer-frame');
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-20 overflow-hidden relative">
      {/* Background ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#D90302]/12 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#EBFA00]/8 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-4 shadow-lg backdrop-blur-md"
          >
            <FileText className="w-3.5 h-3.5 fill-[#EBFA00]" />
            Edición Digital Completa • 35 Páginas
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight"
          >
            Menú Digital <span className="gold-gradient-text">Tony's Grill</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-zinc-300 text-sm sm:text-base font-light max-w-xl mx-auto"
          >
            Explora la carta impresa oficial optimizada para visualización fluida en alta resolución desde cualquier dispositivo móvil o computadora.
          </motion.p>

          {/* PROMINENT GLOWING DOWNLOAD BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={pdfUrl}
              download="Menu-Tonys-Grill-Chiquimula.pdf"
              className="relative group inline-flex items-center justify-center p-[2px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Animated Glowing border gradient */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#D90302] via-[#EBFA00] to-[#D90302] animate-pulse" />
              
              {/* Inner glowing pill */}
              <span className="relative px-8 sm:px-10 py-4 rounded-[14px] bg-[#0c0c0e] group-hover:bg-[#D90302] text-white font-extrabold text-sm sm:text-base uppercase tracking-widest flex items-center gap-3 transition-colors duration-300">
                <Download className="w-5 h-5 text-[#EBFA00] group-hover:text-white transition-colors animate-bounce" />
                <span>Descargar Menú PDF</span>
                <span className="px-2 py-0.5 text-[10px] bg-white/10 rounded-full font-mono font-bold text-zinc-300 group-hover:text-white">
                  12 MB
                </span>
              </span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                title="Abrir en pestaña nueva"
              >
                <Eye className="w-4 h-4 text-[#EBFA00]" />
                <span>Abrir en Pestaña</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <button
                onClick={handleShare}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Copiar enlace del PDF"
              >
                {copied ? <Check className="w-4 h-4 text-[#03AF45]" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#03AF45] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-white">Documento Oficial</p>
              <p className="text-[10px] text-zinc-400">Verificado 2026</p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <Flame className="w-4 h-4 text-[#D90302] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-white">Todas las Secciones</p>
              <p className="text-[10px] text-zinc-400">Carnes, Pizzas, Desayunos</p>
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

        {/* PDF Embedded Viewer Container */}
        <div 
          id="pdf-viewer-frame" 
          className="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl bg-[#101014] flex flex-col"
          style={{ height: '78vh', minHeight: '600px' }}
        >
          {/* Top Bar Controls */}
          <div className="p-3.5 sm:p-4 bg-black/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#D90302]" />
                <div className="w-3 h-3 rounded-full bg-[#EBFA00]" />
                <div className="w-3 h-3 rounded-full bg-[#03AF45]" />
              </div>
              <span className="text-xs font-semibold text-zinc-300 hidden sm:inline ml-2">
                Visor PDF Interactivo • Tony's Grill Chiquimula
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white rounded-lg border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Pantalla completa"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#EBFA00]" />
                <span className="hidden sm:inline">Pantalla Completa</span>
              </button>

              <a
                href={pdfUrl}
                download="Menu-Tonys-Grill-Chiquimula.pdf"
                className="px-3 py-1.5 bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar</span>
              </a>
            </div>
          </div>

          {/* Embedded Viewer (iframe with object fallback) */}
          <div className="relative w-full flex-grow bg-[#0c0c0e]">
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full border-none"
            >
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Menú PDF de Tony's Grill"
                className="w-full h-full border-none"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <FileText className="w-16 h-16 text-[#EBFA00] mb-4" />
                  <p className="text-base font-bold text-white mb-2">
                    Tu navegador no soporta la previsualización directa de archivos PDF.
                  </p>
                  <p className="text-xs text-zinc-400 mb-6 max-w-md">
                    Puedes descargar el menú completo en un clic o abrirlo en una nueva pestaña para visualizarlo con tu lector favorito.
                  </p>
                  <a
                    href={pdfUrl}
                    download="Menu-Tonys-Grill.pdf"
                    className="px-6 py-3 rounded-xl bg-[#D90302] text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Descargar Menú Oficial (12 MB)
                  </a>
                </div>
              </iframe>
            </object>
          </div>

          {/* Bottom Bar Info */}
          <div className="p-3 bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
            <span>Para la mejor experiencia en móviles, utiliza los controles de zoom o pulsa "Descargar".</span>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20tengo%20una%20pregunta%20sobre%20los%20platillos%20del%20menú`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#03AF45] font-bold hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>¿Dudas sobre el menú? Escríbenos por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

