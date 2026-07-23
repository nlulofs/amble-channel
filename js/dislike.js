/* dislike.js — the only reaction available.
 *
 * Each click fires a GoatCounter event (path: "dislike"), so the boos land
 * in the same aggregate, cookieless ratings as everything else. The tally
 * renders only if the GoatCounter "visitor counter" setting is enabled;
 * otherwise it fails silently and the button remains pure catharsis.
 */

(function () {
  "use strict";

  var btn = document.getElementById("dislike-btn");
  if (!btn) return;
  var ack = document.getElementById("dislike-ack");
  var tally = document.getElementById("dislike-tally");

  var lines = [
    "noted.",
    "noted again.",
    "the operator remains unbothered.",
    "you can stop now.",
    "ok. logged. all of them.",
  ];
  var clicks = 0;

  function refreshTally() {
    if (!tally) return;
    fetch("https://goat.goatcounter.com/counter/dislike.json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.count) {
          tally.textContent = d.count.replace(/\s/g, "") + " dislikes to date";
        }
      })
      .catch(function () { /* tally is optional */ });
  }

  btn.addEventListener("click", function () {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: "dislike",
        title: "Disliked CH 001",
        event: true,
      });
    }
    if (ack) {
      ack.textContent = lines[Math.min(clicks, lines.length - 1)];
      clicks += 1;
    }
    setTimeout(refreshTally, 800);
  });

  refreshTally();
})();
