<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import request from '../api/request';

const cart = ref(null);
const router = useRouter();
const fetchCart = async () => {
  try {
    // 取得 CartEntity [cite: 48, 69]
    const res = await request.get('/api/cart/');
    const cartData = res.data;
    if(Array.isArray(cartData.cartItems)){
      cartData.cartItems.sort((a, b) => b.id - a.id);
    }
    cart.value = cartData;
    
  } catch (error) {
    router.push('/login');
    alert('請先登入');
  }
};

const updateItem = async (item, newQuantity) => {
  if (newQuantity < 1) return;
  try {
    // 呼叫 PUT /api/cartItem/{id} 
    // 根據 Swagger，Body 需要 CartItemEntity 結構 [cite: 4, 50]
    // 雖然通常只要 quantity，但依照文件我們把整個物件結構帶入，並更新 quantity
    await request.put(`/api/cartItem/${item.id}`, {
      ...item,
      quantity: newQuantity
    });
    fetchCart(); // 更新畫面
  } catch (error) {
    alert('更新失敗');
  }
};

const removeItem = async (itemId) => {
  if(!confirm('確定刪除？')) return;
  try {
    // 呼叫 DELETE /api/cartItem/{id} 
    await request.delete(`/api/cartItem/${itemId}`);
    fetchCart();
  } catch (error) {
    alert('刪除失敗');
  }
};

const checkout = async () => {
  if (!cart.value || cart.value.totalPrice === 0) {
    alert('購物車是空的');
    return;
  }

  try {
    // 1. 呼叫後端結帳 API
    // request.js 會自動帶入 Authorization Header
    const res = await request.post('/api/payment/checkout');
    
    // 2. 後端回傳的是一段 HTML (包含自動 submit 的 form)
    // 我們將這段 HTML 寫入當前頁面，瀏覽器就會自動執行並跳轉到綠界
    document.write(res.data); 

  } catch (error) {
    console.error(error);
    alert('結帳發生錯誤，請稍後再試');
  }
};

onMounted(fetchCart);
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto" v-if="cart">
    <h1 class="text-2xl font-bold mb-6">我的購物車</h1>
    
    <div v-for="item in cart.cartItems" :key="item.id" class="flex justify-between items-center border-b py-4">
      <div>
        <h3 class="font-bold">{{ item.product.name }}</h3>
        <p class="text-sm text-gray-500">單價: ${{ item.product.price }}</p>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center border rounded">
          <button @click="updateItem(item, item.quantity - 1)" class="px-3 py-1 hover:bg-gray-100">-</button>
          <span class="px-3">{{ item.quantity }}</span>
          <button @click="updateItem(item, item.quantity + 1)" class="px-3 py-1 hover:bg-gray-100">+</button>
        </div>
        <p class="font-bold w-20 text-right">${{ item.price }}</p> <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700">刪除</button>
      </div>
    </div>

    <div class="mt-8 text-right">
      <p class="text-xl font-bold">總金額: ${{ cart.totalPrice }}</p>
      <button class="mt-4 bg-green-600 text-white px-8 py-3 rounded text-lg">結帳</button>
    </div>

    <button 
        @click="checkout" 
        class="mt-4 bg-green-600 text-white px-8 py-3 rounded text-lg hover:bg-green-700 transition">
        結帳去 (綠界支付)
      </button>
      
  </div>
  <div v-else class="text-center mt-10">載入中...</div>
</template>