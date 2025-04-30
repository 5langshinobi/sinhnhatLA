import React from "react";
import { 
  Dialog, 
  DialogContent,
  DialogOverlay
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ImageZoomModalProps {
  isOpen: boolean;
  imgSrc: string;
  alt: string;
  onClose: () => void;
}

export default function ImageZoomModal({ isOpen, imgSrc, alt, onClose }: ImageZoomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="sm:max-w-4xl border-none bg-transparent shadow-none p-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 z-50 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
          <img 
            src={imgSrc} 
            alt={alt} 
            className="max-h-[80vh] max-w-full object-contain mx-auto rounded-lg" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}