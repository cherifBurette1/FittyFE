import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { dishType, categoryType, productDetails } from '@/shared/types'
import { useToast } from 'vue-toastification'

export const useDishStore = defineStore('dishes', () => {
  const toast = useToast()
  const dishes = ref<dishType[]>([])
  const categories = ref<categoryType[]>([])
  const showProductDetails = ref(false)
  const productDetails = ref<productDetails>()
  const page = ref(1)
  const pageSize = ref(10)
  async function fetchDishes(category: string = '') {
    try {
      debugger
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
    productDetails.value = {
      name: 'Noodles',
      description: 'With extra cheese topping above',
      contains: [
        { id: '1', name: 'gluten' },
        { id: '2', name: 'dairy' }
      ],
      imgURL:
        'https://storage.googleapis.com/a1aa/image/fWikfijDnrly6UPjNoAJZCRMAOYrrZDrl6Ax5NLKXJCDFRjTA.jpg',
      Price: 375,
      tags: [
        { id: '1', color: '#fef08a', name: 'keto' },
        { id: '1', color: '#00b300', name: 'vegan' },
        { id: '1', color: '#ef4444', name: 'meat' },
        { id: '1', color: '#ef4444', name: 'carnivore' }
      ],
      productNutrients: {
        calories: '375KCal',
        weight: '350gm',
        nature: 'Chinese',
        time: '25min'
      },
      isAddedToCart: false,
      isAddedToFavorites: false
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
    pageSize
  }
})
