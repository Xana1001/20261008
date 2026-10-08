---
title: 選擇題測驗卷網站講義（學生版）.md

---

---
title: 選擇題測驗卷網站講義（學生版）

---

---
title: 選擇題測驗卷網站講義（學生版）
tags: [114程式設計與實習_上學期]

---

# 選擇題測驗卷網站講義（學生版）

學號：＿＿＿＿＿＿＿＿　　姓名：＿＿＿＿＿＿＿＿

> **填寫方式**
> 1. 每個學習都要放：**執行截圖**、**三次問 AI 的提示詞**、**最後採用的程式碼**。
> 2. 問 AI 的提示詞請**逐字貼上**自己實際輸入的內容（不要寫摘要），第一次、第二次、第三次依序記錄。
> 3. 程式碼貼在「點開貼上」的收合區塊裡，貼上**你最後真正採用、而且能執行**的版本。

---

## 學習1：產生一個選擇題測驗卷網站

https://cfchen58.synology.me/115/week4/stage1/

**這個階段的目標：** 用 p5.js 做出一個一次顯示一題、四個選項、答完會顯示對錯與總分的測驗網站（題目先寫在程式裡）。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖

答對截圖
![1](https://hackmd.io/_uploads/r1YuO3Vsze.png)

答錯截圖
![2](https://hackmd.io/_uploads/BkSjd34jGx.png)

![3](https://hackmd.io/_uploads/HJSE53NiMl.gif)


![學習1截圖](請貼上截圖)

### 第一次問 AI

```tex!
使用p5.js撰寫一個選擇題測驗系統，我已經產生一個p5.js專案，請把程式碼寫到sketch.js檔案內，每條指令都需要加上中文註解，測驗系統題目設定為五題，測驗題目的內容為程式設計p5.js簡易指令練習測驗，系統採用全螢幕畫布，使用著答錯時，系統會在正確答案選項上，加上a8dadc背景顏色，該選項要上下跳動，答錯的選項採用e63946背景顏色，選項左右移動，選擇題選項共有四個選項，當五題結束後，需要顯示答對的題數，每次顯示一個題目，需要有下一題的按鈕。
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞

```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習1的程式碼
```javascript=
// 宣告測驗題目陣列
let questions = [
  {
    question: "1. 在 p5.js 中，負責初始化畫布並設定一次性設定的函式是？",
    options: ["draw()", "setup()", "preload()", "createCanvas()"],
    answer: 1 // 正確答案索引 (setup())
  },
  {
    question: "2. 下列哪一個指令可以用來繪製一個圓形？",
    options: ["rect()", "line()", "circle()", "triangle()"],
    answer: 2 // 正確答案索引 (circle())
  },
  {
    question: "3. 若要改變圖形的填滿顏色，應該使用哪一個指令？",
    options: ["stroke()", "fill()", "background()", "color()"],
    answer: 1 // 正確答案索引 (fill())
  },
  {
    question: "4. p5.js 的預設畫布座標系統，原點 (0, 0) 位在畫布的哪個位置？",
    options: ["左上角", "正中央", "左下角", "右上角"],
    answer: 0 // 正確答案索引 (左上角)
  },
  {
    question: "5. 哪一個系統變數可以取得目前的滑鼠 X 軸座標？",
    options: ["mouseX", "mouseY", "width", "height"],
    answer: 0 // 正確答案索引 (mouseX)
  }
];

// 宣告全域狀態變數
let currentQuestionIndex = 0; // 當前題目索引
let score = 0; // 答對題數記錄
let selectedOption = -1; // 使用者選擇的選項索引 (-1 表示尚未選擇)
let isAnswered = false; // 是否已經回答當前題目

// 宣告 DOM UI 元件
let nextButton; // 下一題按鈕
let restartButton; // 重新開始按鈕

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 設定文字對齊方式為置中
  textAlign(CENTER, CENTER);
  
  // 建立「下一題」按鈕，並先隱藏
  nextButton = createButton("下一題");
  nextButton.style("font-size", "18px");
  nextButton.style("padding", "10px 20px");
  nextButton.mousePressed(nextQuestion); // 設定點擊事件處理函式
  nextButton.hide();

  // 建立「重新測試」按鈕，並先隱藏
  restartButton = createButton("重新測試");
  restartButton.style("font-size", "18px");
  restartButton.style("padding", "10px 20px");
  restartButton.mousePressed(restartQuiz); // 設定點擊事件處理函式
  restartButton.hide();
}

function draw() {
  // 設定背景顏色為淺灰色
  background(245);

  // 判斷是否所有題目均已完成
  if (currentQuestionIndex < questions.length) {
    // 繪製當前測驗題目與選項
    displayQuestion();
  } else {
    // 繪製最終結算畫面
    displayResult();
  }
}

// 顯示當前題目與選項的函式
function displayQuestion() {
  let q = questions[currentQuestionIndex];

  // 繪製頂部進度條與題目文字
  fill(29, 53, 87); // 設定字體顏色為深藍色
  textSize(24);
  text(`題目 ${currentQuestionIndex + 1} / ${questions.length}`, width / 2, height * 0.15);
  
  textSize(22);
  text(q.question, width / 2, height * 0.25);

  // 設定選項按鈕的尺寸與佈局參數
  let optionWidth = min(width * 0.7, 500); // 動態計算選項寬度，最高 500px
  let optionHeight = 50; // 選項高度
  let startY = height * 0.35; // 第一個選項的 Y 軸起始位置
  let spacing = 65; // 選項之間的間距

  // 迴圈繪製 4 個選項
  for (let i = 0; i < q.options.length; i++) {
    let x = width / 2;
    let y = startY + i * spacing;

    // 預設外觀設定
    let bgColor = color(255); // 預設背景為白色
    let textColor = color(0); // 預設文字為黑色

    // 如果使用者已經作答，進行動畫與顏色渲染
    if (isAnswered) {
      if (selectedOption === q.answer) {
        // 使用者答對時：點選的正確選項顯示綠色背景
        if (i === q.answer) {
          bgColor = color("#2a9d8f");
          textColor = color(255);
        }
      } else {
        // 使用者答錯時：
        if (i === q.answer) {
          // 正確答案選項：背景設定為 #a8dadc，並進行「上下跳動」動畫
          bgColor = color("#a8dadc");
          y += sin(frameCount * 0.2) * 10; // 利用正弦波產生上下跳動效果
        } else if (i === selectedOption) {
          // 答錯的選項：背景設定為 #e63946，並進行「左右晃動」動畫
          bgColor = color("#e63946");
          textColor = color(255);
          x += sin(frameCount * 0.5) * 10; // 利用正弦波產生左右移動效果
        }
      }
    }

    // 繪製選項卡片外框與背景
    stroke(200);
    strokeWeight(1.5);
    fill(bgColor);
    rectMode(CENTER);
    rect(x, y, optionWidth, optionHeight, 10); // 圓角矩形

    // 繪製選項文字
    noStroke();
    fill(textColor);
    textSize(18);
    text(q.options[i], x, y);
  }

  // 若已作答，設定並顯示「下一題」按鈕位置
  if (isAnswered) {
    nextButton.position(width / 2 - nextButton.width / 2, height * 0.82);
    nextButton.show();
  } else {
    nextButton.hide();
  }
}

// 滑鼠點擊事件處理函式
function mousePressed() {
  // 如果已經作答或題目已結束，不重複觸發選項點擊
  if (isAnswered || currentQuestionIndex >= questions.length) {
    return;
  }

  let q = questions[currentQuestionIndex];
  let optionWidth = min(width * 0.7, 500);
  let optionHeight = 50;
  let startY = height * 0.35;
  let spacing = 65;

  // 判斷滑鼠是否點擊在 4 個選項的範圍內
  for (let i = 0; i < q.options.length; i++) {
    let x = width / 2;
    let y = startY + i * spacing;

    // 檢查點擊座標是否落在該選項卡片矩形內
    if (
      mouseX > x - optionWidth / 2 &&
      mouseX < x + optionWidth / 2 &&
      mouseY > y - optionHeight / 2 &&
      mouseY < y + optionHeight / 2
    ) {
      selectedOption = i; // 記錄點選的選項
      isAnswered = true; // 標記為已作答

      // 答對時加分
      if (selectedOption === q.answer) {
        score++;
      }
      break;
    }
  }
}

// 切換至下一題的函式
function nextQuestion() {
  currentQuestionIndex++; // 進入下一題
  selectedOption = -1; // 重置選擇狀態
  isAnswered = false; // 重置作答狀態
  nextButton.hide(); // 隱藏下一題按鈕
}

// 顯示測驗結算畫面的函式
function displayResult() {
  fill(29, 53, 87);
  textSize(32);
  text("測驗結束！", width / 2, height * 0.35);

  textSize(24);
  text(`您的最終得分為：${score} / ${questions.length} 題`, width / 2, height * 0.48);

  // 顯示「重新測試」按鈕
  restartButton.position(width / 2 - restartButton.width / 2, height * 0.6);
  restartButton.show();
}

// 重新開始測驗的函式
function restartQuiz() {
  currentQuestionIndex = 0; // 重置題目索引
  score = 0; // 重置分數
  selectedOption = -1; // 重置選擇狀態
  isAnswered = false; // 重置作答狀態
  restartButton.hide(); // 隱藏重新測試按鈕
}

// 當使用者調整瀏覽器視窗大小時，自動調整畫布尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

```
:::


---

## 學習2：網頁設定為響應式網頁

https://cfchen58.synology.me/115/week4/stage2/

**這個階段的目標：** 讓網站在電腦、平板、手機（直向與橫向）都能正常顯示，視窗大小改變時版面自動調整。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖

![4](https://hackmd.io/_uploads/SJTqkpVifg.png)


![學習2截圖](請貼上截圖)

### 第一次問 AI

```tex!
使用p5.js撰寫一個選擇題測驗系統，我已經產生一個p5.js專案，請把程式碼寫到sketch.js檔案內，每條指令都需要加上中文註解，測驗系統題目設定為五題，測驗題目的內容為程式設計p5.js簡易指令練習測驗，系統採用全螢幕畫布，使用著答錯時，系統會在正確答案選項上，加上a8dadc背景顏色，該選項要上下跳動，答錯的選項採用e63946背景顏色，選項左右移動，選擇題選項共有四個選項，當五題結束後，需要顯示答對的題數，每次顯示一個題目，需要有下一題的按鈕。網頁設定為響應式網頁，主要是讓網站在電腦、平板、手機（直向與橫向）都能正常顯示，視窗大小改變時版面自動調整。
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習2的程式碼
```javascript=
// 儲存五道測驗題目資料。
const questions = [
  // 設定第一道題目。
  {
    // 設定題目文字。
    question: "哪一個 p5.js 指令可以建立畫布？",
    // 設定四個選項。
    options: ["createCanvas()", "makeCanvas()", "newCanvas()", "canvas()"],
    // 設定正確答案索引。
    answer: 0
  },
  // 設定第二道題目。
  {
    // 設定題目文字。
    question: "哪一個 p5.js 指令可以設定背景顏色？",
    // 設定四個選項。
    options: ["fill()", "background()", "color()", "stroke()"],
    // 設定正確答案索引。
    answer: 1
  },
  // 設定第三道題目。
  {
    // 設定題目文字。
    question: "哪一個 p5.js 指令可以繪製橢圓形？",
    // 設定四個選項。
    options: ["circle()", "ellipse()", "oval()", "round()"],
    // 設定正確答案索引。
    answer: 1
  },
  // 設定第四道題目。
  {
    // 設定題目文字。
    question: "哪一個 p5.js 指令可以繪製矩形？",
    // 設定四個選項。
    options: ["box()", "square()", "rect()", "rectangle()"],
    // 設定正確答案索引。
    answer: 2
  },
  // 設定第五道題目。
  {
    // 設定題目文字。
    question: "哪一個函式會在滑鼠按下時執行？",
    // 設定四個選項。
    options: ["mouseClick()", "mouseDown()", "mousePressed()", "click()"],
    // 設定正確答案索引。
    answer: 2
  }
];

// 儲存目前題目索引。
let currentQuestion = 0;

// 儲存答對題數。
let score = 0;

// 儲存使用者選擇的答案索引。
let selectedAnswer = -1;

// 儲存答題狀態。
let answerState = "尚未作答";

// 儲存測驗是否結束。
let quizFinished = false;

// 儲存響應式版面資料。
let layout = {};

// 儲存選項點擊範圍。
let optionBounds = [];

// 儲存下一題按鈕點擊範圍。
let nextButtonBounds = {};

// 儲存重新開始按鈕點擊範圍。
let restartButtonBounds = {};

// 建立 p5.js 畫布。
function setup() {
  // 建立填滿瀏覽器視窗的畫布。
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平置中。
  textAlign(CENTER, CENTER);

  // 設定矩形以中心點定位。
  rectMode(CENTER);

  // 計算初始響應式版面。
  updateLayout();
}

// 每一幀重新繪製畫面。
function draw() {
  // 更新響應式版面。
  updateLayout();

  // 設定整體背景顏色。
  background("#1d3557");

  // 判斷測驗是否結束。
  if (quizFinished) {
    // 繪製測驗結果畫面。
    drawResultScreen();

    // 結束目前畫面繪製。
    return;
  }

  // 繪製測驗畫面。
  drawQuizScreen();
}

// 依據畫布大小計算響應式版面。
function updateLayout() {
  // 取得畫布較短的一邊。
  const shortSide = min(width, height);

  // 判斷目前是否為手機直向畫面。
  const isPortraitMobile = width < 600 && height >= width;

  // 判斷目前是否為橫向畫面。
  const isLandscape = width > height;

  // 設定主要內容最大寬度。
  const contentWidth = min(width * 0.92, 900);

  // 設定選項欄數。
  const columns = isPortraitMobile ? 1 : isLandscape ? 2 : 1;

  // 設定選項間距。
  const gap = constrain(shortSide * 0.025, 10, 24);

  // 設定選項寬度。
  const optionWidth =
    columns === 1
      ? contentWidth
      : (contentWidth - gap) / 2;

  // 設定選項高度。
  const optionHeight = constrain(
    height * (isPortraitMobile ? 0.085 : 0.105),
    54,
    82
  );

  // 設定標題文字大小。
  const titleSize = constrain(shortSide * 0.065, 24, 44);

  // 設定題目文字大小。
  const questionSize = constrain(shortSide * 0.045, 18, 32);

  // 設定選項文字大小。
  const optionTextSize = constrain(shortSide * 0.034, 15, 24);

  // 設定提示文字大小。
  const feedbackSize = constrain(shortSide * 0.035, 16, 25);

  // 設定按鈕文字大小。
  const buttonTextSize = constrain(shortSide * 0.038, 17, 25);

  // 設定標題垂直位置。
  const titleY = constrain(height * 0.08, 42, 74);

  // 設定題數文字垂直位置。
  const counterY = titleY + titleSize * 1.15;

  // 設定題目區域垂直位置。
  const questionY = counterY + questionSize * 2.15;

  // 設定選項起始位置。
  const optionsStartY = questionY + questionSize * 2.2;

  // 設定選項垂直間距。
  const optionGap = optionHeight + gap;

  // 設定提示文字位置。
  const feedbackY = min(
    optionsStartY + ceil(4 / columns) * optionGap + 18,
    height - 118
  );

  // 設定下一題按鈕位置。
  const nextButtonY = height - 52;

  // 儲存全部版面資料。
  layout = {
    shortSide: shortSide,
    contentWidth: contentWidth,
    columns: columns,
    gap: gap,
    optionWidth: optionWidth,
    optionHeight: optionHeight,
    titleSize: titleSize,
    questionSize: questionSize,
    optionTextSize: optionTextSize,
    feedbackSize: feedbackSize,
    buttonTextSize: buttonTextSize,
    titleY: titleY,
    counterY: counterY,
    questionY: questionY,
    optionsStartY: optionsStartY,
    optionGap: optionGap,
    feedbackY: feedbackY,
    nextButtonY: nextButtonY,
    buttonWidth: min(contentWidth * 0.45, 260),
    buttonHeight: constrain(height * 0.075, 48, 62)
  };

  // 重新計算目前畫面的碰撞範圍。
  updateBounds();
}

// 繪製測驗畫面。
function drawQuizScreen() {
  // 取得目前題目。
  const current = questions[currentQuestion];

  // 設定標題文字顏色。
  fill("#f1faee");

  // 設定標題文字大小。
  textSize(layout.titleSize);

  // 顯示測驗標題。
  text("p5.js 簡易指令練習測驗", width / 2, layout.titleY);

  // 設定題數文字顏色。
  fill("#a8dadc");

  // 設定題數文字大小。
  textSize(constrain(layout.shortSide * 0.035, 15, 23));

  // 顯示目前題數。
  text(
    `第 ${currentQuestion + 1} 題／共 ${questions.length} 題`,
    width / 2,
    layout.counterY
  );

  // 設定題目文字顏色。
  fill("#ffffff");

  // 設定題目文字大小。
  textSize(layout.questionSize);

  // 顯示題目文字。
  drawWrappedText(
    current.question,
    width / 2,
    layout.questionY,
    layout.contentWidth,
    layout.questionSize * 1.25
  );

  // 重新清空選項碰撞範圍。
  optionBounds = [];

  // 逐一繪製四個選項。
  for (let index = 0; index < current.options.length; index++) {
    // 計算選項所在欄位。
    const column = index % layout.columns;

    // 計算選項所在列。
    const row = floor(index / layout.columns);

    // 計算選項中心點 X 座標。
    const optionX =
      width / 2 -
      ((layout.columns - 1) * (layout.optionWidth + layout.gap)) / 2 +
      column * (layout.optionWidth + layout.gap);

    // 計算選項中心點 Y 座標。
    const optionY = layout.optionsStartY + row * layout.optionGap;

    // 繪製選項。
    drawOption(
      current.options[index],
      index,
      optionX,
      optionY,
      layout.optionWidth,
      layout.optionHeight
    );
  }

  // 判斷使用者是否已經作答。
  if (selectedAnswer !== -1) {
    // 設定提示文字顏色。
    fill(answerState === "答對" ? "#80ed99" : "#ffccd5");

    // 設定提示文字大小。
    textSize(layout.feedbackSize);

    // 顯示答題結果。
    text(
      answerState === "答對"
        ? "答對了！"
        : "答錯了，正確答案已標示。",
      width / 2,
      layout.feedbackY
    );

    // 設定下一題按鈕範圍。
    nextButtonBounds = {
      x: width / 2,
      y: layout.nextButtonY,
      width: layout.buttonWidth,
      height: layout.buttonHeight
    };

    // 繪製下一題按鈕。
    drawButton(
      currentQuestion === questions.length - 1 ? "查看結果" : "下一題",
      nextButtonBounds.x,
      nextButtonBounds.y,
      nextButtonBounds.width,
      nextButtonBounds.height,
      "#457b9d"
    );
  }
}

// 繪製單一選項。
function drawOption(label, index, centerX, centerY, optionWidth, optionHeight) {
  // 設定水平動畫位移量。
  let offsetX = 0;

  // 設定垂直動畫位移量。
  let offsetY = 0;

  // 設定選項預設背景顏色。
  let optionColor = "#f1faee";

  // 設定選項預設文字顏色。
  let textColor = "#1d3557";

  // 判斷是否已經作答。
  if (selectedAnswer !== -1) {
    // 判斷目前選項是否為正確答案。
    const isCorrect = index === questions[currentQuestion].answer;

    // 判斷目前選項是否為使用者選錯的答案。
    const isWrongSelected =
      index === selectedAnswer && index !== questions[currentQuestion].answer;

    // 答錯時，讓正確答案上下跳動。
    if (isCorrect && answerState === "答錯") {
      // 設定正確答案背景顏色。
      optionColor = "#a8dadc";

      // 設定上下跳動動畫。
      offsetY = sin(frameCount * 0.12) * min(8, optionHeight * 0.12);
    }

    // 答錯時，讓錯誤選項左右移動。
    if (isWrongSelected) {
      // 設定錯誤答案背景顏色。
      optionColor = "#e63946";

      // 設定錯誤答案文字顏色。
      textColor = "#ffffff";

      // 設定左右移動動畫。
      offsetX = sin(frameCount * 0.2) * min(10, optionWidth * 0.03);
    }

    // 答對時，將使用者選擇的答案標示為綠色。
    if (index === selectedAnswer && answerState === "答對") {
      // 設定答對答案背景顏色。
      optionColor = "#80ed99";
    }
  }

  // 設定選項碰撞範圍。
  optionBounds[index] = {
    x: centerX,
    y: centerY,
    width: optionWidth + abs(offsetX) * 2 + 18,
    height: optionHeight + abs(offsetY) * 2 + 18
  };

  // 設定選項背景顏色。
  fill(optionColor);

  // 設定選項外框顏色。
  stroke("#ffffff");

  // 設定選項外框粗細。
  strokeWeight(2);

  // 繪製選項背景。
  rect(
    centerX + offsetX,
    centerY + offsetY,
    optionWidth,
    optionHeight,
    12
  );

  // 移除外框線。
  noStroke();

  // 設定選項文字顏色。
  fill(textColor);

  // 設定選項文字大小。
  textSize(fitTextSize(label, layout.optionTextSize, optionWidth - 30));

  // 繪製可自動換行的選項文字。
  drawWrappedText(
    label,
    centerX + offsetX,
    centerY + offsetY,
    optionWidth - 30,
    optionHeight - 16
  );
}

// 繪製按鈕。
function drawButton(label, centerX, centerY, buttonWidth, buttonHeight, colorValue) {
  // 設定按鈕背景顏色。
  fill(colorValue);

  // 設定按鈕外框顏色。
  stroke("#ffffff");

  // 設定按鈕外框粗細。
  strokeWeight(2);

  // 繪製按鈕背景。
  rect(centerX, centerY, buttonWidth, buttonHeight, 12);

  // 移除外框線。
  noStroke();

  // 設定按鈕文字顏色。
  fill("#ffffff");

  // 設定按鈕文字大小。
  textSize(layout.buttonTextSize);

  // 顯示按鈕文字。
  text(label, centerX, centerY);
}

// 繪製測驗結果畫面。
function drawResultScreen() {
  // 設定結果標題文字顏色。
  fill("#f1faee");

  // 設定結果標題文字大小。
  textSize(constrain(layout.shortSide * 0.075, 30, 52));

  // 顯示測驗完成文字。
  text("測驗完成！", width / 2, height * 0.25);

  // 設定分數文字顏色。
  fill("#a8dadc");

  // 設定分數文字大小。
  textSize(constrain(layout.shortSide * 0.06, 25, 44));

  // 顯示答對題數。
  text(
    `你答對了 ${score}／${questions.length} 題`,
    width / 2,
    height * 0.42
  );

  // 設定評語文字顏色。
  fill("#ffffff");

  // 設定評語文字大小。
  textSize(layout.feedbackSize);

  // 依分數顯示評語。
  if (score === questions.length) {
    // 顯示滿分評語。
    text("太棒了！全部答對！", width / 2, height * 0.53);
  } else if (score >= 3) {
    // 顯示良好評語。
    text("表現很好，繼續加油！", width / 2, height * 0.53);
  } else {
    // 顯示鼓勵評語。
    text("繼續練習，你會越來越進步！", width / 2, height * 0.53);
  }

  // 設定重新開始按鈕範圍。
  restartButtonBounds = {
    x: width / 2,
    y: min(height * 0.72, height - 55),
    width: layout.buttonWidth,
    height: layout.buttonHeight
  };

  // 繪製重新開始按鈕。
  drawButton(
    "重新開始",
    restartButtonBounds.x,
    restartButtonBounds.y,
    restartButtonBounds.width,
    restartButtonBounds.height,
    "#457b9d"
  );
}

// 將文字自動換行並繪製在指定範圍。
function drawWrappedText(label, centerX, centerY, maxWidth, maxHeight) {
  // 將文字切割成單字或中文字元。
  const characters = Array.from(label);

  // 建立文字行陣列。
  const lines = [];

  // 建立目前文字行。
  let currentLine = "";

  // 逐字建立文字行。
  for (const character of characters) {
    // 嘗試將新字元加入目前文字行。
    const testLine = currentLine + character;

    // 判斷測試文字是否超過最大寬度。
    if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
      // 將目前文字行加入文字陣列。
      lines.push(currentLine);

      // 重新建立下一行文字。
      currentLine = character;
    } else {
      // 將字元加入目前文字行。
      currentLine = testLine;
    }
  }

  // 將最後一行加入文字陣列。
  if (currentLine.length > 0) {
    // 儲存最後一行文字。
    lines.push(currentLine);
  }

  // 計算文字行高。
  const lineHeight = textSize() * 1.2;

  // 計算最多可顯示的行數。
  const maxLines = max(1, floor(maxHeight / lineHeight));

  // 只保留畫面可顯示的文字行。
  const visibleLines = lines.slice(0, maxLines);

  // 計算第一行文字的垂直位置。
  const firstLineY =
    centerY - ((visibleLines.length - 1) * lineHeight) / 2;

  // 逐行繪製文字。
  visibleLines.forEach((line, index) => {
    // 繪製目前文字行。
    text(line, centerX, firstLineY + index * lineHeight);
  });
}

// 計算文字適合的最大字體大小。
function fitTextSize(label, preferredSize, maxWidth) {
  // 建立目前測試字體大小。
  let size = preferredSize;

  // 設定最小字體大小。
  const minimumSize = 13;

  // 持續縮小直到文字不超過寬度。
  while (size > minimumSize && textWidth(label) > maxWidth) {
    // 將字體大小縮小一點。
    size -= 1;

    // 套用新的字體大小。
    textSize(size);
  }

  // 回傳最後適合的字體大小。
  return size;
}

// 重新計算所有按鈕與選項碰撞範圍。
function updateBounds() {
  // 判斷測驗是否已結束。
  if (quizFinished) {
    // 更新重新開始按鈕碰撞範圍。
    restartButtonBounds = {
      x: width / 2,
      y: min(height * 0.72, height - 55),
      width: layout.buttonWidth,
      height: layout.buttonHeight
    };

    // 結束碰撞範圍更新。
    return;
  }

  // 清除選項碰撞範圍。
  optionBounds = [];

  // 逐一計算四個選項碰撞範圍。
  for (let index = 0; index < 4; index++) {
    // 計算選項所在欄位。
    const column = index % layout.columns;

    // 計算選項所在列。
    const row = floor(index / layout.columns);

    // 計算選項中心點 X 座標。
    const optionX =
      width / 2 -
      ((layout.columns - 1) * (layout.optionWidth + layout.gap)) / 2 +
      column * (layout.optionWidth + layout.gap);

    // 計算選項中心點 Y 座標。
    const optionY = layout.optionsStartY + row * layout.optionGap;

    // 設定選項碰撞範圍。
    optionBounds[index] = {
      x: optionX,
      y: optionY,
      width: layout.optionWidth + 24,
      height: layout.optionHeight + 24
    };
  }

  // 設定下一題按鈕碰撞範圍。
  nextButtonBounds = {
    x: width / 2,
    y: layout.nextButtonY,
    width: layout.buttonWidth,
    height: layout.buttonHeight
  };
}

// 判斷座標是否位於指定範圍內。
function isInside(pointX, pointY, bounds) {
  // 回傳座標是否位於矩形內。
  return (
    pointX >= bounds.x - bounds.width / 2 &&
    pointX <= bounds.x + bounds.width / 2 &&
    pointY >= bounds.y - bounds.height / 2 &&
    pointY <= bounds.y + bounds.height / 2
  );
}

// 處理滑鼠按下事件。
function mousePressed() {
  // 處理滑鼠點擊互動。
  handlePointer(mouseX, mouseY);

  // 阻止瀏覽器預設行為。
  return false;
}

// 處理觸控開始事件。
function touchStarted() {
  // 判斷是否有觸控座標。
  if (touches.length > 0) {
    // 處理第一個觸控點。
    handlePointer(touches[0].x, touches[0].y);
  }

  // 阻止手機頁面滑動。
  return false;
}

// 統一處理滑鼠和觸控互動。
function handlePointer(pointX, pointY) {
  // 判斷測驗是否結束。
  if (quizFinished) {
    // 判斷是否按下重新開始按鈕。
    if (isInside(pointX, pointY, restartButtonBounds)) {
      // 重新開始測驗。
      restartQuiz();
    }

    // 結束互動處理。
    return;
  }

  // 判斷使用者是否尚未作答。
  if (selectedAnswer === -1) {
    // 逐一檢查選項。
    for (let index = 0; index < optionBounds.length; index++) {
      // 判斷點擊位置是否在選項內。
      if (isInside(pointX, pointY, optionBounds[index])) {
        // 設定使用者選擇的答案。
        selectedAnswer = index;

        // 判斷答案是否正確。
        if (index === questions[currentQuestion].answer) {
          // 設定答題狀態為答對。
          answerState = "答對";

          // 增加答對題數。
          score++;
        } else {
          // 設定答題狀態為答錯。
          answerState = "答錯";
        }

        // 結束選項檢查。
        break;
      }
    }

    // 結束尚未作答的互動處理。
    return;
  }

  // 判斷是否按下下一題按鈕。
  if (isInside(pointX, pointY, nextButtonBounds)) {
    // 前往下一題。
    nextQuestion();
  }
}

// 前往下一題。
function nextQuestion() {
  // 判斷是否已經是最後一題。
  if (currentQuestion >= questions.length - 1) {
    // 設定測驗結束。
    quizFinished = true;

    // 重新計算結果畫面碰撞範圍。
    updateBounds();

    // 結束函式。
    return;
  }

  // 題目索引增加一題。
  currentQuestion++;

  // 清除上一題選擇的答案。
  selectedAnswer = -1;

  // 重設答題狀態。
  answerState = "尚未作答";

  // 重新計算新版面。
  updateLayout();
}

// 重新開始測驗。
function restartQuiz() {
  // 將題目重設為第一題。
  currentQuestion = 0;

  // 將分數重設為零。
  score = 0;

  // 清除已選答案。
  selectedAnswer = -1;

  // 重設答題狀態。
  answerState = "尚未作答";

  // 設定測驗尚未結束。
  quizFinished = false;

  // 重新計算響應式版面。
  updateLayout();
}

// 當瀏覽器視窗尺寸改變時執行。
function windowResized() {
  // 重新設定畫布大小。
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算所有版面與碰撞範圍。
  updateLayout();
}

```
:::


---

## 學習3：設定嵌入 Google 字型，網頁文字採用這些字型

https://cfchen58.synology.me/115/week4/stage3/

**這個階段的目標：** 從 Google Fonts 嵌入繁體中文字型，並讓畫布上的題目與選項文字使用這些字型。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習3截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習3的程式碼
```javascript=
//學習3程式碼所在

```
:::


---

## 學習4：設定題庫並抽題顯示題目網頁（CSV 檔案）

https://cfchen58.synology.me/115/week4/stage4/

**這個階段的目標：** 把題目移到 questions.csv，網站讀取題庫後每次隨機抽出 5 題。
**這個階段會修改的檔案：** index.html、sketch.js、questions.csv

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習4截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習4的程式碼
```javascript=
//學習4程式碼所在

```
:::


---

## 學習5：利用 Google Sheets 當題庫

https://cfchen58.synology.me/115/week4/stage5/

**這個階段的目標：** 把題庫放在 Google 試算表，網站直接讀取，老師改試算表，網站題目就跟著更新。
**這個階段會修改的檔案：** index.html、sketch.js（questions.csv 當備用題庫）

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習5截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習5的程式碼
```javascript=
//學習5程式碼所在

```
:::


---

## 我的心得

這五個學習中，哪一個最困難？你是怎麼解決的？（請寫出實際發生的事）

＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
