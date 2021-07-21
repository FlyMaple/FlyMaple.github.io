---
title: FormControl 值的流向與變化
date: 2021-07-20 15:35:47
tags:
---

你知道 value 在 FormControl 中是怎麼流動的嗎? 讓我們一步步的追蹤值的流向與變化吧

<!-- more -->

FormControl / FormGroup 都是繼承自 AbstractControl, 只是各自實作

本篇會先介紹 AbstractControl 中的 updateValueAndValidity, 並帶入大量的範例來幫助吸收

<div class="sk-h1">updateValueAndValidity 解析</div>

下面這一小段就是今天的主題, 會在程式中做分段說明, 並著重於今天的主題

```typescript
updateValueAndValidity(opts: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    // 更新 FormControl 的狀態
    this._setInitialStatus();
    // 更新 FormControl 的值
    this._updateValue();

    // FormControl 在啟用的狀態才會去相關的驗證
    if (this.enabled) {
        this._cancelExistingSubscription();
        (this as {errors: ValidationErrors | null}).errors = this._runValidator();
        (this as {status: string}).status = this._calculateStatus();

        if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(opts.emitEvent);
        }
    }

    // [重點] emitEvent 影響 valueChanges & statusChanges
    if (opts.emitEvent !== false) {
        (this.valueChanges as EventEmitter<any>).emit(this.value);
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    // [重點] onlySelf 影響上層 FormControl
    if (this._parent && !opts.onlySelf) {
        this._parent.updateValueAndValidity(opts);
    }
}
```

經由上面的註解說明, 讓我們把程式焦點重新集中於以下內容

**值的更新 => 事件的觸發 => 上層更新觸發**

```typescript
updateValueAndValidity(opts: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    ...

    // 更新 FormControl 的值
    this._updateValue();

    ...

    // [重點] emitEvent 影響 valueChanges & statusChanges
    if (opts.emitEvent !== false) {
        (this.valueChanges as EventEmitter<any>).emit(this.value);
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    // [重點] onlySelf 影響上層 FormControl
    if (this._parent && !opts.onlySelf) {
        this._parent.updateValueAndValidity(opts);
    }
}
```

原始碼: <a href="https://github.com/angular/angular/blob/d7e9d8746a47c689fd8014f3913c47c4d6692709/packages/forms/src/model.ts#L644" target="_blank">點我</a>

<div class="sk-h1">FormControl & FormGroup</div>

FormGroup 可以乘載 FormControl, 理論上在 FormGroup 中的 setValue/patchValue 是輪巡其下 FormControl 的 setValue/patchValue 並加上一些本身的邏輯

<div class="sk-h2">setValue</div>

```typescript FormControl.setValue
setValue(value: any, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
} = {}): void {
    // 更新值
    (this as {value: any}).value = this._pendingValue = value;

    ...

    // call updateValueAndValidity
    this.updateValueAndValidity(options);
}
```

原始碼: <a href="https://github.com/angular/angular/blob/d7e9d8746a47c689fd8014f3913c47c4d6692709/packages/forms/src/model.ts#L1089" target="_blank">點我</a>

```typescript FormGroup.setValue
setValue(value: {[key: string]: any}, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    ...

    // 輪巡 FormControl setValue
    Object.keys(value).forEach(name => {
        ...
        this.controls[name].setValue(value[name], {onlySelf: true, emitEvent: options.emitEvent});
    });

    // updateValueAndValidity
    this.updateValueAndValidity(options);
}
```

原始碼: <a href="https://github.com/angular/angular/blob/d7e9d8746a47c689fd8014f3913c47c4d6692709/packages/forms/src/model.ts#L1427" target="_blank">點我</a>

{% blockquote %}
看起來和我們理解的差不多, 那我們繼續往下
{% endblockquote %}

<div class="sk-h2">patchValue</div>

