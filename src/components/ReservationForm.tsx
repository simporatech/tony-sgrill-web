import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Utensils, 
  Phone, 
  User, 
  Mail, 
  MessageSquare,
  Wine,
  PartyPopper
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationFormProps {
  prefilledDish?: string | null;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ prefilledDish }) => {
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('19:00');
  const [seatingArea, setSeatingArea] = useState<string>('Salón Principal Climatizado');
  const [occasion, setOccasion] = useState<string>('Cena Familiar / Placer');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>(prefilledDish ? `Me gustaría probar: ${prefilledDish}` : '');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const seatingOptions = [
    { id: 'salon', label: 'Salón Principal', desc: 'Ambiente climatizado & elegante' },
    { id: 'terraza', label: 'Terraza Parrilla', desc: 'Vista a las brasas al aire' },
    { id: 'familiar', label: 'Área Familiar', desc: 'Cómodo para niños y reuniones' },
    { id: 'vip', label: 'Mesa VIP', desc: 'Máxima exclusividad y privacidad' },
  ];

  const timeSlots = [
    '08:00 AM', '09:30 AM', '12:00 PM', '01:00 PM', '02:30 PM', 
    '06:00 PM', '07:00 PM', '08:00 PM', '08:45 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 1200);
  };

  const getWhatsAppMessage = () => {
    const text = `¡Hola Tony's Grill! Deseo confirmar mi reservación:\n` +
      `👤 Nombre: ${fullName}\n` +
      `📅 Fecha: ${date}\n` +
      `⏰ Hora: ${time}\n` +
      `👥 Personas: ${guests}\n` +
      `📍 Área: ${seatingArea}\n` +
      `🎉 Motivo: ${occasion}\n` +
      `📞 Teléfono: ${phone}\n` +
      (specialNotes ? `📝 Notas: ${specialNotes}\n` : '') +
      `\n¿Tienen disponibilidad? ¡Muchas gracias!`;
    return encodeURIComponent(text);
  };

  return (
    <section id="reservar" className="relative py-24 sm:py-32 bg-[#09090b] text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D90302]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#EBFA00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-3">
            <CalendarDays className="w-3.5 h-3.5" />
            Experiencia Inolvidable
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Reserva tu <span className="fire-gradient-text">Mesa Exclusiva</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Asegura tu lugar en el templo del carbón. Te garantizamos el mejor corte, un servicio cálido y momentos memorables con los tuyos.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel rounded-3xl border border-white/15 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isConfirmed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* 1. Date, Time & Number of Guests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Guests selector */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#EBFA00]" />
                      Número de Comensales
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 4, 6, 8].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            guests === num
                              ? 'bg-[#D90302] text-white shadow-md shadow-[#D90302]/30 scale-105'
                              : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                          }`}
                        >
                          {num} {num === 1 ? 'persona' : 'pers.'}
                        </button>
                      ))}
                      <div className="w-16">
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                          className="w-full py-2.5 px-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-center text-white focus:outline-none focus:border-[#EBFA00]"
                          title="Cantidad personalizada"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#EBFA00]" />
                      Fecha de la Visita
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-[#EBFA00] transition-colors"
                    />
                  </div>

                  {/* Time Selector */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#EBFA00]" />
                      Horario Sugerido
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#121212] border border-white/10 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-[#EBFA00] transition-colors"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Seating Area Selection */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D90302]" />
                    Preferencia de Ubicación
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {seatingOptions.map((area) => {
                      const isSelected = seatingArea === area.label;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setSeatingArea(area.label)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-white/10 to-white/5 border-[#EBFA00] shadow-lg'
                              : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <p className={`text-xs font-bold ${isSelected ? 'text-[#EBFA00]' : 'text-white'}`}>
                            {area.label}
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                            {area.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Contact Details */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#03AF45]" />
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Ing. Carlos Mendoza"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EBFA00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#03AF45]" />
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+502 0000 0000"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EBFA00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <PartyPopper className="w-3.5 h-3.5 text-[#03AF45]" />
                      Motivo Especial
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#121212] border border-white/10 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-[#EBFA00]"
                    >
                      <option value="Cena Familiar">Reunión Familiar</option>
                      <option value="Cumpleaños">Celebración de Cumpleaños</option>
                      <option value="Cena Romántica">Cena Romántica / Pareja</option>
                      <option value="Negocios">Almuerzo de Negocios</option>
                      <option value="Otro">Otro Evento Especial</option>
                    </select>
                  </div>
                </div>

                {/* 4. Special Requests */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                    Peticiones Especiales, Alergias o Platillos Favoritos
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Ej. Silla para bebé, término de la carne medio, o celebración de aniversario..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EBFA00]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Sparkles className="w-4 h-4 text-[#EBFA00]" />
                    <span>Sin cobros por adelantado. Te confirmamos de inmediato.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D90302] to-[#b00201] hover:from-[#b00201] hover:to-[#900101] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-[#D90302]/30 flex items-center justify-center gap-3 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Procesando Solicitud...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#EBFA00]" />
                        <span>Confirmar Solicitud de Reserva</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success / Confirmation Screen */
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 sm:py-16 max-w-xl mx-auto"
              >
                <div className="w-16 h-16 bg-[#03AF45]/20 border border-[#03AF45] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#03AF45]" />
                </div>

                <h3 className="font-serif text-3xl font-bold text-white mb-2">
                  ¡Solicitud Registrada con Éxito!
                </h3>
                <p className="text-zinc-300 text-sm mb-6">
                  Gracias, <strong className="text-white">{fullName}</strong>. Hemos recibido los detalles de tu visita para el día <strong className="text-[#EBFA00]">{date}</strong> a las <strong className="text-[#EBFA00]">{time}</strong> ({guests} personas).
                </p>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-left mb-8 space-y-2 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Ubicación elegida:</span>
                    <span className="font-bold text-white">{seatingArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Motivo:</span>
                    <span className="font-bold text-white">{occasion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Contacto:</span>
                    <span className="font-bold text-white">{phone}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-[#03AF45] hover:bg-[#028a37] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar Rápido por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      setFullName('');
                      setPhone('');
                    }}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/15 transition-all cursor-pointer"
                  >
                    Hacer otra reserva
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

