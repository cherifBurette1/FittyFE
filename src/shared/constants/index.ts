import type { mapInfo, signInType, signUpType } from '@/shared/types'

export const defaultMapInfo: mapInfo = {
  lat: 0,
  lng: 0,
  address: ''
}
export const signUpValue: signUpType = {
  firstName: '',
  lastName: '',
  gender: '',
  birthday: '',
  mobileNumber: '',
  address: '',
  location: defaultMapInfo,
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
  isPasswordVisible: false,
  isReTypePasswordVisible: false
}
export const signInValue: signInType = {
  email: '',
  password: ''
}