查閱原始碼發現 FormControl.patchValue 就只是多一層, 讓整體感覺都是使用一樣的開發模式

```typescript FormControl.patchValue
patchValue(value: any, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
} = {}): void {
    this.setValue(value, options);
}
```

原始碼: <a href="https://github.com/angular/angular/blob/d7e9d8746a47c689fd8014f3913c47c4d6692709/packages/forms/src/model.ts#L1112" target="_blank">點我</a>

{% blockquote %}
什麼都不做就轉呼叫到 FormControl.setValue 了
{% endblockquote %}

```typescript FormGroup.patchValue
patchValue(value: {[key: string]: any}, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    // 輪巡 FormControl setValue
    Object.keys(value).forEach(name => {
      if (this.controls[name]) {
        this.controls[name].patchValue(value[name], {onlySelf: true, emitEvent: options.emitEvent});
      }
    });

    // updateValueAndValidity
    this.updateValueAndValidity(options);
}
```

原始碼: <a href="https://github.com/angular/angular/blob/d7e9d8746a47c689fd8014f3913c47c4d6692709/packages/forms/src/model.ts#L1470" target="_blank">點我</a>

{% blockquote %}
FormGroup.patchValue 基本上和 FormGroup.setValue 一模一樣, 少了一些全域的邏輯而以
{% endblockquote %}

<div class="sk-h2">讓我們整理一下上面所理解到的</div>

順序: patchValue -> setValue -> updateValueAndValidity

<div class="sk-h1">範例1</div>

範例中有兩個 FormControl, firstName and lastName, 在這個範例中只會單純做 `setValue`, 並搭配 `emitEvent`、`onlySelf`

訂閱 `valueChanges` 監看值的變化

```typescript
this.firstName = new FormControl();
this.lastName = new FormControl();

this.firstName.valueChanges.subscribe((value) => {
  console.log(`[firstName valueChange] firstName: ${value}`);
});

this.lastName.valueChanges.subscribe((value) => {
  console.log(`[lastName valueChange] lastName: ${value}`);
});
```

1. 設置 firstName => Skye
2. 設置 firstName => Kai, emitEvent => false
3. 設置 lastName => Wu
4. 設置 lastName => Ah, emitEvent => false

```typescript
console.log(
  `[Global] firstName: ${this.firstName.value}, lastName: ${this.lastName.value}`
);

this.firstName.setValue("Skye");
console.log(
  `[Global] firstName: ${this.firstName.value}, lastName: ${this.lastName.value}`
);

this.firstName.setValue("Kai", { emitEvent: false });
console.log(
  `[Global] firstName: ${this.firstName.value}, lastName: ${this.lastName.value}`
);

this.lastName.setValue("Wu");
console.log(
  `[Global] firstName: ${this.firstName.value}, lastName: ${this.lastName.value}`
);

this.lastName.setValue("Ah", { emitEvent: false });
console.log(
  `[Global] firstName: ${this.firstName.value}, lastName: ${this.lastName.value}`
);

console.log("--");

console.log(
  `firstName parent: ${this.firstName.parent}, lastName parent: ${this.lastName.parent}`
);
```

這裡可以先自己模擬一下, 會印出那些資訊, 其順序又為何

```bash
# 先印出初始值
[Global] firstName: null, lastName: null
# this.firstName.setValue("Skye");
[firstName valueChange] firstName: Skye
[Global] firstName: Skye, lastName: null
# this.firstName.setValue("Kai", { emitEvent: false });
[Global] firstName: Kai, lastName: null
# this.lastName.setValue("Wu");
[lastName valueChange] lastName: Wu
[Global] firstName: Kai, lastName: Wu
# this.lastName.setValue("Ah", { emitEvent: false });
[Global] firstName: Kai, lastName: Ah
--
# 因為沒有 FormGroup, 所以 parent 為空, 也就不會再根據 onlySelf 呼叫 parent.updateValueAndValidity
firstName parent: null, lastName parent: null
```

