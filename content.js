(function(L) {
    const Url = {
        original: L.href,
        canonical: null
    };
    const UnnecessaryParams = {
        action_object_map: true,
        action_ref_map: true,
        action_type_map: true,
        fb_action_ids: true,
        fb_action_types: true,
        fb_aggregation_id: true,
        fb_comment_id: true,
        fb_source: true,
        fb_xd_fragment: true,
        utm_campaign: true,
        utm_content: true,
        utm_medium: true,
        utm_source: true,
        utm_term: true
    };
    const ExcludeHosts = {
        //'plus.google.com': true
    };

    function Status(code) {
        this.code = code;
        this.url  = Url;
    }

    function getCurrentStatus() {
        if (Url.canonical !== null) {
            if (Url.canonical === L.href) {
                return new Status('canonical');
            }
            else if (!Url.canonical.startsWith(L.origin + '/')) {
                return new Status('otherOrigin');
            }
        }
        return new Status('original');
    }

    function changeUrl() {
        const status = getCurrentStatus();
        if (status.code === 'otherOrigin') {
            window.open(Url.canonical, '_blank');
        }
        else {
            const code = status.code === 'original' ? 'canonical' : 'original';
            history.replaceState(null, null, Url[code]);
        }
    }

    function sendStatus() {
        chrome.runtime.sendMessage(getCurrentStatus());
    }

    function handleMsg(msg) {
      const handler = {
        clicked: changeUrl,
        changed: sendStatus
      };

      if (handler[msg]) {
        handler[msg]();
      }
    }

    function setup() {
        chrome.runtime.onMessage.addListener(handleMsg);
        window.addEventListener('load', sendStatus);
        sendStatus();
    }

    function cleanUrl() {
        const params = [];
        L.search.substr(1).split('&').forEach(function(param) {
            if (!UnnecessaryParams[ param.split('=')[0] ]) {
                params.push(param);
            }
        });

        const query = params.length ? '?' + params.join('&') : '';
        return L.protocol + '//' + L.host + L.pathname + query + L.hash;
    }

    function detect() {
        const link = document.querySelector('link[rel="canonical"]');
        if (link) {
            Url.canonical = link.href;
        }
        else if (L.search !== '') {
            Url.canonical = cleanUrl();
        }

        if (Url.canonical !== null && Url.canonical !== L.href) {
            setup();
        }
    }

    if (!ExcludeHosts[L.host]) {
        detect();
    }
})(window.location);
