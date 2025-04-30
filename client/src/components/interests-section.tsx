import React from "react";
import { Sparkles, Heart, Coffee, Flower, ZoomIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useImageZoom } from "@/hooks/use-image-zoom";
import ImageZoomModal from "@/components/image-zoom-modal";

export default function InterestsSection() {
  const { 
    isZoomed, 
    zoomedImgSrc, 
    zoomedImgAlt, 
    handleZoomImage, 
    handleCloseZoom 
  } = useImageZoom();
  
  return (
    <div className="py-8 px-4 bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary mr-2" />
          Sở thích của Lan Anh
          <Sparkles className="h-6 w-6 text-primary ml-2" />
        </h2>
        
        {/* Image Zoom Modal */}
        <ImageZoomModal 
          isOpen={isZoomed}
          imgSrc={zoomedImgSrc}
          alt={zoomedImgAlt}
          onClose={handleCloseZoom}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Milk Tea Section */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="p-4 border-b flex items-center">
              <Coffee className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-xl font-semibold">Đồ uống yêu thích</h3>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-4">
                Đặc biệt thích trà sữa trân châu đường đen, trà đào. Ngoài ra còn thích uống milo, 
                Brobio, đôi khi là bạc xỉu. Đặc biệt rất rất đặc biệt là bia (đồ uống yêu thích).
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative cursor-pointer group" onClick={() => handleZoomImage("/milktea1.jpg", "Trà sữa trân châu đường đen - Món khoái khẩu")}>
                  <img src="/milktea1.jpg" alt="Trà sữa" className="rounded-lg w-full h-32 object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="relative cursor-pointer group" onClick={() => handleZoomImage("/milktea2.jpg", "Trà đào cam sả - Giải khát mùa hè")}>
                  <img src="/milktea2.jpg" alt="Trà sữa" className="rounded-lg w-full h-32 object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="relative cursor-pointer group" onClick={() => handleZoomImage("/milktea3.jpg", "Bia - Đồ uống yêu thích đặc biệt")}>
                  <img src="/milktea3.jpg" alt="Trà sữa" className="rounded-lg w-full h-32 object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Taurus Section */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="p-4 border-b flex items-center">
              <HeartIcon className="h-5 w-5 text-pink-500 mr-2" />
              <h3 className="text-xl font-semibold">Cung Kim Ngưu (Taurus)</h3>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-4">
                Sinh ngày 01/05, Lan Anh thuộc cung Kim Ngưu (Taurus). Người thuộc cung này thường có tính cách kiên định, đáng tin cậy và yêu thích những điều đẹp đẽ trong cuộc sống.
              </p>
              <div className="flex justify-around items-center">
                <TaurusSymbol className="h-20 w-20 text-pink-500" />
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Ngày sinh:</span> 01/05/2004</p>
                  <p><span className="font-medium">Nguyên tố:</span> Đất</p>
                  <p><span className="font-medium">Màu sắc:</span> Hồng, xanh dương</p>
                  <p><span className="font-medium">Hoa yêu thích:</span> Hoa hồng</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          
                <div className="md:w-1/3 relative group cursor-pointer" 
                    onClick={() => handleZoomImage("/flower_and_nature.png", "Hoa hồng - Loài hoa yêu thích của Lan Anh")}>
                  <img src="/flower_and_nature.png" alt="Hoa và thiên nhiên" className="rounded-lg w-full h-auto object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg">
                    <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

// Taurus Symbol Component
function TaurusSymbol({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="currentColor"
    >
      <path d="M50,10 C30,10 15,25 15,45 C15,65 30,80 50,80 C70,80 85,65 85,45 C85,25 70,10 50,10 Z M50,70 C35,70 25,60 25,45 C25,30 35,20 50,20 C65,20 75,30 75,45 C75,60 65,70 50,70 Z" />
      <circle cx="50" cy="30" r="5" />
      <circle cx="50" cy="60" r="5" />
      <path d="M30,45 L70,45" strokeWidth="5" stroke="currentColor" fill="none" />
    </svg>
  );
}

// Heart Icon Component
function HeartIcon({ className }: { className?: string }) {
  return (
    <Heart className={className} fill="currentColor" />
  );
}