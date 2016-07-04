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

    function currentStatus() {
        if (Url.canonical.indexOf(L.origin + '/') !== 0) {
            return 'otherOrigin';
        }
        return L.href === Url.canonical ? 'canonical' : 'original';
    }

    function handleMessage(msg, sender, sendResponse) {
        var status = currentStatus();
        if (status === 'otherOrigin') {
            window.open(Url.canonical, '_blank');
            return;
        }
        var nextStatus = status === 'original' ? 'canonical' : 'original';
        history.replaceState(null, null, Url[nextStatus]);
        sendResponse(nextStatus);
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
        var canonical = link            ? link.href
                      : L.search !== '' ? cleanUrl()
                      :                   L.href
                      ;
        if (canonical !== L.href) {
            Url.canonical = canonical;
            chrome.runtime.onMessage.addListener(handleMessage);
            chrome.runtime.sendMessage(currentStatus());
        }
    }

    if (!ExcludeHosts[L.host]) {
        detect();
    }
})(location);
