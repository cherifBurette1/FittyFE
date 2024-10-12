import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { signUpValue } from '@/shared/constants'
import type { mapInfo } from '@/shared/types'

export const useAuthenticationStore = defineStore('authentication', () => {
  const showMap = ref(false)
  const tempLocation = ref<mapInfo>({ lat: 0, lng: 0, address: '' })
  const signUpModelValues = ref({ ...signUpValue })
  const userData = ref({
    addresses: [
      {
        id: '1',
        address: 'test 1',
        lat: 0,
        lng: 0
      },
      {
        id: '2',
        address: 'test 2',
        lat: 0,
        lng: 0
      }
    ]
  })
  async function reverseGeocode(lat: number, lng: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
      )
      if (response.ok) {
        const data = await response.json()
        signUpModelValues.value.location = {
          address: data.display_name,
          lat: lat,
          lng: lng
        }
      }
    } catch (error) {
      throw new Error('Failed to fetch address')
    }
  }
  function openMap() {
    showMap.value = true
    tempLocation.value = signUpModelValues.value.location
  }
  function exitMap() {
    showMap.value = false
    signUpModelValues.value.location = tempLocation.value
  }
  return {
    showMap,
    tempLocation,

    reverseGeocode,
    signUpModelValues,

    openMap,
    exitMap,

    userData
  }
})
