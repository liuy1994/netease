//leancloud
function leanCloud() {
  var APP_ID = '1Qdc1TPXUizTEg6dQCV2CLPr-gzGzoHsz'
  var APP_KEY = 'iocnXl16pNnwl7oSE1mObQFu'
  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  })
}
leanCloud()


//歌词行数变化
function lyricHeight() {
  setTimeout(function () {
      change()
    $(window).resize(function () {
      change()
    })
  }, 300)
  function change() {
    var $more = $('.more')
    let $lyric = $('.lyric')
    var height = $more[0].offsetTop
    if (height > 520) {$lyric.height(96)}
    if ((height <= 520) && (height > 485)) {$lyric.height(64)}
    if ((height <= 485) && (height > 455)) {$lyric.height(32)}
    if (height <= 455) {$lyric.height(0)}
  }
}
lyricHeight()





//播放
function play(){
  $($('.point')[0]).removeClass('pause').addClass('play')
  $($('.wrapper')[0]).removeClass('pause').addClass('play')
  $('audio')[0].play()
}
$('#icon-play').on('click', play)

//暂停
function pause() {
  $($('.point')[0]).removeClass('play').addClass('pause')
  $($('.wrapper')[0]).removeClass('play').addClass('pause')
  $('audio')[0].pause()
}
$('#icon-pause').on('click', pause)


//获取歌曲信息&歌词滚动
function roll(){
  function template1(result){
    return `
    <style>
    .playing::after{
        background: transparent url(${result.cover}) no-repeat 50% 50%;
        background-size: 200%;
    }
    <.style>
    `
  }
  function template2(result){
    return `
    <div class="name" id="name">${result.name} - <span>${result.author}</span></div>
    <div class="lyric" id="lyric"><div class="content" id="content"></div></div>
    `
  }

  
  let id = window.location.search.substr(1)
  var query = new AV.Query('Song')
  query.get(id).then(function (results) {
    var result = results.attributes
    var audio = `<audio src="${result.url}"></audio>`
    $('#playing').append(audio)
    var img = `<img src="${result.cover}"  alt="封面">`
    $('.cover').append(img)
    var style = template1(result)
    $('head').append(style)
    var lyric = result.lyric
    var regex2 = /([\u4e00-\u9fa5]|[A-Za-z]).*/g
    var content = lyric.match(regex2)
    var div = template2(result)
    $('#playing').append(div)
    for (var i = 0; i < content.length; i++) {
      var p = `<p>${content[i]}</p>`
      $('.content').append(p)
    }
    var regex1 = /\d.{7}/g
    var time = lyric.match(regex1)
    var array = []
    var contents = $('.content')[0]
    $(contents).children()[0].style.color = 'white'
    for (var j = 0; j < time.length; j++) {
      var times = time[j].split(':')
      var seconds = (+times[0] * 60) + (+times[1])
      array.push(seconds)
    }
    setInterval(function () {
      var audioTime = $('audio')[0].currentTime
      for (i = 0; i < array.length; i++) {
        if (i === array.length - 1) {
        } else if (array[i] <= audioTime && array[i + 1] > audioTime) {
          var $more = $('.more')
          var height = $more[0].offsetTop
          if (height > 485) {
            contents.style.transform = 'translateY(-' + (i - 1) * 32 + 'px)'
          } else if (height <= 485) {
            contents.style.transform = 'translateY(-' + i * 32 + 'px)'
          }
          if (i) {
            $(contents).children()[i - 1].style.color = 'hsla(0,0%,100%,.6)'
            $(contents).children()[i].style.color = 'white'
          }
        }
      }
    }, 300)
  })
}
roll()





