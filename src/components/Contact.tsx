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
import { useCmsData } from '../context/CmsContext';

export const Contact: React.FC = () => {
  const { data } = useCmsData();
  const contact = data.contact;
  const [copied, setCopied] = useState<boolean>(false);

  // Quick Contact Form states
  const [senderName, setSenderName] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contact.address);
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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Tony's Grill " + contact.address)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent("Tony's Grill Chiquimula")}`;

  return (
    <section 
      id="contacto" 
      className="relative h-screen min-h-screen snap-start flex flex-col justify-between bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-20 pb-8"
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
            
            {/* Address */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-white/[0.06]">
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

              <p className="mt-2 text-xs sm:text-sm font-medium text-white leading-relaxed">
                {contact.address}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3 h-3 text-[#EBFA00]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <span>Waze</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <Phone className="w-3.5 h-3.5 text-[#03AF45]" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Teléfono</span>
                </div>
                <a 
                  href={`tel:${contact.phoneRaw}`}
                  className="text-xs sm:text-sm font-bold text-white hover:text-zinc-300"
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
                  className="text-xs sm:text-sm font-bold text-white hover:text-[#03AF45]"
                >
                  {contact.whatsapp}
                </a>
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
