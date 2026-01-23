import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8080', // Swagger Server URL 
  timeout: 5000
});

// 請求攔截器：自動帶入 JWT
request.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    // 根據 API 定義，多數接口需要 Authorization header [cite: 3, 9, 12, 47]
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default request;