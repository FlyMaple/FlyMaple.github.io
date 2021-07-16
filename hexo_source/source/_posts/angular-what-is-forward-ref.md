---
title: Angular forwardRef 所謂何事?
date: 2021-07-16 17:23:50
tags:
---

在 Angular 中常常會看到各式各樣的教學文, 其中有個字眼不會常常看, 也不會常常寫, 那就是 forwardRef.

<!-- more -->

通常這種東西不是一知半解就是複製貼上, 因緣際會之下好像稍微理解了一點, 下面來寫些紀錄以免忘記了.

<div class="sk-h1">各式各樣的使用場景</div>

常見的使用情境如下, 但是卻會看到 forwardRef 不斷的出現

<div class="sk-h4">Inject token</div>
```typescript
constructor(@Inject(forwardRef(() => Lock)) lock: Lock) {
```

<div class="sk-h4">ControlValueAccessor 之 NG_VALUE_ACCESSOR</div>
```typescript
@Component({
    selector: 'byte-input-field',
    templateUrl: './byte-input-field.component.html',
    styleUrls: ['./byte-input-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ByteInputFieldComponent),
            multi: true,
        },
    ],
})
export class ByteInputFieldComponent implements OnInit {
```

<div class="sk-h1">模擬個情境</div>

這裡我們先忘記上面所說的東西

<div class="sk-h4">以常見的 function 舉例</div>

如果有一個 function Accessor, 他需要傳入一個值

```typescript
function Accessor(something) {}

// Uncaught ReferenceError: InputField is not defined
Accessor(InputField);

const InputField = {};
```

{% blockquote %}
在第 6 行的地方會使用到 InputField 這個變數, 但是尚未定義所以報錯了, 這裡不會自動提權的原因我猜想是會"直接"被用於編譯
{% endblockquote %}

如果把 InputField 丟在最上方, 就不會有未定義的情況發生

```typescript
const InputField = {};

function Accessor(something) {}

Accessor(InputField);
```

{% blockquote %}
但這是理想, 也是在單一檔案中很好控制的時候; 在使用各式各樣框架的時候, 不見得你會理解他的編譯順序與核心邏輯, 這種問題就會有機率的發生
{% endblockquote %}

<div class="sk-h4">以較複雜的 class 舉例</div>

class Accessor 需要接收外部來的 class, 並且在 toString 中 new 出這個外部 class 並且回傳 name attribute.

```typescript
class Accessor {
  useComponent;

  constructor(useComponent) {
    this.useComponent = useComponent;
  }

  toString() {
    return new this.useComponent().name;
  }
}

// Uncaught ReferenceError: Cannot access 'InputField' before initialization
const inputFieldAccessor = new Accessor(InputField);

class InputField {
  name = "InputField";

  constructor() {}
}
```

{% blockquote %}
這裡發生的錯誤和 function 舉例一樣, 都是為定義前使用
{% endblockquote %}

<div class="sk-h1">修正這些情境</div>

以閉包(Closure)參照的概念來修正這個報錯的狀況

<div class="sk-h4">function</div>

```typescript
function forwardRef(forwardRefFn) {
  return forwardRefFn;
}

function Accessor(something) {}

Accessor(forwardRef(() => InputField));
```

{% blockquote %}
神奇的事情發生了, 運用閉包的特性, 在呼叫 Accessor 的時候並不會直接編譯到 InputField, 而是先判讀這是一個 function, 等到實際用到 InputField 的時候才是以閉包的方式取回來
{% endblockquote %}

<div class="sk-h4">class</div>

這邊將 class Accessor 稍微修改一下, 讓他可以接收 class 或是 function

```typescript
function forwardRef(forwardRefFn) {
  return forwardRefFn;
}

class Accessor {
  useComponent;

  constructor(useComponent) {
    this.useComponent = useComponent;
  }

  toString() {
    let comp;

    if (this.useComponent instanceof Function) {
      comp = new (this.useComponent())();
    } else {
      comp = new this.useComponent();
    }

    return comp.name;
  }
}

new Accessor(forwardRef(() => InputField));
new Accessor(forwardRef(() => TextArea));

class InputField {
  name = "InputField";

  constructor() {}
}

class TextArea {
  name = "TextArea";

  constructor() {}
}
```

{% blockquote %}
這邊的錯誤也消失了, 一樣是運用閉包的效果
{% endblockquote %}

<div class="sk-h1">讓我們回到正題</div>

以上這些例子都了解以後在來看這些例子就很清楚啦~

其實就是在 Angular 裡面, 在這些地方需要傳入 class 的時候會發生尚未定義的問題, 所以才用閉包的方式來處理

你看~ 是不是一通百通了呢

```typescript
forwardRef(() => Lock);
forwardRef(() => ByteInputFieldComponent);
```

程式碼: <a href="https://codepen.io/flymaple/pen/dyvKGLN" target="_blank">點我</a>

{% blockquote %}

- https://indepth.dev/posts/1133/what-is-forwardref-in-angular-and-why-we-need-it
- https://koding.work/use-forwardref-to-resolve-bug-in-angular/
- https://github.com/angular/angular/blob/b5ab7aff433a67cddaa55e621d17b1a1b07b57c2/packages/forms/src/directives/reactive_directives/form_control_directive.ts
- https://github.com/angular/angular/blob/b5ab7aff433a67cddaa55e621d17b1a1b07b57c2/packages/forms/src/directives/reactive_directives/form_control_name.ts
- https://github.com/angular/angular/blob/b5ab7aff433a67cddaa55e621d17b1a1b07b57c2/packages/forms/src/directives/ng_model.ts
  {% endblockquote %}
