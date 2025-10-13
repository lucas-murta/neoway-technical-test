import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/utils/dom/scroll', () => ({
  scrollToTopSmooth: vi.fn(),
}))

import Pagination from '@/lib/components/Pagination/Pagination.vue'
import { scrollToTopSmooth } from '@/utils/dom/scroll'

describe('Pagination functions', () => {
  it('computes and renders totalPages correctly', async () => {
    vi.clearAllMocks()
    const wrapper = mount(Pagination, {
      props: { page: 1, pageSize: 10, totalResults: 45, disabled: false },
    })
    const normalized = wrapper.text().replace(/\s+/g, ' ').trim()
    expect(normalized).toContain('Page 1 / 5')

    await wrapper.setProps({ totalResults: 0 })
    const normalizedZero = wrapper.text().replace(/\s+/g, ' ').trim()
    expect(normalizedZero).toContain('Page 1')
    expect(normalizedZero.includes('/')).toBe(false)
  })

  it('prev click emits change and scrolls to top', async () => {
    vi.clearAllMocks()
    const wrapper = mount(Pagination, {
      props: { page: 3, pageSize: 10, totalResults: 45, disabled: false },
    })
    const buttons = wrapper.findAllComponents({ name: 'Button' })
    const prevButton = buttons[0]
    await prevButton.find('button').trigger('click')

    const emitted = wrapper.emitted('change')
    expect(emitted && emitted[0] && emitted[0][0]).toEqual({ page: 2 })
    expect(scrollToTopSmooth).toHaveBeenCalledTimes(1)
  })

  it('next click emits change and scrolls to top', async () => {
    vi.clearAllMocks()
    const wrapper = mount(Pagination, {
      props: { page: 3, pageSize: 10, totalResults: 45, disabled: false },
    })
    const buttons = wrapper.findAllComponents({ name: 'Button' })
    const nextButton = buttons[1]
    await nextButton.find('button').trigger('click')

    const emitted = wrapper.emitted('change')
    expect(emitted && emitted[0] && emitted[0][0]).toEqual({ page: 4 })
    expect(scrollToTopSmooth).toHaveBeenCalledTimes(1)
  })

  it('disables prev on first page and next on last page', async () => {
    vi.clearAllMocks()
    const wrapper = mount(Pagination, {
      props: { page: 1, pageSize: 10, totalResults: 50, disabled: false },
    })
    let buttons = wrapper.findAllComponents({ name: 'Button' })
    let prevButton = buttons[0]
    let nextButton = buttons[1]
    expect(prevButton.find('button').element).toHaveProperty('disabled', true)
    expect(nextButton.find('button').element).toHaveProperty('disabled', false)

    await wrapper.setProps({ page: 5 })
    buttons = wrapper.findAllComponents({ name: 'Button' })
    prevButton = buttons[0]
    nextButton = buttons[1]
    expect(prevButton.find('button').element).toHaveProperty('disabled', false)
    expect(nextButton.find('button').element).toHaveProperty('disabled', true)
  })
})
