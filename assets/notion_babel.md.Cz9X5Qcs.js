import{_ as n,c as a,o as e,a as p}from"./app.Cumm-wQi.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"notion/babel.md","filePath":"notion/babel.md","lastUpdated":1754507625000}'),l={name:"notion/babel.md"};function i(r,s,t,b,c,u){return e(),a("div",null,s[0]||(s[0]=[p(`<h2 id="参考文档" tabindex="-1">参考文档 <a class="header-anchor" href="#参考文档" aria-label="Permalink to &quot;参考文档&quot;">​</a></h2><blockquote><p><a href="https://xie.infoq.cn/article/b97767aba29a13cb0c49fdeb0" target="_blank" rel="noreferrer">https://xie.infoq.cn/article/b97767aba29a13cb0c49fdeb0</a><a href="https://segmentfault.com/a/1190000039895291" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000039895291</a></p></blockquote><p>在.babelrc配置文件中，主要是对预设(presets) 和 插件(plugins) 进行配置。.babelrc配置文件一般为如下</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;plugins&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;transform-runtime&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;polyfill&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   &quot;presets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       &quot;env&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         &quot;modules&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     ],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     &quot;stage-2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     &quot;react&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>plugins该属性是告诉babel要使用那些插件，这些插件可以控制如何转换代码。</p><h2 id="什么是babel-它是干什么用的" tabindex="-1">什么是babel? 它是干什么用的？ <a class="header-anchor" href="#什么是babel-它是干什么用的" aria-label="Permalink to &quot;什么是babel? 它是干什么用的？&quot;">​</a></h2><p>ES6是2015年发布的下一代javascript语言标准，它引入了新的语法和API，使我们编写js代码更加得心应手，比如class，let,for...of promise等等这样的，但是可惜的是这些js新特性只被最新版本的浏览器支持，但是低版本浏览器并不支持，那么低版本浏览器下就需要一个转换工具，把es6代码转换成浏览器能识别的代码，babel就是这样的一个工具。可以理解为 babel是javascript语法的编译器。</p><h2 id="babel编译器" tabindex="-1">Babel编译器 <a class="header-anchor" href="#babel编译器" aria-label="Permalink to &quot;Babel编译器&quot;">​</a></h2><p>在Babel执行编译的过程中，会从项目的根目录下的 .babelrc文件中读取配置。.babelrc是一个json格式的文件。</p><p>在.babelrc配置文件中，主要是对预设(presets) 和 插件(plugins) 进行配置。.babelrc配置文件一般为如下：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;plugins&quot;: [</span></span>
<span class="line"><span>     [</span></span>
<span class="line"><span>      &quot;transform-runtime&quot;,</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;polyfill&quot;: false</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>     ]</span></span>
<span class="line"><span>   ],</span></span>
<span class="line"><span>   &quot;presets&quot;: [</span></span>
<span class="line"><span>     [</span></span>
<span class="line"><span>       &quot;env&quot;,</span></span>
<span class="line"><span>       {</span></span>
<span class="line"><span>         &quot;modules&quot;: false</span></span>
<span class="line"><span>       }</span></span>
<span class="line"><span>     ],</span></span>
<span class="line"><span>     &quot;stage-2&quot;,</span></span>
<span class="line"><span>     &quot;react&quot;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>plugins该属性是告诉babel要使用那些插件，这些插件可以控制如何转换代码。</p><h3 id="理解-babel-polyfill-和-babel-runtime-及-babel-plugin-transform-runtime" tabindex="-1">理解 babel-polyfill 和 babel-runtime 及 babel-plugin-transform-runtime <a class="header-anchor" href="#理解-babel-polyfill-和-babel-runtime-及-babel-plugin-transform-runtime" aria-label="Permalink to &quot;理解 babel-polyfill 和 babel-runtime 及 babel-plugin-transform-runtime&quot;">​</a></h3><p>Babel默认只转换新的javascript语法，而不转换新的API，比如 Iterator, Generator, Set, Maps, Proxy, Reflect,Symbol,Promise 等全局对象。以及一些在全局对象上的方法(比如 Object.assign)都不会转码。</p><p>比如说，ES6在Array对象上新增了Array.form方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用 babel-polyfill来转换等。</p><p>因此：babel-polyfill和babel-runtime就是为了解决新的API与这种全局对象或全局对象方法不足的问题，因此可以使用这两个插件可以转换的。</p><h3 id="那么他们两者的区别是什么" tabindex="-1">那么他们两者的区别是什么？ <a class="header-anchor" href="#那么他们两者的区别是什么" aria-label="Permalink to &quot;那么他们两者的区别是什么？&quot;">​</a></h3><p>babel-polyfill 的原理是当运行环境中并没有实现的一些方法，babel-polyfill会做兼容。</p><p>babel-runtime 它是将es6编译成es5去执行。我们使用es6的语法来编写，最终会通过babel-runtime编译成es5.也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5.所以就有很多冗余的代码。</p><p>babel-polyfill 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。</p><p>babel-runtime: 它不会污染全局对象和内置对象的原型，比如说我们需要Promise，我们只需要import Promise from &#39;babel-runtime/core-js/promise&#39;即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。</p><p>虽然 babel-runtime 可以解决 babel-polyfill中的避免污染全局对象，但是它自己也有缺点的，比如上，如果我现在有100个文件甚至更多的话，难道我们需要一个个文件加import Promise from &#39;babel-runtime/core-js/promise&#39; 吗？那这样肯定是不行的，因此这个时候出来一个 叫 babel-plugin-transform-runtime，</p><p>它就可以帮助我们去避免手动引入 import的痛苦，并且它还做了公用方法的抽离。比如说我们有100个模块都使用promise，但是promise的polyfill仅仅存在1份。</p><p>这就是 babel-plugin-transform-runtime 插件的作用。</p><h3 id="理解-babel-plugin-transform-runtime-的配置一些选项" tabindex="-1">理解 babel-plugin-transform-runtime 的配置一些选项 <a class="header-anchor" href="#理解-babel-plugin-transform-runtime-的配置一些选项" aria-label="Permalink to &quot;理解 babel-plugin-transform-runtime 的配置一些选项&quot;">​</a></h3><p>因此通过上面的理解，我们可以对 transform-runtime 通过如下配置 plugins; 如下代码：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &#39;plugins&#39;: [</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>      &#39;transform-runtime&#39;,</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &#39;helpers&#39;: false,</span></span>
<span class="line"><span>        &#39;polyfill&#39;: false,</span></span>
<span class="line"><span>        &#39;regenerator&#39;: true,</span></span>
<span class="line"><span>        &#39;moduleName&#39;: &#39;babel-runtime&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>配置项可以看官网，<a href="https://babeljs.io/docs/en/babel-plugin-transform-runtime/#helpers" target="_blank" rel="noreferrer">查看官网</a></p><p>helpers: 默认值为true，表示是否开启内联的babel helpers(即babel或者环境本来存在的某些对象方法函数)如：extends，etc这样的 在调用模块名字时将被替换名字。</p><p>polyfill：默认值为true，表示是否把内置的东西(Promise, Set, Map)等转换成非全局污染的。</p><p>regenerator：默认值为true，是否开启generator函数转换成使用regenerator runtime来避免污染全局域。</p><p>moduleName：默认值为 babel-runtime，当调用辅助 设置模块（module）名字/路径.</p><p>比如如下这样设置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;moduleName&quot;: &quot;flavortown/runtime&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>import引入文件如下这个样子：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import extends from &#39;flavortown/runtime/helpers/extends&#39;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="presets" tabindex="-1">presets <a class="header-anchor" href="#presets" aria-label="Permalink to &quot;presets&quot;">​</a></h3><p>presets属性告诉Babel要转换的源码使用了哪些新的语法特性，presets是一组Plugins的集合。</p><h3 id="理解-babel-preset-env" tabindex="-1">理解 babel-preset-env <a class="header-anchor" href="#理解-babel-preset-env" aria-label="Permalink to &quot;理解 babel-preset-env&quot;">​</a></h3><p>比如：</p><p>babel-preset-es2015: 可以将es6的代码编译成es5.</p><p>babel-preset-es2016: 可以将es7的代码编译为es6.</p><p>babel-preset-es2017: 可以将es8的代码编译为es7.</p><p>babel-preset-latest: 支持现有所有ECMAScript版本的新特性。</p><p>举个列子，比如我们需要转换es6语法，我们可以在 .babelrc的plugins中按需引入一下插件，比如： check-es2015-constants、es2015-arrow-functions、es2015-block-scoped-functions等等几十个不同作用的plugin： 那么配置项可能是如下方式：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// .babelrc</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;plugins&quot;: [</span></span>
<span class="line"><span>    &quot;check-es2015-constants&quot;,</span></span>
<span class="line"><span>    &quot;es2015-arrow-functions&quot;,</span></span>
<span class="line"><span>    &quot;es2015-block-scoped-functions&quot;,</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>但是Babel团队为了方便，将同属ES2015的几十个Transform Plugins集合到babel-preset-es2015一个Preset中，这样我们只需要在.babelrc的presets加入es2015一个配置就可以完成全部ES2015语法的支持了：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// .babelrc</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [</span></span>
<span class="line"><span>    &quot;es2015&quot;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>但是我们随着时间的推移，将来可能会有跟多的版本插件,比如 bebel-preset-es2018,.... 等等。</p><p>因此 babel-preset-env 出现了，它的功能类似于 babel-preset-latest，它会根据目标环境选择不支持的新特性来转译。</p><p>首先需要在项目中安装，如下命令：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install babel-preset-env --save-dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在.babelrc配置文件中 可以如下简单的配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [&#39;env&#39;]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>我们还可以仅仅配置项目所支持的浏览器的配置</p><p>支持每个浏览器最后两个版本和safari大于等于7版本所需的polyfill代码转换，我们可以如下配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &#39;presets&#39;: [</span></span>
<span class="line"><span>    [&#39;env&#39;, {</span></span>
<span class="line"><span>      &#39;target&#39;: {</span></span>
<span class="line"><span>        &#39;browsers&#39;: [&#39;last 2 versions&#39;, &#39;safari &gt;= 7&#39;]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>支持市场份额超过5%的浏览器，可以如下配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span> &#39;presets&#39;: [</span></span>
<span class="line"><span>   [&#39;env&#39;, {</span></span>
<span class="line"><span>     &#39;target&#39;: {</span></span>
<span class="line"><span>       &#39;browsers&#39;: &#39;&gt; 5%&#39;</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span>   }]</span></span>
<span class="line"><span> ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>指定浏览器版本，可以如下配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &#39;presets&#39;: [</span></span>
<span class="line"><span>    [&#39;env&#39;, {</span></span>
<span class="line"><span>      &#39;target&#39;: {</span></span>
<span class="line"><span>        &#39;chrome&#39;: 56</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Node.js 如果通过Babel编译Node.js代码的话，可以设置 &quot;target.node&quot; 是 &#39;current&#39;, 含义是 支持的是当前运行版本的nodejs。</p><p>如下配置代码：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [</span></span>
<span class="line"><span>    [&quot;env&quot;, {</span></span>
<span class="line"><span>      &quot;targets&quot;: {</span></span>
<span class="line"><span>        &quot;node&quot;: &quot;current&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="理解-babel-preset-env-中的选项配置" tabindex="-1">理解 babel-preset-env 中的选项配置： <a class="header-anchor" href="#理解-babel-preset-env-中的选项配置" aria-label="Permalink to &quot;理解 babel-preset-env 中的选项配置：&quot;">​</a></h3><p>1.targets: {[string]: number | string }, 默认为{};</p><p>含义是支持一个运行环境的对象，比如支持node版本；可以如下配置： node: &#39;6.0&#39;;</p><p>运行环境: chrome, opera, edge, firefox, safari, ie, ios, android, node, electron</p><h3 id="targets-browsers-array-string" tabindex="-1">targets.browsers &lt;Array | string&gt; <a class="header-anchor" href="#targets-browsers-array-string" aria-label="Permalink to &quot;targets.browsers &lt;Array | string&gt;&quot;">​</a></h3><p>支持浏览器的配置项，该配置项使用方式可以到 browserslist来查询（<a href="https://github.com/browserslist/browserslist%EF%BC%89" target="_blank" rel="noreferrer">https://github.com/browserslist/browserslist）</a> 比如上面的 支持每个浏览器最后两个版本和safari大于等于7版本。如上配置。</p><h3 id="modules" tabindex="-1">modules <a class="header-anchor" href="#modules" aria-label="Permalink to &quot;modules&quot;">​</a></h3><p>该参数的含义是：启用将ES6模块语法转换为另一种模块类型。将该设置为false就不会转换模块。默认为 &#39;commonjs&#39;. 该值可以有如下：</p><p>&#39;amd&#39; | &#39;umd&#39; | &#39;systemjs&#39; | &#39;commonjs&#39; | false</p><p>我们在项目中一般会看到如下配置，设置modules: false, 如下代码配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;presets&quot;: [</span></span>
<span class="line"><span>   &#39;env&#39;,</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>     &#39;modules&#39;: false</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这样做的目的是：以前我们需要使用babel来将ES6的模块语法转换为AMD, CommonJS，UMD之类的模块化标准语法，但是现在webpack都帮我做了这件事了，所以我们不需要babel来做，因此需要在babel配置项中设置modules为false，因为它默认值是commonjs, 否则的话，会产生冲突。</p><h3 id="loose-该参数值默认为false。" tabindex="-1">loose, 该参数值默认为false。 <a class="header-anchor" href="#loose-该参数值默认为false。" aria-label="Permalink to &quot;loose, 该参数值默认为false。&quot;">​</a></h3><p>含义是：允许它们为这个 preset 的任何插件启用”loose” 转换。</p><h3 id="include-包含一些插件-默认为" tabindex="-1">include: 包含一些插件，默认为 []; <a class="header-anchor" href="#include-包含一些插件-默认为" aria-label="Permalink to &quot;include: 包含一些插件，默认为 [];&quot;">​</a></h3><p>比如包含箭头函数，可以如下配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [</span></span>
<span class="line"><span>    [&quot;env&quot;, {</span></span>
<span class="line"><span>      &quot;targets&quot;: {</span></span>
<span class="line"><span>        &quot;browsers&quot;: [&quot;last 2 versions&quot;, &quot;safari &gt;= 7&quot;]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;include&quot;: [&quot;transform-es2015-arrow-functions&quot;, &quot;es6.map&quot;]</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="exclude-排除哪些插件-默认为" tabindex="-1">exclude； 排除哪些插件，默认为 []; <a class="header-anchor" href="#exclude-排除哪些插件-默认为" aria-label="Permalink to &quot;exclude； 排除哪些插件，默认为 [];&quot;">​</a></h3><p>比如 排除生成器，可以如下配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [</span></span>
<span class="line"><span>    [&quot;env&quot;, {</span></span>
<span class="line"><span>      &quot;targets&quot;: {</span></span>
<span class="line"><span>        &quot;browsers&quot;: [&quot;last 2 versions&quot;, &quot;safari &gt;= 7&quot;]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;exclude&quot;: [&quot;transform-regenerator&quot;, &quot;es6.set&quot;]</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="理解-babel-presets-stage-x" tabindex="-1">理解 babel-presets-stage-x <a class="header-anchor" href="#理解-babel-presets-stage-x" aria-label="Permalink to &quot;理解 babel-presets-stage-x&quot;">​</a></h3><p>官方预设(preset), 有两种，一个是按年份(babel-preset-es2017)，一个是按阶段(babel-preset-stage-0)。 这主要是根据TC39 委员会ECMASCRPIT 发布流程来制定的。因此到目前为止 有4个不同的阶段预设：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>babel-preset-stage-0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>babel-preset-stage-1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>babel-preset-stage-2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>babel-preset-stage-3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>以上每种预设都依赖于紧随的后期阶段预设，数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。因此 stage-0包含stage-1/2/3的内容。所以如果我们不知道需要哪个stage-x的话，直接引入stage-0就好了。</p><p>stage0 (<a href="https://babeljs.io/docs/en/babel-preset-stage-0" target="_blank" rel="noreferrer">https://babeljs.io/docs/en/babel-preset-stage-0</a>) 只是一个美好激进的想法，一些 Babel 插件实现了对这些特性的支持 ，但是不确定是否会被定为标准.</p><p>stage1 (<a href="https://babeljs.io/docs/en/babel-preset-stage-1" target="_blank" rel="noreferrer">https://babeljs.io/docs/en/babel-preset-stage-1</a>) 值得被纳入标准的特性.</p><p>stage2 (<a href="https://babeljs.io/docs/en/babel-preset-stage-2" target="_blank" rel="noreferrer">https://babeljs.io/docs/en/babel-preset-stage-2</a>) 该特性规范己经被起草，将会被纳入标准里.</p><p>stage3 (<a href="https://babeljs.io/docs/en/babel-preset-stage-3" target="_blank" rel="noreferrer">https://babeljs.io/docs/en/babel-preset-stage-3</a>) 该特性规范已经定稿，大浏览器厂商和 Node.js 社区己开始着手实现.</p><p>但是在我们使用的时候只需要安装你想要的阶段就可以了：比如 babel-preset-stage-2， 安装命令如下：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install --save-dev babel-preset-stage-2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="在webpack中配置babel" tabindex="-1">在webpack中配置babel <a class="header-anchor" href="#在webpack中配置babel" aria-label="Permalink to &quot;在webpack中配置babel&quot;">​</a></h2><p>在上面了解了babel后，现在我们需要知道如何在webpack中使用它了。由于babel所做的事情是转换代码，所有需要使用loader去转换，因此我们需要配置babel-loader。</p><p>在安装babel-loader之前，我们需要安装babel-core， 因为babel-core是Babel编译器的核心，因此也就意味着如果我们需要使用babel-loader进行es6转码的话，我们首先需要安装 babel-core, 安装命令如下即可：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install --save-dev babel-core</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后我们再安装 babel-loader, 命令如下：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install --save-dev babel-loader</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>接着我们需要安装 babel-preset-env, babel-plugin-transform-runtime, babel-preset-stage-2, 如下命令安装</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install --save-dev  babel-preset-env babel-plugin-transform-runtime babel-preset-stage-2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>因此 .babelrc 配置如下即可：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;plugins&quot;: [</span></span>
<span class="line"><span>     [</span></span>
<span class="line"><span>      &quot;transform-runtime&quot;,</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;polyfill&quot;: false</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>     ]</span></span>
<span class="line"><span>   ],</span></span>
<span class="line"><span>   &quot;presets&quot;: [</span></span>
<span class="line"><span>     [</span></span>
<span class="line"><span>       &quot;env&quot;,</span></span>
<span class="line"><span>       {</span></span>
<span class="line"><span>         &quot;modules&quot;: false</span></span>
<span class="line"><span>       }</span></span>
<span class="line"><span>     ],</span></span>
<span class="line"><span>     &quot;stage-2&quot;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>在做demo之前，我们还是先看下目录结构变成如下：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>### 目录结构如下：</span></span>
<span class="line"><span>demo1                                       # 工程名</span></span>
<span class="line"><span>|   |--- dist                               # 打包后生成的目录文件</span></span>
<span class="line"><span>|   |--- node_modules                       # 所有的依赖包</span></span>
<span class="line"><span>|   |--- js                                 # 存放所有js文件</span></span>
<span class="line"><span>|   | |-- demo1.js</span></span>
<span class="line"><span>|   | |-- main.js                           # js入口文件</span></span>
<span class="line"><span>|   |</span></span>
<span class="line"><span>|   |--- webpack.config.js                  # webpack配置文件</span></span>
<span class="line"><span>|   |--- index.html                         # html文件</span></span>
<span class="line"><span>|   |--- styles                             # 存放所有的css样式文件</span></span>
<span class="line"><span>|   |--- .gitignore</span></span>
<span class="line"><span>|   |--- README.md</span></span>
<span class="line"><span>|   |--- package.json</span></span>
<span class="line"><span>|   |--- .babelrc                           # babel转码文件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>因此webpack配置中需要添加 babel-loader 配置，如下配置：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  module: {</span></span>
<span class="line"><span>    rules: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        test: /\\\\.js$/,</span></span>
<span class="line"><span>        exclude: /(node_modules)/, // 排除文件</span></span>
<span class="line"><span>        loader: &#39;babel-loader&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>webpack 所有配置如下代码</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const path = require(&#39;path&#39;);</span></span>
<span class="line"><span>// 提取css的插件</span></span>
<span class="line"><span>const ExtractTextPlugin = require(&#39;extract-text-webpack-plugin&#39;);</span></span>
<span class="line"><span>const ClearWebpackPlugin = require(&#39;clean-webpack-plugin&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  entry: &#39;./js/main.js&#39;,</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    filename: &#39;bundle.js&#39;,</span></span>
<span class="line"><span>    // 将输出的文件都放在dist目录下</span></span>
<span class="line"><span>    path: path.resolve(__dirname, &#39;dist&#39;),</span></span>
<span class="line"><span>    publicPath: &#39;/dist&#39;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  mode: &#39;development&#39;,</span></span>
<span class="line"><span>  module: {</span></span>
<span class="line"><span>    rules: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        // 使用正则去匹配要用该loader转换的css文件</span></span>
<span class="line"><span>        test: /\\\\.css$/,</span></span>
<span class="line"><span>        loaders: ExtractTextPlugin.extract({</span></span>
<span class="line"><span>          // 转换 .css文件需要使用的Loader</span></span>
<span class="line"><span>          use: [&#39;css-loader&#39;]</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        test: /\\\\.(png|jpg)$/,</span></span>
<span class="line"><span>        loader: &#39;url-loader&#39;,</span></span>
<span class="line"><span>        options: {</span></span>
<span class="line"><span>          limit: 10000,</span></span>
<span class="line"><span>          name: &#39;[name].[ext]&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        test: /\\\\.js$/,</span></span>
<span class="line"><span>        exclude: /(node_modules)/, // 排除文件</span></span>
<span class="line"><span>        loader: &#39;babel-loader&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  resolve: {</span></span>
<span class="line"><span>    // modules: [&#39;plugin&#39;, &#39;js&#39;]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  externals: {</span></span>
<span class="line"><span>    jquery: &#39;jQuery&#39;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  devtool: &#39;source-map&#39;,</span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    // new ClearWebpackPlugin([&#39;dist&#39;]),</span></span>
<span class="line"><span>    new ExtractTextPlugin({</span></span>
<span class="line"><span>      // 从js文件中提取出来的 .css文件的名称</span></span>
<span class="line"><span>      filename: \`main.css\`</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div><p>package.json 安装依赖包如下：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;demo1&quot;,</span></span>
<span class="line"><span>  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span>  &quot;description&quot;: &quot;&quot;,</span></span>
<span class="line"><span>  &quot;main&quot;: &quot;index.js&quot;,</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;dev&quot;: &quot;webpack-dev-server --progress --colors --devtool source-map --hot --inline&quot;,</span></span>
<span class="line"><span>    &quot;build&quot;: &quot;webpack --progress --colors&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;devDependencies&quot;: {</span></span>
<span class="line"><span>    &quot;babel-core&quot;: &quot;^6.26.3&quot;,</span></span>
<span class="line"><span>    &quot;babel-loader&quot;: &quot;^7.1.5&quot;,</span></span>
<span class="line"><span>    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.23.0&quot;,</span></span>
<span class="line"><span>    &quot;babel-preset-env&quot;: &quot;^1.7.0&quot;,</span></span>
<span class="line"><span>    &quot;babel-preset-stage-2&quot;: &quot;^6.24.1&quot;,</span></span>
<span class="line"><span>    &quot;clean-webpack-plugin&quot;: &quot;^0.1.19&quot;,</span></span>
<span class="line"><span>    &quot;css-loader&quot;: &quot;^1.0.0&quot;,</span></span>
<span class="line"><span>    &quot;extract-text-webpack-plugin&quot;: &quot;^4.0.0-beta.0&quot;,</span></span>
<span class="line"><span>    &quot;file-loader&quot;: &quot;^1.1.11&quot;,</span></span>
<span class="line"><span>    &quot;path&quot;: &quot;^0.12.7&quot;,</span></span>
<span class="line"><span>    &quot;style-loader&quot;: &quot;^0.21.0&quot;,</span></span>
<span class="line"><span>    &quot;uglifyjs-webpack-plugin&quot;: &quot;^1.2.7&quot;,</span></span>
<span class="line"><span>    &quot;url-loader&quot;: &quot;^1.0.1&quot;,</span></span>
<span class="line"><span>    &quot;webpack&quot;: &quot;^4.16.1&quot;,</span></span>
<span class="line"><span>    &quot;webpack-cli&quot;: &quot;^3.0.8&quot;,</span></span>
<span class="line"><span>    &quot;webpack-dev-server&quot;: &quot;^3.1.4&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;dependencies&quot;: {</span></span>
<span class="line"><span>    &quot;axios&quot;: &quot;^0.18.0&quot;,</span></span>
<span class="line"><span>    &quot;jquery&quot;: &quot;^3.3.1&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>现在我们继续在 main.js 代码内 编写 Generator 函数，代码如下：</p><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function* g() {</span></span>
<span class="line"><span>  yield &#39;a&#39;;</span></span>
<span class="line"><span>  yield &#39;b&#39;;</span></span>
<span class="line"><span>  yield &#39;c&#39;;</span></span>
<span class="line"><span>  return &#39;ending&#39;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var gen = g();</span></span>
<span class="line"><span>console.log(gen.next()); // 返回Object {value: &quot;a&quot;, done: false}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for(let a of [1,2,3,4]) {</span></span>
<span class="line"><span>  console.log(a); // 打印出 1, 2, 3, 4</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>然后重新运行打包命令 npm run dev 后，打开浏览器运行 可以看到控制台输出 {value: &quot;a&quot;, done: false}，说明babel已经转译了。</p><h2 id="polyfill" tabindex="-1"><strong>polyfill</strong> <a class="header-anchor" href="#polyfill" aria-label="Permalink to &quot;**polyfill**&quot;">​</a></h2><p><strong>polyfill 将添加到全局范围（global scope）和类似</strong> <strong><code>String</code></strong> <strong>这样的原生原型（native prototypes）中</strong></p><h2 id="plugins" tabindex="-1">plugins <a class="header-anchor" href="#plugins" aria-label="Permalink to &quot;plugins&quot;">​</a></h2><ul><li>插件在 Presets 前运行。</li><li>插件顺序从前往后排列。</li><li>Preset 顺序是颠倒的（从后往前）。</li></ul><h2 id="babel-runtime" tabindex="-1">babel-runtime <a class="header-anchor" href="#babel-runtime" aria-label="Permalink to &quot;babel-runtime&quot;">​</a></h2><p>主要包含core-js、helper、regrnerator函数；</p><p>使用@babel/plugin-transform-runtime作用</p><ul><li>使用runtime中的辅助函数例如 _classCallCheck ,否则每个文件都要生成一个_classCallCheck辅助函数；</li></ul><h3 id="辅助函数helper" tabindex="-1">辅助函数helper <a class="header-anchor" href="#辅助函数helper" aria-label="Permalink to &quot;辅助函数helper&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">function_classCallCheck</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(instance, Constructor) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">instanceof</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		thrownew </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TypeError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Cannot call a class as a function&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 避免因直接调用构造函数而不是使用 new 导致的潜在错误。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>如果babel版本&gt;=7.4.0，设置corejs: 3。同样安装依赖</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> _includesInstanceProperty </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@babel/runtime-corejs3/core-js-stable/instance/includes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	_includesInstanceProperty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_context2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_context2, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 已支持实例方法</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>babel-runtime为你的代码提供了一个沙盒环境，所以不会像babel-polyfill一样污染全局变量，因此适用于开发组件库。但是babel-runtime不能模拟实例方法</strong></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ol><li><code>Babel &lt; 7.4.0</code><ul><li>开发类库, 选择 @babel/runtime</li><li>内部项目，@babel/polyfill</li></ul></li><li><code>Babel &gt;= 7.4.0</code>，啥也不说，直接上 <code>@babel/runtime</code>吧，因为你要的全都有啊</li></ol>`,130)]))}const m=n(l,[["render",i]]);export{d as __pageData,m as default};
