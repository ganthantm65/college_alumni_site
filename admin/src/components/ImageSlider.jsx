import React, { useEffect, useState } from "react";
import img1 from "../assets/home-page-images/img1.jpg";
import img2 from "../assets/home-page-images/img2.jpg";
import img3 from "../assets/home-page-images/img3.jpg";
import img4 from "../assets/home-page-images/img4.jpg";
import img5 from "../assets/home-page-images/img5.jpg";

const images = [img1, img2, img3, img4, img5];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-[97%] h-[300px] md:h-[600px] overflow-hidden group mx-auto mt-10 rounded-xl">
      <div
        className="flex h-full transition-transform duration-[1500ms] ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0.7 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-blue-600"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0.7 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-blue-600"
      >
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
