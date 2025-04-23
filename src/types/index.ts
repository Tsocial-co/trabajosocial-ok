export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Dilema {
  id: number;
  title: string;
  options: Option[];
}

export interface UserAnswer {
  dilemaId: number;
  selectedOption: number;
  isCorrect: boolean;
}

export type GameStep = 'start' | 'countdown' | 'dilema' | 'stats' | 'results';

export interface GameState {
  currentStep: GameStep;
  countdownNumber: number;
  selectedDilemas: Dilema[];
  currentDilemaIndex: number;
  userAnswers: UserAnswer[];
  showDilemaSocial: boolean;
}
