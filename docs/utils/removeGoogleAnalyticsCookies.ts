// Google Analytics was removed from the docs site, but visitors who browsed it before that change
// still carry its cookies in their browser. `_ga` and `_ga_<measurementID>` last up to two years,
// so we actively expire them instead of waiting them out.
//
// Only cookies on the current host and its parent domains can be deleted from here — a page cannot
// touch cookies scoped to an unrelated domain. So GA cookies belonging to other Pinterest sites
// (e.g. the `_ga_*` set on `.pinadmin.com`) are left alone by construction, even though they show
// up alongside ours in DevTools.
//
// This is a string rather than a function because it is injected as an inline <script> in
// `pages/_document.tsx`, so that it runs before the page renders on every visit.
const removeGoogleAnalyticsCookies = `
(function () {
  var GA_COOKIE_NAMES = ['_ga', '_gid', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmv', '__utmz'];
  // Names that carry a suffix, e.g. \`_ga_EYTY1WTV8B\` (GA4 measurement ID) or \`_gac_UA-123\`.
  var GA_COOKIE_PREFIXES = ['_ga_', '_gac_', '_gat_', '_gcl_'];

  var isGoogleAnalyticsCookie = function (name) {
    return (
      GA_COOKIE_NAMES.indexOf(name) !== -1 ||
      GA_COOKIE_PREFIXES.some(function (prefix) {
        return name.indexOf(prefix) === 0;
      })
    );
  };

  // A cookie can only be deleted by matching the domain it was set on, which we cannot read back.
  // GA sets cookies on the highest-level domain available, so try every parent domain of the
  // current host (skipping the public suffix) plus the host-only variant.
  var getDomains = function () {
    var parts = window.location.hostname.split('.');
    var domains = [undefined];
    for (var i = 0; i < parts.length - 1; i += 1) {
      var domain = parts.slice(i).join('.');
      domains.push(domain, '.' + domain);
    }
    return domains;
  };

  var domains = getDomains();

  document.cookie.split(';').forEach(function (cookie) {
    var name = cookie.split('=')[0].trim();
    if (!name || !isGoogleAnalyticsCookie(name)) {
      return;
    }

    domains.forEach(function (domain) {
      document.cookie =
        name +
        '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' +
        (domain ? '; domain=' + domain : '');
    });
  });
})();
`;

export default removeGoogleAnalyticsCookies;
