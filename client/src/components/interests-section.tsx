import React from "react";
import { Sparkles, Heart, Coffee, Flower } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InterestsSection() {
  return (
    <div className="py-8 px-4 bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary mr-2" />
          Sở thích của Lan Anh
          <Sparkles className="h-6 w-6 text-primary ml-2" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Milk Tea Section */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="p-4 border-b flex items-center">
              <Coffee className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-xl font-semibold">Trà sữa</h3>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-4">
                Trà sữa là một trong những đồ uống yêu thích của Lan Anh. Đặc biệt thích những loại trà sữa có vị ngọt nhẹ.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <img src="/milktea1.jpg" alt="Trà sữa" className="rounded-lg w-full h-32 object-cover" />
                <img src="/milktea2.jpg" alt="Trà sữa" className="rounded-lg w-full h-32 object-cover" />
                <img src="/milktea3.jpg" alt="Trà sữa" className="rounded-lg w-full h-32 object-cover" />
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
          
          {/* Flowers Section */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm md:col-span-2">
            <div className="p-4 border-b flex items-center">
              <Flower className="h-5 w-5 text-rose-500 mr-2" />
              <h3 className="text-xl font-semibold">Hoa & Thiên nhiên</h3>
            </div>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-2/3">
                  <p className="text-gray-700 mb-4">
                    Giống như nhiều người thuộc cung Kim Ngưu khác, Lan Anh yêu thích hoa và thiên nhiên. 
                    Những bông hoa tươi đẹp luôn mang lại niềm vui và năng lượng tích cực. 
                    Đặc biệt, hoa hồng với màu sắc rực rỡ và hương thơm dịu nhẹ là loài hoa Lan Anh yêu thích nhất.
                  </p>
                  <p className="text-gray-700">
                    Sự nhẹ nhàng, tỉ mỉ và thẩm mỹ trong tính cách của Lan Anh phản ánh rõ nét qua việc yêu thích những điều tự nhiên và đẹp đẽ này.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <img src="/flowers1.jpg" alt="Hoa" className="rounded-lg w-full h-60 object-cover" />
                </div>
              </div>
            </CardContent>
          </Card>
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