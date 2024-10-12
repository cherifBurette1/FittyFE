import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import type { cartItemType, paymentOptionType, shippingOptionType } from '@/shared/types'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<cartItemType[]>([])
  const shippingOptions = ref<shippingOptionType[]>([])
  const paymentOptions = ref<paymentOptionType[]>([])
  const selectedPaymentOption = ref<string | null>(null)
  const toast = useToast()
  const selectedAddressId = ref<string | null>(null)
  const promo = ref<string | null>(null)

  function addToCart(id: string, quantity: number) {
    const existingItem = cartItems.value.find((item) => item.id === id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ id, quantity })
    }
    toast.success('Added to cart!')
  }

  function removeItem(id: string) {
    cartItems.value = cartItems.value.filter((item) => item.id !== id)
    toast.success('Removed from cart!')
  }

  // Update quantity of an item in the cart
  function updateQuantity(id: string, amount: number) {
    const existingItem = cartItems.value.find((item) => item.id === id)
    if (existingItem) {
      existingItem.quantity += amount
    }
  }
  function getShippingOptions() {
    shippingOptions.value = [
      {
        id: '1',
        name: 'Marsool',
        price: 100
      },
      {
        id: '2',
        name: 'DHL',
        price: 200
      },
      {
        id: '3',
        name: 'UPS',
        price: 300
      }
    ]
  }
  function getPaymentOptions() {
    paymentOptions.value = [
      {
        id: '1',
        name: 'Cash',
        isActive: true
      },
      {
        id: '2',
        name: 'Credit Card',
        isActive: true
      },
      {
        id: '3',
        name: 'InstaPay',
        isActive: false
      },
      {
        id: '3',
        name: 'MobileWallet',
        isActive: false
      }
    ]
  }
  return {
    cartItems,
    addToCart,
    removeItem,
    updateQuantity,
    getShippingOptions,
    shippingOptions,
    getPaymentOptions,
    paymentOptions,
    selectedPaymentOption,
    selectedAddressId,
    promo
  }
})
