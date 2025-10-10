import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import Typography from './Typography.vue'

function mountComponent(props: Record<string, any> = {}) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const app = createApp(Typography, props)
  app.mount(container)
  const el = container.firstElementChild
  return { app, container, el }
}

describe('Typography', () => {
  it('renders default tag and base class', () => {
    const { app, container, el } = mountComponent()
    expect(el.tagName.toLowerCase()).toBe('p')
    expect(el.classList.contains('typography')).toBe(true)
    app.unmount()
    document.body.removeChild(container)
  })

  it('applies classes and tag from props', () => {
    const { app, container, el } = mountComponent({
      tag: 'h3',
      variant: 'heading-3',
      size: 'md',
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: 'content-default',
    })
    expect(el.tagName.toLowerCase()).toBe('h3')
    expect(el.classList.contains('typography')).toBe(true)
    expect(el.classList.contains('typography--heading-3')).toBe(true)
    expect(el.classList.contains('typography--size-md')).toBe(true)
    expect(el.classList.contains('typography--font-heading')).toBe(true)
    expect(el.classList.contains('typography--weight-bold')).toBe(true)
    expect(el.classList.contains('typography--color-content-default')).toBe(true)
    app.unmount()
    document.body.removeChild(container)
  })
})
