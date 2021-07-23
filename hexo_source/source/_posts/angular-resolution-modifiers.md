---
title: Angular @Optional, @Self, @SkipSelf, @Host
date: 2021-07-23 14:47:55
tags:
---

我們這次來介紹\"我\"不常用的 inject decorator

@Optional, @Self, @SkipSelf, @Host

<!-- more -->

## Injector 程式面說明 - 微模擬

非實際 Angular 的運作模式, 單純模擬一下 injector 大概的理念

在 Component / Directive 中我們都會這樣子將 service 注入進來

```typescript
export class AppComponent {
    constructor(private logService: LogService) {
}
```

這裡很簡單的假裝有一個 LogService

```typescript
class LogService {
  constructor() {}

  log(message: string): void {
    console.log(message);
  }
}
```

在 Angular 做 compile 的時候大概會將這些 service 放入到某個位置供 `Injector` 做使用

```typescript
const injector = new Injector([LogService, ..., ..., ..., ...]);
```

我們來看一下 Injector 大概的長相

```typescript
class Injector {
  // provider 容器
  private container: Map<any, any> = new Map();

  // 當建立 Injector 的時候將 providers 放進容器內
  constructor(private providers: any[] = []) {
    this.providers.forEach((provider) =>
      this.container.set(provider, new provider())
    );
  }

  // 各 Component / Directive 要使用的時候透過 get 的方式將這些 service 拿出來
  get(service): any {
    const instance = this.container.get(service);

    if (instance == null) {
      throw Error("Not provider found.");
    }

    return instance;
  }
}
```

各 Component / Directive 要使用的時候透過 get 的方式將這些 service 拿出來

```typescript
class Component {
  constructor(private logService: LogService) {
    this.logService.log("I'm here.");
  }
}

new Component(injector.get(LogService));
```

程式碼: <a href="https://codesandbox.io/s/kind-black-ei67k?file=/src/app/injector-demo.ts" target="_blank">點我</a>

{% blockquote %}

- https://www.youtube.com/watch?v=G8zXugcYd7o
  {% endblockquote %}

快速的了解 Injector 以後讓我們來看 Angular 關於 injector 的機制有哪些

# 多級注入器(Hierarchical injectors)

大致上分兩種類型注入:

- Element injector
- Module injector

## Element injector

不是針對 module 去做 providers 設置, 而是在 Component / Directive 中的 meta 做 providers 設置, 這一類都屬於 Element injector

```typescript
@Component({
  ...
  providers: [LogService]
})
export class TestComponent
```

## Module injector

我們常用的 `providedIn: 'root'` 就是屬於 module injector, 另外也可以針對 module 類型的檔案就行 providers 的設置, 這也是 module injector

```typescript @NgModule
providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }];
```

以上兩種 injector 是有先後順序的, 先由 Component / Directive 透過 Element injector 一層層往上找, 都找不到以後就會切換到 Module injector 一層層往上找, 直到噴出錯誤

下圖可以很清楚的看這個 flow

![](pic1.png)

{% blockquote %}

- https://www.youtube.com/watch?v=G8zXugcYd7o
  {% endblockquote %}

以上的\"微\"模擬 Injector 是什麼, 以及 injectors 機制後就可以來介紹本篇的重點 Resolution Modifiers

## @Optional

AppService 不設定 `providedIn`

```typescript AppService
@Injectable()
export class AppService {}
```

在 Component / Directive 若要使用 AppService, 必須要在 meta 上定義 providers

```typescript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AppService]
})
export class AppComponent {
    constructor(private appService: AppService) {}
```

若 Component / Directive 忘了定義 providers 就使用的話會出現錯誤, 這時候可以用 `@Optional` 將這個 provider 設位選用, 也就是在 compile 的時候不會屬於必須

```typescript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AppService]
})
export class AppComponent {
    constructor(@Optional private appService: AppService) {
        if (this.appService) {
            // ...
        }
    }
```

