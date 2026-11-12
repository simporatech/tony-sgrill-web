import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

export interface AuthResponse {
  success: boolean;
  error?: string;
  session?: Session | null;
  user?: User | null;
}

export const authService = {
  /**
   * Real Supabase Authentication using signInWithPassword()
   * Completely removes the mock setTimeout delay and connects to real Supabase Auth.
   */
  async login(emailOrUser: string, password: string): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Las credenciales de Supabase no están configuradas en .env. Configure VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para autenticar.',
      };
    }

    try {
      // Supabase requires an email address. If an administrative username is supplied without @,
      // format it as email@tonysgrill.com
      const trimmedInput = emailOrUser.trim();
      const email = trimmedInput.includes('@') ? trimmedInput : `${trimmedInput}@tonysgrill.com`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password.trim(),
      });

      if (error) {
        let errorMsg = error.message;
        if (errorMsg.toLowerCase().includes('invalid login credentials')) {
          errorMsg = 'Credenciales inválidas. Verifique su correo y contraseña en Supabase.';
        } else if (errorMsg.toLowerCase().includes('email not confirmed')) {
          errorMsg = 'El correo electrónico no ha sido confirmado en Supabase Auth.';
        }
        return {
          success: false,
          error: errorMsg,
        };
      }

      return {
        success: true,
        session: data.session,
        user: data.user,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Error de conexión al autenticar con Supabase.',
      };
    }
  },

  /**
   * Check and retrieve the current Supabase session
   */
  async getSession(): Promise<Session | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) return null;
      return data.session;
    } catch {
      return null;
    }
  },

  /**
   * Sign out the user using Supabase Auth
   */
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Supabase signOut error:', err);
    }
  },
};
