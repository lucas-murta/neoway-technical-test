import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Grid from './Grid.vue'

describe('Grid', () => {
  it('builds classes based on props', () => {
    const wrapper = mount(Grid, {
      props: {
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2',
        gapX: '3',
        gapY: '4',
        cols: 3,
        smCols: 2,
        mdCols: 4,
        lgCols: 6,
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('grid')
    expect(classes).toContain('grid--dir-row')
    expect(classes).toContain('grid--ai-center')
    expect(classes).toContain('grid--jc-space-between')
    expect(classes).toContain('grid--gap-2')
    expect(classes).toContain('grid--gapx-3')
    expect(classes).toContain('grid--gapy-4')
    expect(classes).toContain('grid--cols-3')
    expect(classes).toContain('grid--sm-cols-2')
    expect(classes).toContain('grid--md-cols-4')
    expect(classes).toContain('grid--lg-cols-6')
  })

  it('applies style variables from sizing and spacing props', () => {
    const wrapper = mount(Grid, {
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
    expect(style).toContain('--grid-height: 100%')
    expect(style).toContain('--grid-width: auto')
    expect(style).toContain('--grid-padding: 8px 16px 24px 32px')
    expect(style).toContain('--grid-sm-padding: 8px')
    expect(style).toContain('--grid-md-padding: 16px 32px')
    expect(style).toContain('--grid-lg-padding: 24px')
    expect(style).toContain('--grid-margin: 16px auto')
    expect(style).toContain('--grid-sm-margin: 8px')
    expect(style).toContain('--grid-md-margin: 24px 32px')
    expect(style).toContain('--grid-lg-margin: 40px')
  })
})
