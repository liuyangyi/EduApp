/**
 *
 * 索引国际教育集团门户
 * 2016.02.01
 *
 */

var iscrollContMain;
var iscrollCitysMain;

var Portal = function ()
{
    this.init();
}

Portal.prototype =
{
    init: function ()
    {
        this.iscrollCont();
        this.iscrollCitys();
        this.citysTab();
        this.wrapperSize();

        var self = this;

        $(window).resize(function () {
            self.iscrollCont();
            self.wrapperSize();
        });
    },

    wap: function () {
        return browser.ver.mobile || $(window).width() < 640;
    },

    // 尺寸
    wrapperSize: function ()
    {
        // 初始化之前计算wrapper宽度
        this.scrollerCont.width(function ()
        {
            return ( $(this).find('.swiper-slide').eq(0).width() + 16 ) * $(this).find('.swiper-slide').length + 16;
        });
        this.scrollerCont.css({'left':'50%', 'margin-left': '-'+ this.scrollerCont.width()/2 +'px'})
    },

    // 站点左右切换初始化
    iscrollCont: function ()
    {
        this.wrapperCont = $('#wrapperCont');
        this.scrollerCont = $('#scrollerCont');

        this.w = parseInt( ( this.scrollerCont.width() - this.scrollerCont.parent().width() ) / 2 );

        ( this.wap() && !browser.ver.iPad ) &&
            (
                iscrollContMain = new TouchSlider('scrollerCont', {
                    duration: 900,
                    interval: 3000,
                    direction: 0,
                    autoplay: true,
                    align: 'center',
                    mousewheel: false,
                    mouse: true,
                    fullsize: false
                })
            );
    },

    // 站点居中
    contCenter: function ()
    {
        this.w < 0 ? (
            this.scrollerCont.css('transform', 'translate('+ -this.w +'px, 0px)'),
            $('.content-main').find('.btn-prev, .btn-next').addClass('hide'),
            iscrollContMain.destroy()
        ) : (
            this.scrollerCont.css('transform', 'translate(-'+ this.w +'px, 0px)')
        );
    },

    // 城市左右切换初始化
    iscrollCitys: function ()
    {
        // 初始化之前计算wrapper宽度
        $('#scrollerCitys').width(function ()
        {
            return ( $(this).children().eq(0).width() ) * $(this).children().length;
        });

        iscrollCitysMain = new IScroll('#wrapperCitys', {
            scrollX: true,
            scrollY: false,
            snap: true,
            click: true,
            deceleration: 0.003
        });

        this.wap() && ( iscrollCitysMain.options.snap = false );
    },

    // 城市tab切换
    citysTab: function ()
    {
        var citys = $('.citys');
        var tabLi = citys.find('.tab-nav .city');
        var tabCont = citys.find('.tab-content .tab-pane');
        var eType;

        this.wap() ? eType = 'click' : eType = 'mouseover';

        tabLi.on(eType, function ()
        {
            var thisLi = $(this).parent();
            var index = thisLi.index();

            thisLi.addClass('current').siblings().removeClass('current');
            tabCont.eq(index).addClass('active').siblings().removeClass('active');
        });

        !this.wap() && tabLi.each( function ()
        {
            var dataId = $(this).attr('data-id');

            $(this).attr('onclick', 'toabout('+ dataId +')');
        });
    }
}


// 滑动在终端加速
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);



/**
 * 终端检测
 *
 */

var browser = {
    ver: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {    //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1,  //IE内核
            presto: u.indexOf('Presto') > -1,  //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,  //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),  //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1,  //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,  //是否iPad
            webApp: u.indexOf('Safari') == -1  //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}




/**
 * 城市点击地图跳转
 *
 */

function toabout (item)
{
    $("input[name='cityid']").val( item );
    $("#ta").submit();
}