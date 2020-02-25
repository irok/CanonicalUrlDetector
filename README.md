# Canonical Url Detector

- English
- [日本語](https://github.com/irok/CanonicalUrlDetector/blob/master/README.ja.md)

This is a browser extension for Chrome and Firefox.

The extension icon becomes active when the page has canonical url, and click it to change url in the address bar to canonical url without reloading the page. Click again to return to the original url.
It works in the same way when the url contains extra parameters and flagment.
Please use it, for example, when you share a page.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-disabled.png" width="16"/> There is no canonical url or already canonical url.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-non-canonical.png" width="16"/> Not canonical url. Clicking it changes to canonical url.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-canonical.png" width="16"/> Canonical url. Click to return to the original url.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-other-origin.png" width="16"/> Not canonical url. Clicking it opens canonical url in new tab.

## about Canonical URL

1. Value of the href attribute of the `link[rel="canonical"]` element.
2. The URL from which extra parameters and fragments have been removed.
    * See [`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/dist/content.js) for details.

## install
* Chrome
    * [Canonical Url Detector - Chrome Web Store](https://chrome.google.com/webstore/detail/canonical-url-detector/dcbmeicnoejpldipejlefojiiebhogij)
* Firefox
    * [Canonical Url Detector – Get this Extension for 🦊 Firefox (en-US)](https://addons.mozilla.org/en-US/firefox/addon/canonical-url-detector/)
