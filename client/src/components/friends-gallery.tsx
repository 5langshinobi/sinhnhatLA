import React from "react";
import { Users, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FriendsGallery() {
  return (
    <div className="py-8 px-4 bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
          <Users className="h-6 w-6 text-primary mr-2" />
          Kỷ niệm với bạn bè
          <Camera className="h-6 w-6 text-primary ml-2" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="/friends1.jpg" 
                alt="Friends" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs md:text-sm font-medium">Những người bạn thân yêu</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="/friends3.jpg" 
                alt="Friends" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs md:text-sm font-medium">Khoảnh khắc vui vẻ</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="/friends5.jpg" 
                alt="Friends" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs md:text-sm font-medium">Together for 19 years ❤️</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="/selfie1.jpg" 
                alt="Selfie" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs md:text-sm font-medium">Những nụ cười tươi</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Card className="flex-1 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Những người bạn đặc biệt</h3>
                <p className="text-gray-600 text-sm">
                  Bạn bè luôn là một phần quan trọng trong cuộc sống của Lan Anh. 
                  Những khoảnh khắc đáng nhớ bên nhau sẽ mãi còn đẹp trong ký ức.
                </p>
              </CardContent>
            </Card>
            
            <div className="relative rounded-xl overflow-hidden flex-1">
              <img 
                src="/friends2.jpg" 
                alt="School Friends" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs md:text-sm font-medium">Bạn bè quây quần</p>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden flex-1">
              <img 
                src="/friends4.jpg" 
                alt="Close Friends" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs md:text-sm font-medium">Những người bạn đồng hành</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="/school1.jpg" 
              alt="School Memories" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-xs md:text-sm font-medium">Kỷ niệm thời học sinh</p>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="/friends6.jpg" 
              alt="Friends Gathering" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-xs md:text-sm font-medium">Bạn bè thân thiết</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}