"use client";

import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyLoadImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderClassName?: string;
}

export default function LazyLoadImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderClassName = "",
}: LazyLoadImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          if (imgRef.current && observerRef.current) {
            observerRef.current.unobserve(imgRef.current);
          }
        }
      },
      { rootMargin: "200px" },
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
      }}
    >
      {!isLoaded && (
        <Skeleton
          className={`absolute inset-0 ${placeholderClassName}`}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      <img
        ref={imgRef}
        src={isInView ? src : ""}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "auto",
        }}
      />
    </div>
  );
}
