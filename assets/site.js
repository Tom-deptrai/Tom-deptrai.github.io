/* Language switch for the Ripple Tap pages: English by default, Vietnamese on request.
   Content for each language lives in [data-lang] blocks; ?lang=vi (or #vi) opens Vietnamese directly
   and a manual choice is remembered on this device. */
(function () {
  var KEY = 'rt-lang';
  var root = document.documentElement;
  var buttons = document.querySelectorAll('[data-set-lang]');
  function apply(lang) {
    root.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) { el.hidden = el.getAttribute('data-lang') !== lang; });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang)); });
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
  }
  var lang = new URLSearchParams(location.search).get('lang') || (location.hash === '#vi' ? 'vi' : null);
  if (!lang) { try { lang = localStorage.getItem(KEY); } catch (e) {} }
  apply(lang === 'vi' ? 'vi' : 'en');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-set-lang');
      apply(l);
      try { localStorage.setItem(KEY, l); } catch (e) {}
      history.replaceState(null, '', l === 'vi' ? '?lang=vi' : location.pathname);
    });
  });
})();
