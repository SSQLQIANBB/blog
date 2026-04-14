
```javascript
const observerMap = new WeakMap();

// 定义水印函数
const addWatermark = (options = {}) => {
  const {
    container: rawContainer = document.body,
    textAlign = "center",
    font = "200 12px sans-serif",
    fillStyle = "#dedede",
    content = "",
    rotate = -30,
    zIndex = 10000,
    gapX = 100,
    gapY = 80,
  } = options;

  const container = rawContainer instanceof Element ? rawContainer : document.body;
  if (!container) return;

  // 生成水印 canvas
  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = textAlign;

  const textMetrics = ctx.measureText(content);
  const textWidth = textMetrics.width;

  const fontSizeMatch = font.match(/(\d+)px/);
  const fontSize = fontSizeMatch ? parseInt(fontSizeMatch[1], 10) : 12;

  const angleRad = (Math.PI / 180) * Math.abs(rotate);

  const rotatedWidth = textWidth * Math.cos(angleRad) + fontSize * Math.sin(angleRad);
  const rotatedHeight = textWidth * Math.sin(angleRad) + fontSize * Math.cos(angleRad);

  canvas.width = rotatedWidth + gapX;
  canvas.height = rotatedHeight + gapY;

  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = textAlign;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((Math.PI / 180) * rotate);

  ctx.fillText(content, 0, fontSize / 2 - 2);

  // 将 canvas 转换为 base64 URL
  const base64Url = canvas.toDataURL("image/png");
  const wm = document.querySelector(".__wm");
  const watermarkDiv = wm || document.createElement("div");
  const styleStr = `
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndex};
    pointer-events: none;
    background: url('${base64Url}') left top repeat;
  `;

  watermarkDiv.setAttribute("style", styleStr);
  watermarkDiv.classList.add("__wm");

  if (!wm) {
    container.style.position = "relative";
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  // 水印防篡改
  const { MutationObserver } = window;
  if (MutationObserver) {
    const prevObserver = observerMap.get(container);
    if (prevObserver) {
      prevObserver.disconnect();
    }

    const mo = new MutationObserver(() => {
      const currentWm = document.querySelector(".__wm");
      if (!currentWm || currentWm.getAttribute("style") !== styleStr) {
        mo.disconnect();
        observerMap.delete(container);
        addWatermark({
          ...options,
          container,
        });
      }
    });

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true,
    });

    observerMap.set(container, mo);
  }
};

export default addWatermark;
```


使用


```mermaid
addWatermark(options);
```

