import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FaUpload, FaUser } from "react-icons/fa";
import PhotoGallery from "@/components/photo-gallery";
import UploadModal from "@/components/upload-modal";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { PhotoWithWishes } from "@shared/schema";
import Fireworks from "@/components/fireworks";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  
  // Get auth context with try/catch for error handling
  let authUser;
  let authLogoutMutation;
  let authLoading = false;
  
  try {
    const auth = useAuth();
    authUser = auth.user;
    authLogoutMutation = auth.logoutMutation;
    authLoading = auth.isLoading;
  } catch (error) {
    console.error("Auth error:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-semibold text-red-500 mb-4">Lỗi xác thực</h1>
        <p className="mb-6 text-center">Đã xảy ra lỗi khi xác thực. Vui lòng thử lại.</p>
        <Button onClick={() => window.location.href = "/auth"}>
          Quay lại trang đăng nhập
        </Button>
      </div>
    );
  }
  
  // If auth is still loading, show loading spinner
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }
  
  // If user is not logged in, redirect to auth page
  if (!authUser) {
    return <Redirect to="/auth" />;
  }
  
  // Photos data
  const { data: photos, isLoading: photosLoading } = useQuery<PhotoWithWishes[]>({
    queryKey: ["/api/photos"],
  });
  
  const startFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => {
      setShowFireworks(false);
    }, 5000);
  };
  
  const handleLogout = () => {
    if (authLogoutMutation) {
      authLogoutMutation.mutate();
    }
  };
  
  const addWishMutation = useMutation({
    mutationFn: async ({ photoId, wish }: { photoId: number; wish: string }) => {
      const res = await apiRequest("POST", `/api/photos/${photoId}/wishes`, { content: wish });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
    },
  });
  
  const handleAddWish = (photoId: number, wish: string) => {
    addWishMutation.mutate({ photoId, wish });
  };
  
  const uploadPhotoMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/photos", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      setUploadModalOpen(false);
    },
  });
  
  const handleUpload = (formData: FormData) => {
    uploadPhotoMutation.mutate(formData);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {showFireworks && <Fireworks />}
      
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Chúc mừng sinh nhật Lan Anh</h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setUploadModalOpen(true)} 
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            >
              <FaUpload className="w-4 h-4" /> Tải ảnh lên
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <FaUser className="w-4 h-4" /> Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Main Birthday Banner */}
      <div className="relative w-full bg-gradient-to-r from-primary via-primary to-secondary py-16 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 opacity-10 rounded-full bg-white"></div>
        <div className="absolute top-20 right-20 w-20 h-20 opacity-10 rounded-full bg-white"></div>
        <div className="absolute bottom-5 left-1/4 w-10 h-10 opacity-10 rounded-full bg-white"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <p className="inline-block bg-white/30 backdrop-blur-sm px-4 py-1 rounded-full text-white font-medium mb-4">01.05.2024</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Happy Birthday Lan Anh!</h1>
          <p className="text-white/90 max-w-2xl mx-auto">Chúc mừng sinh nhật đặc biệt dành cho người đặc biệt. Chúc bạn luôn vui vẻ, hạnh phúc và thành công!</p>
          
          <div className="flex justify-center gap-4 mt-8">
            <span className="inline-block p-2 bg-white/20 backdrop-blur-sm rounded-lg text-xl">🌷</span>
            <span className="inline-block p-2 bg-white/20 backdrop-blur-sm rounded-lg text-xl">🌵</span>
            <span className="inline-block p-2 bg-white/20 backdrop-blur-sm rounded-lg text-xl">🎂</span>
            <span className="inline-block p-2 bg-white/20 backdrop-blur-sm rounded-lg text-xl">🎆</span>
            <span className="inline-block p-2 bg-white/20 backdrop-blur-sm rounded-lg text-xl">⏰</span>
          </div>
        </div>
      </div>

      {/* Special Effects Section */}
      <div className="bg-white py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hiệu ứng đặc biệt</h2>
          <p className="text-gray-600 mb-6">Nhấn nút bên dưới để xem hiệu ứng pháo hoa chúc mừng sinh nhật</p>
          <Button 
            onClick={startFireworks}
            className="bg-secondary hover:bg-secondary/90 text-white px-6 py-6 rounded-lg font-medium transition h-auto"
          >
            Bắn pháo hoa chúc mừng
          </Button>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600">Trang web chúc mừng sinh nhật đặc biệt dành cho</p>
            <p className="text-lg font-medium text-primary">Phạm Nguyễn Lan Anh</p>
            <p className="text-sm text-secondary">01.05.2024</p>
            <div className="flex justify-center gap-2 mt-2">
              <span>🌷</span>
              <span>🌵</span>
              <span>🎂</span>
              <span>🎆</span>
              <span>⏰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery 
        photos={photos || []} 
        isLoading={photosLoading} 
        onAddWish={handleAddWish}
      />

      {/* Upload Modal */}
      <UploadModal 
        isOpen={uploadModalOpen} 
        onClose={() => setUploadModalOpen(false)} 
        onUpload={handleUpload}
        isUploading={uploadPhotoMutation.isPending}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary via-primary to-secondary py-6 px-4">
        <div className="container mx-auto text-center text-white">
          <p>© 2024 Sinh Nhật Lan Anh | Được tạo với 💖</p>
          <p className="text-sm mt-1">Bạn có thể tải thêm hình ảnh kỷ niệm và chia sẻ những lời chúc</p>
        </div>
      </footer>
    </div>
  );
}