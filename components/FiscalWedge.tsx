import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';
import { Scissors, Coins } from 'lucide-react';

const FiscalWedge: React.FC = () => {
  const [taxRate, setTaxRate] = useState(20); 

  const baseWage = 1000;
  
  const calculateCosts = (tax: number) => {
     const totalCost = baseWage * (1 + (tax / 100));
     const taxes = totalCost - baseWage;
     const automationRisk = totalCost > 1100 ? 'Alto' : totalCost > 1050 ? 'Medio' : 'Bajo';
     return { totalCost, taxes, automationRisk };
  };

  const current = calculateCosts(taxRate);
  const optimal = calculateCosts(0); 

  const data = [
    {
      name: 'Actual',
      wage: baseWage,
      taxes: current.taxes,
      total: current.totalCost,
      risk: current.automationRisk
    },
    {
      name: 'Óptimo',
      wage: baseWage,
      taxes: optimal.taxes,
      total: optimal.totalCost,
      risk: optimal.automationRisk
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-start gap-3 mb-6">
        <div className="bg-orange-100 p-2 rounded-lg text-orange-600 shrink-0">
          <Scissors className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">3. La Cuña Fiscal ($\tau^F$)</h3>
          <p className="text-sm text-slate-600 mt-1">
            Reducir costos no salariales para abaratar el costo marginal ($mc_t$).
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-6">
          <div>
             <label className="block text-sm font-semibold text-slate-700 mb-2">
              Impuestos Nómina
            </label>
            <input 
              type="range" 
              min="0" 
              max="40" 
              step="1"
              value={taxRate} 
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full h-8 bg-transparent cursor-pointer accent-orange-600 touch-none"
            />
            <div className="flex justify-between items-center mt-1 text-sm">
              <span className="font-bold text-emerald-600">0%</span>
              <span className="font-bold text-orange-600">{taxRate}% (Actual)</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
             <div className="flex items-center gap-2 mb-3">
               <Coins className="w-5 h-5 text-slate-600"/>
               <h4 className="font-bold text-slate-800 text-sm">Costo Empresa</h4>
             </div>
             
             <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                   <span>Salario:</span>
                   <span className="font-mono text-slate-900">${baseWage}</span>
                </div>
                <div className="flex justify-between text-orange-600">
                   <span>Impuestos:</span>
                   <span className="font-mono">+${current.taxes.toFixed(0)}</span>
                </div>
                <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-lg">
                   <span>Total:</span>
                   <span>${current.totalCost.toFixed(0)}</span>
                </div>
             </div>

             <div className={`mt-4 text-center p-2 rounded font-bold text-xs sm:text-sm ${current.automationRisk === 'Alto' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                Riesgo Automatización: {current.automationRisk}
             </div>
          </div>
        </div>

        <div className="md:w-2/3 h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={data} layout="vertical" margin={{left: 0, right: 40}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0"/>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={60} tick={{fontSize: 11, fontWeight: 600}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Bar dataKey="wage" name="Ingreso" stackId="a" fill="#10b981" barSize={40} />
                <Bar dataKey="taxes" name="Impuesto" stackId="a" fill="#ea580c" barSize={40}>
                   <LabelList dataKey="total" position="right" formatter={(val: number) => `$${val}`} fontSize={11} />
                </Bar>
             </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FiscalWedge;