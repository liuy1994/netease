var APP_ID = '1Qdc1TPXUizTEg6dQCV2CLPr-gzGzoHsz'
var APP_KEY = 'iocnXl16pNnwl7oSE1mObQFu'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

//歌词行数变化
var $lyric = $('.lyric-content')
var $page = $('.page')
$(window).resize(function(){
    var height = $page[0].clientHeight - $lyric[0].offsetTop - $lyric[0].clientHeight
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


//获取id
let id = window.location.search.substr(1)
console.log(id)
var query = new AV.Query('Song')
query.get(id).then(function (results) {
    var result = results[0]
    console.log(results)
    // var id = result.id
    // a[j].setAttribute('href','./playing.html?' + id)
})