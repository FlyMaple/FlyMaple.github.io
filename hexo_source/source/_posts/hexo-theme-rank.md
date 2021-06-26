---
title: Hexo Theme 排行榜
date: 2021-06-22 17:59:24
tags:
---

一開始只是想找個 hexo theme 來當作 Blog 的模板, 在網上看到有人針對 Github 星數的排行.

想說乾脆我也來用一個排行的文章, 剛好當作 blog 的一篇文章, 沒想到做著做著遇到好多沒碰過的東西, 原來給自己找了個苦差事呢.

<!-- more -->

## Design

- 有一個程式負責處理 github repositories data
  - Query github repositories with github api
  - Export related to blog

- blog 的文章讀取上面程式來的資料

## Implement

首先來實現資料來源的程式.

因為要抓取 github 的資料, 所以這裡使用公開且免費的 api, 只是有流量限制而已.

為了未來重複利用, 這邊直接把 github 相關的東西包成 module, 以便後續(未來)使用.

並且導入 axios 做為 request 的 library, 對於這個 github module 只是個雛形, 所以 function 沒有做全面, 只有針對要用的部分作一些設計.

```typescript
import {AxiosResponse} from 'axios';

import _axios from '@axios';
import {RepositoriesResponse} from './definition';

// FIXME: currently for one topic
function compileToQ(topic: string[]): string {
    return `topic:${encodeURIComponent(topic[0])}`;
}

// FIXME: input arguments interface type
function getRepositories({
    q,
    topic,
    per_page,
    sort,
}: {
    q: string;
    topic: string[];
    per_page: number;
    sort: 'stars';
}): Promise<RepositoriesResponse> {
    return axios
        .get<any, AxiosResponse<RepositoriesResponse>>('/search/repositories', {
            params: {
                q: compileToQ(topic),
                per_page,
                sort,
            },
        })
        .then(res => res.data);
}

const axios = _axios.create({
    baseURL: 'https://api.github.com/',
    headers: {Accept: 'application/vnd.github.v3+json'},
});

const github = {
    getRepositories,
};

export default github;
```

{% blockquote %}
主要對外公開 getRepositories 方便使用
{% endblockquote %}

---

有了 github module 以後就可以開始寫主程式啦!

主程式很簡單, 就分為兩個部分:

- 查詢 topic: hexo-theme
- 將資料寫入檔案
  - 將 hexo project 的位置設定好(config file)
  - 將資料寫入到指定位置

```typescript
const YAML = require('json-to-pretty-yaml');

import fs from 'fs';
import path from 'path';

import {Repository} from '@github/definition';

import config from './.config/hexo-theme-rank.json';
import github from './github';

async function getRepositories(): Promise<Repository[]> {
    return (await github.getRepositories({
        q: '',
        topic: ['hexo-theme'],
        per_page: 100,
        sort: 'stars',
    })).items.map(
        repo => {
            return { ... };
        },
    );
}

function output(data: any): void {}

async function main(): Promise<void> {
    const repositories = await getRepositories();

    output({ repositories, });
}
main();
```
{% blockquote %}
這裡看到寫出的時候將 json 轉為 yaml, 是因為 hexo 所吃的格式為 yaml
{% endblockquote %}

到這邊已經完成一半了, 接下來開始在 blog 中將這份 yaml 資料讀入並且呈現出來.

---

到這邊就開始踩雷了!!!

- post 怎麼讀取資料?
  - hexo 有一個叫做 _data 的方式將資料讀入, 並且套用於模板之中(ejs, swig ...etc)
  - _data 最後試出有分 global 和 post 的, 但是這只是用於定義在資料夾成面而已, 到最後 compile 都是會被包在 global variable 中, 如果是定義在 post 就會用 post 名稱被分在 global object 中的一個 attribute key 中

    ```json
        {
            // 這是 post 名稱
            "hexo-theme-rank": {
                "repositories": [...]
            }
        }
    ```

- md 中怎麼寫 script 將這些資料 render 出來?
  - 找不到, 放棄...
  - 直接對 next 這個 theme 做客製化, 因為是採用 swig template 又搞了好久的 try error

  ```swig post.swig
  {{ post.content }}
  
  {############################################}
  {#  Customize: this is for Hexo Theme Rank  #}
  {############################################}
  {% if post.slug === 'hexo-theme-rank' %}
      {{ hexo_theme_rank_list.render(page) }}
  {% endif %}
  {############################################}
  ```

  ```swig list.swig
  {% macro render(post) %}
      {% set repos = site.data['hexo-theme-rank'].repositories %}
      <style>
          .{{ post.slug }}.line {
              border-bottom: 1px dashed #ccc;
              margin-bottom: 7px;
          }
          .{{ post.slug }}.date,
          .{{ post.slug }}.description {
              padding-left: 15px;
          }
          .{{ post.slug }}.date {
              font-size: 12px;
              color: #737373;
          }
      </style>
      {% for repo in repos.repositories %}
          <div class="{{ post.slug }} line">
              <a class="user" href="...
          </div>
      {% endfor %}
  {% endmacro %}
  ```

  {% blockquote %}
  這邊真的是雷爆了, 根本不會 swig, 硬是搞出來
  {% endblockquote %}

---

用完上面這些, 也就是你看到我正在寫文章的時候了, 文章就採用原先 hexo 的方式用 md 來撰寫.

在搭配 post.swig + list.swig 客製的部分將 repositories 動態 render 出來.

{% blockquote %}
有什麼正規的方式, 快點和我說阿... 難搞死了
{% endblockquote %}



## Result
