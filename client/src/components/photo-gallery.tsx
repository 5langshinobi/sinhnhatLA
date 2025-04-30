import { useState } from "react";
import { PhotoWithWishes } from "@shared/schema";
import { format } from "date-fns";
import { Loader2, Search, Download } from "lucide-react";
import PhotoModal from "./photo-modal";

interface PhotoGalleryProps {
  photos: PhotoWithWishes[];
  isLoading: boolean;
  onAddWish: (photoId: number, wish: string) => void;
}

export default function PhotoGallery({ photos, isLoading, onAddWish }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithWishes | null>(null);

  const handleOpenModal = (photo: PhotoWithWishes) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleAddWish = (wish: string) => {
    if (selectedPhoto) {
      onAddWish(selectedPhoto.id, wish);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Kỷ niệm đáng nhớ</h2>
          
          {photos.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">Chưa có ảnh nào. Hãy tải ảnh đầu tiên lên!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                  <div 
                    className="relative cursor-pointer group" 
                    onClick={() => handleOpenModal(photo)}
                  >
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title} 
                      className="w-full h-64 object-cover transition group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="bg-white/80 p-2 rounded-full">
                        <Search className="text-primary h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{photo.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{photo.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-500">
                        {format(new Date(photo.createdAt), 'dd.MM.yyyy')}
                      </span>
                      <button className="text-primary hover:text-primary/70">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPhoto && (
        <PhotoModal 
          photo={selectedPhoto} 
          onClose={handleCloseModal} 
          onAddWish={handleAddWish}
        />
      )}
    </>
  );
}
