import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Minimize2 } from 'lucide-react';

const StructuralBase: React.FC = () => {
  const [kaitzTarget, setKaitzTarget] = useState(90);

  const calculateData = (ratio: number) => {
    const slope = (100 - 90) / (55 - 90); 
    let capacity = 90 + slope * (ratio - 90);
    if (capacity > 100) capacity = 100;
    const unemployment = Math.max(0, 100 - capacity);
    return [
      { name: 'Empleo Formal', value: capacity, type: 'employment' },
      { name: 'Desempleo/Informal.', value: unemployment, type: 'gap' }
    ];
  };

  const data = calculateData(kaitzTarget);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-start gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
          <Minimize2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">1. Nivel Base: Vaciado de Mercado</h3>
          <p className="text-sm text-slate-600 mt-1">
            Objetivo: Eliminar desempleo involuntario ajustando el <strong>Índice de Kaitz</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Índice de Kaitz: <span className="font-mono font-bold text-lg text-blue-700 ml-2">{kaitzTarget}%</span>
            </label>
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={kaitzTarget} 
              onChange={(e) => setKaitzTarget(Number(e.target.value))}
              className="w-full h-8 bg-transparent cursor-pointer accent-blue-600 touch-none"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>55% (OCDE)</span>
              <span>90% (COL)</span>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 rounded bg-emerald-50 text-emerald-800 text-sm">
                <span className="font-medium">Capacidad Empleo Formal</span>
                <span className="font-bold">{data[0].value.toFixed(1)}%</span>
             </div>
             <div className="flex justify-between items-center p-3 rounded bg-amber-50 text-amber-800 text-sm">
                <span className="font-medium">Brecha Informalidad</span>
                <span className="font-bold">{data[1].value.toFixed(1)}%</span>
             </div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0"/>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" width={110} tick={{fontSize: 11, fontWeight: 500}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === 'employment' ? '#10b981' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StructuralBase;