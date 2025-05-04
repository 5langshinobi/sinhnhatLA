import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { useImageZoom } from "@/hooks/use-image-zoom";
import ImageZoomModal from "@/components/image-zoom-modal";

// Import tất cả các hình ảnh
import img1 from "../assets/images/z6557782189055_0e601c2a92b5c3d2cd8d74886b9c4860.jpg";
import img2 from "../assets/images/z6557916177937_7bcb04a68a61ac267b93db06f157b362.jpg";
import img3 from "../assets/images/z6557916336492_da10d153c75179d17a684c7749de8910.jpg";
import img4 from "../assets/images/z6557916925311_b0fb2ad1ea18e5258ea93ac7b6db27bd.jpg";
import img5 from "../assets/images/z6557917004428_b3086a0e8d7695ec8f7e625452367cdb.jpg";
import img6 from "../assets/images/z6557917186621_a749f3cbd2aa34b7ee6702eb7116979a.jpg";
import img7 from "../assets/images/z6557917319632_414bc8eb8cf3de74bccefb40963a3ade.jpg";
import img8 from "../assets/images/z6557917376204_8bf91e506f3844b61a5a33820cdfde37.jpg";
import img9 from "../assets/images/z6557917435122_ba3bd5cf8e89b1d819b75192b9e54461.jpg";
import img10 from "../assets/images/z6557917536499_ef130848635c9efe04720b24042bbe29.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { 
    isZoomed, 
    zoomedImgSrc, 
    zoomedImgAlt, 
    handleZoomImage, 
    handleCloseZoom 
  } = useImageZoom();

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Đổi ảnh sau mỗi 3 giây

    return () => clearInterval(interval);
  }, [autoplay]);

  const handleImageClick = () => {
    setAutoplay(false); // Dừng slideshow khi click vào ảnh
    handleZoomImage(images[currentIndex], `Ảnh kỷ niệm ${currentIndex + 1}`);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Image Zoom Modal */}
      <ImageZoomModal 
        isOpen={isZoomed}
        imgSrc={zoomedImgSrc}
        alt={zoomedImgAlt}
        onClose={() => {
          handleCloseZoom();
          setAutoplay(true); // Khôi phục slideshow khi đóng modal
        }}
      />
      
      <div className="relative cursor-pointer group" onClick={handleImageClick}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Ảnh ${currentIndex + 1}`}
            className="w-full h-64 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
          <div className="bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
            <ZoomIn className="text-primary h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}