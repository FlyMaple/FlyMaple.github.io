(function (jQuery) {
    'use strict';

    window._sysno = 1;
    window._alert_list = [];

    var pokemonsMap = [{"no":"001","name":"妙蛙種子"},{"no":"002","name":"妙蛙草"},{"no":"003","name":"妙蛙花"},{"no":"004","name":"小火龍"},{"no":"005","name":"火恐龍"},{"no":"006","name":"噴火龍"},{"no":"007","name":"傑尼龜"},{"no":"008","name":"卡咪龜"},{"no":"009","name":"水箭龜"},{"no":"010","name":"綠毛蟲"},{"no":"011","name":"鐵甲蛹"},{"no":"012","name":"巴大蝴"},{"no":"013","name":"獨角蟲"},{"no":"014","name":"鐵殼昆"},{"no":"015","name":"大針蜂"},{"no":"016","name":"波波"},{"no":"017","name":"比比鳥"},{"no":"018","name":"比雕"},{"no":"019","name":"小拉達"},{"no":"020","name":"拉達"},{"no":"021","name":"烈雀"},{"no":"022","name":"大嘴雀"},{"no":"023","name":"阿柏蛇"},{"no":"024","name":"阿柏怪"},{"no":"025","name":"皮卡丘"},{"no":"026","name":"雷丘"},{"no":"027","name":"穿山鼠"},{"no":"028","name":"穿山王"},{"no":"029","name":"尼多蘭"},{"no":"030","name":"尼多娜"},{"no":"031","name":"尼多后"},{"no":"032","name":"尼多朗"},{"no":"033","name":"尼多力諾"},{"no":"034","name":"尼多王"},{"no":"035","name":"皮皮"},{"no":"036","name":"皮可西"},{"no":"037","name":"六尾"},{"no":"038","name":"九尾"},{"no":"039","name":"胖丁"},{"no":"040","name":"胖可丁"},{"no":"041","name":"超音蝠"},{"no":"042","name":"大嘴蝠"},{"no":"043","name":"走路草"},{"no":"044","name":"臭臭花"},{"no":"045","name":"霸王花"},{"no":"046","name":"派拉斯"},{"no":"047","name":"派拉斯特"},{"no":"048","name":"毛球"},{"no":"049","name":"末入蛾"},{"no":"050","name":"地鼠"},{"no":"051","name":"三地鼠"},{"no":"052","name":"喵喵"},{"no":"053","name":"貓老大"},{"no":"054","name":"可達鴨"},{"no":"055","name":"哥達鴨"},{"no":"056","name":"猴怪"},{"no":"057","name":"火爆猴"},{"no":"058","name":"卡蒂狗"},{"no":"059","name":"風速狗"},{"no":"060","name":"蚊香蝌蚪"},{"no":"061","name":"蚊香蛙"},{"no":"062","name":"快泳蛙"},{"no":"063","name":"凱西"},{"no":"064","name":"勇吉拉"},{"no":"065","name":"胡地"},{"no":"066","name":"腕力"},{"no":"067","name":"豪力"},{"no":"068","name":"怪力"},{"no":"069","name":"喇叭芽"},{"no":"070","name":"口呆花"},{"no":"071","name":"大食花"},{"no":"072","name":"瑪瑙水母"},{"no":"073","name":"毒刺水母"},{"no":"074","name":"小拳石"},{"no":"075","name":"隆隆石"},{"no":"076","name":"隆隆岩"},{"no":"077","name":"小火馬"},{"no":"078","name":"烈焰馬"},{"no":"079","name":"呆呆獸"},{"no":"080","name":"呆河馬"},{"no":"081","name":"小磁怪"},{"no":"082","name":"三合一磁怪"},{"no":"083","name":"大蔥鴨"},{"no":"084","name":"嘟嘟"},{"no":"085","name":"嘟嘟利"},{"no":"086","name":"小海獅"},{"no":"087","name":"白海獅"},{"no":"088","name":"臭泥"},{"no":"089","name":"臭臭泥"},{"no":"090","name":"大舌貝"},{"no":"091","name":"鐵甲貝"},{"no":"092","name":"鬼斯"},{"no":"093","name":"鬼斯通"},{"no":"094","name":"耿鬼"},{"no":"095","name":"大岩蛇"},{"no":"096","name":"素利普"},{"no":"097","name":"素利拍"},{"no":"098","name":"大鉗蟹"},{"no":"099","name":"巨鉗蟹"},{"no":"100","name":"雷電球"},{"no":"101","name":"頑皮彈"},{"no":"102","name":"蛋蛋"},{"no":"103","name":"椰蛋樹"},{"no":"104","name":"可拉可拉"},{"no":"105","name":"嗄拉嗄拉"},{"no":"106","name":"沙瓦郎"},{"no":"107","name":"艾比郎"},{"no":"108","name":"大舌頭"},{"no":"109","name":"瓦斯彈"},{"no":"110","name":"雙彈瓦斯"},{"no":"111","name":"鐵甲犀牛"},{"no":"112","name":"鐵甲暴龍"},{"no":"113","name":"吉利蛋"},{"no":"114","name":"蔓藤怪"},{"no":"115","name":"袋龍"},{"no":"116","name":"墨海馬"},{"no":"117","name":"海刺龍"},{"no":"118","name":"角金魚"},{"no":"119","name":"金魚王"},{"no":"120","name":"海星星"},{"no":"121","name":"寶石海星"},{"no":"122","name":"吸盤魔偶"},{"no":"123","name":"飛天螳螂"},{"no":"124","name":"迷唇姊"},{"no":"125","name":"電擊獸"},{"no":"126","name":"鴨嘴火龍"},{"no":"127","name":"大甲"},{"no":"128","name":"肯泰羅"},{"no":"129","name":"鯉魚王"},{"no":"130","name":"暴鯉龍"},{"no":"131","name":"乘龍"},{"no":"132","name":"百變怪"},{"no":"133","name":"伊布"},{"no":"134","name":"水精靈"},{"no":"135","name":"雷精靈"},{"no":"136","name":"火精靈"},{"no":"137","name":"３Ｄ龍"},{"no":"138","name":"菊石獸"},{"no":"139","name":"多刺菊石獸"},{"no":"140","name":"化石盔"},{"no":"141","name":"鐮刀盔"},{"no":"142","name":"化石翼龍"},{"no":"143","name":"卡比獸"},{"no":"144","name":"急凍鳥"},{"no":"145","name":"閃電鳥"},{"no":"146","name":"火焰鳥"},{"no":"147","name":"迷你龍"},{"no":"148","name":"哈克龍"},{"no":"149","name":"快龍"},{"no":"150","name":"超夢"},{"no":"151","name":"夢幻"}];

    jQuery(document).ready(function () {
        modalInit();
        // radarParse();
        // setInterval(radarParse, 30000);
    });

    window.onload = function () {
        jQuery('.wrapper').removeClass('lock');
    };

    function modalInit() {
        jQuery('.modal').each(function (idx, el) {
            var $modal = $(el);
            var isInit = $modal.data('isInit');

            if (isInit === undefined || isInit === false) {
                // $modal.on('click', function (ev) {
                //     $(this).fadeOut();
                // });
                $modal.children().on('click', function (ev) {
                    ev.stopPropagation();
                });
            }
        });
    }
})($);

