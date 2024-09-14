import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 3000,
  slides,
  infinite = true,
}: {
  slides: any[];
  infinite?: boolean;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}) {
  const [curr, setCurr] = useState(0);
  const touchStartX = useRef(0); // To store the initial touch position
  const touchEndX = useRef(0); // To store the final touch position

  // Handle previous slide
  const prev = () => {
    setCurr((curr) =>
      curr === 0 ? (infinite ? slides.length - 1 : curr) : curr - 1
    );
  };

  // Handle next slide
  const next = () => {
    setCurr((curr) =>
      curr === slides.length - 1 ? (infinite ? 0 : curr) : curr + 1
    );
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [curr, autoSlide, autoSlideInterval]);

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  // Handle touch move event (optional for detecting in real-time)
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  // Handle touch end event (detect swipe direction)
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left to go to the next slide
      next();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right to go to the previous slide
      prev();
    }
  };

  return (
    <div
      className="overflow-hidden relative w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full h-full flex-shrink-0">
            <img src={slide} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/10 text-gray-500 hover:bg-white/30"
          aria-label="Previous Slide"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/10 text-gray-500 hover:bg-white/30"
          aria-label="Next Slide"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurr(i)}
              className={`cursor-pointer transition-all w-1 h-1 md:w-3 md:h-3 bg-white rounded-full ${
                curr === i ? "p-1 md:p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
