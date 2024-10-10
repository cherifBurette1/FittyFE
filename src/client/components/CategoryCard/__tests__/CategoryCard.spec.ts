import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CategoryCard from '../../CategoryCard/CategoryCard.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(CategoryCard)
    expect(wrapper).toBeTruthy()
  })
})
