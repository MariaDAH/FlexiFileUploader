"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ data }: { data: { image: string }[] }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef(null);

  useEffect(() => {
    let elem = carouselRef.current as unknown as HTMLDivElement;
    let { width, height } = elem.getBoundingClientRect();
    if (carouselRef.current) {
      setCarouselSize({
        width,
        height,
      });
    }
  }, [currentImg]);

  return (
    <div className="shrink-0 h-full w-full">
      <div className="relative h-full w-auto overflow-hidden rounded-md">
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="absolute flex h-full w-full transition-all duration-300 rounded-md "
        >
          <>
            {" "}
            {data.length === 0 ? (
              <div className="flex items-center justify-center">
                <p>No images uploaded</p>
              </div>
            ) : (
              <>
                {data.map((v, i) => (
                  <div
                    key={i}
                    className="relative h-full w-full shrink-0 flex justify-center"
                  >
                    <Image
                      className="pointer-events-none"
                      alt={`carousel-image-${i}`}
                      fill
                      src={v.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </>
            )}
          </>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          disabled={currentImg === 0}
          onClick={() => {
            setCurrentImg((prev) => prev - 1);
          }}
          className={`border px-4 py-2 font-bold ${currentImg === 0 && "opacity-50"}`}
        >
          {"<"}
        </button>
        <button
          disabled={currentImg === data.length - 1}
          onClick={() => {
            setCurrentImg((prev) => prev + 1);
          }}
          className={`border px-4 py-2 font-bold ${currentImg === data.length - 1 && "opacity-50"}`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
