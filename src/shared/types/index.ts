type dishType = {
  id: string
  name: string
  price: string
  rating: string
  imageURL: string
  isAddedToCart: boolean
  isAddedToFavorites: boolean
}
type categoryType = {
  id: string
  name: string
  icon: string
}
type cartItemType = {
  id: string
  quantity: number
  price: number
  description: string
  imageURL: string
  name: string
}
type productDetails = {
  id: string
  name: string
  description: string
  imageURL: string
  price: number
  rating: number
  calories: number
  weight: number
  preparationTime: number
  nature: number
  dishComponents: string[]
  Categories: string[]
  isAddedToCart: boolean
  isAddedToFavorites: boolean
}
type productNutrients = {
  calories: string
  nature: string
  time: string
  weight: string
}
type productTags = {
  id: string
  name: string
  color: string
}
type productComponent = {
  id: string
  name: string
}
type signUpType = {
  firstName: string
  lastName: string
  gender: string
  birthday: string
  address: string
  location: mapInfo
  mobileNumber: string
  email: string
  password: string
  confirmPassword: string
  rememberMe: boolean
  isPasswordVisible: boolean
  isReTypePasswordVisible: boolean
}
type signInType = {
  email: string
  password: string
}
type mapInfo = {
  lat: number
  lng: number
  address: string
  name: string
}
type shippingOptionType = {
  id: string
  name: string
  price: number
}
type shippingLocationType = {
  id: string
  name: string
}
type paymentOptionType = {
  id: string
  name: string
  isActive: boolean
}
type OrderItem = {
  name: string
  quantity: number
  price: number
}

type Order = {
  id: number
  date: string
  status: string
  totalPrice: number
  locationName: string
  shippingName: string
  paymentName: string
}
type UserInfo = {
  username: string
  userId: string
  email: string
  token: string
}
export type {
  dishType,
  categoryType,
  cartItemType,
  productDetails,
  signUpType,
  mapInfo,
  shippingOptionType,
  paymentOptionType,
  Order,
  signInType,
  UserInfo,
  shippingLocationType
}
