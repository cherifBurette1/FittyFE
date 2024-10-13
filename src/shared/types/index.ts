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
}
type productDetails = {
  name: string
  description: string
  contains: productComponent[]
  imgURL: string
  Price: number
  tags: productTags[]
  isAddedToCart: boolean
  isAddedToFavorites: boolean
  productNutrients: productNutrients
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
}
type shippingOptionType = {
  id: string
  name: string
  price: number
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
  total: number
  address: string
  shippingCompany: string
  paymentMethod: string
  items: OrderItem[]
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
  UserInfo
}
