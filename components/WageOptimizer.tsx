import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const WageOptimizer: React.FC = () => {
  // Valor aproximado actual de Colombia (90%)
  const [wageRatio, setWageRatio] = useState(90);

  // Generar curva de eficiencia
  const data = useMemo(() => {
    return Array.from({ length: 91 }, (_, i) => {
      const ratio = i + 30; // Rango de 30% a 120%
      
      // LÓGICA DEL MODELO basada en el mecanismo del paper:
      // 1. Aumentar salario mejora demanda agregada (Efecto Consumo) - Crecimiento logarítmico
      // 2. Aumentar salario incrementa drásticamente la informalidad (Efecto Sustitución) - Crecimiento exponencial
      
      const demandScore = 100 * (1 - Math.exp(-0.05 * ratio)); // Retornos decrecientes en demanda
      const costDrag = 0.012 * Math.pow(ratio, 2.1); // Arrastre exponencial por costos/informalidad
      
      // "Desempeño Económico" es Demanda menos el arrastre estructural de la informalidad
      let efficiency = demandScore - costDrag;
      
      // Normalizar a escala 0-100 para visualización
      efficiency = Math.max(0, efficiency + 20); 

      // Simulación de Tasa de Informalidad
      const informality = 30 + (0.006 * Math.pow(ratio, 2));

      return {
        ratio,
        efficiency, // Curva de "Output"
        informality,
        isCurrent: ratio === 90,
        isSelected: ratio === wageRatio
      };
    });
  }, [wageRatio]);

  // Encontrar el punto pico de eficiencia
  const optimalPoint = data.reduce((prev, current) => 
    (prev.efficiency > current.efficiency) ? prev : current
  );

  // Determinar mensaje de estado
  const getStatus = () => {
    if (Math.abs(wageRatio - optimalPoint.ratio) < 5) return {
      type: 'optimal',
      title: 'Balance Óptimo',
      desc: 'Producción formal máxima alcanzada. Beneficios marginales igualan costos marginales.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    };
    if (wageRatio < optimalPoint.ratio) return {
      type: 'low',
      title: 'Subóptimo (Baja Demanda)',
      desc: 'Salarios demasiado bajos para sostener un consumo agregado robusto, aunque la informalidad es baja.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    };
    return {
      type: 'high',
      title: 'Ineficiente (Alta Informalidad)',
      desc: 'Altos costos desvían empresas al sector informal. Se acelera la sustitución por maquinaria.',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 ring-4 ring-slate-50">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 mb-2">
           <TrendingUp className="w-6 h-6 text-blue-600" />
           <h2 className="text-2xl font-bold text-slate-900">Calculadora de Salario Óptimo</h2>
        </div>
        <p className="text-slate-600">
          Encuentra la <strong>Frontera de Eficiencia</strong>: El nivel salarial que maximiza la producción formal antes de que los efectos negativos de la informalidad predominen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sección de Controles */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ratio Salario Mín. / Mediana: <span className="text-blue-600 font-bold">{wageRatio}%</span>
            </label>
            <input
              type="range"
              min="30"
              max="120"
              step="1"
              value={wageRatio}
              onChange={(e) => setWageRatio(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>30% (Bajo)</span>
              <span>120% (Alto)</span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${status.border} ${status.bg} transition-all duration-300`}>
             <h4 className={`font-bold flex items-center gap-2 ${status.color}`}>
               {status.type === 'optimal' ? <CheckCircle2 className="w-5 h-5"/> : <AlertTriangle className="w-5 h-5"/>}
               {status.title}
             </h4>
             <p className={`text-sm mt-2 ${status.color} opacity-90`}>
               {status.desc}
             </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Puntaje Eficiencia Calc.:</span>
                <span className="font-mono font-bold text-slate-900">
                  {data.find(d => d.ratio === wageRatio)?.efficiency.toFixed(1)} / 100
                </span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Informalidad Proyectada:</span>
                <span className="font-mono font-bold text-slate-900">
                   {data.find(d => d.ratio === wageRatio)?.informality.toFixed(1)}%
                </span>
             </div>
             <div className="text-xs text-slate-400 italic mt-2">
               *Ratio actual Colombia: ~90%
             </div>
          </div>
        </div>

        {/* Sección de Gráfica */}
        <div className="lg:col-span-2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="ratio" 
                label={{ value: 'Salario Mínimo como % de la Mediana', position: 'insideBottom', offset: -10, fill: '#64748b' }}
                tick={{ fill: '#94a3b8' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                hide 
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(v) => `Ratio: ${v}%`}
              />
              
              {/* Curva de Eficiencia */}
              <Area 
                type="monotone" 
                dataKey="efficiency" 
                name="Eficiencia Económica"
                stroke="#2563eb" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEfficiency)" 
              />

              {/* Curva de Referencia Informalidad (Fantasma) */}
              <Area 
                type="monotone" 
                dataKey="informality" 
                name="Arrastre de Informalidad"
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none" 
              />

              {/* Línea de Selección Actual */}
              <ReferenceLine x={wageRatio} stroke="#0f172a" strokeWidth={2} strokeDasharray="3 3">
                <Label value="Seleccionado" position="top" fill="#0f172a" fontSize={12} fontWeight="bold" />
              </ReferenceLine>

              {/* Línea de Punto Óptimo */}
              <ReferenceLine x={optimalPoint.ratio} stroke="#10b981" strokeWidth={2}>
                 <Label value="Óptimo" position="top" fill="#10b981" fontSize={12} fontWeight="bold" />
              </ReferenceLine>

              {/* Línea de Contexto Colombia */}
              <ReferenceLine x={90} stroke="#64748b" strokeWidth={1} strokeOpacity={0.5}>
                 <Label value="Col" position="insideBottom" fill="#64748b" fontSize={10} />
              </ReferenceLine>

            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WageOptimizer;