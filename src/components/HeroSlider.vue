<script setup>
// 引入 Swiper 的核心組件和樣式
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 這裡放置你的假輪播圖資料
const slides = [
  { id: 1, image: 'https://picsum.photos/1920/600?random=1', title: '夏季新風格發售' },
  { id: 2, image: 'https://picsum.photos/1920/600?random=2', title: '經典系列回歸' },
  { id: 3, image: 'https://picsum.photos/1920/600?random=3', title: '聯名限定款' },
];

// Swiper 的設定模組
const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <div class="w-full">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="mySwiper h-[400px] md:h-[500px] lg:h-[600px]"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id" class="relative">
        <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
        </swiper-slide>
    </swiper>
  </div>
</template>

<style>
/* 客製化 Swiper 的箭頭樣式 
  模仿 BEAMS 的細黑色箭頭風格
*/
.swiper-button-next,
.swiper-button-prev {
  color: #333 !important; /* 改成深黑色 */
  height: 50px;
  width: 50px;
  background: rgba(255, 255, 255, 0.5); /* 半透明白色背景，讓箭頭更明顯 */
  border-radius: 50%;
  transition: all 0.3s ease;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* 調整箭頭圖標大小 */
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 20px !important;
  font-weight: bold;
}

/* 分頁點點樣式 */
.swiper-pagination-bullet-active {
    background-color: #333 !important;
}
</style>