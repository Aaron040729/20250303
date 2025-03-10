let input;
let slider;
let button;
let select;
let iframe;
let bouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.value('淡江大學');
  
  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 10, 10); // 將滑桿放置在文字框的右側
  
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 10); // 將按鈕放置在滑桿的右側
  button.mousePressed(toggleBouncing);
  
  select = createSelect();
  select.position(button.x + button.width + 10, 10); // 將下拉式選單放置在按鈕的右側
  select.option('淡江大學');
  select.option('淡江大學教科系');
  select.option('測驗題');
  select.changed(updateIframe);
  
  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  
  for (let i = 0; i < 100; i++) {
    offsets.push(random(0, 1000));
  }
}

function draw() {
  background(220);
  let textValue = input.value();
  let textSizeValue = slider.value(); // 根據滑桿的值設置文字大小
  textAlign(LEFT, TOP);
  textSize(textSizeValue);
  
  let y = 50; // 起始 y 位置，避免與輸入框重疊
  let offsetIndex = 0;
  while (y < height) {
    let x = 10; // 起始 x 位置
    while (x < width) {
      let yOffset = 0;
      if (bouncing) {
        yOffset = sin(millis() / 100 + offsets[offsetIndex]) * 10;
      }
      text(textValue, x, y + yOffset);
      x += textWidth(textValue);
      offsetIndex++;
    }
    y += textSizeValue + 8; // 每行之間的間距，根據文字大小調整
  }
}

function toggleBouncing() {
  bouncing = !bouncing;
}

function updateIframe() {
  let selected = select.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw');
  } else if (selected === '淡江大學教科系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw');
  } else if (selected === '測驗題') {
    iframe.attribute('src', 'https://hackmd.io/@YYa9uOlzTSKY6M5C6lDNmA/BkS9jYzske');
  }
}
