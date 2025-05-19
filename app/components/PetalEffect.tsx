'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  duration: number;
  delay: number;
}

const PetalEffect = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetal = () => {
      const petal: Petal = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
      };
      setPetals((prev) => [...prev, petal]);

      // 5초 후에 꽃잎 제거
      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== petal.id));
      }, 7000);
    };

    // 0.5초마다 새로운 꽃잎 생성
    const interval = setInterval(createPetal, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: petal.y, x: petal.x, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            x: petal.x + (Math.random() - 0.5) * 200,
            rotate: petal.rotation,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{
            width: petal.size,
            height: petal.size,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full"
            style={{
              filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
            }}
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="rgba(255, 182, 193, 0.6)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default PetalEffect; 