# Canonical Url Detector

閲覧中のページに正規化されたURLがあるとアイコンが反応し、クリックするとアドレスバーのURLが正規のURLに変わります。
ページをシェアするときなどにご利用ください。

![disabled-icon.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/disabled-icon.png) 正規URLの設定も不要と判断できるパラメータもありません。

![icon-origin.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png) 現在のURLは正規のURLではありません。クリックすると正規のURLに変わります。

![icon-canonical.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png) 現在のURLは正規URLです。クリックすると元のURLに戻ります。

![icon-otherOrigin.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png) 現在のURLは正規のURLではありません。クリックすると新しいタブで正規のURLが開きます。（正規URLのOriginが異なるとページのURLを書き換えられないため）

## 正規化されたURLについて

以下のものを「正規化されたURL」として扱っています。

1. `link[rel=canonical]`要素のhref属性値
2. 不要なパラメータを除去したURL
  * どのパラメータを不要と判断しているかは[`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js)を見てください。

