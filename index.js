// tab组件
$('ol').on('click','li',function(e){
    let $li = $(e.currentTarget)    
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    console.log($('tabs-content'))
    $('.tabs-content').children().eq(index).addClass('active').siblings().removeClass('active')
})

// 清空搜索框
$('.icon-empty').on('click',function(e){
    $(e.currentTarget).parent().children('input')[0].value = '';
    $($('.note')[0]).removeClass('input');
})

// 搜索框默认文字清空
function search(){
    $($('.note')[0]).addClass('input');
    if($('input')[0].value === ''){
        $($('.note')[0]).removeClass('input');
    }
}

// 快速热门搜索
$('ul.list').on('click','li',function(e){
    $('input')[0].value = e.currentTarget.innerText;
    
    $($('.note')[0]).addClass('input');
})
