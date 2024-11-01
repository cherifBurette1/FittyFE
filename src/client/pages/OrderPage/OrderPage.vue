<template>
  <header-card />
  <section class="py-6 relative">
    <div class="w-full max-w-7xl mx-auto px-4 md:px-8">
      <h2 class="font-semibold text-3xl text-black mb-9">Your Orders</h2>

      <!-- No orders found message -->
      <div
        v-if="orders.length === 0"
        class="flex flex-col items-center justify-center min-h-[70vh] text-center text-gray-500 space-y-4"
      >
        <i class="fas fa-shop-slash text-8xl text-gray-300 animate__animated animate__bounceIn"></i>
        <p class="text-lg font-semibold">You don't have any orders.</p>
        <p class="text-gray-600">Looks like you haven't bought anything yet.</p>
        <button
          class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          @click="$router.push('/home')"
        >
          Continue Shopping
        </button>
      </div>
      <div v-else>
        <!-- Orders list -->
        <div class="space-y-6 border p-6 rounded-lg border-green-100 shadow-lg min-w-full">
          <div
            v-for="order in orders"
            :key="order.id"
            class="border rounded-lg p-6 bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            <div class="flex justify-between items-center">
              <h2 class="font-semibold text-xl text-gray-800">
                Order #{{ order.id }} - {{ order.date }}
              </h2>
              <div class="flex items-center space-x-4">
                <span
                  :class="{
                    'text-green-500': order.status === 'Delivered',
                    'text-yellow-500': order.status === 'Processing',
                    'text-red-500': order.status === 'Cancelled'
                  }"
                  class="font-semibold"
                >
                  {{ order.status }}
                </span>
                <span class="font-semibold">Total: {{ order.totalPrice }} EGP</span>
                <i
                  :class="
                    expandedOrders.includes(order.id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
                  "
                  class="hover:cursor-pointer transition-transform duration-200"
                  @click="toggleOrderItems(order.id)"
                ></i>
              </div>
            </div>

            <!-- Expanded Order Details -->
            <transition name="slide-fade" mode="out-in">
              <div v-show="expandedOrders.includes(order.id)" class="mt-4">
                <div class="mb-4 p-4 bg-gray-100 rounded-lg border-l-4 border-green-600">
                  <h3 class="font-semibold">Order Details</h3>
                  <p class="text-gray-800">
                    Shipping Address: <strong>{{ order.locationName }}</strong>
                  </p>
                  <p class="text-gray-800">
                    Shipping Company: <strong>{{ order.shippingName }}</strong>
                  </p>
                  <p class="text-gray-800">
                    Payment Method: <strong>{{ order.paymentName }}</strong>
                  </p>
                </div>

                <!-- Order Items -->
                <ul class="divide-y divide-gray-200">
                  <li
                    v-for="item in cartStore.cartItems"
                    :key="item.name"
                    class="flex justify-between items-center py-3 hover:bg-green-50 transition-colors duration-200 cursor-pointer"
                    @click="viewProductDetails(item)"
                  >
                    <div class="flex items-center space-x-4">
                      <img
                        :src="item.imageURL"
                        :alt="item.name"
                        class="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p class="font-semibold text-gray-800">{{ item.name }}</p>
                        <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
                      </div>
                    </div>
                    <p class="font-semibold text-gray-800">{{ item.price }} EGP</p>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useOrderStore, useCartStore } from '@/client/stores'
import { useRouter } from 'vue-router'
import { HeaderCard, SearchComponent } from '@/client/components'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const cartStore = useCartStore()
const { orders } = storeToRefs(orderStore)
const router = useRouter()

const expandedOrders = ref<number[]>([])

onMounted(async () => {
  await orderStore.fetchOrders()
  debugger
  expandedOrders.value = [...orders.value.map((order) => order.id)]
})

function toggleOrderItems(orderId: number) {
  if (expandedOrders.value.includes(orderId)) {
    expandedOrders.value = expandedOrders.value.filter((id) => id !== orderId)
  } else {
    expandedOrders.value.push(orderId)
  }
}

function viewProductDetails(item: any) {
  router.push({ name: 'productDetails', query: { id: item.productId } })
}
</script>
  
  <style scoped>
li:hover {
  background-color: #f3f4f6; /* Light gray for hover effect */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.cursor-pointer {
  cursor: pointer;
}

.bg-green-50 {
  background-color: #f0fff4; /* Light green for section background */
}
</style>
  