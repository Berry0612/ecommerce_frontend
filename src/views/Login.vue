<script setup>
import { ref } from 'vue';
import request from '../api/request';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = ref(true); // 切換登入/註冊模式
const form = ref({
  email: '',
  password: ''
});

const submit = async () => {
  try {
    const url = isLogin.value ? '/auth/login' : '/auth/signup';
    // 根據 API，傳送 UserEntity (email, password) [cite: 17, 20, 56]
    const res = await request.post(url, form.value);
    
    // 取得 AuthResponse (jwt, message) [cite: 57]
    if (res.data.jwt) {
      localStorage.setItem('jwt', res.data.jwt);
      alert(isLogin.value ? '登入成功' : '註冊成功');
      router.push('/');
    }
  } catch (error) {
    alert('操作失敗，請檢查帳號密碼');
  }
};
</script>

<template>
  <div class="p-10 max-w-md mx-auto">
    <h2 class="text-2xl mb-4">{{ isLogin ? '會員登入' : '註冊帳號' }}</h2>
    <input v-model="form.email" type="email" placeholder="Email" class="border p-2 w-full mb-2" />
    <input v-model="form.password" type="password" placeholder="Password" class="border p-2 w-full mb-4" />
    
    <button @click="submit" class="bg-blue-500 text-white p-2 w-full rounded">
      {{ isLogin ? '登入' : '註冊' }}
    </button>
    
    <p @click="isLogin = !isLogin" class="mt-4 text-blue-500 cursor-pointer text-center">
      {{ isLogin ? '沒有帳號？去註冊' : '已有帳號？去登入' }}
    </p>
  </div>
</template>