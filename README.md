# breathe 🫁

> Claude is writing your code. You're staring at the spinner, jaw clenched, shoulders somewhere near your ears, holding your breath like that'll make the tests pass.
>
> Y'all need to chill.

**breathe** is a tiny [Claude Code](https://claude.com/claude-code) mod that puts a breathing exercise above your prompt while Claude is working. Claude thinks, you breathe. Everybody wins.

```
Breathe in   ████████████░░░░░░░░░░░░  2
```

## How it works

| Step | Time | The bar |
| --- | --- | --- |
| **Breathe in** | 4s | fills up (blue) |
| **Hold** | 4s | stays full (lavender) |
| **Breathe out** | 4s | empties out (green) |

Repeat until Claude is done or you reach enlightenment, whichever comes first.

It only shows up while Claude is working. The moment Claude finishes, it vanishes and you go back to reviewing a 400-line diff like nothing happened.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install breathe --marketplace jackmorganxyz/breathe
```

Or from a shell:

```
claude plugin install breathe --marketplace jackmorganxyz/breathe
```

In the desktop app: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `jackmorganxyz/breathe`, then **Add plugin**.

Say `y` to add the marketplace, hit Enter for the user scope, and you're done. Exhale.

## FAQ

**Will this make Claude faster?**
No. But you'll care less.

**Will this make my code better?**
Also no. But you'll be weirdly at peace when the tests fail.

**I held my breath the entire time and now I'm dizzy.**
That's the "Hold" step. It ends. You're allowed to let go.

**Claude worked on my task for 6 minutes.**
That's 30 breaths. You're basically a monk now.

**Can I stare at the bar instead of reading what Claude is doing?**
That's the whole point, friend.

## Make it yours

Fork the repo and open `hooks/register.tsx`. `PHASES` at the top sets the seconds for each step:

- **4-7-8 (for sleep):** set the seconds to 4, 7 and 8.
- **Box breathing:** copy the Hold line to the end, for in, hold, out, hold.
- **Skip a step:** set its seconds to 0.

Then install from your fork instead.

## Uninstall

```
claude plugin uninstall breathe@breathe
```

Go back to clenching. Your call. 🫠
