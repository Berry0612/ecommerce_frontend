<script setup>
import { ref } from 'vue';
import request from '../api/request';
import { useUserStore } from '../stores/user';

const props = defineProps(['isOpen']);
const emit = defineEmits(['close', 'loginSuccess']);
const userStore = useUserStore();

const isLogin = ref(true); // true顯示登入, false顯示註冊
const loginForm = ref({ email: '', password: '' });
const registerForm = ref({ username: '', email: '', password: '' });

// 處理登入
const handleLogin = async () => {
  try {
    ///auth/login
    const res = await request.post('/auth/login', {
        email: loginForm.value.email,
        password: loginForm.value.password
    });
    if (res.data.jwt) {
      userStore.login(res.data.jwt);

      alert('登入成功');
      emit('close'); // 關閉視窗
      emit('loginSuccess'); // 通知父元件重整狀態
    }
  } catch (error) {
    alert('登入失敗，請檢查帳號密碼');
  }
};

// 處理註冊
const handleRegister = async () => {
  try {
    // 注意：目前後端 UserEntity 只有 email/password，這裡雖有 username 欄位但暫時只傳 email/password
    // 如果後端有新增 name 欄位，可以把 username 也傳過去
    const res = await request.post('/auth/signup', {
        email: registerForm.value.email,
        password: registerForm.value.password,
        // role: 'ROLE_USER' // 預設就是 User
    });
    if (res.data.jwt) {
        userStore.login(res.data.jwt);
        alert('註冊成功');
        emit('close');
        emit('loginSuccess');
    }
  } catch (error) {
    alert('註冊失敗，信箱可能已被使用');
  }
};
</script>


<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="relative bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-md w-full mx-4 transition-all transform duration-300 scale-100">
        
        <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <form v-if="isLogin" class="flex w-full flex-col items-center justify-center" @submit.prevent="handleLogin">
            <h2 class="text-3xl font-bold text-gray-900">Sign in</h2>
            <p class="mt-2 text-sm text-gray-500">Welcome back! Please sign in to continue</p>
            
            <div class="mt-8 mb-4 flex w-full justify-center gap-4">
               <button type="button" class="border p-2 rounded-full hover:bg-gray-50"><span class="text-xs font-bold px-2">G</span></button>
               <button type="button" class="border p-2 rounded-full hover:bg-gray-50"><span class="text-xs font-bold px-2"></span></button>
               <button type="button" class="border p-2 rounded-full hover:bg-gray-50"><span class="text-xs font-bold px-2">F</span></button>
            </div>

            <div class="my-4 flex w-full items-center gap-4">
                <div class="h-px w-full bg-gray-200"></div>
                <p class="text-xs text-gray-400 text-nowrap">or sign in with email</p>
                <div class="h-px w-full bg-gray-200"></div>
            </div>

            <div class="w-full space-y-4">
                <div class="flex h-12 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 focus-within:border-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
                    <input v-model="loginForm.email" placeholder="Email id" class="w-full bg-transparent text-sm outline-none" required type="email"/>
                </div>
                <div class="flex h-12 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 focus-within:border-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <input v-model="loginForm.password" placeholder="Password" class="w-full bg-transparent text-sm outline-none" required type="password"/>
                </div>
            </div>

            <div class="mt-6 flex w-full items-center justify-between text-sm">
                <label class="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" class="rounded border-gray-300 text-gray-800 focus:ring-gray-800" />
                    <span class="text-gray-500">Remember me</span>
                </label>
                <a class="text-gray-800 underline hover:text-black" href="#">Forgot password?</a>
            </div>

            <button type="submit" class="mt-8 h-11 w-full rounded-full bg-gradient-to-b from-gray-700 to-black text-white font-medium hover:from-gray-800 hover:to-black transition-all shadow-lg active:scale-95">
                Login
            </button>
            
            <p class="mt-6 text-gray-500 text-sm">
                Don’t have an account?
                <button type="button" @click="isLogin = false" class="text-gray-800 font-semibold underline hover:text-black ml-1">
                    Sign up
                </button>
            </p>
        </form>

        <form v-else class="flex w-full flex-col items-center justify-center" @submit.prevent="handleRegister">
            <h2 class="text-2xl font-bold mb-8 text-center text-gray-800">Sign Up</h2>
            
            <div class="w-full space-y-4">
                <div class="flex items-center border bg-indigo-50/30 border-gray-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                    <svg class="text-gray-400 mr-2" width="18" height="18" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <input v-model="registerForm.username" class="w-full bg-transparent outline-none text-sm text-gray-700" type="text" placeholder="Username" required>
                </div>
                
                <div class="flex items-center border bg-indigo-50/30 border-gray-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                    <svg class="text-gray-400 mr-2" width="18" height="18" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke-width="1.3" stroke-linecap="round"/></svg>
                    <input v-model="registerForm.email" class="w-full bg-transparent outline-none text-sm text-gray-700" type="email" placeholder="Email" required>
                </div>

                <div class="flex items-center border bg-indigo-50/30 border-gray-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                    <svg class="text-gray-400 mr-2" width="18" height="18" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke-width="1.3" stroke-linecap="round"/></svg>
                    <input v-model="registerForm.password" class="w-full bg-transparent outline-none text-sm text-gray-700" type="password" placeholder="Password" required>
                </div>
            </div>

            <button class="w-full mt-8 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded-lg text-white font-medium shadow-md hover:shadow-lg">
                Create Account
            </button>
            
            <p class="text-center mt-6 text-sm text-gray-500">
                Already have an account?
                <button type="button" @click="isLogin = true" class="text-indigo-500 font-semibold underline hover:text-indigo-700 ml-1">
                    Log In
                </button>
            </p>
        </form>

    </div>
  </div>
</template>