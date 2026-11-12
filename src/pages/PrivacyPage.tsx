import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 pt-28 pb-20 font-sans selection:bg-[#D90302] selection:text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Return */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D90302]" />
            <span>Volver a Tony's Grill</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#03AF45] mb-3">
            <Shield className="w-3.5 h-3.5 text-[#03AF45]" />
            <span>Protección de Datos & Privacidad</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Políticas de <span className="text-[#03AF45]">Privacidad</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-light">
            Última actualización: Noviembre 2026 • Tony's Grill Chiquimula, Guatemala.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              1. Nuestro Compromiso con su Privacidad
            </h2>
            <p>
              En <strong>Tony's Grill</strong> valoramos profundamente la confianza de nuestros clientes y comensales. Esta política detalla de manera transparente cómo tratamos la información proporcionada a través de nuestro sitio web (<span className="text-zinc-200 font-mono">tonysgrillgt.com</span>).
            </p>
          </section>

          <section className="space-y-3 p-5 rounded-2xl bg-[#121214] border border-white/10">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#03AF45]" />
              <span>2. Datos que Recopilamos y Finalidad Exclusiva</span>
            </h2>
            <p>
              Recopilamos únicamente los datos que usted decide ingresar voluntariamente en nuestro formulario de reservación o en el formulario de contacto:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li><strong>Nombre completo:</strong> Para identificar al titular de la mesa reservada.</li>
              <li><strong>Número de teléfono o WhatsApp:</strong> Para enviar la confirmación de la visita.</li>
              <li><strong>Fecha, hora y número de comensales:</strong> Para gestionar el aforo del restaurante.</li>
              <li><strong>Notas o requerimientos especiales:</strong> Para personalizar su experiencia gastronómica.</li>
            </ul>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 mt-3">
              <p className="font-semibold text-white">
                Finalidad Única: Enrutamiento de Reservaciones por WhatsApp
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Recopilamos su nombre y teléfono únicamente con el fin exclusivo de generar el enlace de conversación y canalizar su solicitud de reserva o consulta hacia la línea oficial de atención de Tony's Grill en WhatsApp (+502 5218 8115).
              </p>
            </div>
          </section>

          <section className="space-y-3 p-5 rounded-2xl bg-[#121214] border border-white/10">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D90302]" />
              <span>3. Cero Venta de Datos (Privacidad Total)</span>
            </h2>
            <p className="font-medium text-white text-sm">
              Tony's Grill NO vende, alquila, comercializa, transfiere ni cede bajo ninguna circunstancia los datos personales o números de teléfono de sus usuarios a terceros, empresas de telemercadeo, plataformas publicitarias ni bases de datos externas.
            </p>
            <p className="text-xs text-zinc-400">
              Su número de teléfono es utilizado únicamente para coordinar su visita directa en nuestro restaurante de Chiquimula.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              4. Seguridad y Almacenamiento Local
            </h2>
            <p>
              Este sitio web opera bajo protocolo seguro HTTPS con cifrado SSL. La información de los formularios no se almacena en servidores públicos expuestos, sino que se traslada de manera directa y cifrada a la aplicación oficial de WhatsApp al momento de hacer clic en enviar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              5. Derechos de Acceso y Cancelación
            </h2>
            <p>
              Cualquier comensal puede solicitar en cualquier momento la eliminación o actualización de su número de teléfono o datos de reserva comunicándose directamente a nuestro número de atención al cliente.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              6. Contacto de Privacidad
            </h2>
            <div className="text-xs font-mono space-y-1 text-zinc-300">
              <p>• Responsable: Tony's Grill Chiquimula</p>
              <p>• Dirección: {RESTAURANT_INFO.address}</p>
              <p>• Teléfono: {RESTAURANT_INFO.phone}</p>
              <p>• WhatsApp Oficial: {RESTAURANT_INFO.whatsapp}</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

