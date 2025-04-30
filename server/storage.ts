import { users, type User, type InsertUser, photos, type Photo, type InsertPhoto, wishes, type Wish, type InsertWish, type PhotoWithWishes } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllPhotosWithWishes(): Promise<PhotoWithWishes[]>;
  getPhotoById(id: number): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  addWishToPhoto(wish: InsertWish): Promise<Wish>;
  sessionStore: any; // Type for session store
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private photosMap: Map<number, Photo>;
  private wishesMap: Map<number, Wish>;
  private userIdCounter: number;
  private photoIdCounter: number;
  private wishIdCounter: number;
  sessionStore: any;

  constructor() {
    this.usersMap = new Map();
    this.photosMap = new Map();
    this.wishesMap = new Map();
    this.userIdCounter = 1;
    this.photoIdCounter = 1;
    this.wishIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24h
    });

    // Add default user for testing
    this.createUser({
      username: "Phạm Nguyễn Lan Anh",
      password: "0105202464c76a87bc4ca0f994f7cd531ee9be1cb3a17373cd9bab2dc1efcf4e33c9b9cccf56e10ddb695c969aec35fa93f0ddcb56cb7e82b18cdc8a77844d03e538e.7fa27eb8d8c0a8d14a9e1ae088c9e1d1",
    });

    // Sample photos
    const samplePhotos: InsertPhoto[] = [
      {
        title: "Bánh sinh nhật lần thứ 20",
        description: "Bánh ngọt ngào như tính cách của bạn",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        userId: 1,
      },
      {
        title: "Hoa yêu thích",
        description: "Những bông hoa tươi thắm như tâm hồn bạn",
        imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        userId: 1,
      },
      {
        title: "Trà sữa yêu thích",
        description: "Những buổi chiều với trà sữa ngọt ngào",
        imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        userId: 1,
      },
      {
        title: "Pháo hoa mừng năm mới",
        description: "Khoảnh khắc rực rỡ đón chào năm mới",
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        userId: 1,
      },
      {
        title: "Cung Kim Ngưu",
        description: "Kiên định, mạnh mẽ và đáng tin cậy",
        imageUrl: "https://images.unsplash.com/photo-1551887196-a119aec4e128?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        userId: 1,
      },
      {
        title: "Tiệc sinh nhật năm ngoái",
        description: "Khoảnh khắc hạnh phúc bên bạn bè và gia đình",
        imageUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        userId: 1,
      }
    ];

    // Initialize with sample photos
    samplePhotos.forEach(photo => {
      this.createPhoto(photo);
    });

    // Add some wishes to the photos
    const sampleWishes = [
      {
        photoId: 1,
        userId: 1,
        content: "Chúc mừng sinh nhật! Mong rằng tuổi mới sẽ mang lại nhiều niềm vui và hạnh phúc."
      },
      {
        photoId: 2,
        userId: 1,
        content: "Những bông hoa tươi đẹp dành tặng người đặc biệt."
      },
      {
        photoId: 3,
        userId: 1,
        content: "Trà sữa ngọt ngào như những kỷ niệm chúng ta đã có."
      }
    ];

    sampleWishes.forEach(wish => {
      this.addWishToPhoto(wish);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now 
    };
    this.usersMap.set(id, user);
    return user;
  }

  async getAllPhotosWithWishes(): Promise<PhotoWithWishes[]> {
    const allPhotos = Array.from(this.photosMap.values());
    
    return allPhotos.map(photo => {
      const photoWishes = Array.from(this.wishesMap.values())
        .filter(wish => wish.photoId === photo.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      return {
        ...photo,
        wishes: photoWishes
      };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getPhotoById(id: number): Promise<Photo | undefined> {
    return this.photosMap.get(id);
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = this.photoIdCounter++;
    const now = new Date();
    const photo: Photo = {
      ...insertPhoto,
      description: insertPhoto.description || null,
      id,
      createdAt: now,
    };
    this.photosMap.set(id, photo);
    return photo;
  }

  async addWishToPhoto(insertWish: InsertWish): Promise<Wish> {
    const id = this.wishIdCounter++;
    const now = new Date();
    const wish: Wish = {
      ...insertWish,
      id,
      createdAt: now,
    };
    this.wishesMap.set(id, wish);
    return wish;
  }
}



export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllPhotosWithWishes(): Promise<PhotoWithWishes[]> {
    const allPhotos = await db.select().from(photos).orderBy(photos.createdAt);
    const allWishes = await db.select().from(wishes);
    
    return allPhotos.map(photo => {
      const photoWishes = allWishes
        .filter(wish => wish.photoId === photo.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      return {
        ...photo,
        wishes: photoWishes
      };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getPhotoById(id: number): Promise<Photo | undefined> {
    const [photo] = await db.select().from(photos).where(eq(photos.id, id));
    return photo;
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const [photo] = await db
      .insert(photos)
      .values(insertPhoto)
      .returning();
    return photo;
  }

  async addWishToPhoto(insertWish: InsertWish): Promise<Wish> {
    const [wish] = await db
      .insert(wishes)
      .values(insertWish)
      .returning();
    return wish;
  }
}

// Use DatabaseStorage for production with PostgreSQL
export const storage = new DatabaseStorage();
