# Canonical Url Detector

- English
- [日本語](https://github.com/irok/CanonicalUrlDetector/blob/master/README.ja.md)

This is a Chrome browser extension that detects canonical URLs.

The extension icon becomes active when a canonical URL is present. Click it to switch the URL in the address bar to the canonical URL without reloading the page, and click again to revert to the original URL.
It also works if the URL contains unnecessary parameters or a fragment.
For example, use it when sharing a page.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-disabled.png" width="16"/> No canonical URL exists, or the URL is already canonical.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-non-canonical.png" width="16"/> Not the canonical URL. Click to switch to the canonical URL.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-canonical.png" width="16"/> Canonical URL. Click to return to the original URL.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-other-origin.png" width="16"/> Not the canonical URL. Click to open the canonical URL in a new tab.

## About Canonical URL

1. Value of the href attribute of the `link[rel="canonical"]` element.
2. The URL from which extra parameters and fragments have been removed.
    * See [`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/dist/content.js) for details.

## Installation
* [Canonical Url Detector - Chrome Web Store](https://chrome.google.com/webstore/detail/canonical-url-detector/dcbmeicnoejpldipejlefojiiebhogij)
