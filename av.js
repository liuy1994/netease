var APP_ID = '1Qdc1TPXUizTEg6dQCV2CLPr-gzGzoHsz';
var APP_KEY = 'iocnXl16pNnwl7oSE1mObQFu';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
 
// 添加歌曲

// var Song = AV.Object.extend('Song');


// var song1 = new Song();
// song1.set('name','十冷进行曲')
// song1.set('author','戴荃')
// song1.set('album','十冷进行曲')
// song1.set('url','http://ovgp80g1r.bkt.clouddn.com/%E5%8D%81%E5%86%B7%E8%BF%9B%E8%A1%8C%E6%9B%B2.mp3')

// var song2 = new Song();
// song2.set('name','身旁')
// song2.set('author','韦礼安')
// song2.set('album','身旁')
// song2.set('url','http://ovgp80g1r.bkt.clouddn.com/%E8%BA%AB%E6%97%81.mp3')

// var song3 = new Song();
// song3.set('name','You are good')
// song3.set('author','青春学概论')
// song3.set('album','무궁화 꽃이 피었습니다 OST Part 11')
// song3.set('url','http://ovgp80g1r.bkt.clouddn.com/You%20Are%20Good.mp3')

// var song4 = new Song();
// song4.set('name','未单身')
// song4.set('author','A-Lin')
// song4.set('album','未单身')
// song4.set('url','http://ovgp80g1r.bkt.clouddn.com/%E6%9C%AA%E5%8D%95%E8%BA%AB.mp3')

// var song5 = new Song();
// song5.set('name','Walk On Water')
// song5.set('author','30 Seconds to Mars')
// song5.set('album','Walk On Water')
// song5.set('url','http://ovgp80g1r.bkt.clouddn.com/Walk%20on%20Water.mp3')

// var song6 = new Song();
// song6.set('name','Younger Now')
// song6.set('author','Miley Cyrus')
// song6.set('album','Younger Now')
// song6.set('url','http://ovgp80g1r.bkt.clouddn.com/Younger%20Now.mp3')

// var song7 = new Song();
// song7.set('name','邀君令')
// song7.set('author','小曲儿 / smlie——小千')
// song7.set('album','邀君令')
// song7.set('url','http://ovgp80g1r.bkt.clouddn.com/%E9%82%80%E5%90%9B%E4%BB%A4.mp3')

// var song8 = new Song();
// song8.set('name','我害怕')
// song8.set('author','薛之谦')
// song8.set('album','我害怕')
// song8.set('url','http://ovgp80g1r.bkt.clouddn.com/%E6%88%91%E5%AE%B3%E6%80%95.mp3')

// var song9 = new Song();
// song9.set('name','不见有情')
// song9.set('author','河图')
// song9.set('album','不见有情')
// song9.set('url','http://ovgp80g1r.bkt.clouddn.com/%E4%B8%8D%E8%A7%81%E6%9C%89%E6%83%85.mp3')

// var song10 = new Song();
// song10.set('name','What About Us')
// song10.set('author','P!nk')
// song10.set('album','What About Us')
// song10.set('url','http://ovgp80g1r.bkt.clouddn.com/What%20About%20Us.mp3')

// var song11 = new Song();
// song11.set('name','追光者')
// song11.set('author','岑宁儿')
// song11.set('album','夏至未至 影视原声带')
// song11.set('url','http://ovgp80g1r.bkt.clouddn.com/%E8%BF%BD%E5%85%89%E8%80%85.mp3')

// var song12 = new Song();
// song12.set('name','远走高飞')
// song12.set('author','金志文')
// song12.set('album','Hello 1')
// song12.set('url','http://ovgp80g1r.bkt.clouddn.com/%E8%BF%9C%E8%B5%B0%E9%AB%98%E9%A3%9E.mp3')

// var song13 = new Song();
// song13.set('name','非酋')
// song13.set('author','薛明媛 / 朱贺')
// song13.set('album','非酋')
// song13.set('url','http://ovgp80g1r.bkt.clouddn.com/%E9%9D%9E%E9%85%8B.mp3')

// var song14 = new Song();
// song14.set('name','Friends')
// song14.set('author','Justin Bieber / BloodPop')
// song14.set('album','Friends')
// song14.set('url','http://ovgp80g1r.bkt.clouddn.com/Friends.mp3')

// var song15 = new Song();
// song15.set('name','再也没有')
// song15.set('author','Ryan.B / AY楊佬叁')
// song15.set('album','再也没有')
// song15.set('url','http://ovgp80g1r.bkt.clouddn.com/%E5%86%8D%E4%B9%9F%E6%B2%A1%E6%9C%89.mp3')

