import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Fireworks from "@/components/fireworks";
import { FaBirthdayCake, FaUpload, FaMusic, FaHeart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function BirthdayPage() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const today = new Date();
  const formattedDate = format(today, "dd/MM/yyyy");
  
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/photos", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Tải lên thành công",
        description: "Hình ảnh đã được tải lên thành công!",
        variant: "default",
      });
      setIsUploading(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi khi tải lên",
        description: error.message,
        variant: "destructive",
      });
      setIsUploading(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    uploadMutation.mutate(formData);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    if (logoutMutation) {
      logoutMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-200 relative overflow-hidden">
      {/* Pháo hoa nền */}
      <Fireworks />

      {/* Lớp nội dung */}
      <div className="relative z-10 container mx-auto py-8 px-4">
        {/* Thanh điều hướng */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <FaBirthdayCake className="text-pink-500 text-2xl" />
            <span className="text-lg font-bold text-pink-600">Sinh Nhật Lan Anh</span>
          </div>
          <Button variant="outline" className="bg-white/70" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </nav>

        {/* Nội dung chính */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Phần thông tin */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-pink-600 mb-2">
                    Chúc Mừng Sinh Nhật!
                  </h1>
                  <p className="text-gray-600 mb-6">{formattedDate}</p>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                </div>
              </div>

              <hr className="my-6 border-pink-100" />

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-pink-500 mb-4 flex items-center">
                    <FaHeart className="mr-2" /> Lời chúc đặc biệt
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Chúc mừng sinh nhật Lan Anh! Hôm nay là ngày đặc biệt - ngày mà thế giới 
                    đón chào một người tuyệt vời. Chúc bạn một sinh nhật tràn đầy niềm vui, 
                    sự bình an và những điều kỳ diệu. Mỗi năm qua đi đều để lại những kỷ niệm đẹp 
                    và mở ra chương mới tuyệt vời hơn trong cuộc sống của bạn.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-pink-500 mb-4 flex items-center">
                    <FaMusic className="mr-2" /> Những khoảnh khắc đáng nhớ
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Hãy cùng nhìn lại những khoảnh khắc đáng nhớ trong năm qua. Mỗi bức ảnh đều 
                    là một câu chuyện, mỗi nụ cười đều chứa đựng những kỷ niệm quý báu. Sinh nhật 
                    không chỉ là thêm một tuổi mới, mà còn là dịp để chúng ta trân trọng những gì 
                    đã qua và mong chờ những điều tuyệt vời phía trước.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  className="w-full py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center space-x-2 h-auto"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                >
                  <FaUpload className="mr-2" />
                  <span>{isUploading ? "Đang tải lên..." : "Tải lên khoảnh khắc đẹp"}</span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Phần hình ảnh */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 h-full"
            >
              <h2 className="text-2xl font-semibold text-pink-500 mb-6">Bộ sưu tập kỷ niệm</h2>
              
              {/* Vùng hiển thị hình ảnh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Có thể thêm hình ảnh từ API ở đây */}
                <div className="aspect-square rounded-lg overflow-hidden bg-pink-100 flex items-center justify-center">
                  <FaUpload className="text-pink-300 text-4xl" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center">
                  <FaUpload className="text-blue-300 text-4xl" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-purple-100 flex items-center justify-center">
                  <FaUpload className="text-purple-300 text-4xl" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-yellow-100 flex items-center justify-center">
                  <FaUpload className="text-yellow-300 text-4xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trang trí nền */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-pink-200 rounded-full opacity-50 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-200 rounded-full opacity-50 blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-50 blur-3xl"></div>
    </div>
  );
}