export const authors = [
  "Oscar Iván Ávila-Montealegre",
  "Anderson Grajales-Olarte",
  "Juan J. Ospina-Tejeiro",
  "Mario A. Ramos-Veloza"
];

export const institution = "Banco de la República de Colombia";

export const abstract = "Este estudio analiza cómo el salario mínimo afecta a una economía emergente típica con alta informalidad laboral utilizando un modelo extendido neokeynesiano de economía pequeña y abierta. Los hallazgos sugieren que un aumento inesperado en el salario mínimo afecta desproporcionadamente a los trabajadores poco calificados, elevando los costos de producción e induciendo la sustitución hacia el trabajo informal y la maquinaria. Esto conduce a una menor producción, empleo y exportaciones netas, al tiempo que altera la transmisión de los choques macroeconómicos.";

// Datos Tabla 1: Comparación entre Economías Emergentes (EMEs), Avanzadas (AEs) y Colombia
export const comparativeData = [
  {
    category: "Trabajadores con S.M.",
    EMEs: 19.8,
    AEs: 9.0,
    Colombia: 15.7,
    unit: "%"
  },
  {
    category: "Tasa de informalidad",
    EMEs: 69.5,
    AEs: 7.8,
    Colombia: 58.1,
    unit: "%"
  },
  {
    category: "Salario Mín / Mediana",
    EMEs: 67,
    AEs: 55,
    Colombia: 90,
    unit: "%"
  },
  {
    category: "Salario Mín / Promedio",
    EMEs: 45,
    AEs: 41,
    Colombia: 54,
    unit: "%"
  }
];

// Datos aproximados para Funciones de Impulso-Respuesta (Figuras 2 y 3)
// Tiempo en Trimestres
export const impulseResponseData = Array.from({ length: 21 }, (_, i) => {
  const t = i;
  
  // Formas base para el modelo Benchmark (aproximado)
  const gdpBench = -0.15 * Math.exp(-0.2 * t) * Math.cos(0.1 * t); 
  const inflBench = 0.15 * Math.exp(-0.5 * t); 
  const consBench = -0.1 * (1 - Math.exp(-0.1 * t)) + 0.05 * Math.exp(-0.5 * t); // Subida a corto plazo, caída a largo
  const invBench = -1.5 * Math.exp(-0.4 * t);
  const informalLaborBench = 0.5 * Math.exp(-0.3 * t);
  const formalLaborBench = -1.0 * Math.exp(-0.3 * t);

  // Escenarios para análisis de sensibilidad (aprox. Figura 3)
  
  // Sin Maquinaria (NoKx): Contracción menor, consumo cae menos
  const gdpNoKx = gdpBench * 0.6; 
  const consNoKx = consBench + 0.05; 

  // Sin Informalidad (NoI): Contracción magnificada
  const gdpNoI = gdpBench * 1.5;
  const consNoI = consBench - 0.1;

  return {
    time: t,
    Benchmark: {
      GDP: gdpBench,
      Inflation: inflBench,
      Consumption: consBench,
      Investment: invBench,
      InformalLabor: informalLaborBench,
      FormalLabor: formalLaborBench
    },
    NoMachinery: {
      GDP: gdpNoKx,
      Consumption: consNoKx
    },
    NoInformality: {
      GDP: gdpNoI,
      Consumption: consNoI
    }
  };
});

export const findings = [
  {
    title: "Efecto Sustitución",
    description: "Un salario mínimo más alto eleva los costos de producción, induciendo a las empresas a sustituir trabajadores formales por trabajo informal y maquinaria.",
    icon: "ArrowRightLeft"
  },
  {
    title: "Contracción Económica",
    description: "La sustitución conduce a una menor producción general (PIB), menor empleo formal y menores exportaciones netas a largo plazo.",
    icon: "TrendingDown"
  },
  {
    title: "Transmisión de Choques",
    description: "La existencia de un salario mínimo altera la transmisión de los choques de productividad y demanda, haciendo sus efectos más persistentes.",
    icon: "Activity"
  },
  {
    title: "Desigualdad vs. Volatilidad",
    description: "Aunque el salario mínimo mitiga la desigualdad de consumo a corto plazo, aumenta significativamente la volatilidad del empleo.",
    icon: "Scale"
  }
];