---
title: 米家到貨通知啦
date: 2021-07-19 14:09:43
tags:
---

原本就常常缺貨的小米, 又趕上 COVID-19 全民在家運動, 想買幾瓶 \"米家自動感應洗手機\"

缺貨! 缺貨!! 大缺貨!!!

<!-- more -->

尤其是發起團購以後才發現缺貨, 實在是讓人心急如焚 இдஇ

之前剛好有寫類似的到貨通知, 就直接 copy 過來稍做修改啦

<div class="sk-h1">直接開始吧</div>

先讓瀏覽器開啟通知的功能

```javascript
Notification.requestPermission(function (status) {
  if (Notification.permission !== status) {
    Notification.permission = status;
  }
});
```

<div class="sk-h1">Fetch</div>

直接用 DevTools 幫我產生 fetch script 就好, 實在很懶得動腦了

都是一些很常用的寫法

- fetch
- DOMParser
- selector

```javascript
function main() {
  fetch("https://buy.mi.com/tw/item/3203600057", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer: "https://www.coolpc.com.tw/evaluate.php",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: "",
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      const dp = new DOMParser();
      const doc = dp.parseFromString(data, "text/html");

      const match = Array.from(
        doc.querySelectorAll('[type="text/javascript"]')
      ).find((s) => {
        return s.innerHTML.match('IsCos: \\"0\\"');
      });
      if (match) {
        console.warn("小米有貨囉, 快去看!!!");
        console.warn("程式已停止, 請重新啟動.");
        new Notification("小米有貨囉, 快去看!!!");
        clearInterval(interval.id);
      }
    });
}
```

{% blockquote %}

- 各個商品頁是採用 Server render 的方式直接將畫面做呈現, 所以沒有 api 可以用, 一樣直接用 html parse 的方式下手
  {% endblockquote %}

<div class="sk-h1">小技巧</div>

在分析網頁的時候有看到變數直接代表有無商品, 直接拿來用就好, 超方便~

```javascript
const match = Array.from(doc.querySelectorAll('[type="text/javascript"]')).find(
  (s) => {
    return s.innerHTML.match('IsCos: \\"0\\"');
  }
);
```

{% blockquote %}

- 變數藏在 script tag 裡面, 把它們抓出來在用 regex 判斷就好囉~
  {% endblockquote %}

{% blockquote %}
寫好的隔天就被通知貨到了, 立馬加入購物車下單, 實在是有爽度!
{% endblockquote %}

程式碼: <a href="https://gist.github.com/FlyMaple/9030c78b68b31a15772d6ce0cf8291ef" target="_blank">點我</a>
