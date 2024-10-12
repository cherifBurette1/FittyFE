import { createRouter, createWebHistory } from 'vue-router'
import {
  CartPage,
  HomePage,
  LoginPage,
  OrderPage,
  SearchPage,
  SignUpPage
} from '../../client/pages'
import { ProductDetails } from '@/client/views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: '/product/:id',
          name: 'product',
          component: ProductDetails,
          props: ({ params }) => ({ id: params.id })
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpPage
    },
    {
      path: '/all',
      name: 'all',
      component: SearchPage,
      props: ({ query }) => ({ category: query.category, searchText: query.searchText }),
      children: [
        {
          path: '/product/:id',
          name: 'product',
          component: ProductDetails,
          props: ({ params }) => ({ id: params.id })
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      children: [
        {
          path: '/cart/:id',
          name: 'cartItem',
          component: ProductDetails,
          props: ({ params }) => ({ id: params.id })
        }
      ]
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderPage
    }
  ]
})

export default router
