type dishType = {
  id: string
  name: string
  price: string
  rating: string
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
export type { dishType, categoryType, cartItemType, productDetails }
