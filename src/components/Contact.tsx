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
  Facebook,
  Send
} from 'lucide-react';
import { SITE_CONTENT } from '../data/restaurantData';
import { useCallModal } from '../context/CallModalContext';
import {
  OFFICIAL_ADDRESS,
  OFFICIAL_PHONE_LINES,
  WHATSAPP_INQUIRY_TEXT,
} from '../data/menuData';

export const Contact: React.FC = () => {
  const { openCallModal } = useCallModal();
  const contact = SITE_CONTENT.contact;
  const displayAddress = OFFICIAL_ADDRESS;
  const [copied, setCopied] = useState<boolean>(false);

  // Quick Contact Form states
  const [senderName, setSenderName] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(displayAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) return;

    setIsSending(true);

    const message = `Hola Tony's Grill, mi nombre es ${senderName.trim()}.${senderPhone.trim() ? ` Teléfono: ${senderPhone.trim()}.` : ''} Quiero consultar lo siguiente:\n"${senderMessage.trim()}"`;
    const waUrl = `https://wa.me/50252188115?text=${encodeURIComponent(message)}`;

    // Redirect user to WhatsApp using wa.me API in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setSenderName('');
      setSenderMessage('');
      setSenderPhone('');
      setTimeout(() => setSentSuccess(false), 4000);
    }, 400);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Tony's Grill " + displayAddress)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent("Tony's Grill Chiquimula " + displayAddress)}`;
  const whatsappInquiryUrl = `https://wa.me/${contact.whatsappRaw}?text=${encodeURIComponent(WHATSAPP_INQUIRY_TEXT)}`;

  return (
    <section 
      id="contacto" 
      className="relative min-h-screen flex flex-col justify-between bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-20 pb-12"
    >
      <div className="max-w-6xl mx-auto w-full my-auto">
        
        {/* Header */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-1">
            {contact.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Visítenos o <span className="text-[#D90302]">Escríbanos</span>
          </h2>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Info Details (6 cols) */}
          <div className="lg:col-span-6 space-y-3 flex flex-col justify-between">
            
            {/* Dual-Navigation Location Block */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-white/[0.06]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 text-[#D90302]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Ubicación Chiquimula</span>
                </div>
                <button
                  type="button"
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

              <p className="mt-2 text-xs sm:text-sm font-medium text-white leading-relaxed">
                {displayAddress}
              </p>

              {/* Two Side-by-Side Navigation Buttons with SVG Icons */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/10 hover:border-[#D90302]/50 flex items-center justify-center gap-2 transition-all"
                >
                  {/* Google Maps Pin SVG */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
                    <circle cx="12" cy="9" r="2.6" fill="#FFFFFF" />
                  </svg>
                  <span>Abrir en Google Maps</span>
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/10 hover:border-[#33CCFF]/50 flex items-center justify-center gap-2 transition-all"
                >
                  {/* Waze SVG */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M19.5 11.5C19.5 6.8 15.8 3.5 11.5 3.5C7 3.5 3.5 6.9 3.5 11.3C3.5 13.7 4.5 15.4 5.7 16.5C5.5 17.4 5 18.2 4.3 18.7C5.8 19.2 7.5 19 8.7 18.3C9.6 18.6 10.6 18.8 11.5 18.8C16.2 18.8 19.5 15.6 19.5 11.5Z" fill="#33CCFF" />
                    <circle cx="9.2" cy="10.5" r="1.1" fill="#0A0A0A" />
                    <circle cx="14.2" cy="10.5" r="1.1" fill="#0A0A0A" />
                    <path d="M9.5 13.5C10.2 14.5 13.2 14.5 14 13.5" stroke="#0A0A0A" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="8" cy="19.5" r="1.5" fill="#FFFFFF" />
                    <circle cx="15" cy="19.5" r="1.5" fill="#FFFFFF" />
                  </svg>
                  <span>Ir con Waze</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Lines (Primary) & WhatsApp Inquiry (Secondary) */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 text-zinc-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D90302]" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Líneas de Orden</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openCallModal()}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#EBFA00] hover:underline cursor-pointer"
                  >
                    Ver todas
                  </button>
                </div>
                <div className="space-y-1">
                  {OFFICIAL_PHONE_LINES.map((line) => (
                    <a
                      key={line.href}
                      href={line.href}
                      className="block text-xs sm:text-sm font-bold text-white hover:text-[#EBFA00] transition-colors"
                    >
                      {line.display}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#03AF45]" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Consultas WhatsApp</span>
                </div>
                <a 
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-white hover:text-[#03AF45] transition-colors block"
                >
                  {contact.whatsapp}
                </a>
                <p className="text-[11px] text-zinc-500 mt-1 font-light">
                  Solo consultas sobre el menú
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div className="p-3.5 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-[#EBFA00]" />
                <span className="font-semibold uppercase tracking-wider">Horario de servicio:</span>
              </div>
              <span className="font-bold text-white">{contact.schedule}</span>
            </div>

          </div>

          {/* Contact Us WhatsApp Form (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#121212] flex flex-col justify-between p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#03AF45]" />
                  <span>Mensaje Directo a WhatsApp</span>
                </span>
                <span className="text-[11px] text-[#EBFA00] font-mono">
                  +502 5218 8115
                </span>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3.5 flex-grow flex flex-col justify-between">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Su Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-3.5 py-2.5 bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="+502 0000 0000"
                    className="w-full px-3.5 py-2.5 bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Mensaje o Consulta *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="¿Desea consultar sobre el menú, un evento o hacer un pedido?"
                    className="w-full px-3.5 py-2 bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors resize-none"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 px-5 rounded-xl bg-[#03AF45] hover:bg-[#029139] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#03AF45]/20 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSending ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}</span>
                  </button>
                  {sentSuccess && (
                    <p className="text-[11px] text-[#03AF45] text-center mt-1.5 font-medium animate-pulse">
                      ✓ Redirigiendo a WhatsApp... ¡En breve te responderemos!
                    </p>
                  )}
                </div>
              </form>

              <div className="border-t border-white/[0.06] pt-2.5 mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Atención inmediata en WhatsApp</span>
                <span>Ref: {contact.reference}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Integrated Compact Minimal Footer */}
      <div className="max-w-6xl mx-auto w-full pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="font-serif font-bold text-zinc-300">TONY'S GRILL</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} {contact.domain}</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline text-[11px]">
            Hecho por{' '}
            <a
              href="https://simpora.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#EBFA00] underline decoration-zinc-700 underline-offset-2 transition-colors font-medium"
            >
              SIMPORA
            </a>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/politicas-de-privacidad"
            className="hover:text-zinc-300 transition-colors text-[11px]"
          >
            Privacidad
          </a>
          <span>•</span>
          <a
            href="/terminos-y-condiciones"
            className="hover:text-zinc-300 transition-colors text-[11px]"
          >
            Términos
          </a>
          <span>•</span>
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
