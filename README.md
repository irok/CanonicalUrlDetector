# Canonical Url Detector

- English
- [日本語](https://github.com/irok/CanonicalUrlDetector/blob/master/README.ja.md)

The icon is activated when the canonical url is set on the page, and the url changes when you click it. (It does not reload, it just changes the displayed url. Click again to return to the original url.)
It works in the same way when the url contains extra parameters.
Please use it, for example, when you share a page.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/disabled-icon.png" width="16"/> There is no canonical url.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png" width="16"/> It is not a canonical url. Click to change it to canonical url.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png" width="16"/> It is a canonical url. Click to return to the original url.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png" width="16"/> It is not a canonical url. Click to open the canonical url in a new tab.

## about canonical url
The following is called canonical url.

1. Value of the href attribute of the `link[rel="canonical"]` element.
2. The url from which extra parameters have been removed.
    * See [`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js) for details.

## install
* Chrome
    * [Canonical Url Detector - Chrome Web Store](https://chrome.google.com/webstore/detail/canonical-url-detector/dcbmeicnoejpldipejlefojiiebhogij)
* Firefox
    * [Canonical Url Detector – Get this Extension for 🦊 Firefox (en-US)](https://addons.mozilla.org/en-US/firefox/addon/canonical-url-detector/)
