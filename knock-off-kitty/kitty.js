// English by default; Vietnamese with the VI button or ?lang=vi. The choice is remembered on this device.
(function () {
  var KEY = 'kok-lang', root = document.documentElement;
  var btns = document.querySelectorAll('[data-pick]');
  function show(l) {
    root.lang = l;
    document.querySelectorAll('[data-l]').forEach(function (el) { el.hidden = el.getAttribute('data-l') !== l; });
    btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-pick') === l)); });
    var t = root.getAttribute('data-title-' + l); if (t) document.title = t;
    document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
      var u = a.getAttribute('href').split('?')[0]; a.setAttribute('href', l === 'vi' ? u + '?lang=vi' : u);
    });
  }
  var l = new URLSearchParams(location.search).get('lang');
  if (!l) { try { l = localStorage.getItem(KEY); } catch (e) {} }
  show(l === 'vi' ? 'vi' : 'en');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-pick'); show(v);
      try { localStorage.setItem(KEY, v); } catch (e) {}
      history.replaceState(null, '', v === 'vi' ? '?lang=vi' : location.pathname);
    });
  });
})();
