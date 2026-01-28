<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import request from '../api/request';

const router = useRouter();
const products = ref([]);
const filters = reactive({
  category: '',
  minPrice: null,
  maxPrice: null,
  pageNumber: 0,
  pageSize: 10
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

const addToCart = async (product) => {
  try {
    // 呼叫 PUT /api/cart/add [cite: 11]
    // Body 必須符合 AddItemRequest: { productId, quantity } [cite: 54-55]
    await request.put('/api/cart/add', {
      productId: product.id,
      quantity: 1
    });
    alert('已加入購物車！');
  } catch (error) {
    alert('請先登入');
    router.push('/login');
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="p-6">
    <div class="flex gap-2 mb-6">
      <input v-model="filters.category" placeholder="分類" class="border p-2" />
      <input v-model="filters.minPrice" type="number" placeholder="最低價" class="border p-2" />
      <input v-model="filters.maxPrice" type="number" placeholder="最高價" class="border p-2" />
      <button @click="fetchProducts" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-gray-800">搜尋</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="p in products" :key="p.id" class="border p-4 rounded shadow">
        <h3 class="font-bold text-lg">{{ p.name }}</h3>
        <p class="text-gray-600">{{ p.description }}</p>
        <p class="text-red-600 font-bold mt-2">${{ p.price }}</p>
        <button @click="addToCart(p)" class="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>