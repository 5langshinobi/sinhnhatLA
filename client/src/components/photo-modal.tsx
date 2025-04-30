import { useState } from "react";
import { PhotoWithWishes } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { format } from "date-fns";

interface PhotoModalProps {
  photo: PhotoWithWishes;
  onClose: () => void;
  onAddWish: (wish: string) => void;
}

export default function PhotoModal({ photo, onClose, onAddWish }: PhotoModalProps) {
  const [wishText, setWishText] = useState("");

  const handleAddWish = () => {
    if (wishText.trim()) {
      onAddWish(wishText);
      setWishText("");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] flex flex-col p-0 gap-0">
        <div className="absolute top-4 right-4 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-auto flex-grow bg-gray-100">
          <img 
            src={photo.imageUrl} 
            alt={photo.title} 
            className="w-full h-auto max-h-[70vh] object-contain bg-black/10"
          />
        </div>
        
        <div className="p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{photo.title}</DialogTitle>
            <DialogDescription className="text-gray-600">{photo.description}</DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            {photo.wishes && photo.wishes.length > 0 && (
              <div className="mb-4 max-h-32 overflow-y-auto">
                {photo.wishes.map((wish) => (
                  <div key={wish.id} className="mb-2 p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">{wish.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(wish.createdAt), 'dd.MM.yyyy HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-4">
              <div className="flex-grow">
                <Textarea 
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Thêm lời chúc của bạn..." 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                  rows={2}
                />
              </div>
              <div>
                <Button 
                  onClick={handleAddWish}
                  className="h-full bg-primary hover:bg-primary/90 text-white px-6 rounded-lg font-medium transition"
                >
                  Thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
