import { useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  isPlaying: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.createElement('audio');
    audioRef.current.src = 'background-music.mp3';
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const playAudio = () => {
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.error("Error playing audio:", err);
          });
        }
      };
      
      playAudio();
      
      // Asegurarse de que el audio se reproduzca después de interacción del usuario
      const handleUserInteraction = () => {
        playAudio();
      };
      
      window.addEventListener('click', handleUserInteraction);
      window.addEventListener('touchstart', handleUserInteraction);
      
      return () => {
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
      };
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return null;
};

export default BackgroundMusic;
