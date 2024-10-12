<template>
  <header class="flex justify-between items-center px-6 mt-6 mb-6">
    <img alt="Fitty logo" class="h-12" src="../../../shared/assets/fittyPNG.png" />
    <div class="flex items-center space-x-4">
      <!-- If user is logged in -->
      <div v-if="true" class="flex items-center space-x-4">
        <div class="h-8 w-8 flex justify-center items-center rounded-full border-2 border-solid">
          <i class="fa-solid fa-user"></i>
        </div>

        <!-- Cart, Orders, Favorites Links -->
        <nav class="space-x-4">
          <router-link :to="{ name: 'cart' }" class="text-gray-600 hover:text-green-600"
            >Cart</router-link
          >
          <a href="/orders" class="text-gray-600 hover:text-green-600">Orders</a>
          <a href="/favorites" class="text-gray-600 hover:text-green-600">Favorites</a>
        </nav>
        <!-- Sign Out Button -->
        <button @click="() => {}" class="text-red-600 hover:text-red-800">Sign Out</button>
      </div>
      <div v-else>
        <button class="text-gray-600 mr-4" @click="router.push({ name: 'login' })">Login</button>
        <button
          class="bg-green-600 text-white px-4 py-2 rounded"
          @click="router.push({ name: 'signUp' })"
        >
          Sign Up
        </button>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>