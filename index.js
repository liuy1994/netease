// tab组件
$('ol#tabs').on('click', 'li', function (e) {
    let $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    $('#tabs-content').children().eq(index).addClass('active').siblings().removeClass('active')
})

// 清空搜索框
$('#icon-empty').on('click', function (e) {
    $(e.currentTarget).parent().children('input#search')[0].value = '';
    $($('#note')[0]).removeClass('input');
    $($('#icon-empty')[0]).removeClass('input');
})

// 搜索框默认文字清空
$('input#search').on('input', function (e) {
    $($('#note')[0]).addClass('input');
    $($('#icon-empty')[0]).addClass('input');
    if ($('input#search')[0].value === '') {
        $($('#note')[0]).removeClass('input');
        $($('#icon-empty')[0]).removeClass('input');
    }
})
// 快速热门搜索
$('ul#search-hot').on('click', 'li', function (e) {
    $('input#search')[0].value = e.currentTarget.innerText;
    $($('#icon-empty')[0]).addClass('input');
    $($('#note')[0]).addClass('input');
    var value = $('input#search').val().trim();
    searchName(value);
    searchAuthor(value);
})

// 监听搜索框输入的内容
$('input#search').on('input', function (e) {
    var value = $(e.currentTarget).val().trim();
    searchName(value);
    searchAuthor(value);
})

//搜索歌曲
function searchName(value) {
    if(value === ''){
    }else{
        $('#search-result').empty()
        var query = new AV.Query('Song');
        query.contains('name', value);
        query.find().then(function (result) {
            for(var i=0;i<result.length;i++){
                var song = result[i].attributes;
                var a = `
                <a href="#" data-id="${result[i].id}">
                <div class="a">
                    <div class="name">
                        <p>${song.name}</p>
                    </div>
                    <div class="author sq">${song.author} - ${song.album}</div>
                    <div class="icon-play"></div>
                </div>
            </a>
                `
                $('#search-result').append(a);
            }
            
        })
    }
    
}
//搜索歌手
function searchAuthor(value) {
    if(value === ''){
    }else{
        $('#search-result').empty()
        var query = new AV.Query('Song');
        query.contains('author', value);
        query.find().then(function (result) {
            for(var i=0;i<result.length;i++){
                var song = result[i].attributes;
                var a = `
                <a href="#" data-id="${result[i].id}">
                <div class="a">
                    <div class="name">
                        <p>${song.name}</p>
                    </div>
                    <div class="author sq">${song.author} - ${song.album}</div>
                    <div class="icon-play"></div>
                </div>
            </a>
                `
                $('#search-result').append(a);
            }
            
        })
    }
    
}