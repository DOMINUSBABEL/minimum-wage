import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { impulseResponseData } from '../data/paperData';
import { Activity, Cog, Users } from 'lucide-react';

const ImpulseResponse: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'GDP' | 'Inflation' | 'Consumption' | 'Investment'>('GDP');
  const [showScenarios, setShowScenarios] = useState(false);

  const metricLabels: Record<string, string> = {
    'GDP': 'PIB',
    'Inflation': 'Inflación',
    'Consumption': 'Consumo',
    'Investment': 'Inversión'
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Simulación de Impacto Macro</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Respuesta ante un aumento inesperado de 100pb (1%) en el salario mínimo.
          </p>
        </div>
        
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-lg gap-1">
          {(['GDP', 'Inflation', 'Consumption', 'Investment'] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeMetric === metric 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {metricLabels[metric]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={showScenarios} 
            onChange={(e) => setShowScenarios(e.target.checked)}
            className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
          />
          <span className="text-xs sm:text-sm">Comparar Escenarios (Análisis de Sensibilidad)</span>
        </label>
      </div>

      <div className="h-[300px] sm:h-[400px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={impulseResponseData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              label={{ value: 'Trimestres', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 12 }} 
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              label={{ value: '% Desviación', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelFormatter={(label) => `Trimestre ${label}`}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{fontSize: '11px'}}/>
            <ReferenceLine y={0} stroke="#cbd5e1" />
            
            <Line 
              type="monotone" 
              dataKey={`Benchmark.${activeMetric}`} 
              name="Modelo Base" 
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={false} 
            />
            
            {showScenarios && (activeMetric === 'GDP' || activeMetric === 'Consumption') && (
              <>
                <Line 
                  type="monotone" 
                  dataKey={`NoMachinery.${activeMetric}`} 
                  name="Sin Maquinaria" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey={`NoInformality.${activeMetric}`} 
                  name="Sin Informalidad" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false} 
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
        
        {showScenarios && (activeMetric !== 'GDP' && activeMetric !== 'Consumption') && (
           <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[1px] rounded-lg border border-dashed border-slate-300 p-4 text-center">
             <p className="text-slate-500 font-medium text-sm">Comparación de escenarios solo disponible para PIB y Consumo</p>
           </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex gap-3">
          <div className="p-2 bg-blue-100 rounded-lg h-fit text-blue-600 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Resultado Base</h4>
            <p className="text-xs text-slate-600 mt-1">
              {activeMetric === 'GDP' && "PIB cae y se recupera lentamente."}
              {activeMetric === 'Inflation' && "Inflación sube por traslado de costos."}
              {activeMetric === 'Consumption' && "Consumo agregado cae."}
              {activeMetric === 'Investment' && "Inversión cae bruscamente."}
            </p>
          </div>
        </div>
        {/* Simplified explanations for mobile fitting */}
        <div className="flex gap-3 opacity-75">
          <div className="p-2 bg-emerald-100 rounded-lg h-fit text-emerald-600 shrink-0">
             <Cog className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Sin Maquinaria</h4>
            <p className="text-xs text-slate-600 mt-1">
              Menos contracción al usar más trabajo informal.
            </p>
          </div>
        </div>

        <div className="flex gap-3 opacity-75">
          <div className="p-2 bg-red-100 rounded-lg h-fit text-red-600 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Sin Informalidad</h4>
            <p className="text-xs text-slate-600 mt-1">
              Efectos magnificados; rápida automatización.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpulseResponse;