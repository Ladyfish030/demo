var oPic = document.getElementsByClassName('pic')[0];
var aDots = document.getElementsByClassName('dots-item');
var timer;
var num = 2;

function Move(){

        if(num>=6){
            oPic.style.transition = 'left 0s';
            oPic.style.left = '-400px';
            setTimeout(() => {
                Dot();
                oPic.style.transition = 'left 0.5s';
                oPic.style.left = -800+'px';
                num = 4;
            }, 0);
        }
        else if(num<1){
            oPic.style.transition = 'left 0s';
            oPic.style.left = '-1200px';
            setTimeout(() => {
                Dot();
                oPic.style.transition = 'left 0.5s';
                oPic.style.left = -1600+'px';
                num = 5;
            }, 0);
        }
        else if(num<=5){
        Dot();
        oPic.style.transition = 'left 0.5s';
        oPic.style.left = -400*(num-1)+'px';
        num++;
    }
}

function Dot(){
                for(let i = 0; i<aDots.length; i++){
                      aDots[i].style.backgroundColor = ' rgba(187, 187, 187, 0.66)';
                }
              aDots[(num+1)%3].style.backgroundColor = 'white';
}

function Clock(){
    timer = setInterval(() => {
        Move();
    }, 1000);
}

Clock();

var startX=0;
var endX=0;
var X=0;
var oLeft;
var diff;

oPic.addEventListener('touchstart',function(e){
    startX = e.touches[0].pageX;
    oLeft = oPic.offsetLeft;
    clearInterval(timer);
    oPic.style.left = oLeft + 'px';
});

oPic.addEventListener('touchmove',function(e){
    e.preventDefault();
    endX = e.changedTouches[0].pageX;
    X = endX-startX;
    oPic.style.left = oLeft + X + 'px';
},{passive:false});

oPic.addEventListener('touchend',function(e){
    if(Math.abs(X)<50){
        Move();
        Clock();
    }
    else if(X>0){//右
        num = num -2;
        Move();
        Clock();
    }
    else if(X<0){//左
       Move();
       Clock();
    }
    else{
        Clock();
    }
})