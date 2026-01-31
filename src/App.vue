<script setup>
import { ref, onMounted } from 'vue';
import AuthModal from './components/AuthModal.vue';
import Navbar from './components/Navbar.vue';

const isAuthModalOpen = ref(false);
// const isAdmin = ref(false);

// 登入成功後的回調 (例如重新整理頁面或更新 UI)
const onLoginSuccess = () => {
  isAuthModalOpen.value = false; //登入box自動關掉
};

// const checkRole = () => {
//   const token = localStorage.getItem('jwt');
//   if (token) {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       if (payload.role === 'ROLE_ADMIN') {
//         isAdmin.value = true;
//       }
//     } catch (e) {
//       console.error('Token 解析失敗', e);
//       isAdmin.value = false;
//     }
//   }
// };

// onMounted(() => {
//   checkRole();
// });
</script>


<template>
  <Navbar />
  <!-- <nav class="bg-black text-white p-4 flex justify-between items-center"> -->
    <!-- <router-link to="/" class="text-xl font-bold">Mars E-Commerce</router-link>
    <div class="space-x-4">
      <router-link to="/" class="hover:text-gray-300">商品列表</router-link>
      <router-link to="/cart" class="hover:text-gray-300">購物車</router-link>
      <router-link v-if="isAdmin" to="/admin" class="hover:text-gray-300">後台管理</router-link>
      <router-link to="/login" class="hover:text-gray-300">登入/註冊</router-link> -->
      <!-- <a href="#" @click.prevent="isAuthModalOpen = true" class="hover:text-gray-300 cursor-pointer">
        登入/註冊
      </a>
    </div> -->
  <!-- </nav> -->
  <router-view></router-view>

  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <!-- <AuthModal 
        v-if="isAuthModalOpen" 
        :isOpen="isAuthModalOpen" 
        @close="isAuthModalOpen = false" 
        @loginSuccess="onLoginSuccess"
    /> -->
    <AuthModal  
        @loginSuccess="onLoginSuccess"
    />
  </Transition>
</template>

