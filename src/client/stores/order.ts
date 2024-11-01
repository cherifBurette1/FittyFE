// src/stores/orderStore.ts
import { defineStore } from 'pinia'
import type { Order } from '@/shared/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/client/stores'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([]) // Store orders
  const authenticationStore = useAuthenticationStore()
  const router = useRouter()
  // Fetch user orders (mock or actual API call)
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:5220/fitty-api/Order/GetAllUsersOrders?userId=${authenticationStore.userInfo?.userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + authenticationStore.userInfo?.token
          }
        }
      )
      if (response.status === 401) {
        toast.info('please login to access this page')
        router.push({ name: 'login' })
      }
      if (response.ok) {
        debugger
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
