import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<string>("ảnh");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview(null);
    setActiveTab("ảnh");
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
      <DialogContent className="max-w-md w-full p-0 overflow-hidden bg-[#FFF9FA] rounded-lg border-none shadow-xl">
        <div className="relative">
          {/* Close button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose}
            className="absolute top-2 right-2 z-50 rounded-full p-1 w-7 h-7 bg-transparent"
          >
            <X className="h-6 w-6 text-gray-500" />
          </Button>
          
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-pink-500 mb-1">Thêm ảnh kỷ niệm mới</h2>
            <p className="text-gray-600 text-sm mb-4">Tải lên hình ảnh kỷ niệm sinh nhật đáng nhớ</p>
            
            <Tabs defaultValue="ảnh" onValueChange={setActiveTab} className="mb-4">
              <TabsList className="w-full grid grid-cols-3 bg-gray-100">
                <TabsTrigger value="ảnh" className={`${activeTab === "ảnh" ? "bg-white" : ""} rounded-md py-2`}>Ảnh</TabsTrigger>
                <TabsTrigger value="video" className={`${activeTab === "video" ? "bg-white" : ""} rounded-md py-2`}>Video</TabsTrigger>
                <TabsTrigger value="tiktok" className={`${activeTab === "tiktok" ? "bg-white" : ""} rounded-md py-2`}>TikTok</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Tiêu đề */}
            <div className="mb-4">
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" 
                placeholder="Nhập tiêu đề cho ảnh"
              />
            </div>
            
            {/* Lời chúc */}
            <div className="mb-4">
              <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" 
                placeholder="Nhập lời chúc hoặc ghi chú cho ảnh" 
                rows={4}
              />
            </div>
            
            {/* Chọn ảnh */}
            <div className="mb-6">
              <p className="font-medium text-gray-700 mb-2">Chọn ảnh</p>
              
              <div 
                className="border-2 border-dashed border-pink-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 transition-colors flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ minHeight: "180px" }}
              >
                {preview ? (
                  <div className="relative w-full">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-32 mx-auto object-contain" 
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPreview(null);
                      }}
                      className="absolute top-0 right-0 bg-black/30 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-2 border-2 border-gray-300 rounded-full p-3">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Nhấn để chọn ảnh hoặc kéo thả vào đây</p>
                    <p className="text-gray-400 text-xs mt-1">Hỗ trợ: JPEG, PNG, GIF (tối đa 5MB)</p>
                  </>
                )}
                <Input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex-1"
              >
                Hủy
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isUploading || !file}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition flex-1"
              >
                {isUploading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <ImageIcon className="h-5 w-5 mr-2" />
                )}
                Tải ảnh lên
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
