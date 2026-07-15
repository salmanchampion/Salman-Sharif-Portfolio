import React, { useEffect, useState } from 'react';
import { Star, Moon, Circle, Sparkles, Cloud } from 'lucide-react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  type: 'star' | 'moon' | 'bubble' | 'sparkle' | 'cloud';
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const BackgroundAnimation: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const types: Particle['type'][] = ['star', 'moon', 'bubble', 'sparkle', 'cloud'];
      
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          x: Math.random() * 100, // percentage of screen width
          size: Math.random() * 24 + 8, // px
          duration: Math.random() * 25 + 15, // seconds for full float
          delay: Math.random() * -20, // Negative delay so they are already on screen
          opacity: Math.random() * 0.4 + 0.1, // Visible opacity between 10% and 50%
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const getIcon = (type: Particle['type'], size: number) => {
    switch (type) {
      case 'star': return <Star size={size} className="text-yellow-200" fill="currentColor" />;
      case 'moon': return <Moon size={size} className="text-blue-100" fill="currentColor" />;
      case 'bubble': return <Circle size={size} className="text-cyan-300/40" strokeWidth={1.5} />;
      case 'sparkle': return <Sparkles size={size} className="text-primary/70" />;
      case 'cloud': return <Cloud size={size} className="text-white/30" />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      {/* Deep Space Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,134,255,0.03),transparent_70%)]" />
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: '110%',
          }}
          animate={{ 
            top: '-10%',
            opacity: [0, particle.opacity, particle.opacity, 0],
            rotate: particle.type === 'bubble' ? 0 : 360
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {getIcon(particle.type, particle.size)}
        </motion.div>
      ))}
    </div>
  );
};