// var song16 = new Song();
// song16.set('name','Despacito (Remix)')
// song16.set('author','Luis Fonsi / Daddy Yankee / Justin Bieber')
// song16.set('album','Despacito (Remix)')
// song16.set('url','http://ovgp80g1r.bkt.clouddn.com/Despacito%28Remix%29.mp3')

// var song17 = new Song();
// song17.set('name','全部都是你')
// song17.set('author','Dragon Pig / CNBALLER / CLOUD WANG')
// song17.set('album','全部都是你')
// song17.set('url','http://ovgp80g1r.bkt.clouddn.com/%E5%85%A8%E9%83%A8%E9%83%BD%E6%98%AF%E4%BD%A0.mp3')

// var song18 = new Song();
// song18.set('name','童话镇')
// song18.set('author','陈一发儿')
// song18.set('album','童话镇')
// song18.set('url','http://ovgp80g1r.bkt.clouddn.com/%E7%AB%A5%E8%AF%9D%E9%95%87.mp3')

// var song19 = new Song();
// song19.set('name','老大')
// song19.set('author','Bridge')
// song19.set('album','老大')
// song19.set('url','http://ovgp80g1r.bkt.clouddn.com/%E8%80%81%E5%A4%A7.mp3')

// var song20 = new Song();
// song20.set('name','成都')
// song20.set('author','赵雷')
// song20.set('album','成都')
// song20.set('url','http://ovgp80g1r.bkt.clouddn.com/%E6%88%90%E9%83%BD.mp3')

// var song21 = new Song();
// song21.set('name','九张机')
// song21.set('author','叶炫清')
// song21.set('album','九张机')
// song21.set('url','http://ovgp80g1r.bkt.clouddn.com/%E4%B9%9D%E5%BC%A0%E6%9C%BA.mp3')

// var song22 = new Song();
// song22.set('name','暧昧')
// song22.set('author','薛之谦')
// song22.set('album','暧昧')
// song22.set('url','http://ovgp80g1r.bkt.clouddn.com/%E6%9A%A7%E6%98%A7.mp3')

// var song23 = new Song();
// song23.set('name','带你去旅行')
// song23.set('author','校长')
// song23.set('album','带你去旅行')
// song23.set('url','http://ovgp80g1r.bkt.clouddn.com/%E5%A6%82%E6%9E%9C%E6%88%91%E7%88%B1%E4%BD%A0.mp3')

// var song24 = new Song();
// song24.set('name','Shape of You')
// song24.set('author','Ed Sheeran')
// song24.set('album','Shape of You')
// song24.set('url','http://ovgp80g1r.bkt.clouddn.com/Shape%20of%20You.mp3')

// var song25 = new Song();
// song25.set('name','如果我爱你')
// song25.set('author','周冬雨 / 张一山')
// song25.set('album','如果我爱你')
// song25.set('url','http://ovgp80g1r.bkt.clouddn.com/%E5%A6%82%E6%9E%9C%E6%88%91%E7%88%B1%E4%BD%A0.mp3')

// var song26 = new Song();
// song26.set('name','刚好遇见你')
// song26.set('author','李玉刚')
// song26.set('album','刚好遇见你')
// song26.set('url','http://ovgp80g1r.bkt.clouddn.com/%E5%88%9A%E5%A5%BD%E9%81%87%E8%A7%81%E4%BD%A0.mp3')

// var song27 = new Song();
// song27.set('name','I Am You')
// song27.set('author','Kim Taylor')
// song27.set('album','I Am You')
// song27.set('url','http://ovgp80g1r.bkt.clouddn.com/I%20Am%20You.mp3')

// var song28 = new Song();
// song28.set('name','纯白')
// song28.set('author','双笙 / V.K克')
// song28.set('album','纯白')
// song28.set('url','http://ovgp80g1r.bkt.clouddn.com/%E7%BA%AF%E7%99%BD.mp3')

// var song29 = new Song();
// song29.set('name','告白气球')
// song29.set('author','周杰伦')
// song29.set('album','告白气球')
// song29.set('url','http://ovgp80g1r.bkt.clouddn.com/%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83.mp3')


// var song30 = new Song();
// song30.set('name','欧皇')
// song30.set('author','薛明媛')
// song30.set('album','欧皇')
// song30.set('url','http://ovgp80g1r.bkt.clouddn.com/%E6%AC%A7%E7%9A%87.mp3')

// var songs = [song1,song2,song3,song4,song5,song6,song7,song8,song9,song10,song11,song12,song13,song14,song15,song16,song17,song18,song19,song20,song21,song22,song23,song24,song25,song26,song27,song28,song29,song30]
// AV.Object.saveAll(songs).then(function(object) {
//   alert('LeanCloud Rocks!');
// })
