import{_ as a,c as n,o as p,a2 as i,j as t}from"./chunks/framework.robbWsyO.js";const l="/blog/assets/e9a6bdbad3bb27e77997e0bfe8492f05.jBGPOOUh.awebp",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"notion/工作记录.md","filePath":"notion/工作记录.md","lastUpdated":1753805618000}'),e={name:"notion/工作记录.md"};function h(k,s,r,d,c,o){return p(),n("div",null,s[0]||(s[0]=[i(`<p><strong>2025.07.28</strong></p><pre><code>pipedream配置: [blog-update workflow - Build - Pipedream](https://pipedream.com/@1215323732/projects/proj_BgszXWm/blog-update-workflow-p_vQC6pwg/build)


待完成：

1. 配置pipedream触发拉取代码并上传至github;
2. 隐藏环境变量.elog.env
3. 相关文档：[https://kuangyichen.com/article/elog#09595320abf94695b43519cac948a151](https://kuangyichen.com/article/elog#09595320abf94695b43519cac948a151)
4. [持续集成 | Elog](https://elog.1874.cool/notion/vy55q9xwlqlsfrvk)
</code></pre><p>代码风格</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如果你想让代码保持一致的风格，请按照下面的代码风格写代码：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 以换行而非分号结束语句</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 以声明、命令、变量作为表达式语句的开头，而非表达式/符号（如 [, /, -, ( 等）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用逗号分开的变量、参数、表达式，逗号后面空一格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用===而非==，!==同理，只有当希望发生类型转化时，才用==</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用&#39;&#39;引用字符串，使用\`\`引用带变量的字符串，仅在 html，json 等有必要的地方使用&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &#39;{&#39;前面有一个空格，函数的&#39;(&#39;前面不要空格，其他&#39;(&#39;要一个空格，&#39;)&#39;后面要有一个空格，&#39;}&#39;后面应该换行，命令符不贴(，命令符关键字后面空格，函数名紧贴(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> =, ==, !=, ===, !==, &amp;&amp;, ||, =&gt;前后都有空格，但!后面不空格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ()内部紧贴表达式部分不留空格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 命名：普通变量、函数用驼峰，类用大写开头的驼峰，键名用_隔开的命名，常量用全大写和_隔开，文件名用全小写-隔开</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 冒号&#39;:&#39;前面无需空格，后面要有一个空格，代表数据类型的:后面不加空格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 以逗号结尾的换行变量组中，最后一个变量加上逗号，主要包括对象、数组、函数参数</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 声明时一个变量占一行，使用逗号一次性声明多个变量仅用在未赋值的变量，且至于一组声明的最后</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 变量声明优先使用 const，对可变变量，使用 let 进行声明</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> if条件语句的中括号不可以省略；单条if...else赋值语句用?:代替</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> else if 换行位置位于 else 前，而非 else 后</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码缩进和 tab 使用两个空格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数组的第一个和最后一个元素紧贴中括号，而对象大括号需要有一个空格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 当一行代码太长，需要分行时，应该将连接符至于换行后第二行的开头</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HTML标签属性换行时，属性要缩进，结束反中括号要换行</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 一组值换行</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数组内部结构复杂或元素较多时，应换行，换行后末位元素末尾加分号</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 对象内部结构复杂或超过2个属性，应换行，换行后末位元素末尾加分号</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 函数参数超过3个属性，应换行，换行后末位元素末尾加分号</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 函数传参数内部结构复杂或超过3个属性，应换行，换行后末位元素末尾加分号</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 声明时一个变量占一行，使用逗号一次性声明多个变量仅用在未赋值的变量，且至于一组声明的最后</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 只读属性或不稳定方法用 $ 开头，私有属性或方法 _ 开头（条件允许使用#私有属性）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> switch...case 语句，case 后面会加上 {} 来约束 case 后面的代码换行逻辑</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 三目运算符换行： 以:开头的换行；在第二句及以后有子条件，此时，用括号扩起来，括号内遵循换行逻辑</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>2024.09.05</p><p>1 常规小驼峰</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> userInfo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2 全局常量用大写字母，多个字母以下划线连接</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> MATH_PI</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.14</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>3 类名、组件名以大驼峰格式开头</p><p>4 枚举变量用大驼峰格式，枚举属性 使用全部字母大写，单词间下划线分隔</p><p><code>const Week = { MONDAY: 0, TUESDAY_TYPE: 1 }</code></p><p><code>assets 为静态资源，里面存放 images, styles, icons 等静态资源，静态资源命名格式为 kebab-case</code></p><p><strong>项目：</strong></p><pre><code>路由守卫；


权限；


退出登录跳转？


菜单目录展示；菜单录入入口


已封装的通用组件；


/loading组件加载时机


redirectURL解析以及组件加载机制


sso单点登录保存信息


退出登录跳转测试环境的登录入口在哪代理的；


redirectURL解析以及组件加载机制 // 只获取#/后面的hash参数


菜单配置后端初始化/前端配置录入


切换租户
</code></pre><p>马来；</p><p>首页管理</p><p>首页管理分为两个子菜单 Banner 大事记</p><p>Banner</p><p>用于配置当前官网首页的三个轮播图内容，在后台配置了banner后会更换首页展示的内容与跳转链接</p><p>列表支持banner标题搜索与状态筛选，支持并列条件查询</p><p>点击新增banner进入新增banner页面</p><p>点击编辑进入编辑页面，编辑页面创建时间和创建人无法修改，其余内容都可修改</p><p>删除按钮只有在未发布的状态可以进行删除</p><p>状态栏可以下拉修改该banner的发布状态</p><p>已发布→待发布：要求用户填写预计发布时间</p><p>已发布→未发布：预计发布时间、发布时间修改为空</p><p>待发布→已发布：预计发布时间不变、发布时间选择为此刻</p><p>待发布→未发布：预计发布时间修改为空、发布时间仍为空</p><p>未发布→已发布：预计发布时间为空、发布时间选择为此刻</p><p>未发布→待发布：弹出弹窗，要求用户选择预计发布时间，预计发布时间不得早于当前时间</p><p>记录一下操作日志，谁，时间，操作了哪条记录</p><p>新增banner</p><p>多语言中文和english的配置是在设置菜单进行配置的</p><p>banner标题：必填、支持中英文数字符号、最多50字</p><p>banner摘要：非必填、支持中英文数字符号、最多200字</p><p>banner图/视频：必填、图片和视频只能上传一个</p><p>跳转链接：必填、输入新闻的跳转链接</p><p>创建时间自动生成，点击取用户点击提交的时间</p><p>预计发布时间：非必填，填写时间必须大于现在时间</p><p>未填写提交：未发布状态</p><p>填写此刻：立即发布</p><p>填写未来时间：待发布状态</p><p>创建人：取该表单创建人员，记录姓名、工号</p><p>banner页排序：用于配置首页图片的排列顺序，数字越小排列越靠前，不允许重复</p><p>新增文章</p><p>多语言中文和english的配置是在设置菜单进行配置的</p><p>文章标题：必填、支持中英文数字符号、最多50字</p><p>文章摘要：必填、支持中英文数字符号、最多200字</p><p>缩略图/视频：必填、中英文图片支持分别上传，如果只上传中文图片，则英文图片保持一致</p><p>创建时间自动生成，点击取用户点击提交的时间</p><p>预计发布时间：非必填，填写时间必须大于现在时间</p><p>未填写提交：未发布状态</p><p>填写此刻：立即发布</p><p>填写未来时间：待发布状态</p><p>创建人：取该表单创建人员，记录姓名、工号</p><p>文章排序：用于配置首页图片的排列顺序，数字越小排列越靠前，不允许重复</p><p>文章内容：常用富文本狂，最多5000字</p><p>文章附件：附件上传，支持常用文件格式，中英文附件支持分别上传，如果只上传中文附件，则英文附件保持一致</p><p>文章管理 用于业务人员发布吉利马来西亚官网中的媒体中心的新闻内容</p><p>文章列表支持对文章标题与状态的查询</p><p>点击新增文章进入新增文章界面</p><p>点击编辑进入编辑页面，编辑页面创建时间和创建人无法修改，其余内容都可修改</p><p>删除按钮只有在未发布的状态可以进行删除</p><p>状态可以下拉修改该文章的发布状态</p><p>已发布→待发布、未发布：预计发布时间不变、发布时间修改为空</p><p>待发布→已发布：预计发布时间不变、发布时间选择为此刻</p><p>待发布→未发布：预计发布时间修改为空、发布时间仍为空</p><p>未发布→已发布：预计发布时间为空、发布时间选择为此刻</p><p>未发布→待发布：弹出弹窗，要求用户选择预计发布时间，预计发布时间不得早于当前时间</p><p>留言管理 用于记录其他用户在马来官网提交的留言</p><p>支持邮件、电话、ip、留言内容的查询</p><p>记录填写人的邮箱、电话、IP、留言内容与创建时间</p><p>根据留言提交顺序进行排序</p><p>// axios封装；</p><p>// store without;</p><p>// 信息存储</p><p>// storage封装</p><p>// redirect组件封装</p><p>// 函数组件、resize</p><p>// 开发平台宽高比例不变</p><p>水到渠成-车到山前必有路</p><p>单一重点 —&gt; 单一任务</p><p>项目tag颜色调整</p><p>菜单权限配置</p><p>修改样式</p>`,86),t("p",{"-":""},"类名带 ",-1),i(`<p>场景：</p><ol><li>横屏时，隐藏表格的“进入横屏”按钮；表格默认展示详细信息的多列；</li><li>竖屏进入点击表格的“进入横屏” <ol><li>未开启自动横屏模式；展示多列详细表格，并隐藏搜索按钮；</li><li>开启自动横屏模式；屏幕横向转动过来时，将表格反向旋转90度，正常展示；当手机再转回竖向时，表格再正向转动90度（强制何种情况，横向展示的表格方向不变）</li></ol></li></ol><p>查看：</p><p>项目负责人、项目成员</p><p>编辑：</p><p>项目负责人、项目成员</p><p>已完成、已终止不可编辑</p><p>项目终止：项目负责人、项目成员</p><p>项目：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;route.query.isDetail !== &#39;1&#39;&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;edit&quot;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> @click=&quot;changeEdit()&quot;&gt;编辑&lt;/span&gt;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">&lt;el-button</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	:loading=&quot;loadingSearch</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ||</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> loadingSearchEdit&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	@click=&quot;submit(2)&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;primary&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;!isGanttView &amp;&amp; route.query.isDetail != 1 &amp;&amp; approvalStatus == &#39;YWC&#39; &amp;&amp; (ingStatus == &#39;JZTJZ&#39; || ingStatus == &#39;JZJDXWC&#39;)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&gt;保存&lt;/el-button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">el-button</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	:loading=&quot;loadingSearch</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ||</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> loadingSearchEdit&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;!isGanttView &amp;&amp; route.query.isDetail != 1 &amp;&amp; (!approvalStatus || approvalStatus == &#39;CG&#39; || approvalStatus == &#39;YCH&#39;)&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	@click=&quot;submit(0)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&gt;暂存&lt;/el-button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">el-button</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	:loading=&quot;loadingSearch</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ||</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> loadingSearchEdit&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;!isGanttView &amp;&amp; route.query.isDetail != 1 &amp;&amp; (!approvalStatus || approvalStatus == &#39;CG&#39;)&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;primary&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	@click=&quot;submit(1)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&gt;提交&lt;/el-button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">el-button</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	:loading=&quot;loadingSearch&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	@click=&quot;submit(3)&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;primary&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;!isGanttView &amp;&amp; isMyself === 1 &amp;&amp; ((route.query.isDetail != 1 &amp;&amp; approvalStatus == &#39;YBH&#39;) || approvalStatus == &#39;YZZ&#39; || approvalStatus == &#39;YCH&#39;)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&gt;重新提交&lt;/el-button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>isDetail：</p><p>isEdit</p><p>viewStatus</p><p>任务</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">span</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-hasPermi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;manageV2/task/edit&#39;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(route.query.isMeetingJump &amp;&amp; isSuper &amp;&amp; isEditBtnShow &amp;&amp; !isEdit) || (!route.query.isMeetingJump &amp;&amp; isEditBtnShow &amp;&amp; !isEdit)&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;edit text-no-wrap&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	:style=&quot;{</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> marginLeft:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;auto&#39;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> }&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	@click=&quot;changeEdit()&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&gt;编辑&lt;/span</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">el-button</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	:loading=&quot;loadingClose</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ||</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> loadingSave&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(((route.query.isMeetingJump &amp;&amp; isBtnShow) || (!route.query.isMeetingJump &amp;&amp; isBtnShow)) &amp;&amp; !route.query.type) || (isSuper &amp;&amp; isBtnShow)&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	@click=&quot;endIngTask()&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&gt;关闭任务&lt;/el-button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">el-button</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	:loading=&quot;loadingClose</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ||</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> loadingSave&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	v-if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">		(route.query.isMeetingJump &amp;&amp; isBtnShow &amp;&amp; isSuper) || (!route.query.isMeetingJump &amp;&amp; isBtnShow) || (route.query.isMeetingJump &amp;&amp; isBtnShow &amp;&amp; route.query.jumpForm == &#39;task&#39;)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">	&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;primary&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">	@click=&quot;submitForm(2)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&gt;保存&lt;/el-button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">显示按钮参数：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">编辑：isEdit = 0；isMeetingJump空</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">关闭任务：前端控制</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">保存：前端控制</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>超管按钮</p><p>文件上传、预览、下载</p><p>任务详情approvalStatus参数传输问题</p><p>看板指标上升下降展示是否正确</p><p>看板</p><p>任务列表</p><p>任务附件样式</p><table tabindex="0"><thead><tr><th>“联系我们” 地址图片修改</th><th></th></tr></thead><tbody><tr><td>联系我们 吉利滨江地址中英文不匹配</td><td></td></tr><tr><td></td><td></td></tr></tbody></table><p>马来租户文件下载调整；</p><p>马来租户项目任务bug自测；</p><p>马来官网移动端以及样式调整；</p><p><strong>遗留问题：</strong></p><pre><code>**附件上传速度过慢；编辑时需要校验受否上传完成问题——待处理**


**权限 按钮&amp;页面控制——查看、编辑、新增功能隔离**


连续新增两个任务进展；时分秒会相同，详情返回数据顺序颠倒


项目-添加附件：文案修改“项目附件”


任务详情|编辑获取数据loading效果


项目编辑基本信息输入框样式调整（进展状态未对齐、负责人名称过长样式待调整）


新建子任务**业务板块、模块、是否公司级**参数缺少；


新建子任务**业务板块、模块、是否公司级参数**是否跟随父级任务；


子任务编辑可修改**业务板块、模块、是否公司级参数**


看板任务详情是否展示**业务板块、模块、是否公司级参数**


我的任务任务列表是否添加**业务板块、模块、是否公司级参数** 参数列；


项目类任务不可编辑**业务板块、模块、是否公司级；**


单一类任务：可编辑**业务板块、模块、是否公司级**


单一类子任务可编辑；


&lt;u&gt;**横竖屏字体大小问题**&lt;/u&gt;
</code></pre><p>字典拖拽排序；</p><p><s>雷达图axis显示问题测试；</s></p><p><s>首页看板项目详情缺少项目附件、项目成员、项目结项附件、项目终止附件数据，任务交付物附件</s></p><p>看板附件展示；项目成员；</p><p>任务新增字段；</p><p>看板任务筛选条件；</p><p>优化前后对比：</p><p><img src="`+l+'" alt="image" loading="lazy"></p><p>优化前后对比</p><p>工时</p><table tabindex="0"><thead><tr><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><h2 id="生产前端事故" tabindex="-1">生产前端事故： <a class="header-anchor" href="#生产前端事故" aria-label="Permalink to &quot;生产前端事故：&quot;">​</a></h2><h3 id="h5测试字段跟随生产发布" tabindex="-1">H5测试字段跟随生产发布； <a class="header-anchor" href="#h5测试字段跟随生产发布" aria-label="Permalink to &quot;H5测试字段跟随生产发布；&quot;">​</a></h3><h3 id="pc百分比精度丢失问题修改-导致百分比遗漏" tabindex="-1">PC百分比精度丢失问题修改；导致百分比遗漏 <a class="header-anchor" href="#pc百分比精度丢失问题修改-导致百分比遗漏" aria-label="Permalink to &quot;PC百分比精度丢失问题修改；导致百分比遗漏&quot;">​</a></h3><h3 id="移动端setstate异步导致切换-管理看板-个人看板-调用类型接口不一致" tabindex="-1">移动端setState异步导致切换“管理看板”/“个人看板”调用类型接口不一致 <a class="header-anchor" href="#移动端setstate异步导致切换-管理看板-个人看板-调用类型接口不一致" aria-label="Permalink to &quot;移动端setState异步导致切换“管理看板”/“个人看板”调用类型接口不一致&quot;">​</a></h3><p><a href="https://xxxx.com/base/" target="_blank" rel="noreferrer">https://xxxx.com/base/</a> 单点登录时，重定向地址：<a href="https://xxxx.com/%EF%BC%8C%E4%B8%A2%E5%A4%B1base" target="_blank" rel="noreferrer">https://xxxx.com/，丢失base</a></p>',44)]))}const u=a(e,[["render",h]]);export{g as __pageData,u as default};
