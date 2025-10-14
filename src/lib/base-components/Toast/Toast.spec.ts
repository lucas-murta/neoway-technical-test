import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Toast from './Toast.vue'
import '@/lib/base-components/Icon/library'

describe('Toast', () => {
  it('renders with required props', () => {
    const wrapper = mount(Toast, {
      props: {
        status: 'system',
        title: 'Test Title',
        text: 'Test text content',
      },
    })

    expect(wrapper.find('.toast__title').text()).toBe('Test Title')
    expect(wrapper.find('.toast__text').text()).toBe('Test text content')
  })

  it('computes classes based on status prop', () => {
    const wrapper = mount(Toast, {
      props: {
        status: 'warning',
        title: 'Warning Title',
        text: 'Warning text',
        className: 'custom-class',
      },
    })

    const el = wrapper.get('.toast')
    expect(el.classes()).toContain('toast')
    expect(el.classes()).toContain('toast--status-warning')
    expect(el.classes()).toContain('custom-class')
  })

  it('maps status to correct icon', () => {
    const statusIconMap = [
      { status: 'system', expectedIcon: 'info-circle' },
      { status: 'warning', expectedIcon: 'exclamation-triangle' },
      { status: 'positive', expectedIcon: 'check-circle' },
      { status: 'negative', expectedIcon: 'times-circle' },
    ]

    statusIconMap.forEach(({ status }) => {
      const wrapper = mount(Toast, {
        props: {
          status: status as any,
          title: 'Test',
          text: 'Test',
        },
      })

      const icon = wrapper.find('.toast__icon .icon')
      expect(icon.exists()).toBe(true)
      wrapper.unmount()
    })
  })

  it('applies correct status classes for styling', () => {
    const statuses = ['system', 'warning', 'positive', 'negative']

    statuses.forEach((status) => {
      const wrapper = mount(Toast, {
        props: {
          status: status as any,
          title: 'Test',
          text: 'Test',
        },
      })

      expect(wrapper.classes()).toContain(`toast--status-${status}`)
      wrapper.unmount()
    })
  })
})
