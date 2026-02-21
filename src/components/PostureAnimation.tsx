import React from 'react';
import { motion } from 'motion/react';

interface PostureAnimationProps {
  exerciseName: string;
}

export const PostureAnimation: React.FC<PostureAnimationProps> = ({ exerciseName }) => {
  const name = exerciseName.toLowerCase();

  // Squat Animation
  if (name.includes('squat')) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Floor */}
        <line x1="10" y1="90" x2="90" y2="90" stroke="#e5e7eb" strokeWidth="2" />
        
        <motion.g
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Head */}
          <circle cx="50" cy="20" r="5" fill="currentColor" />
          {/* Torso */}
          <line x1="50" y1="25" x2="50" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          {/* Arms */}
          <line x1="50" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Upper Legs */}
          <motion.line 
            x1="50" y1="50" x2="50" y2="70" 
            stroke="currentColor" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [50, 70, 50], y2: [70, 60, 70] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
        {/* Lower Legs (Fixed to floor) */}
        <motion.line 
          x1="50" y1="90" x2="50" y2="70" 
          stroke="currentColor" strokeWidth="4" strokeLinecap="round"
          animate={{ x2: [50, 70, 50], y1: [90, 90, 90], y2: [70, 60, 70] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  // Push-up Animation
  if (name.includes('push-up') || name.includes('plank')) {
    const isPlank = name.includes('plank');
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <line x1="10" y1="80" x2="90" y2="80" stroke="#e5e7eb" strokeWidth="2" />
        <motion.g
          animate={isPlank ? {} : {
            rotate: [0, -15, 0],
            y: [0, 10, 0]
          }}
          style={{ originX: "20px", originY: "80px" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Body */}
          <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          {/* Head */}
          <circle cx="85" cy="80" r="4" fill="currentColor" />
        </motion.g>
        {/* Arms */}
        <motion.line 
          x1="70" y1="80" x2="70" y2="60" 
          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
          animate={isPlank ? {} : { y2: [60, 75, 60] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  // Jumping Jacks
  if (name.includes('jumping') || name.includes('jack')) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.g
          animate={{
            y: [0, -10, 0],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          <circle cx="50" cy="30" r="5" fill="currentColor" />
          <line x1="50" y1="35" x2="50" y2="60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          {/* Arms */}
          <motion.line 
            x1="50" y1="40" x2="30" y2="40" 
            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            animate={{ x2: [30, 70, 30], y2: [40, 10, 40] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.line 
            x1="50" y1="40" x2="70" y2="40" 
            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            animate={{ x2: [70, 30, 70], y2: [40, 10, 40] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          {/* Legs */}
          <motion.line 
            x1="50" y1="60" x2="40" y2="85" 
            stroke="currentColor" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [40, 30, 40] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.line 
            x1="50" y1="60" x2="60" y2="85" 
            stroke="currentColor" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [60, 70, 60] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.g>
      </svg>
    );
  }

  // Default: Simple breathing circle for others
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-8 h-8 bg-current rounded-full"
      />
    </div>
  );
};
