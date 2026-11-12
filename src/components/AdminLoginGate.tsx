import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { authService } from '../services/authService';

interface AdminLoginGateProps {
  onAuthenticated: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Por favor ingrese la contraseña de administrador.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await authService.login(password.trim());
      if (response.success) {
        onAuthenticated();
      } else {
        setErrorMessage(response.error || 'Contraseña incorrecta.');
      }
    } catch (err) {
      setErrorMessage('Error al procesar la solicitud. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 selection:bg-[#D90302] selection:text-white relative overflow-hidden"
      style={{ backgroundColor: '#333333' }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D90302]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/40 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Main Card */}
        <div className="rounded-3xl bg-[#1e1e1e]/90 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 shadow-2xl">
          
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
                Acceso Administrativo
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              CMS <span className="text-[#D90302]">TONY'S GRILL</span>
            </h1>
            <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
              Ingrese la contraseña de seguridad para gestionar menú, promociones y textos de la plataforma.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label 
                htmlFor="admin-password" 
                className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2"
              >
                Contraseña de Administrador
              </label>

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
                  className="w-full pl-4 pr-11 py-3.5 bg-[#141416] hover:bg-[#18181b] focus:bg-[#18181b] border border-white/10 focus:border-[#D90302] rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#D90302]/40 transition-all font-mono"
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
              className="w-full py-3.5 px-6 rounded-xl hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D90302]/30 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando Credenciales...</span>
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
          <span className="text-[10px] text-zinc-400/80 font-mono tracking-wider uppercase">
            Sesión temporal cifrada • Caduca al cerrar pestaña
          </span>
        </div>
      </motion.div>
    </div>
  );
};

