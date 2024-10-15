// src/stores/orderStore.ts
import { defineStore } from 'pinia'
import type { Order } from '@/shared/types'
import { ref } from 'vue'
import { useAuthenticationStore } from '@/client/stores'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([]) // Store orders
  const authenticationStore = useAuthenticationStore()
  // Fetch user orders (mock or actual API call)
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:5220/fitty-api/Order/GetAllUsersOrders?userId=${authenticationStore.userInfo?.userId}`
      )
      if (response.ok) {
        const data = await response.json()
        orders.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch orders')
    }
  }

  return {
    orders,
    fetchOrders
  }
})
