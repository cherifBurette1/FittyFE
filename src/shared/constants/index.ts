import type { mapInfo, signUpType } from '@/shared/types'

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
  address: '',
  location: defaultMapInfo,
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
  isPasswordVisible: false,
  isReTypePasswordVisible: false
}
