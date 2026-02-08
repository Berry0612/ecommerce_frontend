<script setup>
import { ref, onMounted } from 'vue';
// 引入剛剛建立的組件
import HeroSlider from '../components/HeroSlider.vue';
import ProductCard from '../components/ProductCard.vue';
import AppFooter from '../components/AppFooter.vue';
// 如果真的要打 API 就解開下面註解
// import request from '../api/request';

// 定義存放商品資料的變數
const bestSellers = ref([]);
const newArrivals = ref([]);
const isLoading = ref(true);

// 模擬 API 獲取資料的函式
// 這裡使用 setTimeout 模擬網路延遲，並回傳假資料
const fetchHomeData = async () => {
    isLoading.value = true;
    console.log("開始獲取首頁資料...");

    // 模擬資料 (實際開發時，後端會回傳類似結構的 JSON)
    // 為了湊齊 2 row 3 col，我們需要 6 筆資料
    const mockProducts = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `示範商品 ${i + 1}`,
        price: Math.floor(Math.random() * 5000) + 500, // 隨機價格 500~5500
        // 使用假圖服務，加上隨機參數確保圖片不同
        imageUrl: `https://picsum.photos/400/400?random=${i + 10}`
    }));

    // 模擬這兩個 API 端點：
    // GET /api/products/best-sellers
    // GET /api/products/new-arrivals
    
    setTimeout(() => {
        // 這裡我們暫時用同一組假資料，你可以手動修改讓它們看起來不一樣
        bestSellers.value = mockProducts.map(p => ({...p, name: '熱銷 - ' + p.name}));
        
        newArrivals.value = mockProducts.map(p => ({...p, name: '最新 - ' + p.name, imageUrl: `https://picsum.photos/400/400?random=${p.id + 50}`}));

        isLoading.value = false;
        console.log("首頁資料獲取完成");
    }, 1000); // 模擬 1 秒載入時間

    /* // --- 真實 API 呼叫範例 ---
    try {
        const [bestRes, newRes] = await Promise.all([
            request.get('/api/products/best-sellers?limit=6'),
            request.get('/api/products/new-arrivals?limit=6')
        ]);
        bestSellers.value = bestRes.data;
        newArrivals.value = newRes.data;
    } catch (error) {
        console.error("獲取首頁資料失敗", error);
    } finally {
        isLoading.value = false;
    }
    */
};

onMounted(() => {
    fetchHomeData();
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeroSlider />

    <main class="flex-grow container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12 space-y-16">
        
        <div v-if="isLoading" class="text-center text-gray-500 py-20">
            載入商品中...
        </div>

        <template v-else>
            <section>
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-bold text-gray-800">熱銷商品排行</h2>
                    <router-link to="/products" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 transition">
                        查看全部 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </router-link>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProductCard 
                        v-for="product in bestSellers.slice(0, 6)" 
                        :key="product.id" 
                        :product="product" 
                    />
                </div>
            </section>

            <section>
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-bold text-gray-800">本週最新上架</h2>
                    <router-link to="/products" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 transition">
                        查看全部
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </router-link>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProductCard 
                        v-for="product in newArrivals.slice(0, 6)" 
                        :key="product.id" 
                        :product="product" 
                    />
                </div>
            </section>
        </template>
    </main>

    <AppFooter />
  </div>
</template>