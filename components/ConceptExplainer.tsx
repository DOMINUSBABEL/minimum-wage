import React, { useState } from 'react';
import { BookOpen, BrainCircuit, GraduationCap, Users } from 'lucide-react';

type Concept = {
  id: string;
  term: string;
  simple: string;
  technical: string;
  icon: React.ReactNode;
};

const concepts: Concept[] = [
  {
    id: 'kaitz',
    term: 'Índice de Kaitz',
    simple: 'Es un termómetro que nos dice qué tan alto es el salario mínimo comparado con lo que gana una persona típica en el país. En Colombia marca "fiebre" (90%), mientras que en países desarrollados está más "sano" (55%).',
    technical: 'Ratio entre el salario mínimo nominal y la mediana salarial de la economía ($w_{min} / w_{median}$). Un índice alto (>60%) indica una restricción activa en el mercado laboral que genera desempleo estructural en segmentos de baja productividad.',
    icon: <Users className="w-5 h-5 text-blue-500" />
  },
  {
    id: 'market-clearing',
    term: 'Salario de Vaciado (Market Clearing)',
    simple: 'Es el salario ideal donde hay equilibrio: hay tantos puestos de trabajo como gente queriendo trabajar. Si obligas a pagar más que esto, sobran trabajadores (desempleo) porque las empresas no pueden costearlos.',
    technical: 'Nivel salarial ($w^{F,market}$) donde la oferta de trabajo iguala la demanda de trabajo ($L^s = L^d$) en ausencia de rigideces. Si el mínimo regulado es $w^F > w^{F,market}$, se genera un exceso de oferta laboral ($u_t^F > 0$).',
    icon: <BrainCircuit className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'wedge',
    term: 'Cuña Fiscal (Tax Wedge)',
    simple: 'Es la diferencia entre lo que le cuesta a la empresa contratarte y lo que realmente te llega al bolsillo. Si la empresa paga 100 pero tú recibes 80, esos 20 son la cuña. Si es muy alta, las empresas prefieren usar máquinas.',
    technical: 'Distorsión impositiva ($\tau^F$) que separa el costo laboral real pagado por la firma ($w_t^F(1+\tau^F)$) del ingreso neto del hogar. Eleva el costo marginal ($mc_t$), incentivando la sustitución de factores hacia capital ($K$) o trabajo informal ($L^I$).',
    icon: <GraduationCap className="w-5 h-5 text-emerald-500" />
  },
  {
    id: 'productivity',
    term: 'Productividad Marginal',
    simple: 'Es el valor extra que produce el último trabajador contratado. Una empresa solo te contratará si lo que produces vale más de lo que cuesta tu salario. Si el salario mínimo sube por encima de tu productividad, dejas de ser rentable.',
    technical: 'Contribución adicional al producto total generada por una unidad extra de trabajo ($\partial Y / \partial L$). En equilibrio de maximización de beneficios, el salario real debe igualar la productividad marginal ($w = MPL$).',
    icon: <BookOpen className="w-5 h-5 text-orange-500" />
  }
];

const ConceptExplainer: React.FC = () => {
  const [mode, setMode] = useState<'simple' | 'technical'>('simple');

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-sm border border-slate-200 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Glosario Interactivo</h2>
          <p className="text-slate-600 mt-2">
            Entiende los conceptos fundamentales detrás del modelo.
          </p>
        </div>

        <div className="bg-slate-100 p-1 rounded-lg flex items-center shrink-0">
          <button
            onClick={() => setMode('simple')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              mode === 'simple' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Ciudadano
          </button>
          <button
            onClick={() => setMode('technical')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              mode === 'technical' 
                ? 'bg-white text-purple-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Economista
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept) => (
          <div 
            key={concept.id} 
            className={`p-6 rounded-xl border transition-all duration-300 ${
              mode === 'simple' 
                ? 'bg-slate-50 border-slate-200 hover:border-blue-300' 
                : 'bg-slate-900 border-slate-700 hover:border-purple-500'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${mode === 'simple' ? 'bg-white shadow-sm' : 'bg-slate-800'}`}>
                {concept.icon}
              </div>
              <h3 className={`font-bold text-lg ${mode === 'simple' ? 'text-slate-900' : 'text-white'}`}>
                {concept.term}
              </h3>
            </div>
            
            <div className="relative min-h-[80px]">
              <p className={`text-sm leading-relaxed transition-opacity duration-300 ${
                mode === 'simple' ? 'text-slate-600' : 'text-slate-300 font-mono'
              }`}>
                {mode === 'simple' ? concept.simple : concept.technical}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptExplainer;