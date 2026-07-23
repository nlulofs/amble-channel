# NOTES — decisions log

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
- **2026-07-23 — nick/index.html is now GENERATED.** The amble repo's
  channel/page.py renders it from data/channel/page.json (on Nick's machine)
  through channel/templates/page.html. Edit the data or the template there —
  hand edits to nick/index.html get overwritten on the next render.
