import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { UserAnswer } from '../types';
import { Star, Smile } from 'lucide-react';

interface ResultsScreenProps {
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ userAnswers, onRestart }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Count correct and incorrect answers
    const correct = userAnswers.filter(answer => answer.isCorrect).length;
    const incorrect = userAnswers.length - correct;
    
    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    
    // Prepare chart data
    setChartData([
      { name: 'Correctas', value: correct },
      { name: 'Por mejorar', value: incorrect }
    ]);
  }, [userAnswers]);

  // Colors for the pie chart
  const COLORS = ['#4ade80', '#fbbf24'];

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-gradient-to-b from-purple-50 to-pink-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-white rounded-xl p-4 mb-2"
          >
            {/* Replace icon with image */}
            <img 
              src="/lu.svg" 
              alt="Logo" 
              className="w-48 h-auto mx-auto"
            />
          </motion.div>
          <h2 className="text-4xl font-black text-center text-white mb-2">ESTUDIA</h2>
          <h3 className="text-3xl font-black text-center text-white">TRABAJO SOCIAL</h3>
        </div>
        
        {/* Results */}
        <div className="p-6 bg-white">
          {/* Chart */}
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Results cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Correct answers */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Smile size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">CORRECTOS</h4>
                <p className="text-4xl font-black text-green-500">{correctAnswers}</p>
                <p className="text-sm text-gray-600">Acertaste estas respuestas</p>
              </div>
            </div>
            
            {/* Incorrect answers */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Star size={24} className="text-yellow-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">POR MEJORAR</h4>
                <p className="text-4xl font-black text-yellow-500">{incorrectAnswers}</p>
                <p className="text-sm text-gray-600">Analiza un poco mejor cada situación</p>
              </div>
            </div>
          </div>
          
          {/* Feedback based on score */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Tu resultado:</h4>
            {correctAnswers >= 3 ? (
              <p className="text-gray-700">
                ¡Excelente! Tienes un buen conocimiento sobre el programa de Trabajo Social de la Universidad Mariana. Comprendes la visión integral, las competencias esperadas, las áreas de intervención y el enfoque práctico que ofrece la universidad.
              </p>
            ) : correctAnswers >= 2 ? (
              <p className="text-gray-700">
                Buen trabajo. Tienes una comprensión básica del programa de Trabajo Social, pero hay aspectos que podrías conocer mejor, como la visión integral del programa, las competencias que desarrollarás o las diversas áreas de intervención profesional.
              </p>
            ) : (
              <p className="text-gray-700">
                Hay oportunidades para conocer mejor el programa de Trabajo Social de la Universidad Mariana. Te invitamos a explorar más sobre la visión del programa, las competencias que desarrollarás, las áreas de intervención y el enfoque práctico que ofrece la universidad.
              </p>
            )}
          </div>
          
          {/* Added text about the Social Work program */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Estudia el Programa Trabajo Social</h4>
            <p className="text-gray-700 mb-4">
              Los (as) estudiantes de Trabajo Social tienen una sólida formación en investigación que les permite comprender, interpretar e incidir en distintos procesos sociales, mediante la generación e implementación de propuestas de desarrollo integral como eje de un proyecto de sociedad democrática e incluyente. Su accionar se centra en las realidades de familias, grupos, entornos comunitarios y organizacionales, reconociendo y valorando su diversidad. 
            </p>
            
            {/* Green card for program details */}
            <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 mb-4">
              <h4 className="text-lg font-bold text-green-800 mb-2">DETALLES</h4>
              <p className="text-green-800 font-medium">
                PROGRAMA TRABAJO SOCIAL ACREDITADO EN ALTA CALIDAD<br />
                DURACIÓN: 10 SEMESTRES<br />
                VALOR DE LA MATRICULA: 3.537.000<br />
                DURACIÓN: 10 SEMESTRES
              </p>
            </div>
            
            {/* Modified "Inscripciones abiertas" title with blue highlight below details card */}
            <motion.div 
              className="text-center mt-4 mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                color: ["#1e40af", "#3b82f6", "#1e40af"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <h3 className="text-2xl font-black text-blue-800 border-b-4 border-blue-800 pb-2 inline-block">
                INSCRIPCIONES ABIERTAS
              </h3>
            </motion.div>
          </div>
          
          {/* Single centered image */}
          <div className="flex justify-center mb-6">
            <div className="rounded-xl overflow-hidden h-32 w-full max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Grupo de personas diversas sonriendo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Restart button */}
          <motion.button
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
          >
            JUGAR DE NUEVO
          </motion.button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full max-w-2xl mt-6 p-4 flex justify-center">
        <button 
          className="text-blue-600 font-medium hover:underline"
          onClick={onRestart}
        >
          ESTUDIA TRABAJO SOCIAL
        </button>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;
