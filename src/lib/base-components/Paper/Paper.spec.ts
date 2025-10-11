import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Paper from './Paper.vue'

describe('Paper', () => {
  it('builds classes based on props', () => {
    const wrapper = mount(Paper, {
      props: {
        background: 'surface-0',
        border: 'border-2',
        borderRadius: '2',
        elevation: '1',
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('paper')
    expect(classes).toContain('paper--bg-surface-0')
    expect(classes).toContain('paper--border-border-2')
    expect(classes).toContain('paper--radius-2')
    expect(classes).toContain('paper--elevation-1')
  })

  it('applies style variables from sizing and spacing props', () => {
    const wrapper = mount(Paper, {
      props: {
        height: 'full',
        width: 'auto',
        padding: '1 2 3 4',
        smPadding: '1',
        mdPadding: '2 4',
        lgPadding: '3',
        margin: '2 auto',
        smMargin: '1',
        mdMargin: '3 4',
        lgMargin: '5',
      },
    })

    const style = wrapper.attributes('style') || ''
    expect(style).toContain('--paper-height: 100%')
    expect(style).toContain('--paper-width: auto')
    expect(style).toContain('--paper-padding: 8px 16px 24px 32px')
    expect(style).toContain('--paper-sm-padding: 8px')
    expect(style).toContain('--paper-md-padding: 16px 32px')
    expect(style).toContain('--paper-lg-padding: 24px')
    expect(style).toContain('--paper-margin: 16px auto')
    expect(style).toContain('--paper-sm-margin: 8px')
    expect(style).toContain('--paper-md-margin: 24px 32px')
    expect(style).toContain('--paper-lg-margin: 40px')
  })
})