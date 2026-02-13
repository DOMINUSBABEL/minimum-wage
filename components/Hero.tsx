import React from 'react';
import { authors, institution, abstract } from '../data/paperData';
import { BookOpen, Building2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-blue-100 mb-4 md:mb-0">
            Visualización de Investigación
          </span>
          <span className="text-slate-400 text-sm">Publicado: 2024</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Efectos Macroeconómicos del <span className="text-blue-400">Salario Mínimo</span> en una Economía Emergente con <span className="text-emerald-400">Informalidad Laboral</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8 text-slate-300">
          <div className="flex items-start gap-2">
            <Building2 className="w-5 h-5 mt-1 text-blue-400" />
            <div>
              <p className="font-semibold text-white">{institution}</p>
              <p className="text-sm">Banco de la República</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <BookOpen className="w-5 h-5 mt-1 text-emerald-400" />
            <div>
              <p className="font-semibold text-white">Autores</p>
              <p className="text-sm">{authors.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-2">Resumen (Abstract)</h3>
          <p className="text-slate-300 leading-relaxed">
            {abstract}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;