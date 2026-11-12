import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const TermsPage: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#EBFA00] mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Documento Legal Oficial</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Términos y <span className="text-[#D90302]">Condiciones</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-light">
            Última actualización: Noviembre 2026 • Tony's Grill Chiquimula, Guatemala.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              1. Aceptación y Objeto del Servicio
            </h2>
            <p>
              El presente documento establece las condiciones que rigen el acceso y uso del sitio web oficial de <strong>Tony's Grill</strong> (<span className="text-zinc-200 font-mono">tonysgrillgt.com</span>). Al navegar, consultar el menú o utilizar nuestros formularios de enlace a WhatsApp, el usuario acepta de manera íntegra y sin reservas los presentes Términos y Condiciones.
            </p>
          </section>

          <section className="space-y-3 p-5 rounded-2xl bg-[#121214] border border-white/10">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#EBFA00]" />
              <span>2. Precios en Quetzales (Q) e Impuestos (IVA)</span>
            </h2>
            <p>
              Todos los precios de platillos, bebidas, especialidades a la parrilla y promociones exhibidos en nuestro Menú Web, Menú Digital en PDF o módulos promocionales están expresados en <strong>Quetzales (Q)</strong>, moneda de curso legal de la República de Guatemala.
            </p>
            <p className="font-medium text-white">
              Todos los precios incluyen el Impuesto al Valor Agregado (IVA) correspondiente de conformidad con la legislación tributaria guatemalteca.
            </p>
            <p className="text-[11px] text-zinc-400">
              * Tony's Grill se reserva el derecho de actualizar los precios sin previo aviso debido a disponibilidad de insumos de temporada o fluctuaciones de mercado.
            </p>
          </section>

          <section className="space-y-3 p-5 rounded-2xl bg-[#121214] border border-white/10">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D90302]" />
              <span>3. Políticas de Reservación y Disponibilidad</span>
            </h2>
            <p>
              El servicio de reservaciones disponible a través de este portal canaliza la solicitud del usuario directamente con nuestro equipo de atención mediante WhatsApp.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li>
                <strong>Sujeto a Disponibilidad:</strong> Toda solicitud de reservación está estrictamente sujeta a la disponibilidad de mesas, comensales y aforo del restaurante en la fecha y hora seleccionadas.
              </li>
              <li>
                <strong>Confirmación Requerida:</strong> La reservación se considerará formalizada únicamente cuando el personal de Tony's Grill envíe la confirmación expresa vía WhatsApp.
              </li>
              <li>
                <strong>Tolerancia de Horario:</strong> Las mesas reservadas se mantendrán por un tiempo máximo de cortesía de 15 minutos tras la hora pactada antes de ser reasignadas al público general.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              4. Servicio de Banquetes y Eventos Especiales
            </h2>
            <p>
              Las cotizaciones para banquetes, ocasiones especiales o menús personalizados tienen carácter informativo inicial y deberán ser formalizadas mediante anticipo y acuerdo mutuo por escrito con la administración de Tony's Grill.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              5. Propiedad Intelectual
            </h2>
            <p>
              Todos los derechos sobre el nombre comercial, logotipo oficial, fotografías de cortes, recetas y diseño gráfico del restaurante son propiedad exclusiva de Tony's Grill. Queda prohibida su reproducción o explotación no autorizada.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              6. Datos de Contacto Oficial
            </h2>
            <p className="text-zinc-400">
              Para consultas relativas a estos términos, puede contactarnos en:
            </p>
            <div className="text-xs font-mono space-y-1 text-zinc-300">
              <p>• Dirección: {RESTAURANT_INFO.address}</p>
              <p>• Teléfono: {RESTAURANT_INFO.phone}</p>
              <p>• WhatsApp: {RESTAURANT_INFO.whatsapp}</p>
              <p>• Chiquimula, Guatemala 20001</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

