import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Minimize2, TrendingUp, Users } from 'lucide-react';

const StructuralBase: React.FC = () => {
  const [kaitzTarget, setKaitzTarget] = useState(90);

  // Model Logic based on the prompt
  // Current Colombia state: Kaitz = 90%, Employment Gap = -10% (0.9 factor)
  // Optimal state: Kaitz = 55%, Employment Gap = 0% (Full formal employment)
  
  const calculateData = (ratio: number) => {
    // Linear interpolation for illustration of the DSGE finding
    // If Ratio 90 -> Employment Capacity 90%
    // If Ratio 55 -> Employment Capacity 100%
    const slope = (100 - 90) / (55 - 90); 
    let capacity = 90 + slope * (ratio - 90);
    if (capacity > 100) capacity = 100;

    // Involuntary Unemployment (Theoretical)
    const unemployment = Math.max(0, 100 - capacity);

    return [
      { name: 'Empleo Formal', value: capacity, type: 'employment' },
      { name: 'Desempleo Involuntario / Informalidad', value: unemployment, type: 'gap' }
    ];
  };

  const data = calculateData(kaitzTarget);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-start gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
          <Minimize2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">1. Nivel Base: Salario de Vaciado de Mercado</h3>
          <p className="text-sm text-slate-600 mt-1">
            El objetivo es eliminar el desempleo involuntario ($u_t^F = 0$) ajustando el <strong>Índice de Kaitz</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Índice de Kaitz (Salario Mínimo / Salario Mediano)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={kaitzTarget} 
                onChange={(e) => setKaitzTarget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="font-mono font-bold text-lg text-blue-700 w-16 text-right">{kaitzTarget}%</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>55% (Estándar OCDE)</span>
              <span>90% (Actual Colombia)</span>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 rounded bg-emerald-50 text-emerald-800">
                <span className="text-sm font-medium">Capacidad de Empleo Formal</span>
                <span className="font-bold">{data[0].value.toFixed(1)}%</span>
             </div>
             <div className="flex justify-between items-center p-3 rounded bg-amber-50 text-amber-800">
                <span className="text-sm font-medium">Exceso de Oferta (Desempleo/Informalidad)</span>
                <span className="font-bold">{data[1].value.toFixed(1)}%</span>
             </div>
          </div>
        </div>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0"/>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 10}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === 'employment' ? '#10b981' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
        <p>
          <strong>Diagnóstico del Modelo:</strong> Actualmente (Kaitz 90%), el salario mínimo real supera el salario de equilibrio {"($w^F > w^{F,market}$)"}, generando una barrera de entrada que excluye al 10-15% de la fuerza laboral formal potencial. 
          Al reducir el índice hacia el 55%, el mercado "se vacía", absorbiendo trabajadores de la informalidad.
        </p>
      </div>
    </div>
  );
};

export default StructuralBase;