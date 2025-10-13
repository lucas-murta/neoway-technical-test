import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Thumbnail from './Thumbnail.vue'

describe('Thumbnail.vue', () => {
  it('computes className correctly based on props', async () => {
    const wrapper = mount(Thumbnail, {
      props: {
        url: 'https://example.com/img.jpg',
        overlap: '2',
      },
    })

    expect(wrapper.classes()).toContain('thumbnail')
    expect(wrapper.classes()).toContain('thumbnail--radius-1')
    expect(wrapper.classes()).toContain('thumbnail--overlap-2')
    expect(wrapper.classes()).not.toContain('thumbnail--interact')

    await wrapper.setProps({ interact: true })
    expect(wrapper.classes()).toContain('thumbnail--interact')
  })

  it('applies styleVars for size, spacing, and url', () => {
    const wrapper = mount(Thumbnail, {
      props: {
        url: 'https://example.com/img.jpg',
        overlap: '1',
        width: '12',
        height: '12',
        padding: '1',
        margin: '1 2',
      },
    })

    const style = (wrapper.element as HTMLElement).style
    expect(style.getPropertyValue('--thumbnail-width')).toBe('96px')
    expect(style.getPropertyValue('--thumbnail-height')).toBe('96px')
    expect(style.getPropertyValue('--thumbnail-padding')).toBe('8px')
    expect(style.getPropertyValue('--thumbnail-margin')).toBe('8px 16px')
    expect(style.getPropertyValue('--thumbnail-url')).toBe('url(https://example.com/img.jpg)')
  })
})
