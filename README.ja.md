# Canonical Url Detector

- [English](https://github.com/irok/CanonicalUrlDetector/blob/master/README.md)
- 日本語

閲覧中のページに正規化されたURLがあるとアイコンが反応し、クリックするとアドレスバーのURLが正規のURLに変わります。
URLに余計なパラメータが入っているときも同じように動きます。
ページをシェアするときなどにご利用ください。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/disabled-icon.png" width="16"/> 正規のURLはありません。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png" width="16"/> 正規のURLではありません。クリックすると正規のURLに変わります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png" width="16"/> 正規のURLです。クリックすると元のURLに戻ります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png" width="16"/> 正規のURLではありません。クリックすると新しいタブで正規のURLを開きます。

## 正規のURLについて
以下のものを「正規のURL」としています。

1. `link[rel=canonical]`要素のhref属性値
2. 不要なパラメータを除去したURL
    * 詳しくは[`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js)を見てください。
