"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "scale-up"
  | "blur-in";

const variantMap: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  duration?: number;
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  duration = 0.6,
}: AnimateOnScrollProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variantMap[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
