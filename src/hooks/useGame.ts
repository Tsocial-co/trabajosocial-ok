import { useState, useEffect, useCallback } from 'react';
import { Dilema, GameState, UserAnswer } from '../types';
import useLocalStorage from './useLocalStorage';
import dilemas from '../data/dilemas.json';

// Modificado: Ya no necesitamos seleccionar preguntas al azar
// Ahora usamos siempre las mismas 4 preguntas en orden
const getQuestions = (): Dilema[] => {
  return dilemas as Dilema[];
};

const initialGameState: GameState = {
  currentStep: 'start',
  countdownNumber: 3,
  selectedDilemas: [],
  currentDilemaIndex: 0,
  userAnswers: [],
  showDilemaSocial: false
};

const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [stats, setStats] = useLocalStorage<UserAnswer[]>('dilema-stats', []);

  // Inicializar juego con las 4 preguntas fijas
  const startGame = useCallback(() => {
    const selectedDilemas = getQuestions();
    setGameState({
      ...initialGameState,
      selectedDilemas,
      currentStep: 'countdown'
    });
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (gameState.currentStep === 'countdown') {
      if (gameState.countdownNumber > 0) {
        const timer = setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            countdownNumber: prev.countdownNumber - 1
          }));
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // When countdown reaches 0, show "PREGUNTA SOCIAL!" screen
        setGameState(prev => ({
          ...prev,
          showDilemaSocial: true
        }));
        
        // After showing "PREGUNTA SOCIAL!", move to the actual pregunta
        const timer = setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            currentStep: 'dilema',
            showDilemaSocial: false,
            countdownNumber: 3 // Reset for next countdown
          }));
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState.currentStep, gameState.countdownNumber, gameState.showDilemaSocial]);

  // Handle user answer selection
  const selectAnswer = useCallback((optionIndex: number) => {
    const currentDilema = gameState.selectedDilemas[gameState.currentDilemaIndex];
    const isCorrect = currentDilema.options[optionIndex].isCorrect;
    
    const newAnswer: UserAnswer = {
      dilemaId: currentDilema.id,
      selectedOption: optionIndex,
      isCorrect
    };
    
    // Update user answers and stats
    setGameState(prev => ({
      ...prev,
      userAnswers: [...prev.userAnswers, newAnswer],
      currentStep: 'stats'
    }));
    
    // Update local storage stats
    setStats(prev => [...prev, newAnswer]);
  }, [gameState.selectedDilemas, gameState.currentDilemaIndex, setStats]);

  // Move to next pregunta or show final results
  const nextDilema = useCallback(() => {
    if (gameState.currentDilemaIndex < gameState.selectedDilemas.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentDilemaIndex: prev.currentDilemaIndex + 1,
        currentStep: 'countdown'
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentStep: 'results'
      }));
    }
  }, [gameState.currentDilemaIndex, gameState.selectedDilemas.length]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  // Clear all stats
  const clearStats = useCallback(() => {
    setStats([]);
  }, [setStats]);

  return {
    gameState,
    startGame,
    selectAnswer,
    nextDilema,
    resetGame,
    clearStats,
    stats
  };
};

export default useGame;
