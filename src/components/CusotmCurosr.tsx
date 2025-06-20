import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth cursor movement with spring animation
  const springConfig = { damping: 15, stiffness: 120 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // Adjust for cursor size (16px / 2)
      cursorY.set(e.clientY - 16);
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
        backdropFilter: isHoveringInteractive
          ? "invert(100%) blur(6px)"
          : "invert(80%) blur(4px)",
        WebkitBackdropFilter: isHoveringInteractive
          ? "invert(100%) blur(6px)"
          : "invert(80%) blur(4px)", // For Safari compatibility
      }}
      animate={{
        opacity: isHoveringInteractive ? 0.7 : 0.9,
        backgroundColor: isHoveringInteractive
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.2)",
        border: isHoveringInteractive
          ? "2px solid rgba(59, 130, 246, 0.8)"
          : "1px solid rgba(255, 255, 255, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
  );
};

export default CustomCursor;
