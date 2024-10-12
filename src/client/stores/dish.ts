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

  async function fetchDishes() {
    dishes.value = [
      { id: '1', name: 'Pizza', price: '375', rating: '5' },
      { id: '2', name: 'Pizza', price: '375', rating: '5' },
      { id: '3', name: 'Pizza', price: '375', rating: '5' },
      { id: '4', name: 'Pizza', price: '375', rating: '5' },
      { id: '5', name: 'Pizza', price: '375', rating: '5' },
      { id: '6', name: 'Pizza', price: '375', rating: '5' },
      { id: '7', name: 'Pizza', price: '375', rating: '5' },
      { id: '8', name: 'Pizza', price: '375', rating: '5' },
      { id: '9', name: 'Pizza', price: '375', rating: '5' },
      { id: '10', name: 'Pizza', price: '375', rating: '5' }
    ]
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
      }
    }
  }
  async function fetchCategories() {
    categories.value = [
      { id: '1', name: 'Fish', icon: 'fas fa-fish' },
      { id: '2', name: 'Italian', icon: 'fas fa-pizza-slice' },
      { id: '3', name: 'Vegan', icon: 'fas fa-leaf' },
      { id: '4', name: 'Chinese', icon: 'fas fa-utensils' },
      { id: '5', name: 'Fish', icon: 'fas fa-fish' },
      { id: '6', name: 'Italian', icon: 'fas fa-pizza-slice' },
      { id: '7', name: 'Vegan', icon: 'fas fa-leaf' },
      { id: '8', name: 'Chinese', icon: 'fas fa-utensils' },
      { id: '9', name: 'Vegan', icon: 'fas fa-leaf' },
      { id: '10', name: 'Chinese', icon: 'fas fa-utensils' }
    ]
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

    copyURL
  }
})
