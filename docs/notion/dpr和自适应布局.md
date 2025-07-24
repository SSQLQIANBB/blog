
## 基本概念


像素单位基本分为三种：设备像素(物理像素)、设备独立像素(逻辑像素)、CSS 像素。


**dpr(设备像素比) = 物理像素/逻辑像素**； 可以理解为1px需要几个物理像素点；设备像素比越高，1px填充的像素点越多，图片越清晰


（可以通过 JS 来获取设备像素比 window.devicePixelRatio）。


| 设备像素(物理像素) dp    | device pixels，显示屏就是由一个个物理像素点组成，屏幕从工厂出来那天起物理像素点就固定不变了。也就是我们经常看到的手机分辨率所描述的数字。单位 pt。                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 设备独立像素(逻辑像素) dip | device-independent pixels，就是我们手机的**实际视口大小**。是操作系统为了方便开发者而提供的一种抽象。程序与操作系统之间描述长度是以设备独立像素为单位。不随页面缩放、浏览器窗口大小而改变。一个设备独立像素对应CSS 中的 1px，一个单位的设备独立像素（也就是1px）表示 N 个物理像素。 |
| 设备像素比 dpr        | devicePixelRatio，是物理像素和设备独立像素的比值。                                                                                                                               |
| CSS 像素           | 在 CSS 中使用的 px 都是指 CSS 像素。不考虑缩放情况下，1个 CSS 像素等于1个设备独立像素(逻辑像素)。                                                                                                    |

> 当100*100的图片在dpr为1的设备上展示时，宽度占用100个物理像素点；但是在dpr为2的设备中展示时，如果想要图片不失真，仍然需要100个像素点，所以宽度应该设置为50*50

## 自适应实现

- 控制 viewport 的 width 和 scale 值适配高倍屏显示

    ```javascript
    var metaEL= doc.querySelector('meta[name="viewport"]');
    var dpr = window.devicePixelRatio;
    var scale = 1 / dpr
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    ```


    原理：保持1px填充的像素点不变

- 使用 rem 模拟 vw 特性适配多种屏幕尺寸

    ```javascript
    // set 1rem = viewWidth / 10
    function setRemUnit () {
        var rem = docEl.clientWidth / 10
        // docEl为document.documentElement，即html元素
        docEl.style.fontSize = rem + 'px'
    }
    setRemUnit();
    ```


    在 CSS 中使用 REM 单位进行布局。例如


    ```css
    /* 设置基本字体大小 */
    html {
      font-size: 192px;
    }
    
    /* 使用 REM 单位 */
    body {
      margin: 10rem; /* 相当于 1920px */
    }
    ```

- **`cssrem`** **插件转换**

## 自适应原理


设想我们在设备像素宽度为750px的屏幕画一个宽度为150px的盒子；那如果在设备宽度为375px时，盒子宽度为多少？


等比公式：


```javascript
x/500 = 150/750
```


实际上就是转换为百分比来换算；css提供了一个rem的概念；即根节点字体大小，我们可以根据屏幕宽度不同设置跟字体大小即1rem = 75px;那150px就等于2rem;


根据这个规则我们就就可以提供一个方法来动态设置根节点字体大小；即


```javascript
fontSize = clientWidth / 10 + 'px';
```


后面可以使用rem直接书写样式；或者自己提供一个插件，解析所有的css中px的数值；然后根据根节点fontSize的值自动换算为rem;

