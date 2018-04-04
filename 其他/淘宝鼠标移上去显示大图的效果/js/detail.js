var me=$('#list>a:first-child').attr("href");
$("#list>a").mouseover(function(){
    $($(this).attr("href")).addClass('active').siblings(".active").removeClass('active');
    me= $(this).attr("href");
});

$(document).ready(function(){
    zoom.init();//放大镜初始化
});

var zoom={
        MASKW:0,//保存mask的width
        MASKH:0,//保存mask的height
        MAXTOP:0,//保存mask可用的最大top
        MAXLEFT:0,//保存mask可用的最大left
        PERCENTW:-2,/*************需要设置：大图片的宽和小图片的宽的比例****************/
        PERCENTH:-2,/*************需要设置：大图片的高和小图片的高的比例****************/
        init:function(){//初始化s
            this.MASKW=parseFloat(getComputedStyle(mask).width);//获取mask的宽
            this.MASKH=parseFloat(getComputedStyle(mask).height);//获取mask的高
            this.MAXLEFT=parseFloat(getComputedStyle(superMask).width)-this.MASKW;//获取可用的最大left
            this.MAXTOP=parseFloat(getComputedStyle(superMask).height)-this.MASKH;//获取可用的最大top
            //为superMask绑定以下事件
            //鼠标移入时:米黄色遮罩层显示，并且显示放大后的图片
            $('#superMask').mouseover(function(){
                $('#mask').css("display","block");//显示米黄色遮罩层
                this.showLarge();//显示大图片
            }.bind(this));

            //鼠标移出时:米黄色遮罩层和放大后的图片都隐藏
            $('#superMask').mouseout(function(){
                $('#mask').css("display","none");//隐藏米黄色遮罩层
                $('#zoom_BigImg').css("display","none");//隐藏大图片
            });

            //鼠标在superMask遮罩层上移动时事件
            $('#superMask').mousemove(function(e){
                this.moveMask(e);//移动mask显示大图片不同的部分
            }.bind(this));
        },

        //显示large div
        showLarge:function()
        {
            var src=$(me).attr('src');
            var i=src.lastIndexOf(".");
            $('#zoom_BigImg').css("background-image","url("+src.slice(0,i-1)+"l"+src.slice(i)+")").css("background-repeat","no-repeat");//设置大图片背景
            $('#zoom_BigImg').css("display","block");//显示
        },
        //移动mask
        moveMask:function(e)
        {
            //由于火狐不支持offset，所以在火狐下面无效
            var x=e.offsetX,y=e.offsetY;//偏移量
            var left=x-this.MASKW/2;//left
            var top=y-this.MASKH/2;//top


            /*if(left<0){
             left=0;
             }else if(left>this.MAXLEFT){
             left=this.MAXLEFT;
             }else{
             left=left;
             }*/

            left=left<0?0:left>this.MAXLEFT?this.MAXLEFT:left;


            top=top<0?0:top>this.MAXTOP?this.MAXTOP:top;
            $("#mask").css("left",left+"px");//设置米黄色块的的left
            $("#mask").css("top",top+"px");//设置米黄色块的top
            $("#zoom_BigImg").css("background-position",this.PERCENTW*left+"px "+this.PERCENTH*top+"px");//设置大图片的位置
        }
    }
/**
 * Created by song_ on 2016/11/16.
 */

