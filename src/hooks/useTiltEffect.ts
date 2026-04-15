import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export const useTiltEffect = (targetRef: RefObject<HTMLElement | null>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 18 });

  const rotateX = useTransform(smoothY, [-500, 500], [15, -15]);
  const rotateY = useTransform(smoothX, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      const card = targetRef.current;

      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      mouseX.set(x);
      mouseY.set(y);
    };
    const handleWindowMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    globalThis.addEventListener("mousemove", handleWindowMouseMove);
    globalThis.addEventListener("mouseleave", handleWindowMouseLeave);

    return () => {
      globalThis.removeEventListener("mousemove", handleWindowMouseMove);
      globalThis.removeEventListener("mouseleave", handleWindowMouseLeave);
    };
  }, [mouseX, mouseY, targetRef]);

  return { rotateX, rotateY };
};
