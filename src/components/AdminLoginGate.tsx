import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, ShieldCheck, Mail, Database } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import type { Session } from '@supabase/supabase-js';

interface AdminLoginGateProps {
  onAuthenticated?: (session: Session) => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('admin@tonysgrill.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Por favor ingrese la contraseña de administrador.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Por favor ingrese su correo electrónico de Supabase.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!isConfigured) {
        setErrorMessage('Supabase no está configurado. Ingrese sus credenciales VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env.');
        setIsLoading(false);
        return;
      }

      // Real Supabase Authentication
      const resolvedEmail = email.includes('@') ? email.trim() : `${email.trim()}@tonysgrill.com`;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: resolvedEmail,
        password: password.trim(),
      });

      if (error) {
        let msg = error.message;
        if (msg.toLowerCase().includes('invalid login credentials')) {
          msg = 'Credenciales inválidas. Verifique su correo o contraseña en Supabase Auth.';
        } else if (msg.toLowerCase().includes('email not confirmed')) {
          msg = 'El correo electrónico no ha sido verificado en Supabase.';
        }
        setErrorMessage(msg);
      } else if (data.session) {
        if (onAuthenticated) {
          onAuthenticated(data.session);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al conectar con Supabase Auth.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 selection:bg-[#D90302] selection:text-white relative overflow-hidden bg-[#0c0c0e]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D90302]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-black/60 blur-[140px] pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-black/60 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Main Card */}
        <div className="rounded-3xl bg-[#161619]/90 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle top ember line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D90302] to-transparent opacity-75" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group mb-4">
              <img
                src="/logo.png"
                alt="Tony's Grill"
                className="h-16 w-auto mx-auto object-contain filter drop-shadow-[0_2px_14px_rgba(217,3,2,0.45)] group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="flex items-center justify-center gap-1.5 mb-1.5">
              <Lock className="w-3.5 h-3.5 text-[#EBFA00]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#EBFA00]">
                Autenticación Supabase Real
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              CMS <span className="text-[#D90302]">TONY'S GRILL</span>
            </h1>
            <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
              Inicie sesión con su cuenta administrativa de Supabase para gestionar el sitio web y menú.
            </p>
          </div>

          {/* Database indicator */}
          {!isConfigured && (
            <div className="mb-6 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
              <Database className="w-4 h-4 text-[#EBFA00] shrink-0 mt-0.5" />
              <span className="leading-snug">
                <strong>Atención:</strong> Configure las variables <code className="text-white bg-black/40 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> y <code className="text-white bg-black/40 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> en su archivo <code className="text-white bg-black/40 px-1 py-0.5 rounded">.env</code> para habilitar el login en producción.
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email input */}
            <div>
              <label 
                htmlFor="admin-email" 
                className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2"
              >
                Correo Electrónico (Supabase Auth)
              </label>

              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="admin@tonysgrill.com"
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-[#101012] hover:bg-[#141416] focus:bg-[#141416] border border-white/10 focus:border-[#D90302] rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#D90302]/40 transition-all font-mono"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label 
                  htmlFor="admin-password" 
                  className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider"
                >
                  Contraseña
                </label>
              </div>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  autoFocus
                  placeholder="••••••••••••"
                  disabled={isLoading}
                  className="w-full pl-4 pr-11 py-3 bg-[#101012] hover:bg-[#141416] focus:bg-[#141416] border border-white/10 focus:border-[#D90302] rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#D90302]/40 transition-all font-mono"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#D90302] shrink-0 mt-0.5" />
                    <span className="leading-snug">{errorMessage}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: '#D90302' }}
              className="w-full mt-2 py-3.5 px-6 rounded-xl hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D90302]/30 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Autenticando en Supabase...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#EBFA00]" />
                  <span>Ingresar al Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Return link */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a Tony's Grill Web</span>
            </Link>
          </div>

        </div>

        {/* Security badge at bottom */}
        <div className="mt-4 text-center">
          <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">
            Autenticación cifrada vía Supabase Auth • JWT con renovación automática
          </span>
        </div>
      </motion.div>
    </div>
  );
};
