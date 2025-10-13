import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import Autocomplete from './Autocomplete.vue'
import '@/lib/base-components/Icon/library'

describe('Autocomplete', () => {
  it('renders label and input with classes', () => {
    const wrapper = mount(Autocomplete, { props: { label: 'Search' } })
    expect(wrapper.find('.autocomplete').exists()).toBe(true)
    expect(wrapper.find('.autocomplete__label').exists()).toBe(true)
    expect(wrapper.find('input.autocomplete__input').exists()).toBe(true)
  })

  it('filters options based on query', async () => {
    const options = ['Apple', 'Banana', 'Cherry']
    const wrapper = mount(Autocomplete, { props: { options } })
    const input = wrapper.find('input.autocomplete__input')
    await input.trigger('focus')
    await input.setValue('ap')
    await nextTick()
    const items = wrapper.findAll('.autocomplete__item')
    expect(items.length).toBe(1)
    expect(items[0].text()).toContain('Apple')
  })

  it('emits events on input and focus', async () => {
    const onInput = vi.fn()
    const onFocus = vi.fn()
    const wrapper = mount(Autocomplete, { props: { onInput, onFocus } })
    const input = wrapper.find('input.autocomplete__input')
    await input.trigger('focus')
    await input.setValue('x')
    expect(onFocus).toHaveBeenCalled()
    expect(onInput).toHaveBeenCalled()
  })

  it('respects disabled and readOnly states', () => {
    const wrapper = mount(Autocomplete, { props: { disabled: true, readOnly: true } })
    const root = wrapper.find('.autocomplete')
    const input = wrapper.find('input.autocomplete__input')
    expect(root.classes()).toContain('is-disabled')
    expect(root.classes()).toContain('is-readonly')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('readonly')).toBeDefined()
  })
})
