# 常用css选择器


#### 1.元素选择器
例子：
`div{color:#f00;}`

#### 2.类选择器
例子：
`.class1{color:#f00;}`

#### 3.id选择器
例子：
`#id1{color:#f00;}`

#### 4.通配符选择器 (*)
例子：
`*{font-size:16px;}`

#### 5.属性选择器
选择器 | 描述 |说明
---|---|---
[attr] | 表示带有以 attr 命名的属性的元素
[attr=value] | 表示带有以 attr 命名的，且值为"value"的属性的元素 
[attr*=value] | 表示带有以 attr 命名的，且值包含有"value"的属性的元素。
[attr~value] | 表示带有以 attr 命名的，且值包含有"value"单词的属性的元素。|这里区分于attr*=value，这里value是一个单词，用空格隔开的
[attr\|=value] | 实践结果：表示带有以 attr 命名的，且值是以"value-"开头的属性的元素
[attr^=value] | 表示带有以 attr 命名的，且值是以"value"开头的属性的元素。
[attr$=value] | 表示带有以 attr 命名的，且值是以"value"结尾的属性的元素。

#### 6.子选择器
语法：元素1 > 元素2 { 样式声明 } 

例子：        
`div > span {    
    color:#f00;    
}` 


#### 7.后代选择器
语法：元素1   元素2 { 样式声明 } 

例子：        
`div  span {    
    color:#f00;    
}` 

#### 8.相邻兄弟选择器
概述：它只会匹配紧跟其前方元素的同胞元素

语法：前方元素 + 目标元素 { 样式声明 }

例子：
`div + p {
    color:#f00;
}`

#### 9.通用兄弟选择器
概述：在使用~连接两个元素时，它会匹配第二个元素，条件是第二个元素必须是在第一个元素后面，且他们有同一个父元素(即它们必须是兄弟元素)

语法：前方元素 ~ 目标元素 { 样式声明 }

例子：
`div ~ p {
    color:#f00;
}`

#### 10.伪类选择器
概述：伪类选择器约有三四十种，但由于部分伪类选择器的支持性非常差，所以无需掌握，下面是常用的伪类选择器。


选择器 | 说明

##### 10.1 和a链接关系密切的伪类选择器

选择器(顺序lvha：love hate) | 说明
--- | ---
:link | 正常状态
:visited | 访问过
:hover | 鼠标停留
:active | 鼠标激活

<!--:focus选择器-->
<table>
    <thead>
        <tr>
            <th style="width:100px;">名称</th>
            <th>值</th>
        </tr>
    </thead>
    <tbody>
       <td>:focus</td>
       <td>:focus 在一个元素成为焦点时生效，用户可以通过键盘或鼠标激活焦点（例如：一次表单输入）。注意点：当:focus用于a标签的时候，它与:lvha的书写顺序不同，结果可能也会有所不同。</td>
    </tbody>
</table>


<!--:target选择器-->
<table>
    <thead>
        <tr>
            <th style="width:100px;">名称</th>
            <th>值</th>
        </tr>
    </thead>
    <tbody>
       <td>:target</td>
       <td>和a链接的锚有关，匹配当前活动的目标元素。
       </td>
    </tbody>
</table> 

例子：利用:target做一个简单的tab panel

html代码：

    <ul>
        <li><a href="#d1">面板1</a></li>  
        <li><a href="#d2">面板2</a></li>      
        <li><a href="#d3">面板3</a></li>
    </ul>
    <div id="d1">1</div>
    <div id="d2">2</div>
    <div id="d3">3</div>

css代码：

    ul{
        list-style-type: none;
    }

    ul:after{
        content:"";
        display:block;
        clear:both;
    }

    li{
        float:left;
        padding:5px 10px;
        background:#ff3;
    }

    div{
        width:100%;
        height:100px;
        display:none;
        border:1px solid #f00;
    }

    div:target{
        display:block;
    }
    


##### 10.2 和表单元素关系密切的伪类选择器
选择器 | 说明
--- | ---
:checked | 匹配radio、checkbox、option选中状态
:disabled | 匹配disabled
:enabled | 匹配非disabled
:required | 匹配required
:read-only | 匹配readonly
:focus | 匹配鼠标焦点
:focus-within | 存在兼容性，但是挺有用，可查资料了解
:default | :default CSS 伪类表示在一组相似元素中所有默认的用户交互元素。不常用。
:indeterminate | 不常用。(部分有兼容性问题)

##### 10.3 :read-write
1.  匹配非readonly的表单元素；(即使是disabled也符合条件)

2.  匹配contenteditable是“”，“true”,"plaintext-only"的元素

##### 10.3 child
选择器(顺序lvha：love hate) | 说明
--- | ---
:first-child | 匹配第一个子元素
:last-child | 匹配最后一个子元素
:nth-child(an+b) | 例子:nth-child(even)  :nth-child(odd) :nth-child(3n+1);
:nth-last-child(an+b) | 和:nth-child(an+b)类似，只不过是从最后开始往前计算


