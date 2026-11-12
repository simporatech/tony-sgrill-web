/**
 * Mock Authentication Service for Tony's Grill Admin Dashboard
 * 
 * Abstracted into an async service so it can be swapped seamlessly 
 * with a real backend / Supabase Auth endpoint in the future.
 */

const AUTH_SESSION_KEY = 'tonys_grill_admin_session';

// Mock password for administrative access
const MOCK_VALID_PASSWORD = 'tonys.1968';

export interface AuthResponse {
  success: boolean;
  error?: string;
  token?: string;
}

export const authService = {
  /**
   * Authenticate with a single administrative password.
   * Simulates an asynchronous network round-trip.
   */
  async login(password: string): Promise<AuthResponse> {
    // Simulate network latency (400-600ms)
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (password === MOCK_VALID_PASSWORD) {
      // Create session token stored strictly in sessionStorage
      const token = `tg_adm_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, token);
      } catch (err) {
        console.error('SessionStorage access failed:', err);
      }

      return {
        success: true,
        token,
      };
    }

    return {
      success: false,
      error: 'Contraseña de administrador incorrecta. Verifique sus credenciales.',
    };
  },

  /**
   * Check if the user is authenticated in the current browser session.
   * Automatically expires when the browser tab is closed.
   */
  isAuthenticated(): boolean {
    try {
      const session = sessionStorage.getItem(AUTH_SESSION_KEY);
      return session !== null && session.length > 0;
    } catch {
      return false;
    }
  },

  /**
   * Clear the session and logout.
   */
  logout(): void {
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch (err) {
      console.error('SessionStorage removal failed:', err);
    }
  },
};

