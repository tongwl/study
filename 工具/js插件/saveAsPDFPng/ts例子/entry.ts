// require在ts里面没有报错，是因为@types/node的作用
// $在ts里面没有报错，是因为@types/jquery的作用
// html2canvas, jsPDF 在ts里面没报错，也是因为有declare过
//const html2canvas = require('html2canvas');
//const jsPDF = require('jsPDF');

import $ from 'jquery';

//使用import或则require方式都可以
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
const html2canvas = require('html2canvas');
const jsPDF = require('jspdf');

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

