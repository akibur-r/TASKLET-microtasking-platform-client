import { slide1 } from "@/utils/heroSlides/slide1";
import { slide2 } from "@/utils/heroSlides/slide2";
import { slide3 } from "@/utils/heroSlides/slide3";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [slide1, slide2, slide3];

interface SliderProps {
  page: number;
  direction: number;
  paginate: (dir: number) => void;
  side: "left" | "right";
}

const getVariants = (side: "left" | "right") => ({
  enter: (direction: number) => ({
    x:
      side === "left"
        ? direction > 0
          ? "-100%"
          : "100%"
        : direction > 0
        ? "100%"
        : "-100%",
    opacity: 0,
    position: "absolute" as const,
    transition: { duration: 0.5 },
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
    transition: { duration: 1 },
  },
  exit: () => ({
    opacity: 0,
    position: "absolute" as const,
    transition: { duration: 0.5 },
  }),
});

const Slider = ({ page, direction, side }: SliderProps) => {
  const variants = getVariants(side);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={page}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
      >
        <div className="pointer-events-auto select-text h-full w-full text-foreground">
          {slides[page][side]}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const DotNavigation = ({
  activeIndex,
  setIndex,
}: {
  activeIndex: number;
  setIndex: (index: number) => void;
}) => {
  return (
    <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
      {slides.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setIndex(idx)}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 opacity-70 ${
            idx === activeIndex
              ? "bg-foreground scale-110 opacity-100"
              : "bg-foreground/50"
          }`}
        />
      ))}
    </div>
  );
};

const HeroSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage(([prev]) => {
      const newIndex = (prev + newDirection + slides.length) % slides.length;
      return [newIndex, newDirection];
    });
  };

  const jumpTo = (index: number) => {
    if (index === page) return;
    const direction = index > page ? 1 : -1;
    setPage([index, direction]);
  };

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 h-[70vh] md:h-[50vh] lg:h-[80vh] overflow-hidden relative">
      <div className="flex flex-col-reverse md:flex-row gap-x-8 gap-y-2 h-full">
        {/* Left slide */}
        <div className="relative w-full h-full">
          <Slider
            side="left"
            page={page}
            direction={direction}
            paginate={paginate}
          />
        </div>

        {/* Right slide */}
        <div className="relative w-full h-full">
          <Slider
            side="right"
            page={page}
            direction={direction}
            paginate={paginate}
          />
        </div>
      </div>

      {/* Guiding Dots */}
      <DotNavigation activeIndex={page} setIndex={jumpTo} />
    </div>
  );
};

export default HeroSlider;
