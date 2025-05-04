import React from "react";
import { X } from "lucide-react";

interface ImageZoomModalProps {
  isOpen: boolean;
  imgSrc: string;
  alt: string;
  onClose: () => void;
}

export default function ImageZoomModal({ isOpen, imgSrc, alt, onClose }: ImageZoomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
      <div className="relative max-w-[90vw] max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <img
          src={imgSrc}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-center font-medium">{alt}</p>
        </div>
      </div>
    </div>
  );
}