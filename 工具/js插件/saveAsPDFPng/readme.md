### 一.使用插件

​	**html2canvas** + **jspdf**

​	可用版本：

​		参考 五.被证明可用的版本

### 二.使用方式

 * 直接引用html2canvas和jspdf js的方式

 * typescript的require或 import方式

   

### 三.插件下载

​	html2canvas github地址：https://github.com/niklasvh/html2canvas

​	jspdf github地址：https://github.com/MrRio/jsPDF



####单独js文件下载

​	**htmlcanvas js文件下载**

​		方法一：

​		1. 在https://github.com/niklasvh/html2canvas 页面找到html2canvas [Downloads][https://github.com/niklasvh/html2canvas/releases]链接

![image-20191224135412060](/Users/weitong/Library/Application Support/typora-user-images/image-20191224135412060.png)



​		2. 选择最新或则你想要的版本，在Assets下点击(html2canvas.js)html2canvas.min.js下载

![image-20191224135736143](/Users/weitong/Library/Application Support/typora-user-images/image-20191224135736143.png)



​		方法二：

​		在cdn(如：https://cdnjs.cloudflare.com)上找到[html2canvas][https://cdnjs.com/libraries/html2canvas] 复制出里面的js代码

![image-20191224140132369](/Users/weitong/Library/Application Support/typora-user-images/image-20191224140132369.png)

​			方法三：(注意下载下来的版本是否是可用的)
​			**bower install html2canvas**



​	**jspdf js文件下载**

​		方法一：

​		在cdn(如：https://cdnjs.cloudflare.com)上找到[jspdf][https://cdnjs.com/libraries/jspdf] 复制出里面的js代码

![image-20191224140437278](/Users/weitong/Library/Application Support/typora-user-images/image-20191224140437278.png)

​	方法二：

​		在[jspdf github][https://github.com/MrRio/jsPDF]找到最新版本的js版本, 复制里面的js代码：

![image-20191224140650904](/Users/weitong/Library/Application Support/typora-user-images/image-20191224140650904.png)

​		方法三：(注意下载下来的版本是否是可用的)

​		**bower install jspdf**

#### ts文件下载

```
npm install html2canvas
npm install @types/html2canvas --save-dev
npm install jspdf
npm install @types/jspdf --save-dev
```

理解@type的作用，@type就是为了declare html2canvas和jspdf里面的类型。
**如果html2canvas已经有过declare的声明，那么就没有必要在npm install @types/html2canvas了。**



### 四.使用方式

参考 **js例子** 和 **ts例子**



### 五.被证明可用的版本

**canvas [v1.0.0-rc.5](https://github.com/niklasvh/html2canvas/releases/tag/v1.0.0-rc.5)**  +  **jspdf [1.5.3][https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js]**



### 六.常用属性

html2canvas:

官方参考文档：https://html2canvas.hertzen.com/configuration

```
html2canvas(dom元素, {
  width: outerWidth,  
  height: outerHeight,
  onclone: function (clone) {
            $(clone).find('.headerDiv').hide();
          }
})
```

**1.上述onclone挺有用的，html2canvas的玩法是复制dom出来，在onclone方法里面可以修改复制出来的dom元素，从而控制转换出来的canvas，但是它又不会影响页面上的元素样式。**

2.如果保存出来的图片不包含某个元素，在这个元素的属性里面添加**data-html2canvas-ignore**属性即可。



Jspdf:

参考以下两种保存形式吧

``````typescript
$('.card a').click(function(event) {
    const cardContainer = $(event.target).parents('.card');
    const outerWidth = cardContainer.outerWidth();
    const outerHeight = cardContainer.outerHeight();
    html2canvas(cardContainer[0], {
        width: outerWidth,
        height: outerHeight,
    }).then(canvas => {
        const pageData = canvas.toDataURL('image/png');
        const PDF = new jsPDF('p', 'px', 'a4');
        const width = PDF.internal.pageSize.width;
        const height = PDF.internal.pageSize.height;
        if ((outerHeight * width) / outerWidth > height) {
            PDF.addImage(pageData, 'PNG', 0, 0, (outerWidth * height) / outerHeight, height);
        } else {
            PDF.addImage(pageData, 'PNG', 0, 0, width, (outerHeight * width) / outerWidth);
        }
        PDF.save(`test.pdf`);
    });
});
``````

``````typescript
$('#saveAsPDF').click(function(event) {
    html2canvas(document.body).then(canvas => {
        // 要输出的 PDF 每页的宽高尺寸，单位是 pt
        let pageWidth = 592.28; //841.89
        let pageHeight =  841.89; //592.28

        // 要打印内容，转换成 canvas 图片后的宽高尺寸
        let contentWidth =  canvas.width * 3 / 4;
        let contentHeight = canvas.height * 3 / 4;

        // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片宽
        let imgWidth = pageWidth;
        // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片高
        let imgHeight = pageWidth / contentWidth * contentHeight;

        // 起始内容截取位置
        let position = 0;
        // 剩余未打印内容的高度
        let leftHeight = imgHeight;

        // 获取打印内容 canvas 图片元素
        let pageData = canvas.toDataURL('image/jpeg', 1.0);

        // 初始化 pdf 容器，三个参数分别是：纸张方向(填'',则是横向)、打印单位、纸张尺寸
        let PDF = new jsPDF('', 'pt', 'a4');  //a4分页
        //let PDF = new jsPDF('', 'pt', [imgWidth + 5, imgHeight + 20]); //不分页
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);

        /*************** 分页，如果不分页，那么就不需要这一块 **************/
        // 循环截取打印内容并添加进容器
        if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
            while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= pageHeight;
                if (leftHeight > 0) {
                    PDF.addPage();
                }
            }
        }
        PDF.save('wholePage.pdf');
    });
});
``````



### 七.缺陷

如果dom包含svg内容，那么在firefox下，可能会出现画不出svg的问题。比如amcharts4是用svg实现的，在firefox下，可能就会出现amcharts4的图保存成为空白。解决方案可以使用**canvg**插件将svg图转化为canvas图之后再画图，但是没有深入学习...试了下，效果不是很好，参考代码如下：

```typescript

/****************   第一步: 首先将svg文件转换为canvas    *********************/
var svgElements = $(document.body).find('svg');
//replace all svgs with a temp canvas
svgElements.each(function() {
  var canvas, xml;

  // canvg doesn't cope very well with em font sizes so find the calculated size in pixels and replace it in the element.
  $.each($(this).find('[style*=em]'), function (index, el) {
    //$(this).css('font-size', getStyle(el, 'font-size'));
  });

  canvas = document.createElement("canvas");
  canvas.className = "screenShotTempCanvas";
  //convert SVG into a XML string
  xml = (new XMLSerializer()).serializeToString(this);

  // Removing the name space as IE throws an error
  xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');

  //draw the SVG onto a canvas
  canvg(canvas, xml);
  $(canvas).insertAfter(this);
  //hide the SVG element
  $(this).attr('class', 'tempHide');
  $(this).hide();
});


/****************   第二步: 在用html2canvas和jspdf画图    *********************/
html2canvas(document.body).then(canvas => {
  // 要输出的 PDF 每页的宽高尺寸，单位是 pt
  let pageWidth = 592.28  //841.89
  let pageHeight =  841.89//592.28

  // 要打印内容，转换成 canvas 图片后的宽高尺寸
  let contentWidth =  canvas.width*3/4
  let contentHeight = canvas.height*3/4

  // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片宽
  let imgWidth = pageWidth
  // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片高
  let imgHeight = pageWidth / contentWidth * contentHeight

  // 起始内容截取位置
  let position = 0
  // 剩余未打印内容的高度
  let leftHeight = imgHeight

  // 获取打印内容 canvas 图片元素
  let pageData = canvas.toDataURL('image/jpeg', 1.0)

  // 初始化 pdf 容器，三个参数分别是：纸张方向(填'',则是横向)、打印单位、纸张尺寸
  //let PDF = new jsPDF('', 'pt', 'a4')  //a4分页
  let PDF = new jsPDF('', 'pt', [imgWidth + 5, imgHeight + 20]);
  PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);

  /*************** 分页 **************/
  // 循环截取打印内容并添加进容器
  // if (leftHeight < pageHeight) {
  //   PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
  // } else {
  //   while (leftHeight > 0) {
  //     PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
  //     leftHeight -= pageHeight
  //     position -= pageHeight
  //     if (leftHeight > 0) {
  //       PDF.addPage()
  //     }
  //   }
  // }
  PDF.save(this.companyObj.company + '.pdf');
});
```