##### 10.4 of-type
概述：和10.3child类似，只不过它匹配元素的type，div和p是不同的type元素
选择器(顺序lvha：love hate) | 说明
--- | ---
:first-of-type | 匹配第一个同类型的子元素
:last-of-type | -- 匹配最后一个同类型的子元素
:nth-of-type(an+b) | 例子:nth-of-type(even)  :nth-of-type(odd) :nth-of-type(3n+1);
:nth-last-of-type(an+b) | 和:nth-of-type(an+b)类似，只不过是从最后开始往前计算

##### 10.5 :only-child
概述：属于某个父元素的唯一一个子元素。等效于 :first-child:last-child，但是:first-child:last-child的优先级更高。

##### 10.6 :only-of-type
概述：代表了任意一个元素，这个元素没有其他相同类型的兄弟元素。等效于 :first-of-type:last-of-type，但是:first-of-type:last-of-type的优先级更高。

##### 10.7 :empty
概述：代表没有子元素的父元素。 这里说的子元素，只计算元素结点及文本（包括空格），注释、运行指令不考虑在内。



#### 11.伪元素选择器

##### 11.1 ::before  ::after
选择器(顺序lvha：love hate) | 说明
--- | ---
::before | ::before 会为当前元素创建一个子元素作为第一个元素。常通过 content 属性来为一个元素添加修饰性的内容。 此元素默认为行内元素。
::after | ::after用来创建一个伪元素，做为已选中元素的最后一个子元素。通常会配合content属性来为该元素添加装饰内容。这个虚拟元素默认是行内元素。

##### 11.2 ::first-line
概述：::first-line 是将样式只应用于一个元素的首行。首行文本的数量取决于元素的宽，document的宽和文本的字号。和其他所有的 伪元素一样，::first-line 不能匹配任何真实存在的html元素。


 ::first-line 伪元素只能在块容器中,所以,::first-line伪元素只能在一个display值为block, inline-block, table-cell ,list-item或者 table-caption中有用.。在其他的类型中，::first-line 是不起作用的。
 
 在一个使用了 ::first-line 伪元素的选择器中，只有很小的一部分css属性能被使用：
 
- 所有和字体有关的属性：font, font-kerning, font-style, font-variant, font-variant-numeric,font-variant-position,font-variant-east-asian,font-variant-caps,font-variant-alternates,font-variant-ligatures,font-synthesis,font-feature-settings,font-language-override, font-weight, font-size,font-size-adjust,font-stretch,  font-family ,the color property
- 所有和背景有关的属性： background-color,background-clip,background-image,background-origin, background-position, background-repeat, background-size,  background-attachment, background-blend-mode
- word-spacing, letter-spacing, text-decoration, text-transform, line-height
- text-shadow,text-decoration,text-decoration-color,text-decoration-line,text- decoration-style, vertical-align.


##### 11.3 ::first-letter
概述：::first-letter会选中一整块文字第一行的第一个字母，并且文字所处的行之前没有其他内容（如图片和内联的表格）

首行只在 block-container box内部才有意义, 因此 ::first-letter 伪元素 只在display属性值为block, inline-block, table-cell, list-item 或者 table-caption的元素上才起作用. 其他情况下, ::first-letter 毫无意义。


只有一小部分CSS可以在包含使用了::first-letter 伪元素选择器的CSS规则集声明块内运用:

- 所有的字体属性 : font, font-style, font-feature-settings, font-kerning, font-language-override, font-stretch, font-synthesis, font-variant, font-variant-alternates, font-variant-caps, font-variant-east-asian, font-variant-ligatures, font-variant-numeric, font-variant-position, font-weight, font-size, font-size-adjust, line-height 以及 font-family.
- 所有的背景属性 : background-color, background-image, background-clip, background-origin, background-position, background-repeat, background-size, background-attachment以及 background-blend-mode.
- 所有的外边距属性: margin, margin-top, margin-right, margin-bottom, margin-left.
- 所有的内边距属性: padding, padding-top, padding-right, padding-bottom, padding-left.
- 所有的边框属性: 比如一些简短的边框属性 border, border-style, border-color, border-width, border-radius, border-image, 还剩下许多冗长的边框属性等等.
- color 属性.
- text-decoration, text-shadow, text-transform, letter-spacing, word-spacing (使用恰当的话), line-height, text-decoration-color, text-decoration-line, text-decoration-style, box-shadow, float, vertical-align 注意此刻必须没有浮动) 等属性.


##### 11.4 ::selection
概述：::selection CSS伪元素应用于文档中被用户高亮的部分（比如使用鼠标或其他选择设备选中的部分）。

只有一小部分CSS属性可以用于 : :selection 选择器： color, background-color, cursor, outline, text-decoration, text-emphasis-color和text-shadow。要特别注意的是，background-image 会如同其他属性一样被忽略。

::selection中的text-shadow属性仅有Chrome, Safari 和 Firefox 17+支持。
 