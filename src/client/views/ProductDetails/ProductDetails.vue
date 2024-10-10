<template>
  <div
    v-if="dishStore.showProductDetails"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
  >
    <div class="bg-white h-3/4 rounded-lg w-3/4 relative overflow-y-scroll custom-scrollbar">
      <button
        class="fixed top-22 right-52 text-xl font-bold p-2 z-50"
        @click="
          () => {
            dishStore.showProductDetails = false
            router.push({ name: 'home' })
          }
        "
      >
        ✕
      </button>
      <div class="max-w-6xl mx-auto p-8">
        <div class="flex justify-between items-start">
          <div class="flex-grow mr-6">
            <h1 class="text-3xl font-bold">{{ productDetails?.name }}</h1>
            <p class="text-lg text-gray-500">{{ productDetails?.description }}</p>
            <div class="mt-4">
              <p class="font-bold">Contains</p>
              <ul class="list-disc list-inside text-gray-500">
                <li v-for="contain in productDetails?.contains" :key="contain.id">
                  {{ contain.name }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Image and Info Box -->
          <div class="flex flex-col">
            <div class="text-right">
              <p class="text-lg font-bold">Price</p>
              <p class="text-2xl font-bold text-gray-800">
                {{ productDetails?.Price + 'EGP/plate' }}
              </p>
            </div>
            <div class="flex mt-10">
              <!-- Image -->
              <div class="relative z-10 -mr-36">
                <img
                  alt="A bowl of pasta noodles with vegetables and chili on top"
                  class="rounded-full shadow-lg"
                  height="280"
                  :src="productDetails?.imgURL"
                  width="290"
                />
              </div>

              <!-- Info Box -->
              <div class="bg-yellow-400 p-6 rounded-lg w-[400px] relative h-72">
                <!-- Grid with details like calories, weight, etc. -->
                <div class="grid grid-cols-2 gap-4 ml-32 mt-10 text-white">
                  <div>
                    <p class="font-bold">Calories</p>
                    <p>{{ productDetails?.productNutrients.calories }}</p>
                  </div>
                  <div>
                    <p class="font-bold">Weight</p>
                    <p>{{ productDetails?.productNutrients.weight }}</p>
                  </div>
                  <div>
                    <p class="font-bold">Nature</p>
                    <p>{{ productDetails?.productNutrients.nature }}</p>
                  </div>
                  <div>
                    <p class="font-bold">Time</p>
                    <p>{{ productDetails?.productNutrients.time }}</p>
                  </div>
                </div>

                <!-- Heart and Share buttons inside the yellow card at the bottom -->
                <div class="absolute bottom-2 right-2 flex space-x-2">
                  <button class="bg-white p-2 rounded-full shadow-md">
                    <i class="fas fa-heart text-gray-500"></i>
                  </button>
                  <button
                    class="bg-white p-2 rounded-full shadow-md"
                    @click="dishStore.copyURL(undefined)"
                  >
                    <i class="fas fa-share text-gray-500"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <p class="font-bold">Categories</p>
          <div class="flex flex-wrap w-[300px] gap-2 mt-2">
            <span
              v-for="category in productDetails?.tags"
              :key="category.id"
              :style="{
                backgroundColor: category.color,
                color: isColorDark(category.color) ? 'white' : 'black'
              }"
              class="px-4 py-2 rounded-full"
            >
              {{ category.name }}
            </span>
          </div>
        </div>

        <div
          class="fixed bottom-8 w-3/4 left-1/2 transform -translate-x-1/2 flex items-center justify-between bg-white mt-3 p-4"
        >
          <div class="flex items-center space-x-4">
            <button
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-bold"
              @click="quantity > 1 ? quantity-- : (quantity = 1)"
            >
              -
            </button>
            <span class="text-lg"> {{ quantity }} </span>
            <button
              class="bg-gray-200 text-gray-800 px-3.5 py-2 rounded-full font-bold"
              @click="quantity++"
            >
              +
            </button>
          </div>
          <button
            class="bg-red-500 text-white px-8 py-4 rounded-full"
            @click="addToCart(route.query.id?.toString() ?? '', quantity)"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

  <script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useDishStore, useCartStore } from '@/client/stores'

const router = useRouter()
const route = useRoute()
const dishStore = useDishStore()
const quantity = ref(1)

const { productDetails } = storeToRefs(dishStore)
const { addToCart } = useCartStore()

onMounted(async () => {
  await dishStore.fetchProductDetails(route.query.id as string)
})

function isColorDark(hex: string) {
  const color = hex.replace('#', '')
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}
</script>

<style scoped lang="css">
.custom-scrollbar {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #cbd5e1 #f8fafc; /* For Firefox: thumb color, track color */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc; /* Track color */
  border-radius: 10px; /* Rounded edges for track */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* Thumb color */
  border-radius: 10px; /* Rounded edges for thumb */
  border: 2px solid #f8fafc; /* Adds space around the thumb */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #a0aec0; /* Darker color on hover */
}
</style>
  