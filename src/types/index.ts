export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'disabled';
  createdAt: string;
  lastLoginAt?: string;
}

export interface Court {
  id: string;
  name: string;
  location: string;
  description?: string;
  capacity: number;
  status: 'active' | 'disabled';
  createdAt: string;
  updatedAt: string;
  images: CourtImage[];
}

export interface CourtImage {
  id: string;
  courtId: string;
  url: string;
  filename: string;
  size: number;
  uploadedAt: string;
  isMain?: boolean;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
}