import React, { useState, useMemo } from 'react';
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
  Eye,
} from 'lucide-react';
import { PDF_MENUS } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const PdfMenuPage: React.FC = () => {
  const [selectedPdfId, setSelectedPdfId] = useState<string>(PDF_MENUS[0].id);
  const [copied, setCopied] = useState(false);

  const selectedPdf = useMemo(() => {
    return PDF_MENUS.find((p) => p.id === selectedPdfId) || PDF_MENUS[0];
  }, [selectedPdfId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + selectedPdf.file);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleFullscreen = () => {
    const elem = document.getElementById('pdf-viewer-frame');
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
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
            Selecciona entre nuestro Menú Principal de Almuerzos 2026, Menú de Desayunos, Tony&apos;s Fresh Eats o el Menú de Eventos.
          </motion.p>
        </div>

        {/* 4 Separate PDF Selector Cards inside the same view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PDF_MENUS.map((pdf) => {
            const isSelected = pdf.id === selectedPdf.id;
            return (
              <button
                key={pdf.id}
                type="button"
                onClick={() => setSelectedPdfId(pdf.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#1a1012] border-[#D90302] shadow-xl shadow-[#D90302]/25'
                    : 'bg-[#121215] hover:bg-[#17171b] border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#D90302] text-white'
                          : 'bg-white/10 text-[#EBFA00]'
                      }`}
                    >
                      {pdf.badge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {pdf.pagesLabel} • {pdf.sizeLabel}
                    </span>
                  </div>

                  <h2 className="font-serif text-lg font-bold text-white leading-snug">
                    {pdf.title}
                  </h2>
                  <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                    {pdf.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-[#EBFA00]' : 'text-zinc-400'}>
                    {isSelected ? 'Seleccionado' : 'Ver este PDF'}
                  </span>
                  <FileText className={`w-4 h-4 ${isSelected ? 'text-[#D90302]' : 'text-zinc-500'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Download & Action Buttons for Selected PDF */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={selectedPdf.file}
            download={selectedPdf.downloadName}
            className="relative group inline-flex items-center justify-center p-[2px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#D90302] via-[#EBFA00] to-[#D90302] animate-pulse" />
            <span className="relative px-7 sm:px-9 py-4 rounded-[14px] bg-[#0c0c0e] group-hover:bg-[#D90302] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 transition-colors duration-300">
              <Download className="w-5 h-5 text-[#EBFA00] group-hover:text-white transition-colors" />
              <span>Descargar {selectedPdf.shortTitle}</span>
              <span className="px-2 py-0.5 text-[10px] bg-white/10 rounded-full font-mono font-bold text-zinc-300 group-hover:text-white">
                {selectedPdf.sizeLabel}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={selectedPdf.file}
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
              type="button"
              onClick={handleShare}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Copiar enlace del PDF"
            >
              {copied ? <Check className="w-4 h-4 text-[#03AF45]" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
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
                {selectedPdf.title} • {selectedPdf.pagesLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white rounded-lg border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Pantalla completa"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#EBFA00]" />
                <span className="hidden sm:inline">Pantalla Completa</span>
              </button>

              <a
                href={selectedPdf.file}
                download={selectedPdf.downloadName}
                className="px-3 py-1.5 bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar</span>
              </a>
            </div>
          </div>

          {/* Embedded Viewer */}
          <div className="relative w-full flex-grow bg-[#0c0c0e]">
            <object
              key={selectedPdf.file}
              data={`${selectedPdf.file}#toolbar=1&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full border-none"
            >
              <iframe
                src={`${selectedPdf.file}#toolbar=1&navpanes=0&scrollbar=1`}
                title={selectedPdf.title}
                className="w-full h-full border-none"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <FileText className="w-16 h-16 text-[#EBFA00] mb-4" />
                  <p className="text-base font-bold text-white mb-2">
                    Tu navegador no soporta la previsualización directa de archivos PDF.
                  </p>
                  <p className="text-xs text-zinc-400 mb-6 max-w-md">
                    Puedes descargar este menú en un clic o abrirlo en una nueva pestaña para visualizarlo con tu lector favorito.
                  </p>
                  <a
                    href={selectedPdf.file}
                    download={selectedPdf.downloadName}
                    className="px-6 py-3 rounded-xl bg-[#D90302] text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Descargar {selectedPdf.shortTitle} ({selectedPdf.sizeLabel})
                  </a>
                </div>
              </iframe>
            </object>
          </div>

          {/* Bottom Bar Info */}
          <div className="p-3 bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
            <span>Para la mejor experiencia en móviles, utiliza los controles de zoom o pulsa &quot;Descargar&quot;.</span>
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
