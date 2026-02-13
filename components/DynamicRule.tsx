import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, AlertCircle } from 'lucide-react';

const DynamicRule: React.FC = () => {
  const [politicalShock, setPoliticalShock] = useState(2); 
  const [productivity, setProductivity] = useState(1.5); 

  const simulationData = useMemo(() => {
    const years = 10;
    const baseWage = 100;
    const inflation = 0.03; 
    let currentTechWage = baseWage;
    let currentPolWage = baseWage;
    const data = [];

    for (let t = 0; t <= years; t++) {
      data.push({
        year: `A${t}`,
        Tecnico: Math.round(currentTechWage),
        Politico: Math.round(currentPolWage),
        Gap: Math.round(currentPolWage - currentTechWage)
      });
      currentTechWage = currentTechWage * (1 + inflation) * (1 + (productivity / 100));
      currentPolWage = currentPolWage * (1 + inflation) * (1 + (productivity / 100)) * (1 + (politicalShock / 100));
    }
    return data;
  }, [politicalShock, productivity]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-start gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg text-purple-600 shrink-0">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">2. Regla de Ajuste Dinámico</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-mono bg-slate-100 p-1 rounded inline-block">
            ΔW = π × ΔMP_L × (1 + ε)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Choque Político ($\epsilon$)
            </label>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.5"
              value={politicalShock} 
              onChange={(e) => setPoliticalShock(Number(e.target.value))}
              className="w-full h-8 bg-transparent cursor-pointer accent-purple-600 touch-none"
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-slate-500">0% (Téc.)</span>
              <span className="font-bold text-purple-700 text-sm">{politicalShock}% Extra</span>
            </div>
            {politicalShock > 0 && (
               <div className="mt-2 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                 <AlertCircle className="w-4 h-4 shrink-0" />
                 <span>Volatilidad en empleo</span>
               </div>
            )}
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-700 mb-2">
              Productividad Laboral %
            </label>
            <input 
              type="number" 
              value={productivity} 
              onChange={(e) => setProductivity(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm">
            <h4 className="font-bold text-slate-800 mb-2">Resultado a 10 años</h4>
            <div className="flex justify-between mb-1">
               <span>Salario Técnico:</span>
               <span className="font-mono text-blue-600">{simulationData[10].Tecnico}</span>
            </div>
            <div className="flex justify-between mb-1">
               <span>Con Choques:</span>
               <span className="font-mono text-purple-600">{simulationData[10].Politico}</span>
            </div>
            <div className="border-t border-slate-200 pt-1 mt-1 flex justify-between font-bold">
               <span>Divergencia:</span>
               <span className="text-red-500">+{simulationData[10].Gap}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{fontSize: 11}} />
              <YAxis domain={['auto', 'auto']} tick={{fontSize: 11}} width={30} />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend wrapperStyle={{fontSize: '12px'}} />
              <Line type="monotone" dataKey="Tecnico" stroke="#2563eb" name="Regla Técnica" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Politico" stroke="#9333ea" name="Con Choque" strokeWidth={2} strokeDasharray={politicalShock > 0 ? "0" : "5 5"} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DynamicRule;