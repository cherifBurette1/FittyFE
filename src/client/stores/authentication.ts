import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { signInValue, signUpValue } from '@/shared/constants'
import { useRouter } from 'vue-router'
import type { UserInfo, mapInfo } from '@/shared/types'

export const useAuthenticationStore = defineStore('authentication', () => {
  const showMap = ref(false)
  const toast = useToast()
  const router = useRouter()
  const tempLocation = ref<mapInfo>({ lat: 0, lng: 0, address: '', name: 'Home' })
  const signUpModelValues = ref({ ...signUpValue })
  const signInModelValues = ref({ ...signInValue })
  const userInfo = ref<UserInfo>()

  watch(userInfo, (newValue) => {
    if (newValue) {
      localStorage.setItem('userInfo', JSON.stringify(newValue))
    } else {
      localStorage.removeItem('userInfo')
    }
  })
  async function login() {
    if (!signInModelValues.value.email || !signInModelValues.value.password) {
      toast.error('All fields are required')
      return
    }

    try {
      // Send registration request to your backend
      const response = await fetch('http://localhost:5220/fitty-api/Users/LoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userInfo.value?.token
        },
        body: JSON.stringify({
          email: signInModelValues.value.email,
          password: signInModelValues.value.password
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData[0])
        return
      }
      const data = await response.json()
      userInfo.value = data as UserInfo
      toast.success('Welcome back!')

      router.push('home')
    } catch (error) {
      console.error('signIn error:', error)
      toast.error('An unexpected error occurred. Please try again.')
    }
  }
  async function register() {
    if (!signUpModelValues.value.email || !signUpModelValues.value.password) {
      toast.error('All fields are required')
      return
    }

    try {
      // Send registration request to your backend
      const response = await fetch('http://localhost:5220/fitty-api/Users/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userInfo.value?.token
        },
        body: JSON.stringify({
          email: signUpModelValues.value.email,
          firstName: signUpModelValues.value.firstName,
          lastName: signUpModelValues.value.lastName,
          gender: signUpModelValues.value.gender,
          birthday: signUpModelValues.value.birthday,
          password: signUpModelValues.value.password,
          rememberMe: signUpModelValues.value.rememberMe,
          mobileNumber: signUpModelValues.value.mobileNumber,
          locations: [
            {
              name: 'home',
              address: signUpModelValues.value.location.address,
              lat: signUpModelValues.value.location.lat,
              long: signUpModelValues.value.location.lng,
              additionalDetails: ''
            }
          ]
        })
      })
      debugger

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData[0])
        return
      }

      // Handle successful registration
      const data = await response.json()
      toast.success('Registration successful!')

      router.push('login') // Example redirect to login page
    } catch (error) {
      debugger
      toast.error('An unexpected error occurred. Please try again.')
    }
  }

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
          lng: lng,
          name: 'Home'
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
  function logOut() {
    userInfo.value = undefined
    toast.success('You have been logged out!')
  }
  return {
    showMap,
    tempLocation,

    reverseGeocode,
    signUpModelValues,

    openMap,
    exitMap,
    register,
    login,
    signInModelValues,
    userInfo,
    logOut
  }
})
