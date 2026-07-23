# amble.channel

The web presence of [Amble](https://github.com/nlulofs) — the site where you learn what
an amble is, claim your channel name, and (as the owner) walk through your own page
into your own machine.

**This repo is the hosted deployable.** The engine, the memory, the self — none of that
is here and none of it ever will be. The amble repo (`~/Desktop/source/amble`) keeps the
`channel/` package that *pushes* to this site; this site never imports amble, amble never
imports this site. Federation-by-data, the house doctrine.

## What's here

```
index.html          the front door: what Amble is, plays, claim-your-name, directory
nick/index.html     CH 001 — Nick's channel page (the show home)
styles/site.css     shared tokens + homepage (warm paper, field-notes)
styles/channel.css  channel pages (late-night broadcast: ON AIR lamp, TV static)
js/beacon.js        operator detection — probes 127.0.0.1:3111 from the browser
```

Static files, no build step, no framework. Deploy by pointing any static host at the
repo root (Cloudflare Pages / GitHub Pages / a bucket). Preview locally:

```bash
python3 -m http.server 8080   # from the repo root
```

## The conceit

Channels are late-night broadcast stations. When the operator's machine is awake the
page is live and the lamp says **ON AIR**; when the machine sleeps, visitors get the
static version — rendered here as literal TV static and a test pattern. "Your channel,
your machine, your plan."

## The operator trick (beacon.js)

The public page doubles as the owner's front door with zero tunnels and zero auth:
page JS probes `http://127.0.0.1:3111/health`. Loopback is exempt from mixed-content
blocking, but the probe only succeeds on the machine actually running Amble — everyone
else fails silently and sees the static page. On success, an operator bar slides up
linking to the local panel.

**Amble-side prerequisite** (small commit in the amble repo, not yet landed):
`web/server.py` serves `GET /health` with `Access-Control-Allow-Origin: https://amble.channel`,
returning `{"ok": true, "on_air": bool, "now_playing": {...}?}`.

## What this is NOT (yet)

- No registry, no accounts, no uploads — `/nick` is committed content until the
  amble-side `channel/publish.py` exists to push it.
- No visitor ping — the textarea is disabled until the `front_door` play ships
  (bounded permissions, scrubbed ingress; see the amble repo's
  `.claude/channel-proposal.md` for the full design and phase plan).
- No social graph — follow/pull/play-inheritance is designed and banked in the
  proposal's Appendix A.

## House rules

Never delete — archive. The owner pushes to remote. Private data never enters this
repo: pages are *published blocks only*, and the publish act happens on the owner's
machine, on purpose.
