<script setup>
import { defineProps } from 'vue';
import request from '../api/request';
import { fetchCartCount } from '../store/cartStore';

// 接收父組件傳入的商品資料
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const fetchProducts = async () => {
  try {
    // 呼叫 GET /api/product/ 帶入 query params [cite: 27-34]
    const res = await request.get('/api/product/', { params: filters });
    // 回傳結構是 PageProductEntity，商品在 content 欄位 [cite: 59-60]
    products.value = res.data.content;
  } catch (error) {
    console.error(error);
  }
};
// 加入購物車邏輯 (從原本的 ProductList 搬過來)
const addToCart = async (productId) => {
  try {
    // 假設後端的 API 是 POST /api/cart/add
    await request.post('/api/product/', {
      productId: productId,
      quantity: 1
    });
    alert('已加入購物車！');
    // 更新 Navbar 的購物車數字
    fetchCartCount();
  } catch (error) {
    console.error(error);
    // 這裡可以根據後端回傳的錯誤碼細分，例如 401 就是沒登入
    alert('加入失敗，請確認是否已登入');
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img 
        :src="product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'" 
        :alt="product.name"
        class="w-full h-48 object-cover"
    >
    
    <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 truncate">{{ product.name }}</h3>
        <div class="mt-4 flex items-center justify-between">
            <span class="text-xl font-bold text-indigo-600">NT$ {{ product.price }}</span>
            <button 
                @click="addToCart(product.id)"
                class="px-3 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 transition flex items-center gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                加入
            </button>
        </div>
    </div>
  </div>
</template>