import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DefaultFooter from '../../DefaultFooter/DefaultFooter.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(DefaultFooter)
    expect(wrapper).toBeTruthy()
  })
})
