import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'screenshot-delay-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/__delay')) {
            setTimeout(() => {
              res.setHeader('Content-Type', 'application/javascript');
              res.end('// ready');
            }, 1200);
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    cors: true
  }
});
