import React from "react";
import { Users, Home, Heart, ZoomIn } from "lucide-react";
import { FaHome, FaHeart } from "react-icons/fa";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useImageZoom } from "@/hooks/use-image-zoom";
import ImageZoomModal from "@/components/image-zoom-modal";

export default function FamilySection() {
  const { 
    isZoomed, 
    zoomedImgSrc, 
    zoomedImgAlt, 
    handleZoomImage, 
    handleCloseZoom 
  } = useImageZoom();

  return (
    <div className="py-8 px-4 bg-gradient-to-r from-pink-50 via-white to-blue-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
          <FaHome className="text-pink-600 mr-2" size={20} />
          Gia đình thân yêu
          <FaHeart className="text-pink-600 ml-2" size={18} />
        </h2>

        {/* Image Zoom Modal */}
        <ImageZoomModal 
          isOpen={isZoomed}
          imgSrc={zoomedImgSrc}
          alt={zoomedImgAlt}
          onClose={handleCloseZoom}
        />


        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Ảnh gia đình 1 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family1.jpg", "Chạy KPI Tết - Những khoảnh khắc vui vẻ")}>
                <div className="aspect-square relative">
                  <img src="/family1.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Chạy KPI Tết - Những khoảnh khắc vui vẻ</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>

              {/* Ảnh gia đình 2 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family2.jpg", "Selfie cùng chị gái")}>
                <div className="aspect-square relative">
                  <img src="/family2.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Selfie cùng chị gái</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>

              {/* Ảnh gia đình 3 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family3.jpg", "Kỷ niệm Giáng sinh cùng gia đình")}>
                <div className="aspect-square relative">
                  <img src="/family3.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Kỷ niệm Giáng sinh cùng gia đình</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>

              {/* Ảnh gia đình 4 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family4.jpg", "Những khoảnh khắc vui nhộn")}>
                <div className="aspect-square relative">
                  <img src="/family4.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Những khoảnh khắc vui nhộn</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>

              {/* Ảnh gia đình 5 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family5.jpg", "Selfie cùng chị gái")}>
                <div className="aspect-square relative">
                  <img src="/family5.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Selfie cùng chị gái</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>

              {/* Ảnh gia đình 6 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family6.jpg", "2 tình iu - Những khoảnh khắc ngọt ngào")}>
                <div className="aspect-square relative">
                  <img src="/family6.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">2 tình iu - Những khoảnh khắc ngọt ngào</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>

              {/* Ảnh gia đình 7 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family7.jpg", "Khoảnh khắc gia đình hạnh phúc")}>
                <div className="aspect-square relative">
                  <img src="/family7.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Khoảnh khắc gia đình hạnh phúc</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>

              {/* Ảnh gia đình 8 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleZoomImage("/family8.jpg", "Selfie cùng bố mẹ và em gái")}>
                <div className="aspect-square relative">
                  <img src="/family8.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Selfie cùng bố mẹ và em gái</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}