(function () {
    'use strict';

    var Pokemon = angular.module('Pokemon', []);

    Pokemon.constant('PokemonMap', [{"no":"001","name":"妙蛙種子"},{"no":"002","name":"妙蛙草"},{"no":"003","name":"妙蛙花"},{"no":"004","name":"小火龍"},{"no":"005","name":"火恐龍"},{"no":"006","name":"噴火龍"},{"no":"007","name":"傑尼龜"},{"no":"008","name":"卡咪龜"},{"no":"009","name":"水箭龜"},{"no":"010","name":"綠毛蟲"},{"no":"011","name":"鐵甲蛹"},{"no":"012","name":"巴大蝴"},{"no":"013","name":"獨角蟲"},{"no":"014","name":"鐵殼昆"},{"no":"015","name":"大針蜂"},{"no":"016","name":"波波"},{"no":"017","name":"比比鳥"},{"no":"018","name":"比雕"},{"no":"019","name":"小拉達"},{"no":"020","name":"拉達"},{"no":"021","name":"烈雀"},{"no":"022","name":"大嘴雀"},{"no":"023","name":"阿柏蛇"},{"no":"024","name":"阿柏怪"},{"no":"025","name":"皮卡丘"},{"no":"026","name":"雷丘"},{"no":"027","name":"穿山鼠"},{"no":"028","name":"穿山王"},{"no":"029","name":"尼多蘭"},{"no":"030","name":"尼多娜"},{"no":"031","name":"尼多后"},{"no":"032","name":"尼多朗"},{"no":"033","name":"尼多力諾"},{"no":"034","name":"尼多王"},{"no":"035","name":"皮皮"},{"no":"036","name":"皮可西"},{"no":"037","name":"六尾"},{"no":"038","name":"九尾"},{"no":"039","name":"胖丁"},{"no":"040","name":"胖可丁"},{"no":"041","name":"超音蝠"},{"no":"042","name":"大嘴蝠"},{"no":"043","name":"走路草"},{"no":"044","name":"臭臭花"},{"no":"045","name":"霸王花"},{"no":"046","name":"派拉斯"},{"no":"047","name":"派拉斯特"},{"no":"048","name":"毛球"},{"no":"049","name":"末入蛾"},{"no":"050","name":"地鼠"},{"no":"051","name":"三地鼠"},{"no":"052","name":"喵喵"},{"no":"053","name":"貓老大"},{"no":"054","name":"可達鴨"},{"no":"055","name":"哥達鴨"},{"no":"056","name":"猴怪"},{"no":"057","name":"火爆猴"},{"no":"058","name":"卡蒂狗"},{"no":"059","name":"風速狗"},{"no":"060","name":"蚊香蝌蚪"},{"no":"061","name":"蚊香蛙"},{"no":"062","name":"快泳蛙"},{"no":"063","name":"凱西"},{"no":"064","name":"勇吉拉"},{"no":"065","name":"胡地"},{"no":"066","name":"腕力"},{"no":"067","name":"豪力"},{"no":"068","name":"怪力"},{"no":"069","name":"喇叭芽"},{"no":"070","name":"口呆花"},{"no":"071","name":"大食花"},{"no":"072","name":"瑪瑙水母"},{"no":"073","name":"毒刺水母"},{"no":"074","name":"小拳石"},{"no":"075","name":"隆隆石"},{"no":"076","name":"隆隆岩"},{"no":"077","name":"小火馬"},{"no":"078","name":"烈焰馬"},{"no":"079","name":"呆呆獸"},{"no":"080","name":"呆河馬"},{"no":"081","name":"小磁怪"},{"no":"082","name":"三合一磁怪"},{"no":"083","name":"大蔥鴨"},{"no":"084","name":"嘟嘟"},{"no":"085","name":"嘟嘟利"},{"no":"086","name":"小海獅"},{"no":"087","name":"白海獅"},{"no":"088","name":"臭泥"},{"no":"089","name":"臭臭泥"},{"no":"090","name":"大舌貝"},{"no":"091","name":"鐵甲貝"},{"no":"092","name":"鬼斯"},{"no":"093","name":"鬼斯通"},{"no":"094","name":"耿鬼"},{"no":"095","name":"大岩蛇"},{"no":"096","name":"素利普"},{"no":"097","name":"素利拍"},{"no":"098","name":"大鉗蟹"},{"no":"099","name":"巨鉗蟹"},{"no":"100","name":"雷電球"},{"no":"101","name":"頑皮彈"},{"no":"102","name":"蛋蛋"},{"no":"103","name":"椰蛋樹"},{"no":"104","name":"可拉可拉"},{"no":"105","name":"嗄拉嗄拉"},{"no":"106","name":"沙瓦郎"},{"no":"107","name":"艾比郎"},{"no":"108","name":"大舌頭"},{"no":"109","name":"瓦斯彈"},{"no":"110","name":"雙彈瓦斯"},{"no":"111","name":"鐵甲犀牛"},{"no":"112","name":"鐵甲暴龍"},{"no":"113","name":"吉利蛋"},{"no":"114","name":"蔓藤怪"},{"no":"115","name":"袋龍"},{"no":"116","name":"墨海馬"},{"no":"117","name":"海刺龍"},{"no":"118","name":"角金魚"},{"no":"119","name":"金魚王"},{"no":"120","name":"海星星"},{"no":"121","name":"寶石海星"},{"no":"122","name":"吸盤魔偶"},{"no":"123","name":"飛天螳螂"},{"no":"124","name":"迷唇姊"},{"no":"125","name":"電擊獸"},{"no":"126","name":"鴨嘴火龍"},{"no":"127","name":"大甲"},{"no":"128","name":"肯泰羅"},{"no":"129","name":"鯉魚王"},{"no":"130","name":"暴鯉龍"},{"no":"131","name":"乘龍"},{"no":"132","name":"百變怪"},{"no":"133","name":"伊布"},{"no":"134","name":"水精靈"},{"no":"135","name":"雷精靈"},{"no":"136","name":"火精靈"},{"no":"137","name":"３Ｄ龍"},{"no":"138","name":"菊石獸"},{"no":"139","name":"多刺菊石獸"},{"no":"140","name":"化石盔"},{"no":"141","name":"鐮刀盔"},{"no":"142","name":"化石翼龍"},{"no":"143","name":"卡比獸"},{"no":"144","name":"急凍鳥"},{"no":"145","name":"閃電鳥"},{"no":"146","name":"火焰鳥"},{"no":"147","name":"迷你龍"},{"no":"148","name":"哈克龍"},{"no":"149","name":"快龍"},{"no":"150","name":"超夢"},{"no":"151","name":"夢幻"}])

    Pokemon.filter('range', function() {
        return function(input, total) {
            total = parseInt(total);

            for (var i=0; i<total; i++) {
                input.push(i);
            }

            return input;
        };
    });

    Pokemon.service('PokemonService', [function () {
        var pokemonModalType = 'record';
        var pokemonModalDataOfRecord = [2,3,4,5,6,7,8,9,12,15,18,22,24,25,26,28,31,34,37,38,45,47,49,51,53,55,57,58,59,62,64,65,66,67,68,71,73,75,76,77,78,80,81,82,83,85,87,88,89,91,93,94,95,96,97,99,100,101,103,104,105,106,107,108,110,112,113,115,117,119,121,122,123,124,125,126,128,130,131,132,134,135,136,137,139,140,141,142,143,147,148,149,150,151,1,61,109,40,36];
        var pokemonModalDataOfNeed = [  ];
        var pokemonModalDataOfRecord_backup = [];
        var pokemonModalDataOfNeed_backup = [];
        
        this.getPokemonModalType = getPokemonModalType;
        this.setPokemonModalType = setPokemonModalType;
        this.getPokemonModalDataOfRecord = getPokemonModalDataOfRecord;
        this.getPokemonModalDataOfNeed = getPokemonModalDataOfNeed;
        this.getPokemonModalData = getPokemonModalData;
        this.setPokemonModalData = setPokemonModalData;
        this.resetPokemonModalData = resetPokemonModalData;
        this.resetPokemonModalDataOfRecord = resetPokemonModalDataOfRecord;
        this.resetPokemonModalDataOfNeed = resetPokemonModalDataOfNeed;
        this.backupPokemonModalData = backupPokemonModalData;

        function getPokemonModalType() {
            return pokemonModalType;
        }

        function setPokemonModalType(type) {
            pokemonModalType = type;
        }

        function getPokemonModalDataOfRecord() {
            return pokemonModalDataOfRecord;
        }

        function getPokemonModalDataOfNeed() {
            return pokemonModalDataOfNeed;
        }

        function getPokemonModalData() {
            if (this.getPokemonModalType() === 'record') {
                return pokemonModalDataOfRecord;
            } else if (this.getPokemonModalType() === 'need') {
                return pokemonModalDataOfNeed;
            }
        }

        function setPokemonModalData(data) {
            if (this.getPokemonModalType() === 'record') {
                pokemonModalDataOfRecord = data;
            } else if (this.getPokemonModalType() === 'need') {
                pokemonModalDataOfNeed = data;
            }
        }

        function resetPokemonModalData() {
            if (this.getPokemonModalType() === 'record') {
                this.resetPokemonModalDataOfRecord();
            } else if (this.getPokemonModalType() === 'need') {
                this.resetPokemonModalDataOfNeed();
            }
        }

        function resetPokemonModalDataOfRecord() {
            angular.copy(pokemonModalDataOfRecord_backup, pokemonModalDataOfRecord);
        }

        function resetPokemonModalDataOfNeed () {
            angular.copy(pokemonModalDataOfNeed_backup, pokemonModalDataOfNeed);
        }

        function backupPokemonModalData() {
            if (this.getPokemonModalType() === 'record') {
                angular.copy(pokemonModalDataOfRecord, pokemonModalDataOfRecord_backup);
            } else if (this.getPokemonModalType() === 'need') {
                angular.copy(pokemonModalDataOfNeed, pokemonModalDataOfNeed_backup);
            }
        }
    }]);

    Pokemon.controller('pokemonController', ['PokemonService', 'PokemonMap', '$scope', '$timeout' , function (PokemonService, PokemonMap, $scope, $timeout) {
        $scope.setting = { url: 'https://www.pokeradar.io/api/v1/submissions?deviceId=c7d3b47063cb11e6aa59b985287aa853&minLatitude=24.774519432328972&maxLatitude=24.79199426669323&minLongitude=121.00549936294556&maxLongitude=121.0310125350952&pokemonId=0' };
        $scope.openPokemonsModal = openPokemonsModal;
        $scope.getSelectedPokemons = getSelectedPokemons;
        $scope.saveSetting = saveSetting;
        $scope.scan = scan;

        function openPokemonsModal(type) {
            PokemonService.setPokemonModalType(type);
            PokemonService.backupPokemonModalData();
            jQuery('#pokemonsModal').fadeIn();
        }

        function getSelectedPokemons(type) {
            if (type === 'record') {
                return JSON.stringify(PokemonService.getPokemonModalDataOfRecord());
            } else {
                return JSON.stringify(PokemonService.getPokemonModalDataOfNeed());
            }
        }

        function saveSetting() {
            if ($scope.scanId) {
                clearInterval($scope.scanId);
                delete $scope.scanId;
            }

            $scope.setting.records = [];
            $scope.setting.needs = [];
            angular.copy(PokemonService.getPokemonModalDataOfRecord(), $scope.setting.records);
            angular.copy(PokemonService.getPokemonModalDataOfNeed(), $scope.setting.needs);
            $scope.setting.isOK = true;
        }

        function scan() {
            radarParse();
            if ($scope.setting.scanValue === undefined) {
                $scope.setting.scanValue = 150;
            }
            $scope.scanId = setInterval(radarParse, $scope.setting.scanValue*1000);
            $scope.setting.isOK = false;
        }

        function radarParse() {
            // if (window._sysno > 200) {
            //     jQuery('.record-wrp').empty();
            //     window._sysno = 1;
            // }


            var unlimited = $scope.setting.unlimit;
            var record_list = $scope.setting.records;
            var i_need_list = $scope.setting.needs;

            $.ajax({
                url: $scope.setting.url,
                type: 'get',
                success: function (resp) {
                    var svrPokemons = resp.data;
                    var record_filter; 
                    if (unlimited) {
                        record_filter = svrPokemons;
                    } else {
                        record_filter = svrPokemons.filter(function(e, i) {
                            if (record_list.indexOf(parseInt(e.pokemonId)) !== -1) {
                                return true;
                            }
                        });
                    }
                    
                    for (var i=0; i<record_filter.length; i++) {
                        var record = record_filter[i];
                        var name = PokemonMap.find(function (e, i) {  if (parseInt(e.no) === parseInt(record.pokemonId)) { return true; } }).name;
                        var created_date = new Date(parseInt(record.created) * 1000);
                        var format_created = created_date.getFullYear() + '/' + (created_date.getMonth()+1) + '/' + created_date.getDate() + ' ' + created_date.getHours() + ':' + created_date.getMinutes() + ':' + created_date.getSeconds();
                        var expired_time = new Date(created_date.getTime() + (15*60*1000) - Date.now() ).getMinutes();
                        var map_link = 'https://www.google.com.tw/maps/place/' + record.latitude + '%20' + record.longitude
                        if (expired_time < 5 || expired_time > 15) { 
                            continue;
                        }
                        
                        var isRecord = false, isPlayer = false, isNeed = false;
                        if (record.trainerName === '(Poke Radar Prediction)') {
                            isRecord = true;
                        } else {
                            if ((record.upvotes + record.downvotes) > 3) {
                                if ((record.upvotes / (record.upvotes + record.downvotes) > 0.5)) {
                                    isRecord = true;
                                    isPlayer = true;
                                }
                            }
                        }

                        if (isRecord) {
                            if (i_need_list.indexOf(parseInt(record.pokemonId)) !== -1) {
                                isNeed = true;
                            }

                            if (isNeed) {
                                var isExist = window._alert_list.find(function (el, idx) {
                                    if ((el.created === record.created) && el.pokemonId === record.pokemonId && el.latitude === record.latitude && el.longitude === record.longitude) {
                                        return true;
                                    }
                                });
                                if (!isExist) {
                                    window._alert_list.push(record);
                                    alert('【' + name + '】 出現了!!!!!!');
                                }
                            }
                            
                            var type = isPlayer ? 'Player' : 'Prediction';
                            var $item = jQuery('<div class="record-item">\
                                                    <span class="no">' + window._sysno++ + '</span>\
                                                    <img src="images/pooooo/' + record.pokemonId + '.png" alt="" class="icon">\
                                                    <span class="name">' + name + '</span>\
                                                    <span class="type">' + type + '</span>\
                                                    <span class="helpful">' + Math.floor((record.upvotes / (record.upvotes + record.downvotes)) * 100) + '% (' + record.upvotes + '/' + record.downvotes +')</span>\
                                                    <span class="created">' + format_created + '</span>\
                                                    <span class="expire">' + expired_time + '分鐘</span>\
                                                    <a href="' + map_link + '" target="_blank" class="map-link">Map</a>\
                                                </div>');

                            if (isNeed) {
                                $item.addClass('need');
                            }
                            jQuery('.record-wrp').prepend($item);
                        }
                    }

                    var $item = jQuery('<div class="record-item success"></div>');
                    jQuery('.record-wrp').prepend($item);
                },
                error: function () {
                    console.error('==== Error ====');
                    console.dir(arguments);
                }
            });
        }

        $timeout(function () {
            jQuery( ".scanBar" ).slider({
                min: 10,
                max: 310,
                step: 30,
                value: 160,
                slide: function( event, ui ) {
                    var value = ui.value - 10;
                    if (value === 0) {
                        value = 10
                    }
                    if (value < 60) {
                        $('.scanBar ~ .timeLabel').text(value + '秒');
                    } else {
                        $('.scanBar ~ .timeLabel').text(Math.floor(value/60) + '分 ' + value%60 + '秒');
                    }

                    $scope.$apply(function () {
                        $scope.setting.scanValue = value;
                    });
                }
            });
        }, 0);
    }]);

    Pokemon.controller('pokemonModalController', ['PokemonService', '$timeout', '$scope', function (PokemonService, $timeout, $scope) {
        $scope.isSelected = isSelected;
        $scope.selectPokemon = selectPokemon;
        $scope.setSelectPokemons = setSelectPokemons;
        $scope.closeModal = closeModal;

        function isSelected(id) {
            if (PokemonService.getPokemonModalData().indexOf(parseInt(id)) !== -1) {
                return true;
            }
            return false;
        }

        function selectPokemon(id) {
            var idx;
            if ((idx = PokemonService.getPokemonModalData().indexOf(parseInt(id))) !== -1) {
                PokemonService.getPokemonModalData().splice(idx, 1);
            } else {
                PokemonService.getPokemonModalData().push(id);
            }
        }

        function setSelectPokemons() {
            PokemonService.backupPokemonModalData();
            $scope.closeModal();
        }

        function closeModal() {
            jQuery('#pokemonsModal').fadeOut(function () {
                PokemonService.resetPokemonModalData();
            });
        }

        $timeout(function () {
            $(".pokemonsModal img").unveil(300);
        }, 300)
    }]);
})();
