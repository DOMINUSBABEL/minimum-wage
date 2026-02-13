import React from 'react';
import Hero from './components/Hero';
import StatsComparison from './components/StatsComparison';
import ImpulseResponse from './components/ImpulseResponse';
import KeyFindings from './components/KeyFindings';
import WageOptimizer from './components/WageOptimizer';
import StructuralBase from './components/StructuralBase';
import DynamicRule from './components/DynamicRule';
import FiscalWedge from './components/FiscalWedge';
import { FileText, Github, Share2, CheckCircle, Menu } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navegación / Cabecera */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:block">MacroViz</span>
          </div>
          
          {/* Navegación Central - Scroll horizontal en móviles */}
          <nav className="flex-1 flex justify-center mx-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600 whitespace-nowrap px-2">
              <a href="#stats" className="hover:text-blue-600 transition-colors py-2">Datos</a>
              <a href="#simulation" className="hover:text-blue-600 transition-colors py-2">Simulación</a>
              <a href="#optimal-model" className="text-blue-600 hover:text-blue-800 transition-colors font-bold py-2">Modelo Óptimo</a>
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="text-slate-400 hover:text-slate-600 transition-colors p-1">
              <Share2 className="w-5 h-5" />
            </button>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors p-1">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
              <FileText className="w-4 h-4" />
              Ver PDF
            </a>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-0 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Columna Izquierda - Contexto de Datos */}
            <div className="lg:col-span-1 space-y-6 sm:space-y-8" id="stats">
              <StatsComparison />
              
              <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-xl mb-3">¿Por qué Colombia?</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                  Colombia sirve como ejemplo principal de una economía emergente donde el salario mínimo es alto relativo a la mediana salarial (90%), y la informalidad es generalizada (58%).
                </p>
                <div className="w-full bg-blue-500/30 h-1 rounded-full mb-4">
                  <div className="bg-white h-1 rounded-full w-[90%]"></div>
                </div>
                <p className="text-xs text-blue-200">90% Ratio Salario Mín/Mediana</p>
              </div>
            </div>

            {/* Columna Derecha - Simulación */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8" id="simulation">
               <ImpulseResponse />
               <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-2">Contexto del Modelo</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    La visualización anterior se basa en un modelo <strong>Neokeynesiano de Economía Pequeña y Abierta (TANK-SOE)</strong>.
                    Incorpora dos tipos de hogares (calificados y no calificados), capital de maquinaria y un mercado laboral dual (formal/informal).
                    La simulación asume un aumento permanente del 1% en el salario mínimo real.
                  </p>
               </div>
            </div>
          </div>

          {/* Sección Optimizador General */}
          <div className="mt-8 sm:mt-12">
            <WageOptimizer />
          </div>

          {/* NUEVO: Modelo de Óptimo Funcionamiento Detallado */}
          <div id="optimal-model" className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 scroll-mt-24">
            <div className="mb-8">
              <span className="text-blue-600 font-bold tracking-wide text-sm uppercase">Nuevo Apartado</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Modelo de Óptimo Funcionamiento Económico</h2>
              <p className="text-slate-600 mt-3 max-w-3xl text-base sm:text-lg">
                Según el documento del Banco de la República, para lograr el "menor salario posible" (en términos de carga marginal) con los mayores rendimientos, el diseño debe estructurarse en tres niveles matemáticos estrictos.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-12">
              <StructuralBase />
              <DynamicRule />
              <FiscalWedge />
            </div>

            {/* Resumen de Beneficios */}
            <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
               <h3 className="text-xl sm:text-2xl font-bold mb-6">Beneficios Macroeconómicos del Modelo Óptimo</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 font-bold text-emerald-300">
                       <CheckCircle className="w-5 h-5" />
                       <span>Consumo Sostenible</span>
                    </div>
                    <p className="text-sm text-slate-300">
                       Evita la caída del -0.09% en el consumo a largo plazo de los más pobres al garantizar empleo formal estable.
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 font-bold text-blue-300">
                       <CheckCircle className="w-5 h-5" />
                       <span>Inversión Expansiva</span>
                    </div>
                    <p className="text-sm text-slate-300">
                       El capital ($I^b$) se destina a crecimiento real e infraestructura, en lugar de automatización "defensiva" ($I^m$) para reemplazar empleados.
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 font-bold text-purple-300">
                       <CheckCircle className="w-5 h-5" />
                       <span>Freno a Informalidad</span>
                    </div>
                    <p className="text-sm text-slate-300">
                       Elimina el incentivo perverso de sustituir trabajo formal por informal al alinear el costo marginal ($mc_t$).
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 font-bold text-orange-300">
                       <CheckCircle className="w-5 h-5" />
                       <span>Política Monetaria</span>
                    </div>
                    <p className="text-sm text-slate-300">
                       Libera al Banco Central para mantener tasas {"($R_{pol}$)"} más bajas al eliminar presiones inflacionarias estructurales.
                    </p>
                  </div>
               </div>
            </div>
          </div>

          <div id="findings">
            <KeyFindings />
          </div>

          {/* Sección de Conclusión */}
          <div className="bg-white border border-slate-200 mt-12 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Conclusión Final</h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-6">
              "Las implicaciones macroeconómicas de los salarios mínimos son significativas. Un diseño óptimo requiere abandonar la discrecionalidad política en favor de reglas técnicas estrictas y una reducción de la carga fiscal sobre la nómina."
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Basado en el artículo <strong>"Macroeconomic Effects of the Minimum Wage in an Emerging Economy with Labor Informality"</strong> (2024).
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Visualización creada con fines educativos.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;