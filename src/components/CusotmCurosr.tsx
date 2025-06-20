import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth cursor movement with spring animation
  const springConfig = { damping: 25, stiffness: 120 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 8); // Adjust for cursor size (16px / 2)
      cursorY.set(e.clientY - 8);
    };

    // Track mouse movement
    window.addEventListener("mousemove", moveCursor);

    // Detect hover on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [role='button'], [data-cursor-interactive]",
    );

    const handleMouseEnter = () => setIsHoveringInteractive(true);
    const handleMouseLeave = () => setIsHoveringInteractive(false);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        scale: isHoveringInteractive ? 2.5 : 1,
        opacity: isHoveringInteractive ? 0.6 : 1,
        backgroundColor: isHoveringInteractive
          ? "rgba(59, 130, 246, 0.5)"
          : "rgba(100, 100, 100, 0.8)",
        border: isHoveringInteractive
          ? "2px solid rgba(59, 130, 246, 1)"
          : "none",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
  );
};

export default CustomCursor;
