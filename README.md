# Canonical Url Detector
The icon is activated when the canonical url is set on the page, and the url changes when you click it. (Click again to return to the original url.)
It works in the same way when the url contains extra parameters.
Please use it, for example, when you share a page.

閲覧中のページに正規化されたURLがあるとアイコンが反応し、クリックするとアドレスバーのURLが正規のURLに変わります。
URLに余計なパラメータが入っているときも同じように動きます。
ページをシェアするときなどにご利用ください。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/disabled-icon.png" width="16"/> There is no canonical url.<br>
正規のURLはありません。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png" width="16"/> It is not a canonical url. Click to change it to canonical url.<br>
正規のURLではありません。クリックすると正規のURLに変わります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png" width="16"/> It is a canonical url. Click to return to the original url.<br>
正規のURLです。クリックすると元のURLに戻ります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png" width="16"/> It is not a canonical url. Click to open the canonical url in a new tab.<br>
正規のURLではありません。クリックすると新しいタブで正規のURLを開きます。

## about canonical url （正規のURLについて）
The following is called canonical url.

1. Value of the href attribute of the `link[rel="canonical"]` element.
2. The url from which extra parameters have been removed.
    * See [`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js) for details.

以下のものを「正規のURL」としています。

1. `link[rel=canonical]`要素のhref属性値
2. 不要なパラメータを除去したURL
    * 詳しくは[`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js)を見てください。
