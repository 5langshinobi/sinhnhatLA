import { useState } from "react";
import { PhotoWithWishes } from "@shared/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Heart, Smile } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PhotoModalProps {
  photo: PhotoWithWishes;
  onClose: () => void;
  onAddWish: (wish: string) => void;
}

export default function PhotoModal({ photo, onClose, onAddWish }: PhotoModalProps) {
  const [wishText, setWishText] = useState("");
  const { user } = useAuth();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddWish = () => {
    if (wishText.trim()) {
      onAddWish(wishText);
      setWishText("");
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
        
        {/* Photo viewing area */}
        <div className="overflow-auto flex-grow bg-black flex items-center justify-center">
          <img 
            src={photo.imageUrl} 
            alt={photo.title} 
            className="w-full h-auto max-h-[70vh] object-contain transition-transform hover:scale-[1.02] cursor-zoom-in"
          />
        </div>
        
        {/* Content and comments area */}
        <div className="bg-white flex flex-col h-[30vh] overflow-hidden">
          {/* Photo info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatar-placeholder.png" />
                <AvatarFallback className="bg-gradient-to-r from-pink-400 to-blue-400 text-white">
                  {user ? getInitials(user.username) : "LA"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{photo.title}</p>
                <p className="text-xs text-gray-500">{format(new Date(photo.createdAt), 'dd/MM/yyyy')}</p>
              </div>
            </div>
            
            {/* Description */}
            <p className="mt-2 text-sm text-gray-700">{photo.description}</p>
            
            {/* Hearts count */}
            <div className="flex mt-3 border-t pt-3 justify-end">
              <div className="text-xs text-gray-500 flex items-center">
                <Heart className="h-3 w-3 text-red-500 mr-1 fill-red-500" />
                <span>{photo.wishes?.length || 0}</span>
              </div>
            </div>
          </div>
          
          {/* Comments section */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {photo.wishes && photo.wishes.length > 0 ? (
              <div className="space-y-4">
                {photo.wishes.map((wish) => (
                  <div key={wish.id} className="flex gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs">
                        {getInitials(wish.content.substring(0, 10))}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-2xl px-3 py-2">
                        <p className="font-medium text-xs">Khách</p>
                        <p className="text-sm">{wish.content}</p>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{format(new Date(wish.createdAt), 'dd MMM')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
              </div>
            )}
          </div>
          
          {/* Comment input */}
          <div className="p-3 border-t flex items-center gap-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="/avatar-placeholder.png" />
              <AvatarFallback className="bg-gradient-to-r from-pink-400 to-blue-400 text-white">
                {user ? getInitials(user.username) : "LA"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex bg-gray-100 rounded-full pr-2">
              <input
                type="text"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Viết lời chúc của bạn..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm rounded-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddWish();
                  }
                }}
              />
              <div className="flex items-center">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-5 w-5 text-gray-500" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  onClick={handleAddWish}
                  className="text-primary"
                  disabled={!wishText.trim()}
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
