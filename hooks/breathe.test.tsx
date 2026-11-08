import { expect, test } from 'claude-code/testing'
import { frame } from './register.tsx'

test('4-4-4: in fills, hold stays full, out empties, then wraps', () => {
  expect(frame(0)).toMatchObject({ label: 'Breathe in ', left: 4 })
  expect(frame(0).bar.startsWith('░')).toBe(true)
  expect(frame(4000)).toMatchObject({ label: 'Hold       ' })
  expect(frame(4000).bar.includes('░')).toBe(false)
  expect(frame(10000)).toMatchObject({ label: 'Breathe out', left: 2 })
  expect(frame(11999).bar.includes('█')).toBe(false)
  expect(frame(12000)).toMatchObject({ label: 'Breathe in ' }) // wraps after 12s
})

const BAND = {
  plugin: 'breathe',
  component: 'AbovePrompt',
  props: { hasSurvey: false, isWorking: true, maxRows: 20, bodyColumns: 80, scroll: { offset: 0, bodyRows: 20 }, view: {} },
} as const

test('the bar draws while working, nothing when idle', async ($, on) => {
  on('clock.now', () => ({ value: 1000 }))
  on('clock.after', () => ({ value: undefined })) // never fires: the drawing is checked once
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine</Text>
  })
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    expect(await ui.find({ type: 'Text', text: /Breathe in/ })).toBeDefined()
    await ui.unmount()

    const idle = await $.ui.mount({ ...BAND, surface, props: { ...BAND.props, isWorking: false } })
    expect((await idle.find({ type: 'Text' }))?.text).toBe('engine')
    await idle.unmount()
  }
})
