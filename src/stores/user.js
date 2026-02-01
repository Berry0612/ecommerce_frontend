// src/stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
// 為了在登入後自動更新購物車，我們也可以在這裡引入 fetchCartCount
// 或是選擇在組件裡監聽，這裡為了方便直接引入
import { fetchCartCount, cartCount } from '../store/cartStore';

export const useUserStore = defineStore('user', () => {
  // --- State (資料) ---
  const token = ref(localStorage.getItem('jwt') || '');
  const isLoggedIn = ref(false);
  const isAdmin = ref(false);
  const userName = ref(''); // 你也可以順便存使用者名稱

  // --- Actions (方法) ---
  
  const checkAuth = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
        isLoggedIn.value = true;
        fetchCartCount();
        try {
            // Token 格式是 header.payload.signature，我們取中間的 payload
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload.role === 'ROLE_ADMIN') {
                isAdmin.value = true;
            } else {
                isAdmin.value = false;
            }
        } catch (e) {
            console.error('Token 解析失敗', e);
            logout();
        }
    } else {
        logout();
    }

    };

  // 2. 登入動作
  const login = (newToken) => {
    localStorage.setItem('jwt', newToken);
    checkAuth(); // 呼叫上面的函式更新狀態
  };

  // 3. 登出動作
  const logout = () => {
    localStorage.removeItem('jwt');
    token.value = '';
    isLoggedIn.value = false;
    isAdmin.value = false;
    userName.value = '';
    cartCount.value = 0; // 清空購物車數字
  };

  return { 
    token, 
    isLoggedIn, 
    isAdmin, 
    userName,
    checkAuth, 
    login, 
    logout 
  };
});