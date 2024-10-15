import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { dishType, categoryType, productDetails } from '@/shared/types'
import { useToast } from 'vue-toastification'

export const useDishStore = defineStore('dishes', () => {
  const toast = useToast()
  const dishes = ref<dishType[]>([])
  const categories = ref<categoryType[]>([])
  const favorites = ref<dishType[]>([])
  const showProductDetails = ref(false)
  const productDetails = ref<productDetails>()
  const page = ref(1)
  const pageSize = ref(10)
  async function fetchDishes(category: string = 'all') {
    try {
      const response = await fetch(
        `http://localhost:5220/fitty-api/Dish/GetAllDishes?category=${category}&page=${page.value}&pageSize=${pageSize.value}`
      )
      if (response.ok) {
        const data = await response.json()
        dishes.value = data.dishes
      }
    } catch (error) {
      throw new Error('Failed to fetch dishes')
    }
  }
  async function fetchProductDetails(id: string) {
    try {
      const response = await fetch(`http://localhost:5220/fitty-api/Dish/GetDish?id=${id}`)
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
      const response = await fetch(`http://localhost:5220/fitty-api/Category/GetAllCategories`)
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
        `http://localhost:5220/fitty-api/Favorite/GetAllUserFavorite?userId=${userId}`
      )
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
          'Content-Type': 'application/json' // Specify that you're sending JSON
        },
        body: body // Send the body containing userId and dishId
      })

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
          'Content-Type': 'application/json' // Specify that you're sending JSON
        },
        body: body // Send the body containing userId and dishId
      })

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

    addToFavorite,
    removeFromFavorite
  }
})
