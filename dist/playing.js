var APP_ID = '1Qdc1TPXUizTEg6dQCV2CLPr-gzGzoHsz'
var APP_KEY = 'iocnXl16pNnwl7oSE1mObQFu'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

//歌词行数变化
var $lyric = $('.lyric-content')
var $playing = $('.playing')
$(window).resize(function(){
    var height = $playing[0].clientHeight - $lyric[0].offsetTop - $lyric[0].clientHeight
    if( height > 60 ){
        $lyric.height(96)
    }
    if( (height <= 60 ) && (height > 30)){
        $lyric.height(64)
    }
    if( (height <= 30 ) && (height > 0)){
        $lyric.height(32)
    }
    if( (height <= 0 ) && (height > -40)){
        $lyric.height(0)
    }
})


//播放
$('#icon-play').on('click',function(){
    $($('.point')[0]).removeClass('pause').addClass('play')
    $($('.wrapper')[0]).removeClass('pause').addClass('play')
    $('audio')[0].play()
})

//暂停
$('#icon-pause').on('click',function(){
    $($('.point')[0]).removeClass('play').addClass('pause')
    $($('.wrapper')[0]).removeClass('play').addClass('pause')
    $('audio')[0].pause()
})


//获取歌曲信息
let id = window.location.search.substr(1)
var query = new AV.Query('Song')
query.get(id).then(function (results) {
    var result = results.attributes
    var audio = `<audio src="${result.url}"></audio>`
    $('#playing').append(audio)
    var img = `<img src="${result.cover}"  alt="封面">`
    $('.cover').append(img)
    var after = window.getComputedStyle($('.playing')[0],"::after")
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
    console.log(lyric)







    
    console.log('结束')
})

