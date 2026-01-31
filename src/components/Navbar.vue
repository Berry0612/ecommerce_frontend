<script setup>
import { ref, onMounted, watch} from 'vue';
import AuthModal from './AuthModal.vue';
import { cartCount, fetchCartCount } from '../store/cartStore';

const isAuthModalOpen = ref(false);
const isMenuOpen = ref(false);//手機版菜單開關
const isLoggedIn = ref(false); //登入狀態
const isProfileMenuOpen = ref(false);
const isAdmin = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const checkLoginStatus = () => {
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
        isLoggedIn.value = false;
        isAdmin.value = false;
        cartCount.value = 0;
    }

  } else {
    isLoggedIn.value = false;
  }
};

//處理登入成功 (由 AuthModal 觸發)
const handleLoginSuccess = () => {
  checkLoginStatus();
  isAuthModalOpen.value = false; // 關閉登入視窗
  isProfileMenuOpen.value = false; // 確保選單是關閉的
};

//處理登出
const handleLogout = () => {
  localStorage.removeItem('jwt'); // 1. 移除 Token
  isLoggedIn.value = false;       // 2. 更新狀態
  isProfileMenuOpen.value = false; // 3. 關閉選單
  isAdmin.value = false;
  alert('已登出');
  // 如果需要跳轉回首頁，可以加上: window.location.href = '/';
};

onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <nav class="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
    
    <router-link to="/">
      <img class="h-9" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg" alt="Logo">
    </router-link>

    <button aria-label="Menu" @click="toggleMenu" class="sm:hidden">
      <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="21" height="1.5" rx=".75" fill="#426287"/>
        <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287"/>
        <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287"/>
      </svg>
    </button>

    <div 
      id="mobile-menu" 
      :class="[isMenuOpen ? 'flex' : 'hidden']"
      class="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50"
    >
      <router-link to="/" class="block py-2">商品列表</router-link>
      <router-link to="/cart" class="block py-2">購物車</router-link>
      <router-link v-if="isAdmin" to="/admin" class="block py-2">後台管理</router-link>

      <button 
            @click="isAuthModalOpen = true"
            class="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
        >
            Login
        </button>

      <div v-if="isLoggedIn" class="w-full border-t border-gray-100 pt-2 mt-2">
         <span class="block py-2 text-gray-500 font-bold">我的帳戶</span>
         <button @click="handleLogout" class="block py-2 text-red-500">登出</button>
      </div>

    </div>
  <!-- ========================================================================================================= -->
    <div class="hidden sm:flex items-center gap-8">
      <router-link to="/" class="hover:text-indigo-600 transition">商品列表</router-link>
      <router-link v-if="isAdmin" to="/admin" class="hover:text-indigo-600 transition">後台管理</router-link>

      <div class="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
        <input class="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- <div class="relative cursor-pointer hover:opacity-80 transition">
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">3</span>
      </div> -->
      <router-link to="/cart" class="relative cursor-pointer hover:opacity-80 transition">
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        <span 
            v-if="cartCount > 0"
            class="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center"
        >
            {{ cartCount }}
        </span>
      </router-link>

      <div class="relative">
        <div v-if="isLoggedIn" class="relative">
            <button 
              @click="isProfileMenuOpen = !isProfileMenuOpen" 
              class="flex items-center gap-2 focus:outline-none transition hover:opacity-80"
            >
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User Avatar" 
                  class="w-10 h-10 rounded-full border border-gray-200 bg-gray-50"
                >
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <div 
              v-if="isProfileMenuOpen" 
              class="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-down"
            >
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="text-sm font-bold text-gray-900">User</p>
                  <p class="text-xs text-gray-500 truncate">user@example.com</p>
                </div>
                
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                  個人資料
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                  訂單查詢
                </a>
                
                <div class="border-t border-gray-100 my-1"></div>
                
                <button 
                  @click="handleLogout" 
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  登出
                </button>
            </div> 
        </div>
      
        <button 
          v-else
          @click="isAuthModalOpen = true"
          class="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full font-medium shadow-md hover:shadow-lg active:scale-95"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
  <AuthModal 
    :isOpen="isAuthModalOpen" 
    @close="isAuthModalOpen = false" 
    @loginSuccess="handleLoginSuccess"
  />
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.2s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
