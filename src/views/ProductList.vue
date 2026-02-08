<script setup>
import { ref, reactive, onMounted } from 'vue';
import request from '../api/request';
import { fetchCartCount } from '../store/cartStore';

// --- 狀態管理 ---
const mobileFiltersOpen = ref(false);
const products = ref([]);
const sortOption = ref('newest');
const currentPage = ref(0); // 當前頁碼 (後端是從 0 開始)
const totalPages = ref(0);  // 總頁數

const sortOptions = [
  { name: '最新上架', value: 'newest' },
  { name: '價格: 低到高', value: 'price_asc' },
  { name: '價格: 高到低', value: 'price_desc' },
];

// 過濾器狀態 (保留了你原本的結構並擴充)
const filters = reactive({
  category: '',
  minPrice: null,
  maxPrice: null,
  pageNumber: 0,
  pageSize: 12
});

const fetchProducts = async () => {
  try {
    filters.pageNumber = currentPage.value; // 確保 filters 裡的頁碼是正確的
    // 呼叫 GET /api/product/ 帶入 query params [cite: 27-34]
    const res = await request.get('/api/product/', { params: filters });
    // 確保後端回傳結構正確 (Spring Boot Page 結構)
    if (res.data && res.data.content) {
        products.value = res.data.content;
        totalPages.value = res.data.totalPages;
    } else {
        products.value = [];
    }
  } catch (error) {
    console.error("獲取商品失敗:", error);
  }
};

// [新增] 換頁函式
const changePage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
    fetchProducts();
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
    await fetchCartCount();
    
  } catch (error) {
    alert('請先登入');
    router.push('/login');
  }
};

// 監聽排序變更
const handleSortChange = () => {
  console.log('Sort changed to:', sortOption.value);
  fetchProducts();
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="bg-white">
    <div>
      <!-- 響應式布局 -->
      <!-- <div v-show="mobileFiltersOpen" class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-black/25 transition-opacity" @click="mobileFiltersOpen = false"></div>

        <div class="fixed inset-0 z-40 flex">
          <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div class="flex items-center justify-between px-4">
              <h2 class="text-lg font-medium text-gray-900">Filters</h2>
              <button @click="mobileFiltersOpen = false" type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form class="mt-4 border-t border-gray-200">
              <h3 class="sr-only">Categories</h3>
              <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                <li v-for="category in categories" :key="category.name">
                  <a href="#" class="block px-2 py-3">{{ category.name }}</a>
                </li>
              </ul>

              <div class="border-t border-gray-200 px-4 py-6">
                <h3 class="-mx-2 -my-3 flow-root">
                  <span class="font-medium text-gray-900">Color</span>
                </h3>
                <div class="pt-6" id="filter-mobile-color">
                  <div class="space-y-6">
                    <div v-for="color in colors" :key="color.name" class="flex items-center">
                      <input :id="`filter-mobile-color-${color.name}`" :value="color.name" v-model="filters.colors" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                      <label :for="`filter-mobile-color-${color.name}`" class="ml-3 min-w-0 flex-1 text-gray-500">{{ color.name }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> -->

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

          <div class="flex items-center">
            <div class="relative inline-block text-left">
              <select v-model="sortOption" @change="handleSortChange" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border-none focus:ring-0 cursor-pointer bg-transparent">
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                  {{ option.name }}
                </option>
              </select>
            </div>

            <button @click="mobileFiltersOpen = true" type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
              <span class="sr-only">Filters</span>
              <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- <form class="hidden lg:block"> -->
            <!-- <h3 class="sr-only">Categories</h3>
              <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                <li v-for="category in categories" :key="category.name">
                  <div class="flex items-center">
                    <input :id="`cat-${category.name}`" :value="category.name" v-model="filters.category" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label :for="`cat-${category.name}`" class="ml-3 cursor-pointer">{{ category.name }}</label>
                  </div>
                </li>
              </ul>

              <div class="border-b border-gray-200 py-6">
                <h3 class="-my-3 flow-root">
                  <span class="font-medium text-gray-900">Color</span>
                </h3>
                <div class="pt-6" id="filter-color">
                  <div class="space-y-4">
                    <div v-for="color in colors" :key="color.name" class="flex items-center">
                      <input :id="`filter-${color.name}`" :value="color.name" v-model="filters.colors" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                      <label :for="`filter-${color.name}`" class="ml-3 text-sm text-gray-600">{{ color.name }}</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-b border-gray-200 py-6">
                <h3 class="-my-3 flow-root">
                  <span class="font-medium text-gray-900">Size</span>
                </h3>
                <div class="pt-6" id="filter-size">
                  <div class="space-y-4">
                    <div v-for="size in sizes" :key="size" class="flex items-center">
                      <input :id="`filter-${size}`" :value="size" v-model="filters.sizes" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                      <label :for="`filter-${size}`" class="ml-3 text-sm text-gray-600">{{ size }}</label>
                    </div>
                  </div>
                </div>
              </div>
              -->
              <div class="py-6">
                 <h3 class="font-medium text-gray-900 mb-4">Price</h3>
                 <div class="flex gap-2">
                   <input v-model="filters.minPrice" type="number" placeholder="Min" class="w-full rounded border-gray-300 px-2 py-1 text-sm shadow-sm" />
                   <span class="text-gray-500">-</span>
                   <input v-model="filters.maxPrice" type="number" placeholder="Max" class="w-full rounded border-gray-300 px-2 py-1 text-sm shadow-sm" />
                 </div>
                 <button @click.prevent="fetchProducts" class="mt-4 w-full rounded bg-gray-900 px-2 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700">Apply</button>
              </div>
            <!-- </form> -->

            <div class="lg:col-span-3">
              <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                <div v-for="product in products" :key="product.id" class="group relative">
                  <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img :src="product.imageUrl || 'https://placehold.co/400x400'" :alt="product.name" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                  </div>
                  <div class="mt-4 flex justify-between">
                    <div>
                      <h3 class="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" class="absolute inset-0"></span>
                          {{ product.name }}
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                    </div>
                    <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>
                  </div>
                  <div class="mt-4">
                     <button @click.stop="addToCart(product)" class="relative z-10 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex justify-center items-center gap-4">
              <button 
                  @click="changePage(currentPage - 1)" 
                  :disabled="currentPage === 0"
                  class="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  Previous
              </button>

              <span class="text-sm text-gray-700">
                  Page <span class="font-medium">{{ currentPage + 1 }}</span> of <span class="font-medium">{{ totalPages }}</span>
              </span>

              <button 
                  @click="changePage(currentPage + 1)" 
                  :disabled="currentPage >= totalPages - 1"
                  class="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  Next
              </button>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 可以在這裡添加一些特定樣式，但大部分已由 Tailwind 處理 */
</style>