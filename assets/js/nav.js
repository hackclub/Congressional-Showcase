/* Keyboard and button navigation between participant pages */
(function () {
  var scriptTag = document.querySelector('script[data-root]');
  var root = scriptTag ? scriptTag.getAttribute('data-root') : './';
  if (!root.endsWith('/')) root += '/';

  fetch(root + 'projects.json')
    .then(function (res) { return res.json(); })
    .then(function (projects) {
      if (!Array.isArray(projects) || projects.length === 0) return;

      // Determine current page slug from URL
      var path = window.location.pathname;
      var match = path.match(/\/sites\/([^/]+)/);
      var currentSlug = match ? match[1] : null;

      var currentIndex = -1; // -1 = landing page
      if (currentSlug) {
        for (var i = 0; i < projects.length; i++) {
          if (projects[i].slug === currentSlug) {
            currentIndex = i;
            break;
          }
        }
        // Slug not found in projects.json — don't show nav
        if (currentIndex === -1) return;
      }

      // Compute prev/next URLs (wraps around, skips landing page)
      var prevUrl, nextUrl;
      var last = projects.length - 1;
      if (currentSlug === null) {
        // On landing page
        prevUrl = root + 'sites/' + projects[last].slug + '/';
        nextUrl = root + 'sites/' + projects[0].slug + '/';
      } else {
        var prevIndex = currentIndex === 0 ? last : currentIndex - 1;
        var nextIndex = currentIndex === last ? 0 : currentIndex + 1;
        prevUrl = root + 'sites/' + projects[prevIndex].slug + '/';
        nextUrl = root + 'sites/' + projects[nextIndex].slug + '/';
      }

      // Reuse existing arrows if present, otherwise create new ones
      var prevArrow = document.querySelector('.nav-arrow.prev');
      var nextArrow = document.querySelector('.nav-arrow.next');

      if (!prevArrow) {
        prevArrow = document.createElement('a');
        prevArrow.className = 'nav-arrow prev';
        prevArrow.setAttribute('aria-label', 'Previous page');
        prevArrow.textContent = '\u2190';
        document.body.appendChild(prevArrow);
      }

      if (!nextArrow) {
        nextArrow = document.createElement('a');
        nextArrow.className = 'nav-arrow next';
        nextArrow.setAttribute('aria-label', 'Next page');
        nextArrow.textContent = '\u2192';
        document.body.appendChild(nextArrow);
      }

      // Update hrefs with accurate data from projects.json
      prevArrow.href = prevUrl;
      nextArrow.href = nextUrl;

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        // Don't hijack input fields
        var tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (document.activeElement.isContentEditable) return;

        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          window.location.assign(prevUrl);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          window.location.assign(nextUrl);
        } else if (e.key === 'Escape' && currentSlug !== null) {
          e.preventDefault();
          window.location.assign(root);
        }
      });
    })
    .catch(function () {
      // projects.json failed to load — silently skip navigation
    });
})();
