import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Star } from 'lucide-react';

const DilemaSocial: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-blue-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Grid background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }}></div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-20 right-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Star size={80} className="text-orange-500 fill-orange-500" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 left-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star size={60} className="text-orange-500 fill-orange-500" />
        </motion.div>
        
        <motion.div 
          className="absolute top-40 left-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap size={80} className="text-green-500 fill-green-500" />
        </motion.div>
        
        {/* Wavy decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-orange-400"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-orange-500"
            ></path>
          </svg>
        </div>
        
        {/* Main text with animation */}
        <div className="z-10 flex flex-col items-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-black text-white drop-shadow-lg mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            PREGUNTA
          </motion.h1>
          
          {/* Question mark instead of hand pointer */}
          <motion.div 
            className="mt-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="text-[80px] font-bold text-yellow-300">?</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DilemaSocial;
