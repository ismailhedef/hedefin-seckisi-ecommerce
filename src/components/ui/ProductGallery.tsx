"use client";

import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <img
        src={selectedImage}
        alt={title}
        className="h-[500px] w-full rounded-[32px] object-cover"
      />

      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-2xl border-2 ${
              selectedImage === image ? "border-[#2f6b3b]" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}