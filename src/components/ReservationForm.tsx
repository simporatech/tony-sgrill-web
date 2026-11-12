import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { CustomSelect } from './ui/CustomSelect';

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
  const [time, setTime] = useState<string>('07:00 PM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>(prefilledDish ? `Consulta: ${prefilledDish}` : '');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => ({
    value: num,
    label: `${num} ${num === 1 ? 'persona' : 'personas'}`,
  }));

  const timeSlotOptions = [
    '08:00 AM', '09:30 AM', '12:00 PM', '01:00 PM', '02:30 PM', 
    '06:00 PM', '07:00 PM', '08:00 PM', '08:45 PM'
  ].map((slot) => ({
    value: slot,
    label: slot,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 800);
  };

  const getWhatsAppMessage = () => {
    const text = `Hola Tony's Grill, deseo reservar una mesa:\n` +
      `Nombre: ${fullName}\n` +
      `Fecha: ${date}\n` +
      `Hora: ${time}\n` +
      `Comensales: ${guests}\n` +
      `Teléfono: ${phone}\n` +
      (specialNotes ? `Notas: ${specialNotes}\n` : '');
    return encodeURIComponent(text);
  };

  return (
    <section 
      id="reservar" 
      className="relative h-screen min-h-screen snap-start flex items-center justify-center bg-[#080808] text-white px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-2">
            Atención Personalizada
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Reservar una <span className="text-[#D90302]">Mesa</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Reserve su espacio con anticipación para su visita a Tony's Grill Chiquimula.
          </p>
        </div>

        {/* Minimal Form Container */}
        <div className="rounded-3xl bg-[#121212] border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            {!isConfirmed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* 1. Date, Time & Number of Guests (Modern Dropdowns & Dark Pickers) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Número de comensales
                    </label>
                    <CustomSelect
                      value={guests}
                      onChange={(val) => setGuests(Number(val))}
                      options={guestOptions}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Fecha de visita
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302] transition-colors [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Horario
                    </label>
                    <CustomSelect
                      value={time}
                      onChange={(val) => setTime(String(val))}
                      options={timeSlotOptions}
                    />
                  </div>
                </div>

                {/* 2. Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nombre y apellido"
                      className="w-full px-4 py-3 bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+502 0000 0000"
                      className="w-full px-4 py-3 bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Notas adicionales (Opcional)
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Detalles sobre su visita o requerimientos especiales"
                    className="w-full px-4 py-3 bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D90302]/20"
                  >
                    {isSubmitting ? (
                      <span>Enviando...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirmar Reservación</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 max-w-lg mx-auto"
              >
                <CheckCircle2 className="w-12 h-12 text-[#03AF45] mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Solicitud Recibida
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  Gracias, <strong className="text-white">{fullName}</strong>. Hemos registrado su solicitud para el <strong className="text-white">{date}</strong> a las <strong className="text-white">{time}</strong> ({guests} personas).
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#03AF45] hover:bg-[#028a37] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirmar por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      setFullName('');
                      setPhone('');
                    }}
                    className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-full border border-white/15 transition-all cursor-pointer"
                  >
                    Nueva reserva
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
