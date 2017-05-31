(function(L) {
    var Url = {
        original: L.href,
        canonical: null
    };
    var UnnecessaryParams = {
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
    var ExcludeHosts = {
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

    function handlePageActionClicked() {
        var status = getCurrentStatus();
        if (status.code === 'otherOrigin') {
            window.open(Url.canonical, '_blank');
        }
        else {
            var code = status.code === 'original' ? 'canonical' : 'original';
            history.replaceState(null, null, Url[code]);
        }
    }

    function sendStatus() {
        chrome.runtime.sendMessage(getCurrentStatus());
    }

    function setup() {
        chrome.runtime.onMessage.addListener(handlePageActionClicked);
        window.addEventListener('load', sendStatus);

        ['pushState', 'replaceState'].forEach(function(api) {
            var origApi = history[api];
            history[api] = function() {
                origApi.apply(history, arguments);
                sendStatus();
            };
        });

        sendStatus();
    }

    function cleanUrl() {
        var params = [];
        L.search.substr(1).split('&').forEach(function(param) {
            if (!UnnecessaryParams[ param.split('=')[0] ]) {
                params.push(param);
            }
        });

        var query = params.length ? '?' + params.join('&') : '';
        return L.protocol + '//' + L.host + L.pathname + query + L.hash;
    }

    function detect() {
        var link = document.querySelector('link[rel="canonical"]');
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
