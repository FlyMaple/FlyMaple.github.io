---
title: Angular style component host 與封裝對照
date: 2021-07-09 16:18:21
tags:
---

<div class="sk-h2">什麼是 :host(selector) ?</div>

在 Angular component 中的樣式, 基本上會被 Shadow dom 所隔離, 在 Shadow dom 之中才會是 template 的內容.

樣式中的 host 其實就是指向 Shadow dom, 也就是在父層 template 中所呼叫的 component tag.

一般會將樣式寫在 template 上而不會對 host 進行太多的定義.

<div class="sk-h3">那什麼時候會需要將樣式定義在 host 上呢?</div>

Shadow dom 的大小基本上是由其中的 template 所決定, 但是如果要對這個 component 有較精準的定位或相對位置計算等空間排版的需求時, 會需要將 host 定義 display 屬性

<!--more-->

```scss
:host {
  position: relative;
  display: block;
}
```

{% blockquote %}
只針對 template 要達到精準的排版是不太夠的, 要先將其 host 設定好才不會遇到太多鬼打牆的問題, 例如明明設定了但是沒用的狀況...
{% endblockquote %}

<div class="sk-h3">:host 用與不用的差別</div>
因為 host 層級屬於父層, 要定義 host style 只能由 component :host 所定義, 不然就必須由父層所覆寫

---

<div class="sk-h2">什麼是 :host-context(selector)</div>

如果是樣式排版需要依照上層來做到自動變化, 可以透過 :host-context 來達到目的, 而不是由父層強制覆寫 component 樣式.

如果是單純調整顏色等已定義好的屬性值, 可以將這些屬性值改由 css variable 的方式來傳遞變化, 而不是濫用 :host-context 來覆寫本身的樣式

這是由 component 往上查找 **theme="theme-\*"** 的用法

```scss
:host-context([theme="theme-red"]) {
  font-size: 1rem;
}

:host-context([theme="theme-green"]) {
  font-size: 1.25rem;
}

:host-context([theme="theme-blue"]) {
  font-size: 1.5rem;
}
```

{% blockquote %}
:host-context 可以由這個 component 往上查找
{% endblockquote %}

---

<div class="sk-h2">透過 @HostBinding 來進行屬性綁定</div>

綁定 component attribute 來達到自動寫入 host 屬性.

```typescript
type Theme = "theme-default" | "theme-red" | "theme-green" | "theme-blue";

export class AppComponent implements OnInit {
    @HostBinding("attr.theme")
    bg: Theme = "theme-default";
```

```html
<!-- 依照 bg 這個屬性自動綁入 host 的 theme 屬性 -->
<app-root theme="theme-default"></app-root>
```

或是利用 method 來做到複雜的判斷來寫入 host 屬性

```typescript
@HostBinding('class.highlighted')
highlighted(): boolean {
    return this.xxx.yyy.zzz.highlighted;
}
```

```html
<!-- 依照 highlighted 這個函式自動綁入 host 的 class -->
<app-root class="highlighted"></app-root>
```

CSS Variable
在父層定義好各種不同類型的 variable, 就可以由上而下的往各 component 傳遞

```scss
:host([theme="theme-default"]) {
  --bg: #a9a9a9;
}

:host([theme="theme-red"]) {
  --bg: red;
}

:host([theme="theme-green"]) {
  --bg: green;
}
```

---

<div class="sk-h2">來看看四散各處的樣式 compile 後的程式碼</div>

這是 styles.scss

```scss
h1 {
  margin: 0;
  margin-bottom: 15px;
}

::ng-deep h1 {
  margin: 0;
}
```

compile 後

```scss
h1 {
  margin: 0;
  margin-bottom: 15px;
}

::ng-deep h1 {
  margin: 0;
}
```

{% blockquote %} - 因為 styles.scss 是一個全域的樣式檔, 所以不會套用到 shadow dom 的樣式封裝

- 即使加了 ::ng-deep 穿透封裝, 也不會有任何作用, 單純的 compile 出來而已

{% endblockquote %}

這是 app-component.scss

```scss
.app-component {
  h1 {
    margin: 0;
    margin-bottom: 15px;
  }

  ::ng-deep h1 {
    margin: 0;
  }
}
```

compile 後

```scss
.app-component[_ngcontent-tpg-c0] h1[_ngcontent-tpg-c0] {
  margin: 0;
  margin-bottom: 15px;
}
.app-component[_ngcontent-tpg-c0] h1 {
  margin: 0;
}
```

{% blockquote %} - 如果是 component style 的話就會被 shadow dom 封裝樣式, 會看到 **[\_ngcontent-xxx-xxx** 這種自動產生的名稱

- 使用 ::ng-deep 目的是使其穿透到下層, 所以不會再套用到 **[\_ngcontent-xxx-xxx**

ps. 這邊兩段的優先權會採取 selector 較為清楚 第一段

{% endblockquote %}

這是 app-component.scss 下的 tile.component.scss

```scss
:host {
  h1 {
    margin: 0;
  }
}

h1 {
  margin: 1px;
}

::ng-deep {
  h1 {
    margin: 2px;
  }
}
```

compile 後

```scss
[_nghost-mhs-c1] h1[_ngcontent-mhs-c1] {
  margin: 0;
}

h1[_ngcontent-mhs-c1] {
  margin: 1px;
}

h1 {
  margin: 2px;
}
```

{% blockquote %} - 寫在 :host 內也是會被 compile 出封裝後的樣式 - 直接寫在 scss 內, 沒有任何嵌套也是會 compile 出封裝後的樣式 - 如果使用 ::ng-deep 來進行穿透就會突破封裝, 進而引起反寫覆蓋全域的風險
{% endblockquote %}

程式碼: <a href="https://codesandbox.io/s/angular-style-component-host-g228y" target="_blank">點我</a>

{% blockquote %}
https://indepth.dev/posts/1469/techniques-to-style-component-host-element-in-angular
{% endblockquote %}
