import React from "react";
import { Heart, Star } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious, 
} from "@/components/ui/carousel";

export default function PetSection() {
  return (
    <div className="py-8 px-4 bg-gradient-to-r from-pink-50 to-yellow-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
          <FaPaw className="text-amber-500 mr-2" size={20} />
          Chihuahua - Người bạn nhỏ đáng yêu
          <Heart className="h-5 w-5 text-pink-500 ml-2" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phần thông tin về thú cưng */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="p-4 border-b flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="text-xl font-semibold">Về bé cưng của Lan Anh</h3>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Lan Anh có một người bạn nhỏ đặc biệt - một chú chó Chihuahua vô cùng đáng yêu và thông minh. 
                Với đôi mắt to tròn, đôi tai dựng đứng và thân hình nhỏ nhắn, bé luôn là nguồn vui và niềm an ủi 
                tuyệt vời trong cuộc sống hàng ngày.
              </p>
              
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
                    <div className="relative h-80 w-full rounded-xl overflow-hidden">
                      <img src="/dog1.jpg" alt="Chihuahua đang ngủ" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Cái tướng j đây - Lúc nào cũng chỉ thích ngủ</p>
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden">
                      <img src="/dog2.jpg" alt="Chihuahua cuộn trong chăn" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Kêu qua ko qua r g nhìn z - Bé ngoan đang nghỉ ngơi</p>
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden">
                      <img src="/dog3.jpg" alt="Chihuahua sau khi tắm" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Mới tắm xong nhìn tôi hả - Bé sạch sẽ thơm tho</p>
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden">
                      <img src="/dog4.jpg" alt="Lan Anh và Chihuahua" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm">Khoảnh khắc đáng yêu với người mẹ Lan Anh</p>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              <div className="mt-6 grid grid-cols-4 gap-2">
                <img src="/dog1.jpg" alt="Thumbnail" className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
                <img src="/dog2.jpg" alt="Thumbnail" className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
                <img src="/dog3.jpg" alt="Thumbnail" className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
                <img src="/dog4.jpg" alt="Thumbnail" className="h-16 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Chihuahua - Người bạn nhỏ, tình yêu lớn</h3>
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            Chihuahua tuy nhỏ bé nhưng luôn mang đến niềm vui và sự ấm áp vô bờ bến. Chúng không chỉ là thú cưng mà còn là 
            thành viên đặc biệt trong gia đình, luôn sẵn sàng quan tâm và yêu thương vô điều kiện. 
            Mỗi ngày với một chú Chihuahua là một ngày tràn đầy tiếng cười và những khoảnh khắc đáng yêu khó quên.
          </p>
        </div>
      </div>
    </div>
  );
}