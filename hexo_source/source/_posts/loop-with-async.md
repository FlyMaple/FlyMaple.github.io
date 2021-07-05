---
title: 遍歷非同步的方式記錄
date: 2021-07-05 14:49:40
tags:
---

一般在使用 loop 的時候會習慣用到 for...of, array forEach ...etc, 如果在這些程式碼段裡須搭配非同步(async)的時候會遇到一些問題

例如: 加了 async/await 沒有作用...

<!-- more -->

以下紀錄常用幾種 loop 方式搭配 async 得到的結果, 並額外介紹 async iterator

首先做個簡單的 delay 函式

```javascript delay
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
```

接著針對我們常見的 for loop 來做紀錄, 以下幾中與 async/await 搭配的結果都是有效的

```javascript for in
async function async_await_for_in() {
  console.log("--------------------");
  console.log("async_await_for_in ");
  // async/await can work!
  for (const i in list) {
    await delay(500);
    console.log(list[i]);
  }
}
```

```javascript for of
async function async_await_for_of() {
  console.log("--------------------");
  console.log("async_await_for_of ");
  // async/await can work!
  for (const i of list) {
    await delay(500);
    console.log(i);
  }
}
```

```javascript for loop
async function async_await_for_loop() {
  console.log("--------------------");
  console.log("async_await_for_loop");
  // async/await can work!
  for (let i = 0; i < list.length; i++) {
    await delay(500);
    console.log(list[i]);
  }
}
```

下面是針對陣列常用的 loop 方式, 與 async/await 搭配下都是**無效**的

```javascript array forEach
async function async_await_for_each() {
  console.log("--------------------");
  console.log("async_await_for_each");
  // async/await not work!
  list.forEach(async (item) => {
    await delay(500);
    console.log(item);
  });
}
```

```javascript array map
async function async_await_map() {
  console.log("--------------------");
  console.log("async_await_map");
  // async/await not work!
  list.map(async (item) => {
    await delay(500);
    console.log(item);
  });
}
```

---

先將 iterator 做出來, 這邊做了函式型與類別型

```javascript iterator
function getMyIterator() {
  return {
    [Symbol.asyncIterator]: () => {
      return {
        next: async () => {
          await delay(500);
          return { value: Math.random() };
        },
      };
    },
  };
}

class MyIterator {
  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        await delay(500);
        return { value: Math.random() };
      },
    };
  }
}
```

做好之後就可以套用於 for 之中, 並搭配 `for await` 來進行非同步遍歷

```javascript iterator with for await
async function async_await_async_iterator1() {
  console.log("--------------------");
  console.log("async_await_async_iterator1");
  let count = 1;
  const myIterator = customize.getMyIterator();
  for await (const value of myIterator) {
    console.log(value);

    if (count >= 5) {
      break;
    }

    count += 1;
  }
}

async function async_await_async_iterator2() {
  console.log("--------------------");
  console.log("async_await_async_iterator2");
  let count = 1;
  const myIterator = new customize.MyIterator();
  for await (const value of myIterator) {
    console.log(value);

    if (count >= 5) {
      break;
    }

    count += 1;
  }
}
```

程式碼: <a href="https://codesandbox.io/s/for-with-async-oi01x" target="_blank">點我</a>

{% blockquote %}

- https://segmentfault.com/a/1190000024567597
- https://rs1987.medium.com/javascript-iterator-%E8%A3%BD%E4%BD%9C-6e3900f092c7
  {% endblockquote %}
