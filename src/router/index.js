import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import Login from '../views/Login.vue';
import Cart from '../views/Cart.vue';
import Admin from '../views/Admin.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/login', component: Login },
  { path: '/cart', component: Cart },
  { path: '/admin', component: Admin } // 商品上架頁
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;