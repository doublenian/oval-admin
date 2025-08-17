import axios from 'axios';
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
  getCourts: (params?: any): Promise<Court[]> => api.get('/courts', { params }),
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
  getVenues: (params?: any) => {
    // 模拟获取场馆数据
    return new Promise((resolve) => {
      setTimeout(() => {
        // 这里可以根据params进行筛选和分页
        const mockVenues = [
          {
            id: '1',
            name: 'Philippine Arena',
            chinese_name: '菲律宾竞技场',
            category: 'B',
            capacity: 51898,
            country: 'Philippines',
            city: 'Bocaue',
            region: 'Asia',
            built_year: 2014,
            architect: 'POPULOUS',
            construction_cost: '213 million USD',
            link: 'https://en.wikipedia.org/wiki/Philippine_Arena'
          },
          {
            id: '2', 
            name: 'Mineirinho Arena',
            chinese_name: '米尼尔尼奥竞技场',
            category: 'S',
            capacity: 24482,
            country: 'Brazil',
            city: 'Belo Horizonte',
            region: 'South America',
            built_year: 1980,
            architect: null,
            construction_cost: null,
            link: 'https://en.wikipedia.org/wiki/Mineirinho'
          },
          {
            id: '3',
            name: 'Greensboro Coliseum Complex',
            chinese_name: '格林斯伯罗竞技场',
            category: 'B',
            capacity: 23500,
            country: 'United States',
            city: 'Greensboro',
            region: 'North America',
            built_year: 1959,
            architect: 'FABRAP',
            construction_cost: '4.5 million USD (40.4 million USD in 2020); 63 million USD(1993 Expansion)',
            link: 'https://www.wikiwand.com/en/Greensboro_Coliseum'
          }
        ];
        resolve({
          data: mockVenues,
          total: mockVenues.length,
          page: params?.page || 1,
          pageSize: params?.pageSize || 10
        });
      }, 500);
    });
  },
  getVenue: (id: string) => {
    // 模拟获取单个场馆详情
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockVenue = {
          id,
          name: 'Philippine Arena',
          chinese_name: '菲律宾竞技场',
          category: 'B',
          capacity: 51898,
          country: 'Philippines',
          city: 'Bocaue',
          region: 'Asia',
          built_year: 2014,
          update_year: null,
          architect: 'POPULOUS',
          venue_type: 'P',
          construction_cost: '213 million USD',
          link: 'https://en.wikipedia.org/wiki/Philippine_Arena',
          height: 65,
          building_size: '227/179',
          total_area: null,
          events_clubs: null
        };
        resolve(mockVenue);
      }, 300);
    });
  },
  searchVenues: (query: string, filters?: any) => {
    // 模拟搜索场馆
    return new Promise((resolve) => {
      setTimeout(() => {
        // 这里可以实现搜索逻辑
        resolve({
          data: [],
          total: 0
        });
      }, 300);
    });
  }
};

export default api;