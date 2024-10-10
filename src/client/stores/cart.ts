import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { cartItemType } from '@/shared/types'
import { useToast } from 'vue-toastification'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<cartItemType[]>([])
  const toast = useToast()

  async function addToCart(id: string, quantity: number) {
    debugger
    cartItems.value.push({
      id: id,
      quantity: quantity
    })
    toast.success('This is a success message!')
  }

  return {
    cartItems,
    addToCart
  }
})
