import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, X, Upload, Image as ImageIcon } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (formData: FormData) => void;
  isUploading: boolean;
}

export default function UploadModal({ isOpen, onClose, onUpload, isUploading }: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        alert('Vui lòng chọn tệp hình ảnh!');
        return;
      }
      
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (!droppedFile.type.startsWith('image/')) {
        alert('Vui lòng chọn tệp hình ảnh!');
        return;
      }
      
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = () => {
    if (!file || !title.trim()) {
      alert("Vui lòng chọn ảnh và nhập tiêu đề");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    onUpload(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-full p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-medium text-gray-800">Tải ảnh kỷ niệm lên</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-2">
          {!preview ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Kéo và thả ảnh vào đây hoặc</p>
              <Button 
                variant="link" 
                className="mt-2 text-primary hover:text-primary/90 font-medium"
              >
                Chọn từ thiết bị
              </Button>
              <Input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
          ) : (
            <div className="mb-6">
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-contain" 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="photoTitle" className="block text-gray-700 text-sm font-medium mb-1">Tiêu đề</Label>
              <Input 
                id="photoTitle" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Nhập tiêu đề cho ảnh"
              />
            </div>
            
            <div>
              <Label htmlFor="photoDescription" className="block text-gray-700 text-sm font-medium mb-1">Mô tả</Label>
              <Textarea 
                id="photoDescription" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Nhập mô tả hoặc lời chúc" 
                rows={3}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg mr-2 hover:bg-gray-50 transition"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isUploading || !file}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <ImageIcon className="h-4 w-4 mr-2" />
              )}
              Tải lên
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
