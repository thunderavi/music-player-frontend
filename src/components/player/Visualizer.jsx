import React, { useRef, useEffect } from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import './Visualizer.css';

const Visualizer = () => {
  const { isPlaying } = usePlayer();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    // Only initialize if playing and not already initialized
    if (!audioCtxRef.current) {
      const audio = document.querySelector('audio');
      if (!audio) return;

      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        analyser.fftSize = 256;
        
        audioCtxRef.current = audioCtx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch (err) {
        console.error('AudioContext initialization failed:', err);
      }
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const red = (barHeight + 100) * 1;
        const green = (i * 2) * 1;
        const blue = (i * 4) * 1;

        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    if (isPlaying) {
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      draw();
    } else {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="visualizer-container">
      <canvas ref={canvasRef} width="1000" height="90" />
    </div>
  );
};

export default Visualizer;
