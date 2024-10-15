import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import type {
  cartItemType,
  paymentOptionType,
  shippingLocationType,
  shippingOptionType
} from '@/shared/types'
import { useAuthenticationStore } from '@/client/stores'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<cartItemType[]>([])
  const authenticationStore = useAuthenticationStore()
  const shippingOptions = ref<shippingOptionType[]>([])
  const shippingLocations = ref<shippingLocationType[]>([])
  const paymentOptions = ref<paymentOptionType[]>([])
  const selectedPaymentOption = ref<string | null>(null)
  const toast = useToast()
  const selectedAddressId = ref<string | null>(null)
  const promo = ref<string | null>(null)
  const cookingInstructions = ref('')
  const deliveryInstructions = ref('')
  const selectedShippingOption = ref('')

  async function addToCart(id: string, quantity: number) {
    try {
      const body = JSON.stringify({
        userId: authenticationStore.userInfo?.userId,
        dishId: id,
        quantity: quantity
      })

      const response = await fetch('http://localhost:5220/fitty-api/Cart/AddCartItem', {
        method: 'POST', // Use POST to add a favorite
        headers: {
          'Content-Type': 'application/json' // Specify that you're sending JSON
        },
        body: body // Send the body containing userId and dishId
      })

      if (response.ok) {
        getCartItems()
        toast.success('Added to cart!')
      }
    } catch (error) {
      throw new Error('Failed to add to cart')
    }
  }

  async function removeItem(id: string) {
    try {
      const body = JSON.stringify({
        Id: id
      })

      const response = await fetch('http://localhost:5220/fitty-api/Cart/RemoveCartItem', {
        method: 'POST', // Use POST to add a favorite
        headers: {
          'Content-Type': 'application/json' // Specify that you're sending JSON
        },
        body: body // Send the body containing userId and dishId
      })

      if (response.ok) {
        getCartItems()
        toast.success('Removed from cart!')
      }
    } catch (error) {
      throw new Error('Failed to add to cart')
    }
  }

  // Update quantity of an item in the cart
  function updateQuantity(id: string, amount: number) {
    const existingItem = cartItems.value.find((item) => item.id === id)
    if (existingItem) {
      existingItem.quantity += amount
    }
  }
  async function getShippingOptions() {
    try {
      const response = await fetch(`http://localhost:5220/fitty-api/Cart/GetShippingProviders`)
      if (response.ok) {
        const data = await response.json()
        shippingOptions.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch shipping providers')
    }
  }
  async function getShippingLocations(userId: string) {
    try {
      const response = await fetch(
        `http://localhost:5220/fitty-api/Cart/GetUserLocations?userId=${userId}`
      )
      if (response.ok) {
        const data = await response.json()
        shippingLocations.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch locations')
    }
  }
  async function getPaymentOptions() {
    try {
      const response = await fetch(`http://localhost:5220/fitty-api/Cart/GetPaymentOptions`)
      if (response.ok) {
        const data = await response.json()
        paymentOptions.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch payment options')
    }
  }
  async function getCartItems() {
    try {
      const response = await fetch(
        `http://localhost:5220/fitty-api/Cart/GetAllCartItems?userId=${authenticationStore.userInfo?.userId}`
      )
      if (response.ok) {
        const data = await response.json()
        cartItems.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch payment options')
    }
  }
  async function submitOrder(totalPrice: number) {
    try {
      const shippingId = shippingOptions.value.find((option) => {
        // Extract the name from selectedShippingOption
        const selectedShippingOptionName = selectedShippingOption.value.split('-')[0].trim()

        // Compare the names
        return option.name === selectedShippingOptionName
      })?.id
      const paymentId = paymentOptions.value.find((option) => {
        return option.name === selectedPaymentOption.value
      })?.id
      const body = JSON.stringify({
        CartItemIds: [...cartItems.value.map((item) => item.id)],
        ShippingId: shippingId,
        CookingInstructions: cookingInstructions.value,
        DeliveryInstructions: deliveryInstructions.value,
        PaymentId: paymentId,
        LocationId: selectedAddressId.value,
        TotalPrice: totalPrice,
        PromoCode: ''
      })

      const response = await fetch('http://localhost:5220/fitty-api/Order/AddOrder', {
        method: 'POST', // Use POST to add a favorite
        headers: {
          'Content-Type': 'application/json' // Specify that you're sending JSON
        },
        body: body // Send the body containing userId and dishId
      })
      if (response.ok) {
        const data = await response.json()
        toast.success('order placed Successfully!')
      }
    } catch (error) {
      throw new Error('Failed to fetch payment options')
    }
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
    getShippingLocations,
    promo,
    shippingLocations,
    getCartItems,
    cookingInstructions,
    deliveryInstructions,
    submitOrder,
    selectedShippingOption
  }
})
