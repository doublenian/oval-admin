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

export interface Venue {
  id: string;
  name: string;
  chinese_name?: string;
  category?: string;
  link?: string;
  built_year?: number;
  update_year?: number;
  region?: string;
  country?: string;
  city?: string;
  architect?: string;
  venue_type?: string;
  stand_contour?: string;
  ga_tier?: number;
  capacity?: number;
  vip_capacity?: number;
  hospitality_capacity?: number;
  press_capacity?: number;
  disabled_capacity?: number;
  suites_count?: number;
  temperature_capacity?: number;
  height?: number;
  fop?: string;
  screen_area?: string;
  events_clubs?: string;
  total_area?: number;
  construction_cost?: string;
  venue_index?: number;
  additional_link?: string;
  construction_code?: string;
  main_color_code?: string;
  building_size?: string;
  created_at?: string;
  updated_at?: string;
}