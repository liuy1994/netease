$('ol').on('click','li',function(e){
    let $li = $(e.currentTarget)    
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    console.log($('tabs-content'))
    $('.tabs-content').children().eq(index).addClass('active').siblings().removeClass('active')
})