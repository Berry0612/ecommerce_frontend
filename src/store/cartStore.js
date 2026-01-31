import { ref } from 'vue';
import request from '../api/request'; // 引入你原本的 api 工具

// 1. 定義一個響應式的變數，預設為 0
export const cartCount = ref(0);

// 2. 定義一個函式來向後端要最新的數量
export const fetchCartCount = async () => {
  // 如果沒登入，就不用去要資料了 (避免報錯)
  const token = localStorage.getItem('jwt');
  if (!token) {
    cartCount.value = 0;
    return;
  }

  try {
    const res = await request.get('api/cart/'); 
    if (res.data && Array.isArray(res.data.cartItems)) {
       cartCount.value = res.data.cartItems.length;
    } else {
       cartCount.value = 0;
    }
  } catch (error) {
    console.error('取得購物車數量失敗:', error);
  }
};