const UnnecessaryParams = [
  '_ga',
  'action_object_map',
  'action_ref_map',
  'action_type_map',
  'fb_action_ids',
  'fb_action_types',
  'fb_aggregation_id',
  'fb_comment_id',
  'fb_ref',
  'fb_source',
  'fb_xd_fragment',
  'gclid',
  'ref_src',
  'ref_url',
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_place',
  'utm_reader',
  'utm_source',
  'utm_term'
];
const UnnecessaryParamRegex = /^ga_/;

function isNecessaryParam(param) {
  const name = param.split('=')[0];
  return !(UnnecessaryParams.includes(name) || UnnecessaryParamRegex.test(name));
}

function getPureUrl(url) {
  const _ = new URL(url);
  const params = _.search.length ? _.search.substr(1).split('&').filter(isNecessaryParam) : [];
  const query = params.length ? `?${params.join('&')}` : '';
  return `${_.protocol}//${_.host}${_.pathname}${query}`;
}

function getCanonicalLinkUrl() {
  const link = document.querySelector('link[rel="canonical"]');
  return link && link.href;
}

const UrlInfo = {};
const State = (type, title, url) => ({type, title, url});

function getState() {
  const canonical = new URL(UrlInfo.canonicalUrl);
  const original = new URL(UrlInfo.originalUrl);
  const current = new URL(UrlInfo.currentUrl);

  // canonical == original: no action needed
  if (canonical.href == original.href) {
    return State('disabled', '');
  }

  // current == canonical: click to return to original
  if (current.href == canonical.href) {
    return State('canonical', 'Return to original URL', original.href);
  }

  // different origin: click to open in new window
  if (canonical.origin != current.origin) {
    return State('other-origin', `Open the "${canonical.href}"`, canonical.href);
  }

  // otherwise: click to change to canonical
  const title = `Change to ${UrlInfo.linkUrl ? 'canonical' : 'pure'} URL`;
  return State('non-canonical', title, canonical.href);
}

const handler = {
  update() {
    const url = location.href;
    if (!UrlInfo.originalUrl) {
      const linkUrl = getCanonicalLinkUrl();
      const pureUrl = getPureUrl(url);
      Object.assign(UrlInfo, {
        originalUrl: url,
        canonicalUrl: linkUrl || pureUrl,
        linkUrl, pureUrl
      });
    }
    UrlInfo.currentUrl = url;
    chrome.runtime.sendMessage(getState());
  },

  click() {
    if (UrlInfo.originalUrl) {
      const {type, url} = getState();
      if (type == 'other-origin') {
        window.open(url, '_blank');
      }
      else if (url) {
        history.replaceState(null, null, url);
      }
    }
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (handler[message.type]) {
    handler[message.type](message);
  }
});
