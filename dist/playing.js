var $lyric = $('.lyric-content')
var $page = $('.page')

var height = $page[0].clientHeight - $lyric[0].offsetTop - $lyric[0].clientHeight

if( height > 60 ){
    console.log('三行')
    $lyric.height(96);
}
if( (height <= 60 ) && (height > 30)){
    console.log('两行')
    $lyric.height(64);
}
if( (height <= 30 ) && (height > 0)){
    console.log('一行')
    $lyric.height(32);
}
if( (height <= 0 ) && (height > -40)){
    console.log('消失')
    $lyric.height(0);
}