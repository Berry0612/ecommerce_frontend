import axios from 'axios';

const args = process.argv.slice(2);
const options = {
  baseURL: process.env.API_BASE_URL || 'http://localhost:8080',
  endpoint: '/api/product/',
  category: '',
  minPrice: null,
  maxPrice: null,
  pageNumber: 0,
  pageSize: 12,
};

for (const arg of args) {
  const [key, value] = arg.split('=');
  if (!key?.startsWith('--')) continue;
  const name = key.slice(2);
  if (!(name in options)) continue;

  if (['pageNumber', 'pageSize'].includes(name)) {
    options[name] = Number(value);
  } else if (['minPrice', 'maxPrice'].includes(name)) {
    options[name] = value === 'null' || value === undefined ? null : Number(value);
  } else {
    options[name] = value;
  }
}

const params = {
  category: options.category,
  minPrice: options.minPrice,
  maxPrice: options.maxPrice,
  pageNumber: options.pageNumber,
  pageSize: options.pageSize,
};

const token = process.env.API_JWT;
const headers = token ? { Authorization: `Bearer ${token}` } : {};

console.log('=== Product API 診斷開始 ===');
console.log('請求網址:', `${options.baseURL}${options.endpoint}`);
console.log('請求參數:', params);

try {
  const response = await axios.get(`${options.baseURL}${options.endpoint}`, {
    params,
    headers,
    timeout: 8000,
  });

  const data = response.data;
  const frontendCanRead = Boolean(data && Array.isArray(data.content));

  console.log('\n[1] 後端 API 狀態');
  console.log('- HTTP status:', response.status);
  console.log('- response.data 型別:', typeof data);

  console.log('\n[2] 後端資料結構檢查（對齊 ProductList.vue）');
  console.log('- 是否有 content 陣列:', frontendCanRead);
  console.log('- totalPages:', data?.totalPages ?? '(缺少)');
  console.log('- content 長度:', Array.isArray(data?.content) ? data.content.length : '(不是陣列)');

  if (Array.isArray(data?.content) && data.content.length > 0) {
    const first = data.content[0];
    console.log('\n[3] 第一筆商品欄位檢查');
    console.log('- id:', first.id);
    console.log('- name:', first.name);
    console.log('- price:', first.price);
    console.log('- imageUrl:', first.imageUrl);
  }

  console.log('\n[4] 問題定位建議');
  if (!frontendCanRead) {
    console.log('❌ 後端回傳結構與前端不符（前端預期 data.content）。問題偏向後端 API 或前端解析邏輯不一致。');
  } else if (data.content.length === 0) {
    console.log('⚠️ 後端成功回應但 content 為空。請先確認資料庫是否有資料，或目前過濾條件是否把資料篩掉。');
  } else {
    console.log('✅ 後端 API 與前端解析格式看起來正常，若頁面仍不顯示，問題較可能在前端渲染/狀態更新。');
  }
} catch (error) {
  console.log('\n[1] 後端 API 狀態');
  if (error.response) {
    console.log('❌ API 有回應但錯誤');
    console.log('- HTTP status:', error.response.status);
    console.log('- 錯誤訊息:', error.response.data);
  } else {
    console.log('❌ API 無法連線或逾時');
    console.log('- 訊息:', error.message);
  }

  console.log('\n[4] 問題定位建議');
  console.log('目前無法拿到可用的 API 回應，問題偏向後端服務、API 路由、CORS、或 baseURL 設定。');
  process.exitCode = 1;
}
