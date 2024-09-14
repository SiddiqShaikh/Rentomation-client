import React from "react";
import { motion } from "framer-motion";

interface IHoverAnimationProps {
  children: React.ReactNode;
  wrapperClass?: string;
  distance?: number;
  duration?: number;
}
const HoverAnimation: React.FC<IHoverAnimationProps> = ({
  children,
  wrapperClass,
  distance = -10,
  duration = 0.3,
}) => {
  return (
    <motion.div
      className={`${wrapperClass}`}
      whileHover={{ y: distance }} // Moves up by 10px on hover
      transition={{ duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default HoverAnimation;
