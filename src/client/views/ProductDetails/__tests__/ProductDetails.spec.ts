import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ProductDetails from '../../ProductDetails/ProductDetails.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(ProductDetails)
    expect(wrapper).toBeTruthy()
  })
})
