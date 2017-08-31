//tab组件
$('ol#tabs').on('click', 'li', function (e) {
    let $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    $('#tabs-content').children().eq(index).addClass('active').siblings().removeClass('active')
})

//删除单条搜索记录
$('.search-history').on('click', '.icon-delete', function (e) {
    $(e.currentTarget).parent().remove()
})

//点击清空搜索
$('#icon-empty').on('click', function (e) {
    $('#search')[0].value = ''
    noinput()
})

//点击热门搜索
$('#search-hot').on('click', 'li', function (e) {
    $('#search')[0].value = e.currentTarget.innerText
    input()
})

//搜索框输入
$('#search').on('input', function (e) {    
    var value = $(e.currentTarget).val().trim()
    input()
    if (value === '') {
        noinput()
    }
    console.log($('#search-result')[0])

    
    if($('#search-result')[0].innerHTML === ''){
        console.log('')
    }else{
        console.log('')
    }
})


// input没有内容
function noinput() {
    $($('#note')[0]).removeClass('hiden')
    $($('.search-hot')[0]).removeClass('hiden')
    $($('#history-item')[0]).removeClass('hiden')
    $($('#search-content')[0]).addClass('hiden')
    $($('#icon-empty')[0]).addClass('hiden')
    $($('#search-result')[0]).addClass('hiden')
}

// input有内容
function input() {
    $($('#note')[0]).addClass('hiden')
    $($('.search-hot')[0]).addClass('hiden')
    $($('#history-item')[0]).addClass('hiden')
    $($('#search-content')[0]).removeClass('hiden')
    $($('#icon-empty')[0]).removeClass('hiden')
    $($('#search-result')[0]).removeClass('hiden')
    var value = $($('#search')[0]).val().trim()
    $($('#search-content')[0]).empty()
    var p = `
    <p>搜索“${value}”</p>
    <h5>搜索结果</h5>
    `
    $($('#search-content')[0]).append(p)
    
    searchName(value)
    searchAuthor(value)
}



//搜索歌曲
function searchName(value) {
    $('#search-result').empty()
    if (value === '') {
    } else {
        var query = new AV.Query('Song')
        query.contains('name', value)
        query.find().then(function (result) {
            search(result)
        })
    }
}

//搜索歌手
function searchAuthor(value) {
    $($('#search-result')[0]).empty()
    if (value === '') {
    } else {
        var query = new AV.Query('Song')
        query.contains('author', value)
        query.find().then(function (result) {
            search(result)
        })
    }
}

//搜索
function search(result) {
    for (var i = 0; i < result.length; i++) {
        var song = result[i].attributes
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
        $('#search-result').append(a)        
    }
}