var begain = document.getElementsByClassName('begain')[0];
var mineNum = document.getElementsByClassName('mine-num')[0];
var reset = document.getElementsByClassName('reset')[0];
var content = document.getElementsByClassName('content')[0];
var num=document.getElementsByClassName('num')[0];

var blockLi, mNum = 10;
begain.onclick = function () {
    init();
    content.oncontextmenu = function (e) {
        return false;
    }
    content.onmousedown = function (e) {
        var event = window.event || e;
        var target = event.target;
        if (event.which == 1) {
            leftClick(target);
        } else if (event.which == 3) {
            rightClick(target);
        }
    }

}

function init() {
    mineNum.style.display = "block";
    reset.style.display = "block";
    content.style.display = "block";
    //初始化扫雷框
    var ul = document.createElement('ul');
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var li = document.createElement('li');
            li.setAttribute('id', i + '-' + j);
            li.classList.add('block');
            ul.appendChild(li);
        }
    }
    content.appendChild(ul);
    blockLi = document.getElementsByClassName('block');//获取到81个li
    while (mNum) {
        //随机生成81个数
        //每个随机数代表li的下标，也是雷的存放位置
        //判断随机数是否重复
        var mineIndex = Math.floor(Math.random() * 81);
        if (!blockLi[mineIndex].classList.contains('isLei')) {
            blockLi[mineIndex].classList.add('isLei');
            mNum--;
        }

    }



}
function leftClick(target) {

    var isLei = document.getElementsByClassName('isLei');
    if (target && target.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].innerHTML = '*';
        }
        alert("game over");

    } else {
        var n = 0;
        target.classList.add('num');
        //获取当前点击的位置
        var dom = target.getAttribute('id');
        var posArr = dom && dom.split('-');
        var posX = parseInt(posArr[0]);
        var posY = parseInt(posArr[1]);
        //计算其周围的八个位置
        //找到每个位置的li属性 判断样式中是否有雷
        for (var i = posX - 1; i <= posX + 1; i++) {
           for(var j=posY-1;j<=posY+1;j++){
               var arround=document.getElementById(i+'-'+j);
               if(arround && arround.classList.contains('isLei')){
                   n++;
               }
           }
        }
        target.innerHTML = n;//将其显示

        if(n==0){
            //以该位置为中心周围八个数都没有雷，都可以将其显示出来
            for (var i = posX - 1; i <= posX + 1; i++) {
                for(var j=posY-1;j<=posY+1;j++){
                    var near=document.getElementById(i+'-'+j);
                    if(near && !near.classList.contains('checked')){
                        near.classList.add('checked');
                        leftClick(near);//周围八个框将会循环递归
                    }
                }
             }

        }
    }

}
function rightClick(target){
    if(target.classList.contains('num')){
        return;
    }
    target.classList.toggle('flag');
    if(target.classList.contains('isLei') && target.classList.contains('flag')){
        mNum--;
    }
   num.innerHTML=mNum;
}

function mineNum() {
    Math.random() * 10
}