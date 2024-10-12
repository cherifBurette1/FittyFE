<script setup lang="ts">
</script>

<template>
  <Product-details />
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { ProductDetails } from '../src/client/views'
import { useDishStore } from '../src/client/stores'
onMounted(() => {
  if (window.location.href.includes('product')) {
    const id = window.location.href.split('/').pop()
    const store = useDishStore()
    store.showProductDetails = true
    store.fetchProductDetails(id)
  }
})
</script>
