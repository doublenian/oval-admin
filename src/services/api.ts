import axios from 'axios';
import { supabase } from './supabase';
import { AuthUser, Court, CourtImage, User } from '../types';

// 创建 axios 实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (username: string, password: string) => {
    // 模拟登录验证
    const demoUsers = [
      { username: 'admin', password: '123456', role: 'admin', email: 'admin@example.com' },
      { username: 'manager', password: '123456', role: 'admin', email: 'manager@example.com' },
      { username: 'user', password: '123456', role: 'user', email: 'user@example.com' },
      { username: 'demo', password: 'demo', role: 'admin', email: 'demo@example.com' },
    ];
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = demoUsers.find(u => u.username === username && u.password === password);
        if (user) {
          resolve({
            token: 'demo_token_' + Date.now(),
            user: {
              id: Date.now().toString(),
              username: user.username,
              email: user.email,
              role: user.role,
            }
          });
        } else {
          reject({
            response: {
              data: {
                message: '用户名或密码错误'
              }
            }
          });
        }
      }, 1000);
    });
  },
  getCurrentUser: (): Promise<AuthUser> => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const courtAPI = {
  getCourts: async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
  }) => {
    try {
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('venues') // 使用 venues 表作为球场数据
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

      // 应用搜索筛选
      if (params?.search) {
        query = query.or(`name.ilike.%${params.search}%,chinese_name.ilike.%${params.search}%,city.ilike.%${params.search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      // 转换数据格式以匹配 Court 接口
      const courts = (data || []).map(venue => ({
        id: venue.id,
        name: venue.name,
        location: `${venue.city || ''}, ${venue.country || ''}`.trim(),
        description: venue.chinese_name || '',
        capacity: venue.capacity || 0,
        status: 'active' as const,
        createdAt: venue.created_at || new Date().toISOString(),
        updatedAt: venue.updated_at || new Date().toISOString(),
        images: [],
      }));

      return {
        data: courts,
        total: count || 0,
        page,
        pageSize
      };
    } catch (error) {
      console.error('Error fetching courts:', error);
      throw error;
    }
  },
  getCourt: (id: string): Promise<Court> => api.get(`/courts/${id}`),
  createCourt: (data: Partial<Court>): Promise<Court> => api.post('/courts', data),
  updateCourt: (id: string, data: Partial<Court>): Promise<Court> => 
    api.put(`/courts/${id}`, data),
  deleteCourt: (id: string) => api.delete(`/courts/${id}`),
  toggleCourtStatus: (id: string, status: 'active' | 'disabled') =>
    api.patch(`/courts/${id}/status`, { status }),
  
  // 图片相关
  uploadImage: (courtId: string, file: File): Promise<CourtImage> => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post(`/courts/${courtId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteImage: (courtId: string, imageId: string) =>
    api.delete(`/courts/${courtId}/images/${imageId}`),
  
  // 批量操作
  bulkUploadCourts: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/courts/bulk-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  bulkUploadImages: (courtId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return api.post(`/courts/${courtId}/images/bulk`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const userAPI = {
  getUsers: (params?: any): Promise<User[]> => api.get('/users', { params }),
  getUser: (id: string): Promise<User> => api.get(`/users/${id}`),
  createUser: (data: Partial<User>): Promise<User> => api.post('/users', data),
  updateUser: (id: string, data: Partial<User>): Promise<User> =>
    api.put(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
  toggleUserStatus: (id: string, status: 'active' | 'disabled') =>
    api.patch(`/users/${id}/status`, { status }),
};

export const venuesAPI = {
  getVenues: async (params?: {
    page?: number;
    pageSize?: number;
    region?: string;
    category?: string;
    search?: string;
  }) => {
    try {
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 20;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      console.log(`Fetching venues - Page: ${page}, PageSize: ${pageSize}, From: ${from}, To: ${to}`);
      let query = supabase
        .from('venues')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('capacity', { ascending: false, nullsLast: true });

      // 应用搜索筛选
      if (params?.search) {
        query = query.or(`name.ilike.%${params.search}%,chinese_name.ilike.%${params.search}%,country.ilike.%${params.search}%,city.ilike.%${params.search}%`);
      }

      // 应用区域筛选
      if (params?.region && params.region !== 'all') {
        query = query.eq('region', params.region);
      }

      // 应用类别筛选
      if (params?.category && params.category !== 'all') {
        query = query.eq('category', params.category);
      }

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      console.log(`Retrieved ${(data || []).length} venues, Total: ${count}`);

      return {
        data: data || [],
        total: count || 0,
        page,
        pageSize,
        hasMore: (count || 0) > page * pageSize
      };
    } catch (error) {
      console.error('Error fetching venues:', error);
      throw error;
    }
  },
  getVenue: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching venue:', error);
      throw error;
    }
  },
  searchVenues: async (query: string, filters?: any) => {
    try {
      let supabaseQuery = supabase
        .from('venues')
        .select('*', { count: 'exact' });

      // 搜索逻辑
      if (query) {
        supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,chinese_name.ilike.%${query}%,country.ilike.%${query}%,city.ilike.%${query}%`);
      }

      // 应用其他筛选条件
      if (filters) {
        if (filters.region && filters.region !== 'all') {
          supabaseQuery = supabaseQuery.eq('region', filters.region);
        }
        if (filters.category && filters.category !== 'all') {
          supabaseQuery = supabaseQuery.eq('category', filters.category);
        }
      }

      const { data, error, count } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return {
        data: data || [],
        total: count || 0
      };
    } catch (error) {
      console.error('Error searching venues:', error);
      throw error;
    }
  }
};

export default api;