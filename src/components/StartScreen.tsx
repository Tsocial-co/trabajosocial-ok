import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Hash } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={40} className="text-yellow-400" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 left-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Hash size={40} className="text-pink-500" />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 left-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap size={40} className="text-blue-500" />
      </motion.div>
      
      {/* Image added above the title */}
      <motion.img 
        src="/lu.svg" 
        alt="Logo" 
        className="w-64 h-auto mb-6 mx-auto"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
      />
      
      {/* Title with animation */}
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        ¿Y tú qué harías?
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl mb-12 max-w-2xl text-gray-700"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
      >
        Una experiencia interactiva que te hará reflexionar sobre tus decisiones
      </motion.p>
      
      {/* Start button with hover effect */}
      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        onClick={onStart}
      >
        COMENZAR
      </motion.button>
      
      {/* Decorative footer */}
      <motion.div 
        className="absolute bottom-10 w-full flex justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-400"></span>
        <span className="w-3 h-3 rounded-full bg-pink-500"></span>
        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
