import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon.vue'

library.add(faUser)

describe('Icon', () => {
  it('renders with base class and accepts size/color props', () => {
    const wrapper = mount(Icon, {
      props: { icon: ['fas', 'user'], size: 'lg', color: 'content-primary' },
    })
    const el = wrapper.find('svg')
    expect(el.exists()).toBe(true)
    expect(el.classes()).toContain('icon')
    expect(el.classes()).toContain('icon--size-lg')
    expect(el.classes()).toContain('icon--color-content-primary')
  })
})
