import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import StartScreen from './components/StartScreen';
import Countdown from './components/Countdown';
import DilemaSocial from './components/DilemaSocial';
import DilemaCard from './components/DilemaCard';
import StatsScreen from './components/StatsScreen';
import ResultsScreen from './components/ResultsScreen';
import BackgroundMusic from './components/BackgroundMusic';
import useGame from './hooks/useGame';

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { 
    gameState, 
    startGame, 
    selectAnswer, 
    nextDilema, 
    resetGame, 
    stats 
  } = useGame();

  // Handle music start
  const handleStartGame = () => {
    setIsMusicPlaying(true);
    startGame();
  };

  // Handle game reset
  const handleResetGame = () => {
    setIsMusicPlaying(false);
    resetGame();
  };

  // Reset music when page reloads
  useEffect(() => {
    return () => {
      setIsMusicPlaying(false);
    };
  }, []);

  const renderCurrentScreen = () => {
    switch (gameState.currentStep) {
      case 'start':
        return <StartScreen onStart={handleStartGame} />;
      
      case 'countdown':
        if (gameState.showDilemaSocial) {
          return <DilemaSocial />;
        }
        return <Countdown number={gameState.countdownNumber} />;
      
      case 'dilema':
        return (
          <DilemaCard 
            dilema={gameState.selectedDilemas[gameState.currentDilemaIndex]} 
            onSelectOption={selectAnswer} 
          />
        );
      
      case 'stats':
        return (
          <StatsScreen 
            currentDilema={gameState.currentDilemaIndex}
            totalDilemas={gameState.selectedDilemas.length}
            userAnswers={gameState.userAnswers}
            allStats={stats}
            onNext={nextDilema}
          />
        );
      
      case 'results':
        return (
          <ResultsScreen 
            userAnswers={gameState.userAnswers}
            onRestart={handleResetGame}
          />
        );
      
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="font-sans min-h-screen overflow-hidden">
      <Background />
      <BackgroundMusic isPlaying={isMusicPlaying} />
      <AnimatePresence mode="wait">
        {renderCurrentScreen()}
      </AnimatePresence>
    </div>
  );
}

export default App;
