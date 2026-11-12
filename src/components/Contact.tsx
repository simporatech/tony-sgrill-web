import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  Instagram,
  Facebook
} from 'lucide-react';
import { useCmsData } from '../context/CmsContext';

export const Contact: React.FC = () => {
  const { data } = useCmsData();
  const contact = data.contact;
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contact.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Tony's Grill " + contact.address)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent("Tony's Grill Chiquimula")}`;

  return (
    <section 
      id="contacto" 
      className="relative h-screen min-h-screen snap-start flex flex-col justify-between bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-20 pb-8"
    >
      <div className="max-w-6xl mx-auto w-full my-auto">
        
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-2">
            {contact.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {contact.title} <span className="text-[#D90302]">{contact.titleAccent}</span>
          </h2>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Info Details (6 cols) */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            
            {/* Address */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 text-[#D90302]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Dirección</span>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="text-[11px] text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#03AF45]" />
                      <span className="text-[#03AF45]">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-sm font-medium text-white leading-relaxed">
                {contact.address}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3 h-3 text-[#EBFA00]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <span>Waze</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <Phone className="w-3.5 h-3.5 text-[#03AF45]" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Teléfono</span>
                </div>
                <a 
                  href={`tel:${contact.phoneRaw}`}
                  className="text-sm font-bold text-white hover:text-zinc-300"
                >
                  {contact.phone}
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <MessageCircle className="w-3.5 h-3.5 text-[#03AF45]" />
                  <span className="text-xs uppercase tracking-wider font-semibold">WhatsApp</span>
                </div>
                <a 
                  href={`https://wa.me/${contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:text-[#03AF45]"
                >
                  {contact.whatsapp}
                </a>
              </div>
            </div>

            {/* Schedule */}
            <div className="p-4 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-[#EBFA00]" />
                <span className="font-semibold uppercase tracking-wider">Horario de servicio:</span>
              </div>
              <span className="font-bold text-white">{contact.schedule}</span>
            </div>

          </div>

          {/* Clean Map View (NO dotted background pattern) (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#121212] flex flex-col justify-between p-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs font-semibold text-zinc-400">
                  Referencia de Ubicación
                </span>
                <span className="text-[11px] text-zinc-500">
                  {contact.reference}
                </span>
              </div>

              {/* Clean Map Pin Presentation without dots */}
              <div className="my-auto py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#D90302]/15 text-[#D90302] flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Tony's Grill
                </h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-relaxed">
                  {contact.address}
                </p>
                <div className="mt-4">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D90302] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b00201] transition-colors"
                  >
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Parqueo disponible</span>
                <span>Chiquimula 20001</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Integrated Compact Minimal Footer */}
      <div className="max-w-6xl mx-auto w-full pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <span className="font-serif font-bold text-zinc-300">TONY'S GRILL</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} {contact.domain}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>{contact.instagramHandle}</span>
          </a>

          <a
            href={contact.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>{contact.facebookHandle}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
