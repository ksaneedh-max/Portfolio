import { Variants } from "framer-motion";

// Standard professional easing curve
export const MOTION_EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Base reveal variant (fade + translate Y)
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: MOTION_EASE,
    },
  },
};

// Container stagger variant
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger child item variant
export const staggerChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: MOTION_EASE,
    },
  },
};

// Interactive button hover/tap variants
export const buttonHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { duration: 0.1, ease: "easeIn" as const },
  },
};

// Interactive card hover variants
export const cardHoverVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.25, ease: MOTION_EASE },
  },
};

// Interactive pill hover variants
export const pillHoverVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -1.5,
    scale: 1.02,
    transition: { duration: 0.15, ease: "easeOut" as const },
  },
};

