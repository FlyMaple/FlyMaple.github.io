---
title: Bitwise 狀態設計模式
date: 2021-07-26 11:06:26
tags:
---

如何用 bitwise 來做到 True / False 這類的邏輯控制呢?

<!-- more -->

# 常見的設計模式

在設計各種控制項/權限等等, 有 True / False 這兩種狀態的時候, 直覺會設計成 key: True/False

也就是如下

```typescript
const response = {
  RankA: true,
  RankB: false,
  RankC: true,
};

// 判斷
response.RankA && response.RankB;

// 變更
response.RankA = false;
response.RankB = true;

// 變更
Object.assign(response, {
  RankA: false,
  RankB: true,
});
```

普遍是這樣設計, 其實也沒什麼太大的問題, 但是我們來看情況比較複雜的時候

當項目擴大到 26 個, 延續這種行為模式會讓 response 越來越肥, 但是也是僅此而已

```typescript
const response = {
    "RankA": true,
    "RankB": false,
    "RankC": true,
    ...
    "RankZ": true,
};
```

如果把這種設計模式改為 bitwise 模式, 會需要更多的定義以及運算

- Flag bit shift define
- Related bitwise calculate
- Complexity level up

```typescript
enum Flag {
    RankA = 0,
    RankB = 1,
    RankC = 2,
    ...
    RankZ = 25,
};

class Bitwise {
    constructor(private value) {}

    isOneOf(flagsBit) {
        return flagsBit.some((flagBit) => Boolean(this.value & (1 << flagBit)))
    }

    isAllOf(flagsBit) {
        return flagsBit.every((flagBit) => Boolean(this.value & (1 << flagBit)))
    }

    set(flags) {
      if (Array.isArray(flags)) {
        this.value = this.value | flags.reduce((prev, curr) => prev + (1 << curr), 0);
        return ;
      }

      this.value = this.value | (1 << flags);
    }
}

// 不再是一大堆的 key: boolean, 看著很阿砸
// 用一個十進制數字來表示所有的狀態
const response = 33554433;

const bitwise = new Bitwise(response);

// 判斷
bitwise.isAllOf([Flag.RankA, Flag.RankB]);

// 變更
bitwise.set(Flag.RankA);
bitwise.set(Flag.RankB);

// 變更
bitwise.set([Flag.RankA, Flag.RankB]);
```

| Z   |  Y  |  X  | ... | ... | A   |
| --- | :-: | :-: | :-: | :-: | --- |
| 1   |  0  |  0  | ... | ... | 1   |

{% blockquote %}
33554433 二進制如上, 代表著 A Z 是 True 的
{% endblockquote %}

{% blockquote %}
雖然複雜度是直線往上, 但是整體看起來卻是比較輕鬆自在?

一個 10 進位數字就可以表示 n 種狀態!

- 不會一堆的 key: boolean 在整個專案出現
- 採用 enum 定義模式提高辨識度
- 使用操作性文字來取代 = true; = false; = true; = false; = true; = false;
  {% endblockquote %}

程式碼: <a href="https://codepen.io/flymaple/pen/NWjvoeP?editors=0011" target="_blank">點我</a>

# 案例 1

如果在系統中權限劃分如下:

### 頁面權限

- Read: 只可讀
- Write: 可以存取
- Admin: 管理者

### Menu 權限

- Collaborate: 協同作業
- Enterprise_Resource: 企業資源
- Resource_Management: 資源管理
- Meeting_Management: 會議管理
- Machine_Information_Dashboard: 機台資訊儀表板
- Manufacturing_Order_Information_Dashboard: 製令資訊儀表板
- Machine_Status_Report: 機台狀態報表
- List_Of_Manufacturing_Orders: 製令列表
- Dynamic_Scheduling: 動態排程
- Scheduled_View: 排程檢視
- Schedule_Setting: 排程設定

### 情境

有一個 RESTful 提供權限, 會回傳各項分類的的十進制資料

![](demo1.png)

Demo: <a href="https://codesandbox.io/s/flags-with-decimal-and-binary-n42np" target="_blank">點我</a>

各權限細節

![](excel1.png)

Excel: <a href="https://docs.google.com/spreadsheets/d/1PvXutorMykXc0jp1ywHimvJGlTUIOGXc2ArfJYLd3lM/edit#gid=0" target="_blank">點我</a>

{% blockquote %}
這個檔案其時就是個 bitwise 計算機, 輸入十進制即可顯示有哪些權限
{% endblockquote %}

#### 權限定義

```typescript
enum CommonPriv {
  Read = "Read",
  Write = "Write",
  Admin = "Admin",
}

enum MenuPriv {
  Collaborate = "Collaborate",
  EnterpriseResource = "EnterpriseResource",
  ResourceManagement = "ResourceManagement",
  MeetingManagement = "MeetingManagement",
  MachineInformationDashboard = "MachineInformationDashboard",
  ManufacturingOrderInformationDashboard = "ManufacturingOrderInformationDashboard",
  MachineStatusReport = "MachineStatusReport",
  ListOfManufacturingOrders = "ListOfManufacturingOrders",
  DynamicScheduling = "DynamicScheduling",
  ScheduledView = "ScheduledView",
  ScheduleSetting = "ScheduleSetting",
}
```

