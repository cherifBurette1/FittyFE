// src/stores/orderStore.ts
import { defineStore } from 'pinia'
import type { Order } from '@/shared/types'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([]) // Store orders

  // Fetch user orders (mock or actual API call)
  const fetchOrders = async () => {
    try {
      // Replace with actual API call or mock data
      const response = [
        {
          id: 1,
          date: '2024-10-01',
          status: 'Delivered',
          address: 'Home',
          shippingCompany: 'Marsool',
          paymentMethod: 'Cash',
          total: 150,
          items: [
            { name: 'Pasta', quantity: 2, price: 50 },
            { name: 'Pizza', quantity: 1, price: 50 }
          ]
        },
        {
          id: 2,
          date: '2024-10-01',
          status: 'Delivered',
          address: 'Home',
          shippingCompany: 'Marsool',
          paymentMethod: 'Cash',
          total: 150,
          items: [
            { name: 'Pasta', quantity: 2, price: 50 },
            { name: 'Pizza', quantity: 1, price: 50 }
          ]
        }
        // Add more orders
      ]
      orders.value = response
    } catch (error) {
      console.error('Failed to fetch orders', error)
    } finally {
    }
  }

  return {
    orders,
    fetchOrders
  }
})
