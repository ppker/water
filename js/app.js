(function($) {
    $.fn.water = function() {
        var dataImg={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
        return this.each(function(){
            imgLocation();
            window.onscroll=function(){
                if(scrollside()){
                    $.each(dataImg.data,function(index,value){
                        var box=$("<div>").addClass("box").appendTo($("#container"));
                        var content=$("<div>").addClass("content").appendTo(box);
                        $("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(content);
                    });
                    imgLocation();
                }
            };
        });      
    };
    var imgLocation= function(){
        var box=$('.box');
        //图片宽度都是一样的
        var boxWidth=box.eq(0).width();
        var num=Math.floor($(window).width()/boxWidth);
        var boxArr=[];
        box.each(function(index,value){
            var boxHeight=box.eq(index).height();
            if(index<num){
                boxArr[index]=boxHeight;
            }else{
                var minboxHeight=Math.min.apply(null,boxArr);
                var minboxIndex=$.inArray(minboxHeight,boxArr);
                $(value).css({
                    "position":"absolute",
                    "top":minboxHeight,
                    "left":box.eq(minboxIndex).position().left
                });
                boxArr[minboxIndex]+=box.eq(index).height();
            }
        });
    };
    var scrollside=function(){
        var box=$('.box');
        var lastboxHeight=box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
        var documentHeight=$(document).height();
        var scrollHeight=$(window).scrollTop();   
        //console.log(lastboxHeight-(scrollHeight+documentHeight));
        return (lastboxHeight<scrollHeight+documentHeight)?true:false;
    };
})(jQuery);