{% blockquote %}
這個範例非常簡單, 就是 emitEvent 有無的差異, 會影響到 updateValueAndValidity 中的 emit 事件
{% endblockquote %}

<div class="sk-h1">範例2</div>

這個範例之後都以 FormGroup + FormControl 來講解

```typescript
this.firstName = new FormControl();
this.lastName = new FormControl();

this.formGroup = new FormGroup({
  firstName: this.firstName,
  lastName: this.lastName,
});
```

訂閱 FormGroup, 訂閱 FormControl 並印出當下 FormGroup 值的變化

```typescript
this.formGroup.valueChanges.subscribe((value) => {
  console.log("[formGroup valueChanges]", value);
});

this.firstName.valueChanges.subscribe((value) => {
  console.log(
    "[firstName valueChange] firstName",
    value,
    ", [formGroup]",
    this.formGroup.value
  );
});

this.lastName.valueChanges.subscribe((value) => {
  console.log(
    "[lastName valueChange] lastName",
    value,
    ", [formGroup]",
    this.formGroup.value
  );
});
```

1. 設置 firstName => Skye
2. 設置 lastName => Wu

```typescript
this.firstName.setValue("Skye");

this.lastName.setValue("Wu");
```

這裡可以先自己模擬一下, 會印出那些資訊, 其順序又為何

```bash
# this.firstName.setValue("Skye");
# firstName 改變了, 但是還未透過 parent.updateValueAndValidity 做上層更新, 所以 FormGroup 這個時間還不會變化
[firstName valueChange] firstName Skye , [formGroup] {firstName: null, lastName: null}
# 當 firstName 變化完整結束後會執行 parent.updateValueAndValidity, 上層才會更新值
[formGroup valueChanges] {firstName: "Skye", lastName: null}
# this.lastName.setValue("Wu");
# lastName 改變了, 但是還未透過 parent.updateValueAndValidity 做上層更新, 所以 FormGroup 這個時間還不會變化
[lastName valueChange] lastName Wu , [formGroup] {firstName: "Skye", lastName: null}
# 當 lastName 變化完整結束後會執行 parent.updateValueAndValidity, 上層才會更新值
[formGroup valueChanges] {firstName: "Skye", lastName: "Wu"}
```

{% blockquote %}
這個範例開始著重於 FormControl value 變化的時間點, 以及 FormGroup value 變化的時間點
{% endblockquote %}

<div class="sk-h1">範例3</div>

延續範例 2, 將 emitEvent、onlySelf 放進來

```typescript
this.formGroup.valueChanges.subscribe((value) => {
  console.log("[formGroup valueChanges]", value);
});

this.firstName.valueChanges.subscribe((value) => {
  console.log(
    "[firstName valueChange] firstName",
    value,
    ", [formGroup]",
    this.formGroup.value
  );
});

this.lastName.valueChanges.subscribe((value) => {
  console.log(
    "[lastName valueChange] lastName",
    value,
    ", [formGroup]",
    this.formGroup.value
  );
});

this.firstName.setValue("Skye", { onlySelf: true });

this.lastName.setValue("Wu", { emitEvent: false });

console.log("[formGroup valueChanges]", this.formGroup.value);

console.log("--");
console.log("reset |");

this.formGroup.setValue(
  {
    firstName: null,
    lastName: null,
  },
  { emitEvent: false }
);

console.log("[formGroup valueChanges]", this.formGroup.value);

this.formGroup.setValue(
  {
    firstName: null,
    lastName: null,
  },
  { emitEvent: false }
);

this.formGroup.setValue({
  firstName: "Skye",
  lastName: "Wu",
});
```

這裡可以先自己模擬一下, 會印出那些資訊, 其順序又為何

