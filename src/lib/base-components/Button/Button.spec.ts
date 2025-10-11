import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from './Button.vue'
import '@/lib/base-components/Icon/library'

describe('Button', () => {
  it('computes classes based on props', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'solid',
        size: 'small',
        color: 'primary',
        iconButton: true,
        disabled: true,
      },
    })
    const el = wrapper.get('button')
    expect(el.classes()).toContain('button')
    expect(el.classes()).toContain('button--variant-solid')
    expect(el.classes()).toContain('button--size-small')
    expect(el.classes()).toContain('button--color-primary')
    expect(el.classes()).toContain('button--icon-only')
    expect(el.classes()).toContain('is-disabled')
  })

  it('maps iconSize to Icon component size', () => {
    const small = mount(Button, { props: { size: 'small', iconLeft: 'user' } })
    expect(small.find('.icon').classes()).toContain('icon--size-sm')
    small.unmount()

    const medium = mount(Button, { props: { size: 'medium', iconLeft: 'user' } })
    expect(medium.find('.icon').classes()).toContain('icon--size-md')
    medium.unmount()

    const large = mount(Button, { props: { size: 'large', iconLeft: 'user' } })
    expect(large.find('.icon').classes()).toContain('icon--size-lg')
    large.unmount()
  })

  it('maps labelSize to Typography size', () => {
    const small = mount(Button, { props: { size: 'small' }, slots: { default: 'Label' } })
    const smallLabel = small.find('.button__label')
    expect(smallLabel.classes()).toContain('typography--size-sm')
    small.unmount()

    const medium = mount(Button, { props: { size: 'medium' }, slots: { default: 'Label' } })
    const mediumLabel = medium.find('.button__label')
    expect(mediumLabel.classes()).toContain('typography--size-base')
    medium.unmount()

    const large = mount(Button, { props: { size: 'large' }, slots: { default: 'Label' } })
    const largeLabel = large.find('.button__label')
    expect(largeLabel.classes()).toContain('typography--size-md')
    large.unmount()
  })

  it('does not render label when iconButton', () => {
    const wrapper = mount(Button, {
      props: { iconButton: true, size: 'medium', iconLeft: 'user' },
    })
    expect(wrapper.find('.button__label').exists()).toBe(false)
  })
})
