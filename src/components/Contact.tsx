import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  Share2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Tony's Grill 9 Calle, 15 Avenida, zona 6 colonia las lomas de Chiquimula Guatemala")}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent("Tony's Grill Chiquimula")}`;

  return (
    <section id="contacto" className="relative py-24 sm:py-32 bg-[#080808] text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#D90302]/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Visítanos en Chiquimula
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ubicación & <span className="gold-gradient-text">Contacto Directo</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Estamos listos para recibirte con el fuego encendido y la mejor atención de la región oriente.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-[#D90302]/15 text-[#D90302]">
                  <MapPin className="w-6 h-6" />
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copiar dirección"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#03AF45]" />
                      <span className="text-[#03AF45]">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="mt-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Dirección Oficial
              </h3>
              <p className="mt-1 text-sm font-semibold text-white leading-relaxed">
                {RESTAURANT_INFO.address}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#EBFA00]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <span>Waze</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#03AF45]/15 text-[#03AF45]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Líneas de Atención
                  </h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Teléfono Fijo:</span>
                      <a 
                        href={`tel:${RESTAURANT_INFO.phoneRaw}`} 
                        className="text-[#EBFA00] hover:underline"
                      >
                        {RESTAURANT_INFO.phone}
                      </a>
                    </p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <span>WhatsApp Directo:</span>
                      <a 
                        href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20hacer%20un%20pedido%20o%20consulta`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#03AF45] hover:underline"
                      >
                        {RESTAURANT_INFO.whatsapp}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#03AF45] hover:bg-[#028f39] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Escribir por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#EBFA00]/15 text-[#EBFA00]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Horario de Servicio
                  </h3>
                  <p className="mt-1 text-base font-extrabold text-white">
                    {RESTAURANT_INFO.schedule}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Cocina continua: Desayunos, Almuerzos, Cafetería & Cenas a la Brasa.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03AF45]/15 border border-[#03AF45]/30 text-[#03AF45] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#03AF45] animate-ping" />
                <span>Abierto Hoy de 7:00 AM a 9:45 PM</span>
              </div>
            </div>

          </div>

          {/* Interactive Map Visual (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl glass-panel group flex flex-col justify-between">
              
              {/* Top Bar of the Map view */}
              <div className="p-4 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D90302]" />
                  <div className="w-3 h-3 rounded-full bg-[#EBFA00]" />
                  <div className="w-3 h-3 rounded-full bg-[#03AF45]" />
                  <span className="text-xs font-semibold text-zinc-400 ml-2">
                    Ubicación Satelital • Chiquimula, GT
                  </span>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#EBFA00] hover:underline font-bold flex items-center gap-1"
                >
                  Abrir Mapa Completo
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Illustration / Embed Layer */}
              <div className="relative flex-grow flex items-center justify-center p-6 bg-gradient-to-b from-[#111113] via-[#0d0d0f] to-[#080808]">
                {/* Visual stylized street grid */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                
                {/* Interactive Pin Highlight */}
                <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/15 max-w-md shadow-2xl">
                  <div className="relative mb-3">
                    <span className="absolute -inset-2 rounded-full bg-[#D90302]/30 animate-ping" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D90302] to-[#8a0000] p-0.5 shadow-xl flex items-center justify-center">
                      <div className="w-full h-full bg-[#0e0e0e] rounded-[14px] flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-[#EBFA00]" />
                      </div>
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-white">
                    Tony's Grill Chiquimula
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1 max-w-xs">
                    9 Calle, 15 Avenida, zona 6 colonia las lomas, Frente a zona vial 8.
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Cómo Llegar (Ruta)</span>
                    </a>

                    <a
                      href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#03AF45]" />
                      <span>Llamar al Local</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-3 bg-black/70 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Parqueo seguro disponible en el establecimiento</span>
                <span className="text-[#03AF45] font-semibold">● Frente a zona vial 8</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

