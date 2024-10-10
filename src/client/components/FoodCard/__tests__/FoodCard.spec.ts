import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FoodCard from '../../FoodCard/FoodCard.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(FoodCard)
    expect(wrapper).toBeTruthy()
  })
})
