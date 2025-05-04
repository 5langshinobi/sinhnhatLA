import { useState } from "react";

export function useImageZoom() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImgSrc, setZoomedImgSrc] = useState("");
  const [zoomedImgAlt, setZoomedImgAlt] = useState("");

  const handleZoomImage = (src: string, alt: string = "Hình ảnh") => {
    setZoomedImgSrc(src);
    setZoomedImgAlt(alt);
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return {
    isZoomed,
    zoomedImgSrc,
    zoomedImgAlt,
    handleZoomImage,
    handleCloseZoom
  };
}