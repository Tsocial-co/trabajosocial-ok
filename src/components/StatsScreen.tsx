import React from 'react';
import { motion } from 'framer-motion';
import { Dilema, UserAnswer } from '../types';

interface StatsScreenProps {
  currentDilema: number;
  totalDilemas: number;
  userAnswers: UserAnswer[];
  allStats: UserAnswer[];
  onNext: () => void;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ 
  currentDilema, 
  totalDilemas, 
  userAnswers, 
  allStats, 
  onNext 
}) => {
  // Obtener la respuesta actual del usuario
  const currentAnswer = userAnswers[userAnswers.length - 1];
  
  // Obtener el dilema correspondiente a la respuesta actual
  const dilema = allStats.find(stat => stat.dilemaId === currentAnswer.dilemaId);
  
  // Explicaciones específicas para cada pregunta
  const getExplanation = () => {
    switch (currentAnswer.dilemaId) {
      case 1:
        return currentAnswer.isCorrect 
          ? "¡Correcto! La formación en Trabajo Social debe centrarse en el desarrollo de competencias investigativas que permitan actuar críticamente sobre la realidad social desde una perspectiva inclusiva y democrática. Esta visión refleja el enfoque integral y crítico del programa."
          : "La respuesta correcta es: La formación en Trabajo Social debe centrarse en el desarrollo de competencias investigativas que permitan actuar críticamente sobre la realidad social desde una perspectiva inclusiva y democrática. El programa no se limita a un enfoque asistencial o a ejecutar políticas sin análisis crítico.";
      case 2:
        return currentAnswer.isCorrect 
          ? "¡Correcto! Un egresado de Trabajo Social de la Universidad Mariana debe desarrollar capacidad crítica, ética, compromiso social, trabajo interdisciplinario y uso de tecnología para intervenir en diversos contextos sociales."
          : "La respuesta correcta es: Capacidad crítica, ética, compromiso social, trabajo interdisciplinario y uso de tecnología para intervenir en individuos, familias, grupos y comunidades. El Trabajo Social va más allá de habilidades administrativas o técnicas específicas.";
      case 3:
        return currentAnswer.isCorrect 
          ? "¡Correcto! Un trabajador social puede intervenir en múltiples áreas: familia, salud, comunidad, organizaciones, educación, medio ambiente e infraestructura y organismos internacionales, lo que demuestra la versatilidad de la profesión."
          : "La respuesta correcta es: En el área de familia, salud, comunidad, organizaciones, educación, medio ambiente e infraestructura y organismos internacionales. El campo de acción del Trabajo Social es amplio y diverso.";
      case 4:
        return currentAnswer.isCorrect 
          ? "¡Correcto! La Universidad Mariana destaca la integración de prácticas preprofesionales en contextos reales con enfoque ético, lo que permite a los estudiantes aplicar sus conocimientos en situaciones reales."
          : "La respuesta correcta es: Integración de prácticas preprofesionales en contextos reales con enfoque ético. Esto permite a los estudiantes aplicar sus conocimientos teóricos en situaciones reales con una perspectiva ética.";
      default:
        return currentAnswer.isCorrect 
          ? "¡Respuesta correcta! Has elegido la opción más adecuada." 
          : "La respuesta correcta era diferente a la que seleccionaste.";
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className={`p-6 flex flex-col items-center ${currentAnswer.isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}>
          {/* Added logo above the text */}
          <img 
            src="/lu.svg" 
            alt="Logo" 
            className="w-48 h-auto mb-4 mx-auto"
          />
          <div className="bg-peach-100 rounded-full px-4 py-1 text-orange-800 text-sm font-medium mb-2">
            ESTUDIA
          </div>
          <div className="bg-yellow-100 rounded-full px-4 py-1 text-yellow-800 text-sm font-medium mb-4">
            TRABAJO SOCIAL
          </div>
          <h2 className={`text-3xl font-black text-center ${currentAnswer.isCorrect ? 'text-green-800' : 'text-yellow-800'} mb-2`}>
            {currentAnswer.isCorrect ? '¡CORRECTO!' : 'INCORRECTO'}
          </h2>
          <h3 className={`text-xl font-bold text-center ${currentAnswer.isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {currentAnswer.isCorrect ? 'Muy bien hecho' : 'Puedes mejorar'}
          </h3>
        </div>
        
        {/* Stats */}
        <div className="p-6 bg-white">
          {/* Question */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">La pregunta era:</h3>
            <p className="text-gray-700">Pregunta {currentDilema + 1} de {totalDilemas}</p>
          </div>
          
          {/* Selected option */}
          <div className={`rounded-2xl border-2 ${currentAnswer.isCorrect ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'} p-4 mb-6`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tu respuesta:</h3>
            <p className="text-gray-700">Opción {currentAnswer.selectedOption + 1}</p>
          </div>
          
          {/* Explanation */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reflexión sobre tu respuesta:</h3>
            <p className="text-gray-700">
              {getExplanation()}
            </p>
          </div>
          
          {/* Next button */}
          <motion.button
            className={`w-full py-4 ${currentAnswer.isCorrect ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'} text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all`}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
          >
            SIGUIENTE
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsScreen;
