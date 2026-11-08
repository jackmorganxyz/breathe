import type { Register } from 'claude-code'

// The knob: seconds per phase (4-4-4). A 0 skips a phase.
const PHASES = [
  { label: 'Breathe in ', secs: 4, color: 'cyan', fill: (t: number) => t },
  { label: 'Hold       ', secs: 4, color: '#C9A9F6' /* ponytail: pastel lavender that 256-color terminals round to 183 (#d7afff), not gray */, fill: () => 1 },
  { label: 'Breathe out', secs: 4, color: 'green', fill: (t: number) => 1 - t },
].filter(p => p.secs > 0)
const CYCLE = PHASES.reduce((s, p) => s + p.secs, 0) * 1000
const WIDTH = 24
const TICK = 250

export function frame(ms: number) {
  let t = ms % CYCLE
  for (const p of PHASES) {
    const len = p.secs * 1000
    if (t < len) {
      const filled = Math.round(p.fill(t / len) * WIDTH)
      return { ...p, bar: '█'.repeat(filled) + '░'.repeat(WIDTH - filled), left: Math.ceil((len - t) / 1000) }
    }
    t -= len
  }
  throw new Error('unreachable')
}

export const register: Register = on => {
  let startedAt = 0
  let ticking = false

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (!e.props.isWorking || e.props.hasSurvey) {
      startedAt = 0
      return next(e)
    }
    const now = await $.clock.now()
    startedAt ||= now // ponytail: each turn starts on "Breathe in"

    // Self-scheduling redraw, only while working; the flag stops chains from piling up.
    if (!ticking) {
      ticking = true
      $.clock.after(TICK, () => {
        ticking = false
        $.ui.invalidate('ui.render')
      })
    }

    const f = frame(now - startedAt)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box marginTop={1}>
        <Text color={f.color} bold>{f.label}  </Text>
        <Text color={f.color}>{f.bar}</Text>
        <Text dimColor>  {f.left}</Text>
      </Box>
    )
  })
}
