import React from 'react';
import { findings } from '../data/paperData';
import { ArrowRightLeft, TrendingDown, Activity, Scale } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ArrowRightLeft: <ArrowRightLeft className="w-6 h-6 text-blue-500" />,
  TrendingDown: <TrendingDown className="w-6 h-6 text-red-500" />,
  Activity: <Activity className="w-6 h-6 text-amber-500" />,
  Scale: <Scale className="w-6 h-6 text-purple-500" />
};

const KeyFindings: React.FC = () => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 px-2 border-l-4 border-blue-600">Hallazgos Clave de la Investigación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {findings.map((finding, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              {iconMap[finding.icon]}
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{finding.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {finding.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFindings;