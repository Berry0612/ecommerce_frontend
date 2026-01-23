<script setup>
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/vue";
import {
	Bars3Icon,
	ShoppingCartIcon,
	UserIcon,
	XMarkIcon,
} from "@heroicons/vue/24/outline";

const navigation = [{ name: "Add Product", href: "/add", current: true }];
const goToCart = () => {
    window.location.href = "/cart";
}

</script>


<template>
  <nav class="bg-black text-white p-4 flex justify-between items-center">
    <router-link to="/" class="text-xl font-bold">Mars E-Commerce</router-link>
    <div class="space-x-4">
      <router-link to="/" class="hover:text-gray-300">商品列表</router-link>
      <router-link to="/cart" class="hover:text-gray-300">購物車</router-link>
      <router-link to="/admin" class="hover:text-gray-300">後台管理</router-link>
      <router-link to="/login" class="hover:text-gray-300">登入/註冊</router-link>
    </div>
  </nav>
  <router-view></router-view>
</template>

