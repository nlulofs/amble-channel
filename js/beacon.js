/* beacon.js — is the operator's amble awake, and are we on the operator's machine?
 *
 * The public page doubles as the owner's front door with zero tunnels and zero
 * auth: from the visitor's browser we probe http://127.0.0.1:3111/health.
 * Browsers treat loopback as a secure context, so an HTTPS page may fetch it —
 * but the request only ever succeeds on the machine actually running Amble.
 * Everyone else fails silently in ~1s and sees the static.
 *
 * Amble-side prerequisite (small commit in the amble repo):
 *   web/server.py serves GET /health with
 *     Access-Control-Allow-Origin: https://amble.channel
 *   and returns {"ok": true, "on_air": bool, "now_playing": {...}?}
 *
 * Until that lands, this script simply never finds anything — the page is
 * fully functional as a static channel.
 */

(function () {
  "use strict";

  var AMBLE_LOCAL = "http://127.0.0.1:3111";
  var TIMEOUT_MS = 1200;

  function probe() {
    var ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctl && setTimeout(function () { ctl.abort(); }, TIMEOUT_MS);

    return fetch(AMBLE_LOCAL + "/health", {
      mode: "cors",
      cache: "no-store",
      signal: ctl ? ctl.signal : undefined,
    })
      .then(function (res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) throw new Error("not ok");
        return res.json();
      })
      .catch(function () {
        if (timer) clearTimeout(timer);
        return null;
      });
  }

  function markOperator(health) {
    var body = document.body;
    body.classList.add("operator");

    /* The operator's own machine being awake also means this channel is,
       by definition, capable of being on air. Only flip the lamp if the
       server says so — "live now" is an allocation, not an accident. */
    if (health && health.on_air) {
      body.classList.add("on-air");
      var off = document.querySelector(".now-playing .off");
      var on = document.querySelector(".now-playing .on");
      if (health.now_playing && on) {
        var track = document.getElementById("np-track");
        var artist = document.getElementById("np-artist");
        if (track) track.textContent = health.now_playing.track || "—";
        if (artist) artist.textContent = health.now_playing.artist || "";
        on.hidden = false;
        if (off) off.hidden = true;
      }
    }
  }

  function init() {
    /* Homepage: light the directory row if this machine runs the channel. */
    probe().then(function (health) {
      if (health === null) return;
      var row = document.getElementById("ch-001");
      if (row) {
        row.classList.add("on-air");
        var status = row.querySelector(".status");
        if (status) status.textContent = "operator here";
      }
      if (document.querySelector(".operator-bar")) markOperator(health);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
