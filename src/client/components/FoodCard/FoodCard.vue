<template>
  <div
    class="bg-yellow-200 h-60 w-60 rounded-lg shadow-lg p-4 text-start transition transform hover:scale-105 relative hover:bg-green-200 hover:cursor-pointer"
  >
    <!-- Positioned Image to be half outside the card -->
    <img
      alt="pasta logo"
      src="../../../shared/assets/pastaLogo.png"
      class="h-48 w-48 object-cover rounded-full absolute -top-12 left-1/2 transform -translate-x-1/2"
    />

    <!-- Padding added to the top to prevent overlap with the image -->
    <div class="pt-24">
      <h3 class="text-l font-semibold text-gray-800">{{ dish.name }}</h3>
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
        @click.stop="cartStore.addToCart(dish.id, 1)"
      />
      <button
        data-tooltip-target="cart-tooltip"
        type="button"
        title="Add to favorite"
        :class="[
          'w-6 h-6 bg-white p-1 fa-solid fa-heart rounded-md hover:cursor-pointer flex justify-center items-center',
          { ' text-red-500': dish.isAddedToFavorites }
        ]"
        @click.stop="dishStore.copyURL(dish.id)"
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
import { useDishStore, useCartStore } from '@/client/stores'

const dishStore = useDishStore()
const cartStore = useCartStore()
defineProps({
  dish: {
    type: Object as () => dishType,
    required: true
  }
})
</script>
