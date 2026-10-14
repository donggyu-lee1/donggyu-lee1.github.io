/* Private visitor analytics; no public counters, widgets, or form capture. */
(function () {
  'use strict';

  var endpoint = 'https://econai.kaist.ac.kr/site-analytics/count';
  var tracker = 'https://econai.kaist.ac.kr/site-analytics/count.js';
  var optOutKey = 'visitor-analytics-opt-out';
  var locallyDisabled = false;

  function productionPage() {
    try {
      if (window.top !== window.self || location.protocol !== 'https:') return false;
      if (/^\/(before|review)(\/|$)/i.test(location.pathname)) return false;
      if (location.hostname === 'donggyu-lee1.github.io') return true;
      return location.hostname === 'econai.kaist.ac.kr' &&
        /^\/(econcausal|ideological-bias-in-llms)(\/|$)/.test(location.pathname);
    } catch (_) {
      return false;
    }
  }

  function ownerCommand() {
    if (location.hash !== '#analytics-opt-out') return false;
    // Do not count the command page, including when it re-enables tracking.
    try {
      var disabled = localStorage.getItem(optOutKey) === '1';
      if (disabled) localStorage.removeItem(optOutKey);
      else localStorage.setItem(optOutKey, '1');
      locallyDisabled = !disabled;
      history.replaceState(history.state, '', location.pathname + location.search);
    } catch (_) {
      locallyDisabled = true;
    }
    return true;
  }

  function mayCount() {
    try {
      if (!productionPage() || locallyDisabled) return false;
      if (navigator.webdriver || /HeadlessChrome|Playwright|PhantomJS|Selenium/i.test(navigator.userAgent || '')) return false;
      if (navigator.globalPrivacyControl === true) return false;
      var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
      if (dnt === '1' || dnt === 'yes' || dnt === 1 || dnt === true) return false;
      if (location.hash === '#analytics-opt-out' || location.hash === '#toggle-goatcounter') return false;
      if (localStorage.getItem(optOutKey) === '1' || localStorage.getItem('skipgc') === 't') return false;
      return true;
    } catch (_) {
      // If browser storage is unavailable, do not risk ignoring an opt-out.
      return false;
    }
  }

  function pagePath() {
    return location.hostname + location.pathname;
  }

  function referrerOrigin() {
    try {
      if (!document.referrer) return '';
      var url = new URL(document.referrer);
      return /^https?:$/.test(url.protocol) ? url.origin : '';
    } catch (_) {
      return '';
    }
  }

  function linkKind(anchor) {
    try {
      var url = new URL(anchor.getAttribute('href'), location.href);
      if (url.protocol === 'mailto:') return 'email';
      if (!/^https?:$/.test(url.protocol)) return '';
      if (/\.pdf$/i.test(url.pathname) ||
          (url.hostname === 'arxiv.org' && /^\/pdf\//.test(url.pathname))) return 'pdf';
      if (url.hostname === 'arxiv.org' && /^\/abs\//.test(url.pathname)) return 'arxiv';
      if (url.hostname === 'github.com' && url.pathname.split('/').filter(Boolean).length >= 2) return 'code';
      if (url.hostname === 'huggingface.co' && /^\/datasets\//.test(url.pathname)) return 'dataset';
      if (url.hostname === location.hostname && /\.(csv|json|jsonl|parquet|zip)$/i.test(url.pathname)) return 'dataset';
      if (url.hostname === location.hostname && /\.py$/i.test(url.pathname)) return 'code';
      return '';
    } catch (_) {
      return '';
    }
  }

  try {
    if (!productionPage()) return;
    if (window.__privateVisitorAnalytics) return;
    window.__privateVisitorAnalytics = true;
    window.addEventListener('hashchange', function () { ownerCommand(); });
    if (ownerCommand() || !mayCount()) return;

    // v2.7.0 includes location.search as q even with a custom path. Keep its
    // automatic send and automatic element binding off until q is removed.
    window.goatcounter = {
      endpoint: endpoint,
      no_onload: true,
      no_events: true,
      path: function () { return pagePath(); },
      referrer: function () { return referrerOrigin(); },
      title: document.title
    };

    var script = document.createElement('script');
    script.src = tracker;
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.setAttribute('data-goatcounter', endpoint);
    script.onerror = function () {};
    script.onload = function () {
      try {
        var counter = window.goatcounter;
        if (!counter || typeof counter.get_data !== 'function' || typeof counter.count !== 'function') return;
        var originalData = counter.get_data;
        var originalCount = counter.count;
        counter.get_data = function (options) {
          var data = originalData(options);
          data.q = '';
          return data;
        };
        counter.count = function (options) {
          if (!mayCount()) return;
          try { originalCount(options); } catch (_) {}
        };

        var pageCounted = false;
        function countVisiblePage() {
          if (pageCounted || !mayCount()) return;
          if ('visibilityState' in document && document.visibilityState !== 'visible') return;
          pageCounted = true;
          counter.count();
        }
        countVisiblePage();
        document.addEventListener('visibilitychange', countVisiblePage);

        var titles = {
          pdf: 'PDF link', arxiv: 'arXiv paper link', code: 'Code link',
          dataset: 'Dataset link', email: 'Email link'
        };
        function countLink(event) {
          try {
            if (!mayCount() || !event.isTrusted) return;
            if (event.type === 'click' && event.button !== 0) return;
            if (event.type === 'auxclick' && event.button !== 1) return;
            var target = event.target;
            if (!target || typeof target.closest !== 'function') return;
            var anchor = target.closest('a[href]');
            if (!anchor) return;
            var kind = linkKind(anchor);
            if (!kind) return;
            // Finite event names plus the source page; no destination, email
            // address, link text, query, fragment, input, or quiz answer.
            counter.count({
              event: true,
              path: 'link:' + kind + ':' + pagePath().slice(0, 200),
              title: titles[kind],
              referrer: ''
            });
          } catch (_) {}
        }
        document.addEventListener('click', countLink, {capture: true, passive: true});
        document.addEventListener('auxclick', countLink, {capture: true, passive: true});
      } catch (_) {}
    };
    document.head.appendChild(script);
  } catch (_) {}
})();
