<script setup>
import { ref } from 'vue';
import request from '../api/request';

const form = ref({
  name: '',
  description: '',
  price: 0,
  category: ''
});

const addProduct = async () => {
  try {
    // 呼叫 POST /api/product/ 
    // Body 為 ProductEntity [cite: 37, 52]
    await request.post('/api/product/', form.value);
    alert('商品上架成功！');
    // 清空表單
    form.value = { name: '', description: '', price: 0, category: '' };
  } catch (error) {
    alert('上架失敗');
  }
};
</script>

<template>
  <div class="p-10 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-6">新增商品</h1>
    
    <div class="space-y-4">
      <input v-model="form.name" placeholder="商品名稱" class="w-full border p-2 rounded" />
      <textarea v-model="form.description" placeholder="商品描述" class="w-full border p-2 rounded"></textarea>
      <input v-model="form.price" type="number" placeholder="價格" class="w-full border p-2 rounded" />
      <input v-model="form.category" placeholder="分類" class="w-full border p-2 rounded" />
      
      <button @click="addProduct" class="w-full bg-blue-600 text-white  py-2 rounded hover:bg-gray-800">
        上架商品
      </button>
    </div>
  </div>
</template>