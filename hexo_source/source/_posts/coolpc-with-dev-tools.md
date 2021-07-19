---
title: 這年頭買張顯示卡有這麼難?
date: 2021-07-19 11:38:26
tags:
---

電腦壞掉又遇到礦災, 不就是要買張顯卡而已, 有沒有這麼難買...

<!-- more -->

一直以來都講求 CP 為主的我, 只不過是要買張中階顯卡就好, 孰不知這個時間點 啥卡都買不到..

什麼 RTX2060 RTX2070 都不是我要的阿, 我只是要張 1650 super, 線上估價平台沒貨就是沒貨

手刷也會累, 就寫個小程式幫我做這些工作吧!

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
  fetch("https://www.coolpc.com.tw/evaluate.php", {
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
      const contentType = res.headers.get("content-type");
      const charsetMatches = contentType.match(/charset=(.+)/);
      const charset = charsetMatches[1];
      return res.blob().then((blob) => readBlobAsText(blob, charset));
    })
    .then((data) => {
      const dp = new DOMParser();
      const doc = dp.parseFromString(data, "text/html");
      const list = Array.from(
        doc.querySelectorAll('[label="NVIDIA GTX1650 SUPER (DDR6)"] option')
      ).filter((opt) => !opt.innerText.trim().startsWith("❤"));

      if (list.length) {
        console.log("\n\n---");
        list.map((opt) => console.warn(opt.innerText.trim()));
        new Notification("有貨, 快去看!!!");
      }
    });
}
```

{% blockquote %}

- 小東西就不用串接一堆系統, 直接用瀏覽器的通知就好, 簡單好用!
- 判斷顯示卡有沒有貨的方式也寫得很簡單, 因為都沒貨阿..., 以後拿來在細修也很快!
  {% endblockquote %}

<div class="sk-h1">編碼小雷點</div>
這邊有一個小雷點就是, fetch 拿回來的資料會有編碼問題, 所以會看到 response 亂碼呈現

在 Stackoverflow 找到的方法就直接拿來用啦

```javascript
const readBlobAsText = (blob, encoding) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (event) => {
      resolve(fr.result);
    };

    fr.onerror = (err) => {
      reject(err);
    };

    fr.readAsText(blob, encoding);
  });
};
```

{% blockquote %}
到貨通知是寫好了... 但是還是沒貨阿= =
{% endblockquote %}

程式碼: <a href="https://gist.github.com/FlyMaple/d943757ef8f7cd89ca3ba213764fd5a0" target="_blank">點我</a>
