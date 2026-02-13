import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { comparativeData } from '../data/paperData';

const StatsComparison: React.FC = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Diferencias Estructurales</h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Comparación de indicadores del mercado laboral entre Economías de Mercado Emergentes (EMEs), Economías Avanzadas (AEs) y Colombia.
        </p>
      </div>

      <div className="h-[300px] sm:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparativeData}
            margin={{
              top: 20,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="category" 
              tick={{ fill: '#64748b', fontSize: 10 }} 
              axisLine={false}
              tickLine={false}
              interval={0}
              tickMargin={10}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 11 }} 
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
            <Bar dataKey="EMEs" fill="#3b82f6" name="Emergentes" radius={[4, 4, 0, 0]} />
            <Bar dataKey="AEs" fill="#94a3b8" name="Avanzadas" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Colombia" fill="#10b981" name="Colombia" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <span className="font-semibold text-blue-900 block mb-1">Dato Clave 1:</span>
          <p className="text-blue-700 text-xs sm:text-sm">El S.M. afecta a 2x más trabajadores en EMEs que en AEs.</p>
        </div>
        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
          <span className="font-semibold text-emerald-900 block mb-1">Dato Clave 2:</span>
          <p className="text-emerald-700 text-xs sm:text-sm">La informalidad en Colombia (58%) es comparablemente alta al promedio.</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="font-semibold text-slate-900 block mb-1">Dato Clave 3:</span>
          <p className="text-slate-700 text-xs sm:text-sm">El S.M. es el 90% del salario mediano en Colombia (Piso alto).</p>
        </div>
      </div>
    </div>
  );
};

export default StatsComparison;