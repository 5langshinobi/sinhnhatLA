import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueFilename = `${randomUUID()}${path.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    }
  }),
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      // Instead of passing an error, pass null and false to reject the file
      return cb(null, false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Setup auth routes
  setupAuth(app);

  // Serve uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Get all photos with wishes
  app.get("/api/photos", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const photos = await storage.getAllPhotosWithWishes();
      res.json(photos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch photos" });
    }
  });

  // Upload a new photo
  app.post("/api/photos", upload.single("image"), async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }
    
    try {
      const { title, description } = req.body;
      const imageUrl = `/uploads/${req.file.filename}`;
      
      const photo = await storage.createPhoto({
        title,
        description,
        imageUrl,
        userId: req.user.id,
      });
      
      res.status(201).json(photo);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload photo" });
    }
  });

  // Add a wish to a photo
  app.post("/api/photos/:id/wishes", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const photoId = parseInt(req.params.id);
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Wish content is required" });
      }
      
      const wish = await storage.addWishToPhoto({
        photoId,
        userId: req.user.id,
        content,
      });
      
      res.status(201).json(wish);
    } catch (error) {
      res.status(500).json({ message: "Failed to add wish" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
