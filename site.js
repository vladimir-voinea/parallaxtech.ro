// The parallax: hero icons drift at different depths with scroll and pointer. Off for reduced motion.
(function () {
  var layers = Array.prototype.slice.call(document.querySelectorAll('.hero-stage .layer'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (layers.length && !reduce) {
    var px = 0, py = 0, sy = 0, ticking = false;
    function render() {
      ticking = false;
      layers.forEach(function (el) {
        var d = parseFloat(el.getAttribute('data-depth')) || 0;
        var x = px * 18 * d;
        var y = py * 14 * d - sy * 0.12 * d;
        el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      });
    }
    function queue() { if (!ticking) { ticking = true; requestAnimationFrame(render); } }
    window.addEventListener('scroll', function () { sy = window.scrollY; queue(); }, { passive: true });
    window.addEventListener('pointermove', function (e) {
      px = (e.clientX / window.innerWidth - 0.5) * 2;
      py = (e.clientY / window.innerHeight - 0.5) * 2;
      queue();
    }, { passive: true });
  }

  var btn = document.getElementById('copy-email');
  var addr = document.getElementById('email-address');
  if (btn && addr) {
    btn.addEventListener('click', function () {
      var text = addr.textContent.trim();
      function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1600); }
      function fallback() {
        var r = document.createRange(); r.selectNodeContents(addr);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        btn.textContent = 'Selected';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
    });
  }
})();
