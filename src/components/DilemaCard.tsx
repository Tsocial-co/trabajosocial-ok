import React from 'react';
import { motion } from 'framer-motion';
import { Dilema } from '../types';

interface DilemaCardProps {
  dilema: Dilema;
  onSelectOption: (index: number) => void;
}

const DilemaCard: React.FC<DilemaCardProps> = ({ dilema, onSelectOption }) => {
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
        <div className="bg-purple-100 p-6 flex flex-col items-center">
          {/* Image added above the text */}
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
          <h2 className="text-3xl font-black text-center text-gray-900 mb-2">PREGUNTA</h2>
          <h3 className="text-3xl font-black text-center text-gray-900">PARA TI</h3>
        </div>
        
        {/* Question */}
        <div className="p-6 bg-white">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 mb-6 flex items-center relative">
            <h3 className="text-xl font-bold text-gray-900">{dilema.title}</h3>
            <div className="absolute -right-4 -top-4 bg-peach-200 w-12 h-12 rounded-full flex items-center justify-center transform rotate-12">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17L6 9H18L12 17Z" fill="#FFA07A"/>
              </svg>
            </div>
          </div>
          
          {/* Options */}
          <div className="space-y-4">
            {dilema.options.map((option, index) => (
              <motion.button
                key={index}
                className="w-full bg-white rounded-2xl border-2 border-gray-200 p-4 flex items-center justify-start hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectOption(index)}
              >
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-800">
                    {index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'}
                  </span>
                </div>
                <p className="text-lg font-medium text-gray-800 text-left">{option.text}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DilemaCard;
