import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { dishType, categoryType, productDetails } from '@/shared/types'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from './authentication'

export const useDishStore = defineStore('dishes', () => {
  const toast = useToast()
  const router = useRouter()
  const dishes = ref<dishType[]>([])
  const categories = ref<categoryType[]>([])
  const authenticationStore = useAuthenticationStore()
  const favorites = ref<dishType[]>([])
  const showProductDetails = ref(false)
  const productDetails = ref<productDetails>()
  const page = ref(1)
  const pageSize = ref(10)
  const totalPages = ref(10)
  const searchText = ref('')
  async function fetchDishes(category: string = 'all') {
    try {
      const response = await fetch(
        `http://localhost:5220/fitty-api/Dish/GetAllDishes?category=${category}&page=${page.value}&pageSize=${pageSize.value}&searchText=${searchText.value}`,
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
        const data = await response.json()
        dishes.value = data.dishes
        totalPages.value = data.totalPages
      }
    } catch (error) {
      throw new Error('Failed to fetch dishes')
    }
  }
  async function fetchProductDetails(id: string) {
    try {
      const response = await fetch(`http://localhost:5220/fitty-api/Dish/GetDish?id=${id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authenticationStore.userInfo?.token
        }
      })
      if (response.status === 401) {
        toast.info('please login to access this page')
        router.push({ name: 'login' })
      }
      if (response.ok) {
        const data = await response.json()
        productDetails.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch details')
    }
  }
  async function fetchCategories() {
    try {
      const response = await fetch(`http://localhost:5220/fitty-api/Category/GetAllCategories`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authenticationStore.userInfo?.token
        }
      })
      if (response.status === 401) {
        toast.info('please login to access this page')
        router.push({ name: 'login' })
      }
      if (response.ok) {
        const data = await response.json()
        categories.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch categories')
    }
  }
  async function copyURL(id?: string) {
    try {
      let url = ''
      if (id) {
        url = window.location.href.replace('/home', '') + '/product/' + id
      } else {
        url = window.location.href
      }
      await navigator.clipboard.writeText(url)
      toast.success('Link Copied Successfully!')
      setTimeout(() => {}, 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  async function getAllFavoriteDishes(userId: string) {
    try {
      const response = await fetch(
        `http://localhost:5220/fitty-api/Favorite/GetAllUserFavorite?userId=${userId}`,
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
        const data = await response.json()
        favorites.value = data
      }
    } catch (error) {
      throw new Error('Failed to fetch favorites')
    }
  }
  async function addToFavorite(userId: string, DishId: string) {
    try {
      const body = JSON.stringify({ userId: userId, dishId: DishId })

      const response = await fetch('http://localhost:5220/fitty-api/Favorite/AddToFavorite', {
        method: 'POST', // Use POST to add a favorite
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authenticationStore.userInfo?.token
        },
        body: body // Send the body containing userId and dishId
      })
      if (response.status === 401) {
        toast.info('please login to access this page')
        router.push({ name: 'login' })
      }
      if (response.ok) {
        toast.success('Added to favorites!')
      }
    } catch (error) {
      throw new Error('Failed to add to favorites')
    }
  }
  async function removeFromFavorite(userId: string, DishId: string) {
    try {
      const body = JSON.stringify({ userId: userId, dishId: DishId })

      const response = await fetch('http://localhost:5220/fitty-api/Favorite/RemoveFromFavorite', {
        method: 'POST', // Use POST to add a favorite
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authenticationStore.userInfo?.token
        },
        body: body // Send the body containing userId and dishId
      })
      if (response.status === 401) {
        toast.info('please login to access this page')
        router.push({ name: 'login' })
      }
      if (response.ok) {
        toast.success('removed from favorites!')
        getAllFavoriteDishes(userId)
      }
    } catch (error) {
      throw new Error('Failed to remove from favorites')
    }
  }
  return {
    dishes,
    fetchDishes,

    categories,
    fetchCategories,

    showProductDetails,

    fetchProductDetails,
    productDetails,

    copyURL,
    page,
    pageSize,
    getAllFavoriteDishes,
    favorites,
    totalPages,

    addToFavorite,
    removeFromFavorite,
    searchText
  }
})
