<template>
  <div
    class="bg-yellow-200 h-60 w-60 rounded-lg shadow-lg p-4 text-start transition transform hover:scale-105 relative hover:bg-green-200 hover:cursor-pointer"
  >
    <!-- Positioned Image to be half outside the card -->
    <img
      alt="pasta logo"
      :src="dish.imageURL"
      class="h-40 w-40 object-cover rounded-full absolute -top-12 left-1/2 transform -translate-x-1/2"
    />

    <!-- Padding added to the top to prevent overlap with the image -->
    <div class="pt-24">
      <h3 class="text-l font-semibold text-gray-800 truncate">{{ dish.name }}</h3>
      <p class="text-2xl font-bold">{{ dish.price + ' EGP' }}</p>
      <div class="flex justify-start items-start mt-2">
        <span class="text-yellow-500 text-lg">★★★★★</span>
        <span class="ml-2 mt-1 text-gray-600 font-semibold text-sm">{{ dish.rating }}</span>
      </div>
    </div>
    <div class="flex justify-end space-x-2 mt-1 mb-2">
      <button
        data-tooltip-target="cart-tooltip"
        type="button"
        title="Add to cart"
        :class="[
          'w-6 h-6 bg-white px-0.5 py-1 rounded-md fa-solid fa-cart-shopping hover:cursor-pointer',
          { ' text-red-500': dish.isAddedToCart }
        ]"
        @click.stop="
          authenticationStore.userInfo ? cartStore.addToCart(dish.id, 1) : redirectToLogin()
        "
      />
      <button
        data-tooltip-target="cart-tooltip"
        type="button"
        title="Add to favorite"
        :class="[
          'w-6 h-6 bg-white p-1 fa-solid fa-heart rounded-md hover:cursor-pointer flex justify-center items-center',
          { ' text-red-500': dish.isAddedToFavorites }
        ]"
        @click.stop="
          authenticationStore.userInfo
            ? isFavorite
              ? dishStore.removeFromFavorite(authenticationStore.userInfo?.userId ?? '', dish.id)
              : dishStore.addToFavorite(authenticationStore.userInfo?.userId ?? '', dish.id)
            : redirectToLogin()
        "
      />
      <button
        data-tooltip-target="cart-tooltip"
        type="button"
        title="Share dish"
        class="w-6 h-6 p-1 bg-white rounded-md fa-solid hover:cursor-pointer fa-share"
        @click.stop="dishStore.copyURL(dish.id)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { dishType } from '@/shared/types'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDishStore, useCartStore, useAuthenticationStore } from '@/client/stores'

const router = useRouter()
const dishStore = useDishStore()
const cartStore = useCartStore()
const toast = useToast()
const authenticationStore = useAuthenticationStore()
defineProps({
  dish: {
    type: Object as () => dishType,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: false
  }
})
function redirectToLogin() {
  router.push('/login')
  toast.info('You need to login first')
}
</script>
