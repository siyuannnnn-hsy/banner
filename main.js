(function () {
    var box = document.getElementById('box');
    var main = ('<div class="slider" id="slider">'+
                    '<div class="slide"><img src="img/b5.png" alt=""></div>'+
                    '<div class="slide"><img src="img/b1.png" alt=""></div>'+
                    '<div class="slide"><img src="img/b2.png" alt=""></div>'+
                    '<div class="slide"><img src="img/b3.png" alt=""></div>'+
                    '<div class="slide"><img src="img/b4.png" alt=""></div>'+
                    '<div class="slide"><img src="img/b5.png" alt=""></div>'+
                    '<div class="slide"><img src="img/b1.png" alt=""></div>'+
                '</div>'+
                '<span id="left"><</span>'+
                '<span id="right">></span>'+
                '<ul class="nav" id="navs">'+
                    '<li>1</li>'+
                    '<li>2</li>'+
                    '<li>3</li>'+
                    '<li>4</li>'+
                    '<li>5</li>'+
                '</ul>')
    box.innerHTML=main;

    var slider = document.getElementById('slider');
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var navs = document.getElementById('navs').children;
    var index = 1;
    var play = false;
    var timer = setInterval(next,2000)

    right.onclick = next;
    left.onclick = last;

    function next() {
        if (play) {return;}
        play = true;
        index++;
        nav();
        animate(slider, { left: -1200 * index }, function () {
            if (index == 6) {
                slider.style.left = '-1200px';
                index = 1;
            }
            play = false;
        });
    }
    function last() {
        if (play) {return;}
        play = true;
        index--;
        nav();
        animate(slider, { left: -1200 * index }, function () {
            if (index == 0) {
                slider.style.left = '-6000px';
                index = 5;
            }
            play = false;
        });
    }

    box.onmouseover = function () {
        clearInterval(timer)
        left.style.opacity = 0.5;
        left.style.animation = 'opacity 1s';
        right.style.opacity = 0.5;
        right.style.animation = 'opacity 1s';
    }
    box.onmouseout = function () {
        timer = setInterval(next, 2000);
        left.style.opacity = 0;
        left.style.animation = 'opacity 1s';
        right.style.opacity = 0;
        right.style.animation = 'opacity 1s';
    }

    for(var i = 0;i<navs.length;i++){
        function indexNum(i) {
            navs[i].onclick = function () {
                index = i + 1;
                nav();
                animate(slider, { left: -1200 * index });
              }
          }
          indexNum()
    }
    function nav() {
        for(var i = 0;i<navs.length;i++){
            navs[i].className = '';
        }
        if(index>5){
            navs[0].className = 'active';
        }else if(index <= 0){
            navs[4].className = 'active';
        }else{
            navs[index - 1].className = 'active';
        }
    }
    function animate(obj, json, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var isStop = true;
            for (var attr in json) {
                var now = 0;
                if (attr == 'opacity') {
                    now = parseInt(obj.currentStyle[attr] * 100);
                } else {
                    now = parseInt(getComputedStyle(obj, null)[attr]);
                }
                var speed = (json[attr] - now) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                var cur = now + speed;
                if (attr == 'opacity') {
                    obj.style[attr] = cur / 100;
                } else {
                    obj.style[attr] = cur + 'px';
                }
                if (json[attr] !== cur) {
                    isStop = false;
                }
            }
            if (isStop) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 30)
    }
    

}())
