<template>
  <header class="flex justify-between items-center px-6 mt-6 mb-6 relative">
    <!-- Back Arrow -->
    <div
      v-if="router.currentRoute.value.name !== 'home'"
      class="flex items-center hover:cursor-pointer"
      @click="$router.push('/home')"
    >
      <i class="fa fa-arrow-left text-gray-600 hover:text-green-600"></i>
    </div>

    <!-- Logo -->
    <img
      alt="Fitty logo"
      :class="[
        'h-12 hover:cursor-pointer',
        { ' ml-48': router.currentRoute.value.name !== 'home' }
      ]"
      src="../../../shared/assets/fittyPNG.png"
      @click="$router.push({ name: 'home' })"
    />

    <!-- User Navigation -->
    <div class="flex items-center space-x-4">
      <!-- If user is logged in -->
      <div v-if="userInfo?.username" class="flex items-center space-x-4">
        <div class="h-8 w-8 flex justify-center items-center rounded-full border-2 border-solid">
          <i class="fa-solid fa-user"></i>
        </div>

        <!-- Cart, Orders, Favorites Links -->
        <nav class="space-x-4">
          <router-link :to="{ name: 'cart' }" class="text-gray-600 hover:text-green-600"
            >Cart</router-link
          >
          <router-link :to="{ name: 'orders' }" class="text-gray-600 hover:text-green-600"
            >Orders</router-link
          >
          <router-link :to="{ name: 'favorites' }" class="text-gray-600 hover:text-green-600"
            >Favorites</router-link
          >
        </nav>

        <!-- Notification Icon
        <div class="relative">
          <i class="fas fa-bell text-xl text-gray-600 hover:text-green-600"></i>
          <span
            v-if="notificationCount > 0"
            class="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-semibold rounded-full h-3 w-4 flex items-center justify-center"
          >
            {{ notificationCount }}
          </span>
        </div> -->

        <!-- Sign Out Button -->
        <button @click="() => authenticationStore.logOut()" class="text-red-600 hover:text-red-800">
          Sign Out
        </button>
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
import { useAuthenticationStore } from '@/client/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const authenticationStore = useAuthenticationStore()
const { userInfo } = storeToRefs(authenticationStore)
// Example notification count - replace this with actual state management
const notificationCount = 3 // You can manage this state with Pinia or Vuex
</script>
  
  <style scoped>
/* You can add additional styles here */
</style>
  