```bash
# this.firstName.setValue("Skye", { onlySelf: true });
# firstName 改變了, 但是給了 onlySelf: true, 所以不會更新上層
[firstName valueChange] firstName Skye , [formGroup] {firstName: null, lastName: null}
# this.lastName.setValue("Wu", { emitEvent: false });
# lastName 改變了, 但是給了 emitEvent: false, 所以不會觸發 updateValueAndValidity 中的 emit
# 所以不會值行 lastName valueChange 訂閱事件
# 當 lastName 變化完整結束後會執行 parent.updateValueAndValidity, 上層才會更新值
[formGroup valueChanges] {firstName: "Skye", lastName: "Wu"}
--
reset |
# 重設
[formGroup valueChanges] {firstName: null, lastName: null}
# firstName 改變了, 但是還未透過 parent.updateValueAndValidity 做上層更新, 所以 FormGroup 這個時間還不會變化
[firstName valueChange] firstName Skye , [formGroup] {firstName: null, lastName: null}
# lastName 改變了, 但是還未透過 parent.updateValueAndValidity 做上層更新, 所以 FormGroup 這個時間還不會變化
[lastName valueChange] lastName Wu , [formGroup] {firstName: null, lastName: null}
# 當 FormGroup setValue 完整結束後會執行才會執行本身的 updateValueAndValidity, 相關的值才會更新, 以及事件的觸發
[formGroup valueChanges] {firstName: "Skye", lastName: "Wu"}
```

<div class="sk-h1">範例4</div>

這個範例是最為複雜的一個例子, 建議拿出紙筆稍微紀錄個步驟的變化, 因為有兩個變化題互相交互的問題

```typescript
this.formGroup.valueChanges.subscribe((value) => {
  console.log("[formGroup valueChanges]", value);
});

this.firstName.valueChanges
  // 這裡做個變化題: 在 firstName 更新以後, 自動變更 firstName 為 f_Kai
  .pipe(tap(() => this.firstName.setValue("f_Kai", { emitEvent: false })))
  .subscribe((value) => {
    console.log(
      "[firstName valueChange] firstName",
      value,
      ", [formGroup]",
      this.formGroup.value
    );
  });

this.lastName.valueChanges
  // 這裡做個變化題: 在 lastName 更新以後, 自動變更 firstName 為 l_Kai
  .pipe(tap(() => this.firstName.setValue("l_Kai")))
  .subscribe((value) => {
    console.log(
      "[lastName valueChange] lastName",
      value,
      ", [formGroup]",
      this.formGroup.value
    );
  });

console.log("[formGroup valueChanges]", this.formGroup.value);

this.formGroup.setValue({
  firstName: "Skye",
  lastName: "Wu",
});
```

這裡可以先自己模擬一下, 會印出那些資訊, 其順序又為何

```bash
# 初始值
[formGroup valueChanges] {firstName: null, lastName: null}
# firstName 改變了, 會先觸發 valueChange, 在整個流程尚未結束前會碰到一個變化題:
[firstName valueChange] firstName Skye , [formGroup] {firstName: "f_Kai", lastName: null}
# this.firstName.setValue("f_Kai", { emitEvent: false }) 值變, 但是不會觸發 valueChange
# 因為值變了, 所以現在 FormGroup 已被更新, 會是 {firstName: "f_Kai", lastName: null}

# firstName 更新完了以後換 listName
# listName 更新完了以後會碰到另一個變化題(2):
# this.firstName.setValue("l_Kai")
# 所以會先跑 firstName 的值變與 valueChange
# 然後這裡又會碰到 firstName 的變化題(1):
# this.firstName.setValue("f_Kai", { emitEvent: false }) 值變, 但是不會觸發 valueChange
# 所以這行的 valueChange 會是 (2) 所觸發的
[firstName valueChange] firstName l_Kai , [formGroup] {firstName: "f_Kai", lastName: "Wu"}
# 因為 (2) 的變化題完整結束後會執行 parent.updateValueAndValidity, 上層會更新值
[formGroup valueChanges] {firstName: "f_Kai", lastName: "Wu"}

# lastName 變化題結束以後, 就會回到原先的 valueChanges
[lastName valueChange] lastName Wu , [formGroup] {firstName: "f_Kai", lastName: "Wu"}
# 最後 FormGroup setValue 完整結束後就會觸發回 FormGroup valueChanges
[formGroup valueChanges] {firstName: "f_Kai", lastName: "Wu"}
```

