<template>
  <footer class="bg-gray-800 text-gray-300 py-10 mt-12">
    <div class="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-white text-lg font-bold mb-4">關於我們</h3>
        <p class="text-sm leading-relaxed">
          我們致力於提供最優質的商品與服務。這是一個示範用的電商網站，展示 Vue 3 與 Tailwind CSS 的開發成果。
        </p>
      </div>

      <div>
        <h3 class="text-white text-lg font-bold mb-4">快速連結</h3>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/" class="hover:text-white transition">首頁</router-link></li>
          <li><router-link to="/products" class="hover:text-white transition">全部商品</router-link></li>
          <li><a href="#" class="hover:text-white transition">聯絡我們</a></li>
          <li><a href="#" class="hover:text-white transition">退換貨政策</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-white text-lg font-bold mb-4">聯絡資訊</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (02) 1234-5678
          </li>
          <li class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            service@example.com
          </li>
        </ul>
      </div>
    </div>
    
    <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
      <p>&copy; 2024 E-Commerce Demo. All rights reserved.</p>
    </div>
  </footer>
</template>