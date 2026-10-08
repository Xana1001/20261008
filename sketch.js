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