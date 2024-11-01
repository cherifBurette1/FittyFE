<template>
  <header-card />
  <div class="bg-gray-100">
    <div class="container mx-auto mt-10">
      <div class="flex shadow-md my-10">
        <div class="w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-2xl">Shopping Cart</h1>
            <h2 class="font-semibold text-2xl">{{ cartItems.length }} Items</h2>
          </div>

          <div v-if="cartItems.length" class="flex mt-10 mb-5">
            <h3 class="font-semibold text-gray-600 text-xs uppercase w-[38%]">Product Details</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-[19%]">Price</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>

          <div
            v-else
            class="flex flex-col items-center justify-center min-h-[70vh] text-center text-gray-500 space-y-4"
          >
            <i
              class="fas fa-shopping-cart text-8xl text-gray-300 animate__animated animate__bounceIn"
            ></i>
            <p class="text-lg font-semibold">Your cart is currently empty.</p>
            <p class="text-gray-600">Looks like you haven't added anything yet.</p>
            <button
              class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              @click="$router.push('/home')"
            >
              Continue Shopping
            </button>
          </div>
          <transition-group name="fade" tag="div">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div class="flex w-2/5">
                <div class="w-24">
                  <img class="h-24" :src="item.imageURL" alt="Dish image" />
                </div>
                <div class="flex flex-col justify-center ml-4">
                  <span class="font-bold text-sm">{{ item.name }}</span>
                  <span class="text-red-500 text-xs">{{ item.description }}</span>
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <button @click="decreaseQuantity(item.id)">
                  <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path
                      d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    />
                  </svg>
                </button>
                <input
                  class="mx-2 border text-center w-8"
                  type="text"
                  :value="item.quantity"
                  readonly
                />
                <button @click="increaseQuantity(item.id)">
                  <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    />
                  </svg>
                </button>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">{{ item.price }} EGP</span>
              <span class="text-center w-1/5 font-semibold text-sm"
                >{{ (item.price * item.quantity).toFixed(2) }} EGP</span
              >
              <button
                @click="removeFromCart(item.id)"
                class="font-semibold hover:text-red-500 w-10 text-gray-500 text-xs fa fa-trash"
              ></button>
            </div>
          </transition-group>
        </div>

        <div id="summary" class="w-1/4 px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-sm uppercase">Items {{ cartItems.length }}</span>
            <span class="font-semibold text-sm">{{ totalPrice.toFixed(2) }} EGP</span>
          </div>
          <div>
            <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select
              class="block p-2 text-gray-600 w-full text-sm"
              v-model="cartStore.selectedShippingOption"
            >
              <option v-for="item in cartStore.shippingOptions" :key="item.id">
                {{ item.name + ' - ' + item.price + ' EGP' }}
              </option>
            </select>
          </div>

          <!-- Cooking Instructions -->
          <div class="mt-5">
            <label for="cookingInstructions" class="font-medium inline-block mb-3 text-sm uppercase"
              >Cooking Instructions</label
            >
            <textarea
              id="cookingInstructions"
              v-model="cookingInstructions"
              class="block p-2 border text-gray-600 w-full text-sm"
              rows="3"
              maxLength="500"
              placeholder="Enter your cooking instructions (max 500 characters)"
            ></textarea>
            <div class="text-right text-xs text-gray-500">{{ cookingInstructions.length }}/500</div>
          </div>

          <!-- Delivery Instructions -->
          <div class="mt-5">
            <label
              for="deliveryInstructions"
              class="font-medium inline-block mb-3 text-sm uppercase"
              >Delivery Instructions</label
            >
            <textarea
              id="deliveryInstructions"
              v-model="deliveryInstructions"
              class="block p-2 border text-gray-600 w-full text-sm"
              rows="3"
              maxLength="500"
              placeholder="Enter your delivery instructions (max 500 characters)"
            ></textarea>
            <div class="text-right text-xs text-gray-500">
              {{ deliveryInstructions.length }}/500
            </div>
          </div>
          <!-- Payment Options -->
          <div class="mt-5">
            <label class="font-medium inline-block mb-3 text-sm uppercase">Payment Options</label>
            <div
              v-for="(paymentOption, index) in cartStore.paymentOptions"
              :key="index"
              class="flex items-center mb-2"
            >
              <input
                type="radio"
                :id="'paymentOption-' + index"
                :value="paymentOption.name"
                v-model="cartStore.selectedPaymentOption"
                :disabled="!paymentOption.isActive"
                class="mr-2"
              />
              <label :for="'paymentOption-' + index" class="text-sm text-gray-600">
                {{ paymentOption.name }}
              </label>
            </div>
          </div>
          <!-- Address Selection -->
          <div class="mt-5">
            <label for="addressSelect" class="font-medium inline-block mb-3 text-sm uppercase"
              >Select Address</label
            >
            <select
              id="addressSelect"
              v-model="cartStore.selectedAddressId"
              class="block p-2 border text-gray-600 w-full text-sm"
            >
              <option value="" disabled>Select an address</option>
              <option
                v-for="(address, index) in cartStore.shippingLocations"
                :key="index"
                :value="address.id"
              >
                {{ address.name }}
              </option>
            </select>
          </div>
          <!-- <div class="py-10">
            <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase"
              >Promo Code</label
            >

            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              class="p-2 text-sm w-full"
            />
          </div>

          <button
            class="bg-red-500 disabled:opacity-50 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded-lg"
            :disabled="cartItems.length === 0"
            @click="applyPromoCode($event.toString())"
          >
            Apply
          </button> -->
          <div class="border-t mt-8">
            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>{{ totalPrice.toFixed(2) }} EGP</span>
            </div>
            <button
              :disabled="cartItems.length === 0"
              class="disabled:opacity-50 bg-green-600 font-semibold hover:bg-green-700 py-3 text-sm text-white uppercase w-full rounded-lg"
              @click="submitOrder(totalPrice)"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  
  <script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { HeaderCard } from '@/client/components'
import { useRouter } from 'vue-router'
import { useCartStore, useDishStore, useAuthenticationStore } from '@/client/stores'

const cartStore = useCartStore()
const router = useRouter()
const authenticationStore = useAuthenticationStore()
const dishStore = useDishStore()
const { cartItems, cookingInstructions, deliveryInstructions } = storeToRefs(cartStore)
const { dishes } = storeToRefs(dishStore)

onMounted(async () => {
  await cartStore.getCartItems()
  await cartStore.getShippingOptions()
  await cartStore.getPaymentOptions()
  await cartStore.getShippingLocations(authenticationStore.userInfo?.userId ?? '')
})
// Compute total price of items in cart
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

// Remove item from the cart
const removeFromCart = (id: string) => {
  cartStore.removeItem(id)
}

// Increase quantity of item in the cart
const increaseQuantity = (id: string) => {
  cartStore.updateQuantity(id, 1)
}

// Decrease quantity of item in the cart
const decreaseQuantity = (id: string) => {
  cartStore.updateQuantity(id, -1)
}

// Proceed to checkout
const proceedToCheckout = () => {
  // Implement checkout logic here
}
function applyPromoCode(value: string) {
  cartStore.promo = value
}
function submitOrder(totalPrice: number) {
  cartStore.submitOrder(totalPrice)
  router.push('/orders')
}
</script>
  