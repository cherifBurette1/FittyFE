<script setup lang="ts">
</script>

<template>
  <Product-details />
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthenticationStore, useDishStore } from '../src/client/stores'
onMounted(() => {
  if (window.location.href.includes('product')) {
    const id = window.location.href.split('/').pop()
    const store = useDishStore()
    store.showProductDetails = true
    store.fetchProductDetails(id)
  }
  const storedData = localStorage.getItem('userInfo')
  const authenticationStore = useAuthenticationStore()
  // Parse the data back into an object
  if (storedData) {
    const parsedData = JSON.parse(storedData)

    // Access userInfo within the parsed data
    authenticationStore.userInfo = parsedData
  }
})
</script>
