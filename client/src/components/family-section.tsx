import React from "react";
import { Users, Home, Heart } from "lucide-react";
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

export default function FamilySection() {
  return (
    <div className="py-8 px-4 bg-gradient-to-r from-pink-50 via-white to-blue-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
          <FaHome className="text-pink-600 mr-2" size={20} />
          Gia đình thân yêu
          <FaHeart className="text-pink-600 ml-2" size={18} />
        </h2>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
          <p className="text-center text-gray-700 max-w-3xl mx-auto italic">
            "Gia đình là nơi tình yêu bắt đầu và không bao giờ kết thúc. Tình yêu thương, sự ủng hộ và những kỷ niệm 
            đẹp từ gia đình là món quà quý giá nhất mà Lan Anh có được trong cuộc sống."
          </p>
        </div>
        
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="photos" className="text-base py-3">Khoảnh khắc gia đình</TabsTrigger>
            <TabsTrigger value="story" className="text-base py-3">Câu chuyện gia đình</TabsTrigger>
          </TabsList>
          
          {/* Tab hiển thị ảnh gia đình */}
          <TabsContent value="photos" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Ảnh gia đình 1 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family1.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Chạy KPI Tết - Những khoảnh khắc vui vẻ</p>
                  </div>
                </div>
              </Card>
              
              {/* Ảnh gia đình 2 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family2.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Selfie cùng chị gái</p>
                  </div>
                </div>
              </Card>
              
              {/* Ảnh gia đình 3 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family3.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Kỷ niệm Giáng sinh cùng gia đình</p>
                  </div>
                </div>
              </Card>
              
              {/* Ảnh gia đình 4 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family4.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Những khoảnh khắc vui nhộn</p>
                  </div>
                </div>
              </Card>
              
              {/* Ảnh gia đình 5 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family5.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Selfie cùng chị gái</p>
                  </div>
                </div>
              </Card>
              
              {/* Ảnh gia đình 6 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family6.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">2 tình iu - Những khoảnh khắc ngọt ngào</p>
                  </div>
                </div>
              </Card>
              
              {/* Ảnh gia đình 7 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family7.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Khoảnh khắc gia đình hạnh phúc</p>
                  </div>
                </div>
              </Card>
              
              {/* Ảnh gia đình 8 */}
              <Card className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src="/family8.jpg" alt="Gia đình" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-3 text-white text-sm">Selfie cùng bố mẹ và em gái</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Tab kể chuyện về gia đình */}
          <TabsContent value="story">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 text-pink-500 mr-2" />
                    Tình cảm gia đình
                  </CardTitle>
                  <CardDescription>Những sợi dây gắn kết tình thương</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Gia đình luôn là điểm tựa vững chắc trong cuộc sống của Lan Anh. Tình yêu thương, sự quan tâm và ủng hộ từ bố mẹ 
                    và những người thân đã giúp Lan Anh trở thành con người như ngày hôm nay. Những kỷ niệm đẹp bên gia đình - 
                    từ những bữa cơm ấm cúng, những chuyến đi chơi cuối tuần, đến những khoảnh khắc đón năm mới cùng nhau - 
                    đều là những khoảnh khắc quý giá không thể thay thế.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Những người thân yêu
                  </CardTitle>
                  <CardDescription>Nguồn sức mạnh và niềm vui mỗi ngày</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Mỗi thành viên trong gia đình đều mang đến cho Lan Anh những bài học và niềm vui riêng. 
                    Bố mẹ luôn là tấm gương về lòng kiên nhẫn và sự cống hiến. Anh chị em trong gia đình không chỉ là 
                    những người thân mà còn là những người bạn đồng hành tuyệt vời nhất.
                    Những ngày lễ, Tết sum họp gia đình luôn tràn ngập tiếng cười và hạnh phúc - những khoảnh khắc 
                    ấm áp tạo nên ký ức tuổi thơ đầy màu sắc.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 text-green-500 mr-2" />
                    Kỷ niệm đặc biệt
                  </CardTitle>
                  <CardDescription>Những khoảnh khắc đáng nhớ cùng gia đình</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800">Những dịp lễ đáng nhớ</h4>
                      <p className="text-gray-700 mb-4">
                        Mỗi dịp Tết đến xuân về, Giáng sinh hay các ngày lễ đặc biệt, gia đình Lan Anh lại cùng nhau tạo nên 
                        những kỷ niệm tuyệt vời. Từ việc trang trí nhà cửa, chuẩn bị những món ăn truyền thống đến 
                        việc chụp những bức ảnh kỷ niệm - tất cả đều là những khoảnh khắc quý giá được lưu giữ trong tim.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800">Những chuyến đi cùng nhau</h4>
                      <p className="text-gray-700 mb-4">
                        Những chuyến đi cùng gia đình không chỉ mang lại niềm vui mà còn tạo nên những kỷ niệm không thể quên. 
                        Từ những chuyến đi gần như thăm họ hàng, dạo chơi trong thành phố, đến những chuyến đi xa khám phá 
                        những vùng đất mới - mỗi hành trình đều là cơ hội để gắn kết tình thân.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-3">Tình yêu gia đình - Món quà vô giá</h3>
          <p className="text-gray-700">
            Tình yêu thương từ gia đình chính là món quà quý giá nhất mà Lan Anh có được. Trong mỗi bước đi của cuộc sống, 
            những giá trị gia đình luôn là kim chỉ nam để Lan Anh hướng tới. Cảm ơn gia đình đã luôn ở bên, yêu thương và 
            ủng hộ Lan Anh trong mọi hành trình của cuộc đời.
          </p>
        </div>
      </div>
    </div>
  );
}