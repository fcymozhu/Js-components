//所有具有data-src的图片，都是需要懒加载的

/**
 * 开始图片懒加载
 * @param defaultImg 默认图片
 */
function startLazy(defaultImg) {
    //0. 先得到所有需要懒加载的图片
    var imgs = document.querySelectorAll("img[data-src]")
    //将其转换为真实数组
    imgs = Array.from(imgs); // Array.from函数返回一个真实的数组

    //1. 设置默认图片
    setDefaultImgs();

    //2. 懒加载所有图片
    loadAllImgs();

    //3. 滚动事件
    var timer = null;
    document.body.onscroll = function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            loadAllImgs();
        }, 500)
    }

    //函数区
    //设置默认图片
    function setDefaultImgs() {
        if (!defaultImg) {
            //没有默认图片
            return;
        }
        //设置默认图片
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            img.src = defaultImg;
        }
    }

    //懒加载所有图片
    function loadAllImgs() {
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (loadImg(img)) {
                //加载了图片
                //去除掉已经加载的图片
                imgs.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 懒加载一张图片，自行判断是否应该加载
     * img: 图片的dom对象
     */
    function loadImg(img) {
        //判断该图片是否能够加载
        //判断的实际是，该图片，是否在可视区域内
        //每个dom对象都有一个函数，getBoundingClientRect
        var rect = img.getBoundingClientRect();
        if (rect.bottom <= 0) {
            return false;
        }
        if (rect.top >= document.documentElement.clientHeight) {
            return false;
        }
        //加载图片
        img.src = img.dataset.src;
        //判断是否有原图
        if(img.dataset.original){
            //等待图片加载完成
            img.onload = function(){
                // setTimeout(function(){
                //     img.src = img.dataset.original;
                // }, 1000);
                img.src = img.dataset.original;
                img.onload = null;
            }
        }

        return true;
    }
}