{% blockquote %}
把相關全項常數化
{% endblockquote %}

#### 定義各項權限的 bit 位移量

```typescript
// 位移數
const COMMON_PRIV = {
  [CommonPriv.Read]: 0,
  [CommonPriv.Write]: 1,
  [CommonPriv.Admin]: 2,
};

// 位移數
const MENU_PRIV = {
  [MenuPriv.Collaborate]: 0,
  [MenuPriv.EnterpriseResource]: 1,
  [MenuPriv.ResourceManagement]: 2,
  [MenuPriv.MeetingManagement]: 3,
  [MenuPriv.MachineInformationDashboard]: 4,
  [MenuPriv.ManufacturingOrderInformationDashboard]: 5,
  [MenuPriv.MachineStatusReport]: 6,
  [MenuPriv.ListOfManufacturingOrders]: 7,
  [MenuPriv.DynamicScheduling]: 8,
  [MenuPriv.ScheduledView]: 9,
  [MenuPriv.ScheduleSetting]: 10,
};
```

#### RESTful

```typescript
// 亂數產生權限(用於測試)
function randomPrivileges(privielegs: {
  [key: string]: number;
}): PrivilegeFlag[] {
  const privKeys = Object.keys(privielegs);

  return sampleSize(
    privKeys,
    Math.floor(Math.random() * privKeys.length + 1)
  ) as PrivilegeFlag[];
}

// 因為我們是從"位移量"來做初始定義, 所以這裡會將各項"位移量"轉為"二進制"以後進行相加 or(|) 後以"十進制"輸出
function calculatePrivilege(privileges, _privileges: PrivilegeFlag[]): number {
  return _privileges.reduce((prev, curr) => prev + (1 << privileges[curr]), 0);
}

//
export function getPrivileges() {
  // 由 session or request header 等任何方式去判斷這個 request 的權限為何
  // 以下直接用亂數的方式產生權限

  // 這裡不考慮合不合理, 直接亂數產生權限組合
  // [Read, Admin, ]
  const commonPrivs = randomPrivileges(COMMON_PRIV);

  // 這裡不考慮合不合理, 直接亂數產生權限組合
  // [Collaborate, DynamicScheduling, ScheduleSetting,]
  const menuPrivs = randomPrivileges(MENU_PRIV);

  return {
    Common: calculatePrivilege(COMMON_PRIV, commonPrivs),
    Menu: calculatePrivilege(MENU_PRIV, menuPrivs),
  };
}
```

程式碼: <a href="https://codesandbox.io/s/flags-with-decimal-and-binary-n42np" target="_blank">點我</a>

## 案例 2

#### 權限卡控

讀/寫/管理者; 各項選單權限;

在後端的 RESTful 對應到的 core function, 也是會需要卡權限

我們可以利用採用 decorate 的方式來對這些 function 做包裝

`getSchedule` 和 `updateSchedule` 分別對應 `GET` 和 `PUT`, 這兩個 function 如果都要卡使用權限的話, 大概的長相如下

- 有個 Service 來檢查目前這個 request 是否有權限來使用
- 有個 Decorate 來設定這些 function 需要哪那些權限

```typescript
class PrivilegeService {
  static authorize(privileges: PrivilegeFlag[]): boolean {
    // 這裡用來檢查是否有這些權限 allOf or OneOr ...etc
    return true;
  }
}

// decorate
function PrivilegeAuthorize(
  _func: Function,
  privileges: PrivilegeFlag[]
): void {
  const isAuthorized = PrivilegeService.authorize(privileges);

  if (isAuthorized !== true) {
    throw Error("403");
  }

  _func();
}

function getSchedule(): any[] {
  return [];
}

function updateSchedule(): void {
  // update db
}

// [GET]
PrivilegeAuthorize(getSchedule, [CommonPriv.Read]);

// [PUT]
PrivilegeAuthorize(updateSchedule, [CommonPriv.Write]);
```

# 總結

二進制長度開到 40 (1111111111111111111111111111111111111111), 十進制會是 1099511627775, 算是很足夠使用了

因為是 1:1 對應, 所以每一項都有其邏輯判斷的作用, 當然也可以做複合判斷用

優點是後端只提供 decimal number, 在自家的前端或者 mobile APP 需要判斷權限, 或是第三方需要與自身系統對接都是用同一套 bitwise 去將之解構

{% blockquote %}
整體複雜度直接提高不只一個檔次, 但是換來了以下幾個好處

1. 定義宣告讓整體結構清晰好讀

2. 擴充性因第 1 點而得到提升

3. 減少大量的 json 內容

4. ~~炫炮?~~

{% endblockquote %}

程式碼: <a href="https://codesandbox.io/s/flags-with-decimal-and-binary-n42np" target="_blank">點我</a>

---

{% blockquote %}

- https://www.rapidtables.com/convert/number/decimal-to-binary.html
- https://carterchen247.medium.com/%E4%B8%80%E4%BB%B6intent%E6%95%99%E6%88%91%E7%9A%84%E4%BA%8B-bitwise-operation-dd3a388ae34e
  {% endblockquote %}
