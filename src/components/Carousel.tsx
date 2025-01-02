// import { useState, useEffect, useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export default function Carousel({
//   autoSlide = true,
//   autoSlideInterval = 3000,
//   slides,
//   infinite = true,
// }: {
//   slides: any[];
//   infinite?: boolean;
//   autoSlide?: boolean;
//   autoSlideInterval?: number;
// }) {
//   const [curr, setCurr] = useState(0);
//   const touchStartX = useRef(0); // To store the initial touch position
//   const touchEndX = useRef(0); // To store the final touch position

//   // Handle previous slide
//   const prev = () => {
//     setCurr((curr) =>
//       curr === 0 ? (infinite ? slides.length - 1 : curr) : curr - 1
//     );
//   };

//   // Handle next slide
//   const next = () => {
//     setCurr((curr) =>
//       curr === slides.length - 1 ? (infinite ? 0 : curr) : curr + 1
//     );
//   };

//   useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(next, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [curr, autoSlide, autoSlideInterval]);

//   // Handle touch start event
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.targetTouches[0].clientX;
//   };

//   // Handle touch move event (optional for detecting in real-time)
//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndX.current = e.targetTouches[0].clientX;
//   };

//   // Handle touch end event (detect swipe direction)
//   const handleTouchEnd = () => {
//     if (touchStartX.current - touchEndX.current > 50) {
//       // Swipe left to go to the next slide
//       next();
//     }

//     if (touchStartX.current - touchEndX.current < -50) {
//       // Swipe right to go to the previous slide
//       prev();
//     }
//   };

//   return (
//     <div
//       className="overflow-hidden relative w-full h-full"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div
//         className="flex transition-transform ease-out duration-500"
//         style={{ transform: `translateX(-${curr * 100}%)` }}
//       >
//         {slides.map((slide, i) => (
//           <div key={i} className="w-full h-full flex-shrink-0">
//             <img src={slide} alt={`Slide ${i + 1}`} />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <div className="absolute inset-0 flex items-center justify-between p-4">
//         <button
//           onClick={prev}
//           className="p-1 rounded-full shadow bg-white/10 text-gray-500 hover:bg-white/30"
//           aria-label="Previous Slide"
//         >
//           <FaChevronLeft size={20} />
//         </button>
//         <button
//           onClick={next}
//           className="p-1 rounded-full shadow bg-white/10 text-gray-500 hover:bg-white/30"
//           aria-label="Next Slide"
//         >
//           <FaChevronRight size={20} />
//         </button>
//       </div>

//       {/* Dots Navigation */}
//       <div className="absolute bottom-4 right-0 left-0">
//         <div className="flex items-center justify-center gap-2">
//           {slides.map((_, i) => (
//             <div
//               key={i}
//               onClick={() => setCurr(i)}
//               className={`cursor-pointer transition-all w-1 h-1 md:w-3 md:h-3 bg-white rounded-full ${
//                 curr === i ? "p-1 md:p-2" : "bg-opacity-50"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CarouselProps {
  images: string[]
}

export function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className="relative h-[400px] w-full">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full bg-white/70 hover:bg-white/90"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full bg-white/70 hover:bg-white/90"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`
                transition-all w-3 h-3 bg-white rounded-full
                ${currentIndex === index ? "p-2" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

