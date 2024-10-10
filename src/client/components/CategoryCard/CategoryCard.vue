<template>
  <div
    class="bg-gray-100 p-6 rounded-lg text-center hover:text-white hover:bg-green-600 hover:cursor-pointer"
  >
    <i class="text-2xl mb-2" :class="category.icon"></i>
    <p>{{ category.name }}</p>
  </div>
</template>
<!-- //fas fa-fish -->
<script setup lang="ts">
import type { categoryType } from '@/shared/types'

defineProps({
  category: {
    type: Object as () => categoryType,
    required: true
  }
})
</script>