## @Self

依照 Hierarchical injectors 機制, 會在 Component / Directive 本身的 providers 開始往上尋找直到 root.

若只要查找 Component / Directive 本身的 providers, 就可以使用 @Self, 找不到就直接報錯

```typescript
@Component({
  selector: "app-card-body",
  templateUrl: "./card-body.component.html",
  styleUrls: ["./card-body.component.scss"]
  providers: [CardService],
})
export class CardBodyComponent {
  constructor(@Self() private cardService: CardService) {}
```

{% blockquote %}
這些 Resolution modifiers 可以組合使用 `@Optional() @Self()`
{% endblockquote %}

## @SkipSelf

依照 Hierarchical injectors 中的機制, 會在 Component / Directive 本身的 providers 開始往上尋找直到 root.

若要從上一層開始到 root, 也就是跳過自身這層, 就可以使用 @SkipSelf

```typescript
@Component({
  selector: "app-card-body",
  templateUrl: "./card-body.component.html",
  styleUrls: ["./card-body.component.scss"]
  providers: [CardService],
})
export class CardBodyComponent {
  constructor(@SkipSelf() private cardService: CardService) {}
```

## @Host

這個是最為特別的一個 modifiers, 他不會遵循完整的 Hierarchical injectors 機制, 他只會查找 element 結構的範圍

下面可以看到 CardComponent 中的 template 結構, 包含 `app-card-body` 以及從上層來的 `ng-content`

- `app-card` 內含 `app-card-body`
- `app-card` 包含上層來的 `app-card-test`

```html CardComponent
<div>
  <h3>Card!</h3>
  <app-card-body></app-card-body>
  <ng-content></ng-content>
</div>
```

`app` 使用 `app-card` 並且傳入 `app-card-test` 進去

```html 上層 template
<app-card>
  <app-card-test></app-card-test>
</app-card>
```

`app-card` 設置了 CardService

```typescript CardComponent
@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  providers: [CardService]
})
export class CardComponent implements OnInit {
  constructor(
    private cardService: CardService
  ) {}
```

`app-card` 內含的 `app-body` 如果使用了 `@Host` 是找不到 `CardService` 的, 因為 `@Host` 會看到自己本身, 和 `@Self` 行為一樣要定義自身的 `providers` 才行

```typescript CardBodyComponent
@Component({
  selector: "app-card-body",
  templateUrl: "./card-body.component.html",
  styleUrls: ["./card-body.component.scss"]
})
export class CardBodyComponent implements OnInit {
  constructor(@Optional() @Host() private cardService: CardService) {}
```

`app` 是將 `app-card-test` 傳到 `app-card` 裡面, 所以透過 `ng-content` 會使 `app-card-test` 隸屬於 `app-card`, 而不是被定義為 `app-card` 下面包含的內容, 隸屬的意思可以看做就是這個 `app-card` 本身的實例, 所以 `@Host` 等同於 `app-card`, 這時候就可以使用 `app-card` 提供的 `CardService` 了

```typescript CardTestComponent
@Component({
  selector: "app-card-test",
  templateUrl: "./card-test.html",
  styleUrls: ["./card-test.scss"]
})
export class CardTestComponent implements OnInit {
  constructor(
    @Host() private cardService: CardService,
  ) {}
```

# 總結

Angular 提供這四個 modifiers, 可以在不同情境中精準的設定出欲使用 provider, 但是一般的情況比較少會用到, 有個概念就好, 這樣在觀看網上的技術文章比較可以融會貫通, 而不是又多了一些看不懂的內容.

{% blockquote %}

- https://www.youtube.com/watch?v=G8zXugcYd7o
- https://angular.io/guide/hierarchical-dependency-injection
- https://angular.tw/guide/hierarchical-dependency-injection
- https://www.youtube.com/watch?v=uVGnsmm9g-I&t=14s
  {% endblockquote %}
