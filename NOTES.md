# NOTES — decisions log

- **2026-07-26 — the platform assembles; channel content moves out.** This
  repo transferred to the `amblechannel` org and became the PLATFORM: front
  door, styles, js, and the Pages workflow. Channel CONTENT lives in its
  person's own repo — CH 001 is `nlulofs/nick-amble-channel` — and
  `.github/workflows/pages.yml` checks each channel repo out and overlays it
  at build time. That makes "amble.channel provides pages; people own their
  content" literally true in the repo layout, not just claimed. Pages build
  is now `workflow` (was legacy): a failed build keeps the last good deploy
  live. The in-repo `nick/` copy is deleted — the assembled site is the only
  place platform and content meet. Engine publish flow: `ship()` pushes the
  person's content repo, then pokes this repo's workflow via
  `workflow_dispatch` to rebuild.

- **2026-07-26 — channel seeds live OUTSIDE this repo.** A hand-authored fan
  page for a real non-user (recklessben, CH 801) was briefly a local commit
  here; rewound before ever being pushed. Decision (Nick): seeds are a third
  trust domain — this repo is the PUBLIC deployable, and a page about
  someone who hasn't consented must not ride into public history as a side
  effect of channel work. Seeds now live in `~/Desktop/source/amble-stubs`
  (local-only git, private by construction); shipping one here is its own
  deliberate act — plaintext or encrypt_page.py ciphertext (passcode-gated),
  per that repo's SHIP.md. Directory row + `.channel-row.unclaimed` chip CSS
  land only at ship time, alongside the page they point at. Vocabulary:
  these are **fan pages / channel seeds**, never "proxy" — proxy asserts
  delegated authority the subject never granted (Nick, same day). Unclaimed
  seeds number in the 800 band; claimed operators count from CH 001.

- **2026-07-22 — repo born.** Split from the amble repo on purpose: this is the hosted
  deployable (different lifecycle, different trust domain), and the forge pack ships
  `git archive HEAD` of amble — website code must not ride into tester installs.
  Same reasoning that moved moonlight-menagerie out.
- **2026-07-22 — build order (Nick).** Site + `/nick` static first (zero security
  exposure — nothing touches `web/server.py` yet), then DNS, then the amble-side
  launcher hook + `/health` CORS commit, then registry, then the pocket/auth phases
  from `.claude/channel-proposal.md` in the amble repo. Auth still lands before any
  non-loopback bind of the amble server — that constraint is untouched by this order.
- **2026-07-22 — aesthetic.** Channels as late-night broadcast: ON AIR lamp, TV
  static when the machine sleeps (the "static version" pun is the design), Top 8
  plays instead of Top 8 friends. Homepage is warm paper (the platform); channel
  pages are dark (the broadcasts). Fraunces + IBM Plex Mono.
- **2026-07-22 — fingerprint words on the page.** `harbor · violet · nine · lantern`
  is a *placeholder*: real channel words derive from the Ed25519 keypair minted in
  the amble repo's Phase 3. Replace when identity lands.
- **2026-07-24 — nick/easter-bunny/ is HAND-AUTHORED** (unlike nick/index.html):
  "The Easter Bunny, 2077," the picture book Nick and his amble wrote out loud on
  the morning of 07-24 — sequel to the six-page story kid-Nick wrote first. Linked
  from the /nick about block (via data/channel/page.json in the amble repo). SVG
  illustrations are chalk-on-dark, inline; edit the file directly.
- **2026-07-23 — nick/index.html is now GENERATED.** The amble repo's
  channel/page.py renders it from data/channel/page.json (on Nick's machine)
  through channel/templates/page.html. Edit the data or the template there —
  hand edits to nick/index.html get overwritten on the next render.
