import React from "react";
import { Heart, Star, ZoomIn } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious, 
} from "@/components/ui/carousel";
import { useImageZoom } from "@/hooks/use-image-zoom";
import ImageZoomModal from "@/components/image-zoom-modal";

export default function PetSection() {
  const { 
    isZoomed, 
    zoomedImgSrc, 
    zoomedImgAlt, 
    handleZoomImage, 
    handleCloseZoom 
  } = useImageZoom();
  
  return (
    <div className="py-8 px-4 bg-gradient-to-r from-pink-50 to-yellow-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
          <FaPaw className="text-amber-500 mr-2" size={20} />
          Đây là con của cậu ấy (thú cưng)
          <Heart className="h-5 w-5 text-pink-500 ml-2" />
        </h2>

        {/* Image Zoom Modal */}
        <ImageZoomModal 
          isOpen={isZoomed}
          imgSrc={zoomedImgSrc}
          alt={zoomedImgAlt}
          onClose={handleCloseZoom}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phần thông tin về thú cưng */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="p-4 border-b flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="text-xl font-semibold">Về bé cưng của Lan Anh</h3>
            </div>
            <CardContent className="p-6">
              
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-20 font-medium text-gray-700">Giống:</span>
                  <span>Chihuahua thuần chủng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-20 font-medium text-gray-700">Tính cách:</span>
                  <span>Thông minh, trung thành, hay ngủ và vô cùng tình cảm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-20 font-medium text-gray-700">Sở thích:</span>
                  <span>Ngủ nướng, được ôm ấp và khám phá mọi thứ xung quanh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-20 font-medium text-gray-700">Đặc điểm:</span>
                  <span>Có biểu cảm khuôn mặt cực kỳ đáng yêu và thích được chụp ảnh</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-amber-800 italic text-sm">
                  "Chihuahua là giống chó nhỏ nhất thế giới nhưng lại có trái tim và tính cách to lớn. 
                  Chúng cực kỳ trung thành và thường gắn bó với một người chủ, tạo nên mối quan hệ thân thiết đặc biệt."
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Phần carousel hình ảnh */}
          <div className="flex flex-col">
            <Card className="overflow-hidden flex-1 bg-white/80 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Những khoảnh khắc đáng yêu</h3>
              
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden cursor-pointer" 
                         onClick={() => handleZoomImage("/dog1.jpg", "Cái tướng j đây - Lúc nào cũng chỉ thích ngủ")}>
                      <img src="/dog1.jpg" alt="Chihuahua đang ngủ" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Cái tướng j đây - Lúc nào cũng chỉ thích ngủ</p>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden cursor-pointer" 
                         onClick={() => handleZoomImage("/dog2.jpg", "Kêu qua ko qua r g nhìn z - Bé ngoan đang nghỉ ngơi")}>
                      <img src="/dog2.jpg" alt="Chihuahua cuộn trong chăn" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Kêu qua ko qua r g nhìn z - Bé ngoan đang nghỉ ngơi</p>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden cursor-pointer" 
                         onClick={() => handleZoomImage("/dog3.jpg", "Mới tắm xong nhìn tôi hả - Bé sạch sẽ thơm tho")}>
                      <img src="/dog3.jpg" alt="Chihuahua sau khi tắm" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Mới tắm xong nhìn tôi hả - Bé sạch sẽ thơm tho</p>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden cursor-pointer" 
                         onClick={() => handleZoomImage("/dog4.jpg", "Khoảnh khắc đáng yêu với người mẹ Lan Anh")}>
                      <img src="/dog4.jpg" alt="Lan Anh và Chihuahua" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Khoảnh khắc đáng yêu với người mẹ Lan Anh</p>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              <div className="mt-6 grid grid-cols-4 gap-2">
                <div className="relative group">
                  <img 
                    src="/dog1.jpg" 
                    alt="Thumbnail" 
                    className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => handleZoomImage("/dog1.jpg", "Cái tướng j đây - Lúc nào cũng chỉ thích ngủ")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-md">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="relative group">
                  <img 
                    src="/dog2.jpg" 
                    alt="Thumbnail" 
                    className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => handleZoomImage("/dog2.jpg", "Kêu qua ko qua r g nhìn z - Bé ngoan đang nghỉ ngơi")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-md">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="relative group">
                  <img 
                    src="/dog3.jpg" 
                    alt="Thumbnail" 
                    className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => handleZoomImage("/dog3.jpg", "Mới tắm xong nhìn tôi hả - Bé sạch sẽ thơm tho")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-md">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="relative group">
                  <img 
                    src="/dog4.jpg" 
                    alt="Thumbnail" 
                    className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => handleZoomImage("/dog4.jpg", "Khoảnh khắc đáng yêu với người mẹ Lan Anh")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-md">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}