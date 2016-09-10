1. Chrome 打開 [PGK](https://pkget.com/)
2. 開啟 F12
3. 貼下第一段 code 執行
``` JS
$('.text-wrap').remove();
$('#map').css('height', '860px');
google.maps.event.trigger(map, "resize");
$('#update').click();
```
4. 將地圖大小和位置調整到適合抓寶範圍，按下地圖左上角的更新
5. 將你的 email 輸入進去，複製第二段 code 並執行，保持瀏覽器 & F12 開啟狀態
``` JS
(function () {
  window._toWho = '';
  window._uurl;
  window._mailed_list = []; //  已經通知的寶可夢
  window._pokemonsMap = [{"no":"001","name":"妙蛙種子"},{"no":"002","name":"妙蛙草"},{"no":"003","name":"妙蛙花"},{"no":"004","name":"小火龍"},{"no":"005","name":"火恐龍"},{"no":"006","name":"噴火龍"},{"no":"007","name":"傑尼龜"},{"no":"008","name":"卡咪龜"},{"no":"009","name":"水箭龜"},{"no":"010","name":"綠毛蟲"},{"no":"011","name":"鐵甲蛹"},{"no":"012","name":"巴大蝴"},{"no":"013","name":"獨角蟲"},{"no":"014","name":"鐵殼昆"},{"no":"015","name":"大針蜂"},{"no":"016","name":"波波"},{"no":"017","name":"比比鳥"},{"no":"018","name":"比雕"},{"no":"019","name":"小拉達"},{"no":"020","name":"拉達"},{"no":"021","name":"烈雀"},{"no":"022","name":"大嘴雀"},{"no":"023","name":"阿柏蛇"},{"no":"024","name":"阿柏怪"},{"no":"025","name":"皮卡丘"},{"no":"026","name":"雷丘"},{"no":"027","name":"穿山鼠"},{"no":"028","name":"穿山王"},{"no":"029","name":"尼多蘭"},{"no":"030","name":"尼多娜"},{"no":"031","name":"尼多后"},{"no":"032","name":"尼多朗"},{"no":"033","name":"尼多力諾"},{"no":"034","name":"尼多王"},{"no":"035","name":"皮皮"},{"no":"036","name":"皮可西"},{"no":"037","name":"六尾"},{"no":"038","name":"九尾"},{"no":"039","name":"胖丁"},{"no":"040","name":"胖可丁"},{"no":"041","name":"超音蝠"},{"no":"042","name":"大嘴蝠"},{"no":"043","name":"走路草"},{"no":"044","name":"臭臭花"},{"no":"045","name":"霸王花"},{"no":"046","name":"派拉斯"},{"no":"047","name":"派拉斯特"},{"no":"048","name":"毛球"},{"no":"049","name":"末入蛾"},{"no":"050","name":"地鼠"},{"no":"051","name":"三地鼠"},{"no":"052","name":"喵喵"},{"no":"053","name":"貓老大"},{"no":"054","name":"可達鴨"},{"no":"055","name":"哥達鴨"},{"no":"056","name":"猴怪"},{"no":"057","name":"火爆猴"},{"no":"058","name":"卡蒂狗"},{"no":"059","name":"風速狗"},{"no":"060","name":"蚊香蝌蚪"},{"no":"061","name":"蚊香蛙"},{"no":"062","name":"快泳蛙"},{"no":"063","name":"凱西"},{"no":"064","name":"勇吉拉"},{"no":"065","name":"胡地"},{"no":"066","name":"腕力"},{"no":"067","name":"豪力"},{"no":"068","name":"怪力"},{"no":"069","name":"喇叭芽"},{"no":"070","name":"口呆花"},{"no":"071","name":"大食花"},{"no":"072","name":"瑪瑙水母"},{"no":"073","name":"毒刺水母"},{"no":"074","name":"小拳石"},{"no":"075","name":"隆隆石"},{"no":"076","name":"隆隆岩"},{"no":"077","name":"小火馬"},{"no":"078","name":"烈焰馬"},{"no":"079","name":"呆呆獸"},{"no":"080","name":"呆河馬"},{"no":"081","name":"小磁怪"},{"no":"082","name":"三合一磁怪"},{"no":"083","name":"大蔥鴨"},{"no":"084","name":"嘟嘟"},{"no":"085","name":"嘟嘟利"},{"no":"086","name":"小海獅"},{"no":"087","name":"白海獅"},{"no":"088","name":"臭泥"},{"no":"089","name":"臭臭泥"},{"no":"090","name":"大舌貝"},{"no":"091","name":"鐵甲貝"},{"no":"092","name":"鬼斯"},{"no":"093","name":"鬼斯通"},{"no":"094","name":"耿鬼"},{"no":"095","name":"大岩蛇"},{"no":"096","name":"素利普"},{"no":"097","name":"素利拍"},{"no":"098","name":"大鉗蟹"},{"no":"099","name":"巨鉗蟹"},{"no":"100","name":"雷電球"},{"no":"101","name":"頑皮彈"},{"no":"102","name":"蛋蛋"},{"no":"103","name":"椰蛋樹"},{"no":"104","name":"可拉可拉"},{"no":"105","name":"嗄拉嗄拉"},{"no":"106","name":"沙瓦郎"},{"no":"107","name":"艾比郎"},{"no":"108","name":"大舌頭"},{"no":"109","name":"瓦斯彈"},{"no":"110","name":"雙彈瓦斯"},{"no":"111","name":"鐵甲犀牛"},{"no":"112","name":"鐵甲暴龍"},{"no":"113","name":"吉利蛋"},{"no":"114","name":"蔓藤怪"},{"no":"115","name":"袋龍"},{"no":"116","name":"墨海馬"},{"no":"117","name":"海刺龍"},{"no":"118","name":"角金魚"},{"no":"119","name":"金魚王"},{"no":"120","name":"海星星"},{"no":"121","name":"寶石海星"},{"no":"122","name":"吸盤魔偶"},{"no":"123","name":"飛天螳螂"},{"no":"124","name":"迷唇姊"},{"no":"125","name":"電擊獸"},{"no":"126","name":"鴨嘴火龍"},{"no":"127","name":"大甲"},{"no":"128","name":"肯泰羅"},{"no":"129","name":"鯉魚王"},{"no":"130","name":"暴鯉龍"},{"no":"131","name":"乘龍"},{"no":"132","name":"百變怪"},{"no":"133","name":"伊布"},{"no":"134","name":"水精靈"},{"no":"135","name":"雷精靈"},{"no":"136","name":"火精靈"},{"no":"137","name":"３Ｄ龍"},{"no":"138","name":"菊石獸"},{"no":"139","name":"多刺菊石獸"},{"no":"140","name":"化石盔"},{"no":"141","name":"鐮刀盔"},{"no":"142","name":"化石翼龍"},{"no":"143","name":"卡比獸"},{"no":"144","name":"急凍鳥"},{"no":"145","name":"閃電鳥"},{"no":"146","name":"火焰鳥"},{"no":"147","name":"迷你龍"},{"no":"148","name":"哈克龍"},{"no":"149","name":"快龍"},{"no":"150","name":"超夢"},{"no":"151","name":"夢幻"}];
  window._needs = [3,5,6,8,9,12,26,28,31,34,38,40,45,53,57,59,64,65,67,68,71,76,78,89,91,94,97,103,105,106,107,108,110,113,112,124,125,126,130,131,134,135,136,137,139,141,142,143,147,148,149,51,62,115,122,128,132,144,146,145,151,150];
  $(document).ajaxComplete(function (ev, o1, o2) {
      console.log();
      if (o2.url.indexOf('pkm222.aspx') !== -1) {
          window._uurl = o2.url;
          console.log(window._uurl);
          // var querystring = o2.url.split('?')[1];
          // var enums = querystring.split('&');

          // var qO = {};
          // for (var i=0; i<enums.length; i++) {
          //     var param = enums[i];
          //     var key = param.split('=')[0];
          //     var val = param.split('=')[1];
          //     qO[key] = val;
          // }
      }
  });

  function query() {
      $.ajax({
          url: window._uurl, 
          type: 'get',
          dataType: 'json',
          success: function (resp) {
              var pk123 = resp.pk123;
              for (var i=0; i<pk123.length; i++) {
                  var pokemon = pk123[i];
                  var id = parseInt(pokemon.d1);
                  var minute = Math.floor(((parseInt(pokemon.d3) - Date.now()) / 1000 / 60)) + '分';
                  var second = Math.floor(((parseInt(pokemon.d3) - Date.now()) / 1000 % 60)) + '秒';
                  var map_link = 'https://www.google.com.tw/maps/place/' + pokemon.d4 + '%20' + pokemon.d5;
                  if (window._needs.indexOf(id) !== -1) {
                      var find_pokemon = window._pokemonsMap.find(function (e, i) {
                          if (parseInt(e.no) === id) {
                              return true;
                          }
                      });

                      if (find_pokemon === null || find_pokemon === undefined) {
                          continue;
                      } else {
                          var ppp = window._mailed_list.find(function (e, i) {
                              if (e.d1 === pokemon.d1 && 
                                  e.d3 === pokemon.d3 &&
                                  e.d4 === pokemon.d4 &&
                                  e.d5 === pokemon.d5 &&
                                  e.d7 === pokemon.d7 &&
                                  e.d8 === pokemon.d8) {
                                      return true;
                              }
                          });
                          
                          if (ppp) {
                              continue;
                          } else {
                              window._mailed_list.push(pokemon);
                          }
                      }
                      
                      var jsonData = {
                          center: pokemon.d4 + ',' + pokemon.d5,
                          name: find_pokemon.name,
                          id: id,
                          expire: minute + ' ' + second,
                          map_link: map_link,
                          toWho: window._toWho
                      }

                      $.ajax({
                          url: 'https://script.google.com/macros/s/AKfycby_XE9w0D1qa1s7DKtsT6y-bPu6SBRDCq3TVaKKDsyGCGNW4d4/exec',
                          type: 'get',
                          data: jsonData,
                          success: function (resp) {
                              console.log('Email Send Success!');
                          },
                          error: function (resp) {
                              console.log('Email Call Api Error');
                              console.log(resp);
                          }
                      });
                  }
              }
          },
          error: function (e) {
              console.log(e);
          }
      });
  }

  setInterval(query, 60 * 1000);
  $('#update').click();
  console.info('已開始掃描，若有設定怪，會寄信通知');
  query();
})();
```