<div class="sk-h1">範例5</div>

做一個延遲值變的變化題

```typescript
this.formGroup.valueChanges.subscribe((value) => {
  console.log("[formGroup valueChanges]", value);
});

this.firstName.valueChanges
  .pipe(
    switchMap(() => {
      return timer(1000).pipe(
        take(1),
        tap(() =>
          this.lastName.setValue("Zue", {
            emitEvent: false,
            onlySelf: true,
          })
        )
      );
    })
  )
  .subscribe((value) => {
    console.log(
      "[firstName valueChange] firstName",
      value,
      ", [formGroup]",
      this.formGroup.value
    );
  });

this.lastName.valueChanges.subscribe((value) => {
  console.log(
    "[lastName valueChange] lastName",
    value,
    ", [formGroup]",
    this.formGroup.value
  );
});

console.log("[formGroup]", this.formGroup.value);

this.formGroup.setValue({
  firstName: "Skye",
  lastName: "Wu",
});
```

這裡可以先自己模擬一下, 會印出那些資訊, 其順序又為何

```bash
# 初始值
[formGroup] {firstName: null, lastName: null}
# firstName 值變了, 但是在 valueChange 做一個延遲變化, 所以不會看到 valueChange 的 log

# firstName 更新完以後換 lastName, 但是還未透過 parent.updateValueAndValidity 做上層更新, 所以 FormGroup 這個時間還不會變化
[lastName valueChange] lastName Wu , [formGroup] {firstName: null, lastName: null}
# FormGroup setValue 完整結束後會執行 updateValueAndValidity, 會觸發 valueChanges
[formGroup valueChanges] {firstName: "Skye", lastName: "Wu"}
# 1秒後變化題結束, 但是變化題中帶有 {onlySelf: true, emitEvent: false}
# 所以只會偷偷的變更 firstName 的值, 且不會發出任何 emit, 也不會通知 parent 做 updateValueAndValidity
# 變化題結束後原始的 firstName valueChanges 才會出現
[firstName valueChange] firstName 0 , [formGroup] {firstName: "Skye", lastName: "Wu"}

# 如果這時候再執行 formGroup.updateValueAndValidity() 會看到值為 {firstName: "Skye", lastName: "Wu"}
# 因為 Zue 這個值是被變化題所更新, 但是因為設定了 onlySelf: true, 所以不會更新到 parent
# 現在手動值行 formGroup.updateValueAndValidity, 就會將這個值更新進來了
```

<div class="sk-h1">總結</div>

範例稍微複雜了一些, 但是如果真的理解 updateValueAndValidity 其中的邏輯順序, 就可以融會貫通 FormGroup / FormControl 變化的時間點.

在較複雜的多欄位交互中可能因為使用了大量的 setValue + valueChanges, 導致出現雷點或鬼打牆的問題, 通常就是這篇提到的邏輯所導致的.

欄位交互的方式很多種, 如果習慣用 Angular form 的開發者, 還是稍微理解一下這些流向會比較好唷.

全範例: <a href="https://codesandbox.io/s/form-control-value-flow-rhn0t" target="_blank">點我</a>

---

本篇起源是源自 https://blog.kevinyang.net/2020/04/20/angular-form-valuechanges/

其範例較為精簡, 很推薦唷!

{% blockquote %}

- https://angular.tw/api/forms/FormControl
- https://blog.kevinyang.net/2020/04/20/angular-form-valuechanges/
  {% endblockquote %}
