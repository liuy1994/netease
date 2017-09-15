//leancloud
var APP_ID = '1Qdc1TPXUizTEg6dQCV2CLPr-gzGzoHsz'
var APP_KEY = 'iocnXl16pNnwl7oSE1mObQFu'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

//歌词行数变化
setTimeout(function(){    
    change()
    $(window).resize(function () {
        change()
    })
},300)
function change(){
    var $more = $('.more')
    var $lyric = $('.lyric')
    var height = $more[0].offsetTop
    if (height > 520) {
        $lyric.height(96)
    }
    if ((height <= 520) && (height > 485)) {
        $lyric.height(64)
    }
    if ((height <= 485) && (height > 455)) {
        $lyric.height(32)
    }
    if (height <= 455) {
        $lyric.height(0)
    }
}





//播放
$('#icon-play').on('click', function () {
    $($('.point')[0]).removeClass('pause').addClass('play')
    $($('.wrapper')[0]).removeClass('pause').addClass('play')
    $('audio')[0].play()
})

//暂停
$('#icon-pause').on('click', function () {
    $($('.point')[0]).removeClass('play').addClass('pause')
    $($('.wrapper')[0]).removeClass('play').addClass('pause')
    $('audio')[0].pause()
})


//获取歌曲信息&歌词滚动
let id = window.location.search.substr(1)
var query = new AV.Query('Song')
query.get(id).then(function (results) {
    var result = results.attributes
    var audio = `<audio src="${result.url}"></audio>`
    $('#playing').append(audio)
    var img = `<img src="${result.cover}"  alt="封面">`
    $('.cover').append(img)
    var after = window.getComputedStyle($('.playing')[0], "::after")
    var style = `
    <style>
    .playing::after{
        background: transparent url(${result.cover}) no-repeat 50% 50%;
        background-size: 200%;
    }
    <.style>
    `
    $('head').append(style)
    var lyric = result.lyric
    var regex2 = /([\u4e00-\u9fa5]|[A-Za-z]).*/g
    var content = lyric.match(regex2)
    var div = `
    <div class="name" id="name">${result.name} - <span>${result.author}</span></div>
    <div class="lyric" id="lyric"><div class="content" id="content"></div></div>
    `
    $('#playing').append(div)
    for (var i = 0; i < content.length; i++) {
        var p = `<p>${content[i]}</p>`
        $('.content').append(p)
    }
    var regex1 = /\d.{7}/g
    var time = lyric.match(regex1)
    var array = []
    var contents = $('.content')[0]
    $(contents).children()[0].style.color='white'
    for(var i=0;i<time.length;i++){
        var times = time[i].split(':')
        var seconds = (+times[0]*60) + (+times[1])
        array.push(seconds)        
    }
    setInterval(function(){
        var audioTime = $('audio')[0].currentTime
        for(i=0;i<array.length;i++){
            if(i === array.length-1){
            }else if(array[i] <= audioTime && array[i+1]>audioTime){
                var $more = $('.more')
                var height = $more[0].offsetTop
                if (height > 485 ) {
                    contents.style.transform = 'translateY(-' + (i-1)*32 + 'px)'
                }else if (height <= 485) {
                    contents.style.transform = 'translateY(-' + i*32 + 'px)'
                }
                $(contents).children()[i-1].style.color='hsla(0,0%,100%,.6)'
                $(contents).children()[i].style.color='white'               
            }
        }
    },300)
})




