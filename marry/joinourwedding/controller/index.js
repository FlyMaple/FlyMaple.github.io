angular.module('MarryApp')
.controller('indexController', ['$scope', '$window', '$location', '$timeout', '$http', function ($scope, $window, $location, $timeout, $http) {
    $scope.stepObj = {
        step: 'home'
    };

    $scope.penDataObj = {
        name: null,
        phone: null,
        joinOrNot: '參加',
        address: null,
        email: null,
        relation: null,
        adult: 1,
        kid: 0,
        vegetarian: false,
        vegetarianCount: 0,
        comment: null
    };

    $scope.isHomeStep = function () {
        return $scope.stepObj.step == 'home';
    };

    $scope.isPenStep = function () {
        return $scope.stepObj.step == 'pen';
    };

    $scope.isAlbumsStep = function () {
        return $scope.stepObj.step == 'albums';
    };

    $scope.isTrafficStep = function () {
        return $scope.stepObj.step == 'traffic';
    };

    $scope.switchHomePage = function () {
        $scope.stepObj.step = 'home';
    }

    $scope.switchPenPage = function () {
        $scope.stepObj.step = 'pen';
    }

    $scope.switchAlbumsPage = function () {
        $scope.stepObj.step = 'albums';

        setTimeout(function () {
            var containWidth = $('.step-albums').width() - 30;
            var rowWidth = 0;
            $('.step-albums').find('img').each(function (i, e) {
                var $e = $(this);
                var imgWidth = $e.width();
                var imgHeight = $e.height();
                var newHeight = 150;
                var newWidth = (newHeight / imgHeight) * imgWidth;
                
                if ((rowWidth + newWidth) > containWidth) {
                    if ((containWidth - rowWidth) >= 50) {
                        newWidth = containWidth - rowWidth;
                        rowWidth = 0;
                    } else {
                        rowWidth = newWidth;
                    }
                } else {
                    rowWidth += newWidth;
                }
                $e.css({ width: newWidth, height: newHeight }).fadeIn(1000);
            });
        }, 100);
    }

    $scope.switchTrafficPage = function () {
        $scope.stepObj.step = 'traffic';
    }

    $scope.setJoinOrNot = function (data) {
        $scope.penDataObj.joinOrNot = data;
        if (data == '參加') {
            $scope.setAdultCount(1);
            $scope.setKidCount(0);
        } else if (data == '不參加') {
            $scope.setAddress(null);
            $scope.setEmail(null);
            $scope.setRelation(null);
            $scope.setAdultCount(0);
            $scope.setKidCount(0);
            $scope.setVegetarian(false);
            $scope.setVegetarianCount(0);
        } else if (data == '寄喜帖') {
            $scope.setRelation(null);
            $scope.setAdultCount(0);
            $scope.setKidCount(0);
            $scope.setVegetarian(false);
            $scope.setVegetarianCount(0);
        }
    }

    $scope.setName = function (name) {
        $scope.penDataObj.name = name;
    };

    $scope.setPhone = function (phone) {
        $scope.penDataObj.phone = naphoneme;
    };

    $scope.setAddress = function (address) {
        $scope.penDataObj.address = address;
    };

    $scope.setEmail = function (email) {
        $scope.penDataObj.email = email;
    };

    $scope.getJoinOrNot = function () {
        return $scope.penDataObj.joinOrNot;
    };

    $scope.checkJoinOrNotVaild = function () {
        if ($scope.penDataObj.joinOrNot != '參加' &&
            $scope.penDataObj.joinOrNot != '不參加' &&
            $scope.penDataObj.joinOrNot != '寄喜帖') {

            return false;
        }
        return true;
    };

    $scope.weddingCardIsDisabled = function () {
        if ($scope.penDataObj.joinOrNot == '不參加') {
            return true;
        }
        return false;
    };

    $scope.eWeddingCardIsDisabled = function () {
        if ($scope.penDataObj.joinOrNot == '不參加') {
            return true;
        }
        return false;
    };

    $scope.setRelation = function (data) {
        $scope.penDataObj.relation = data;
    };

    $scope.getRelation = function () {
        return $scope.penDataObj.relation;
    };

    $scope.relationIsDisabled = function () {
        if ($scope.penDataObj.joinOrNot == '不參加' || $scope.penDataObj.joinOrNot == '寄喜帖') {
            return true;
        }
        return false;
    };

    $scope.peopleCountIsDisabled = function () {
        if ($scope.penDataObj.joinOrNot == '不參加' || $scope.penDataObj.joinOrNot == '寄喜帖') {
            return true;
        }
        return false;
    };

    $scope.setAdultCount = function (count) {
        $scope.penDataObj.adult = count;
    };

    $scope.setKidCount = function (count) {
        $scope.penDataObj.kid = count;
    };

    $scope.setVegetarian = function (data) {
        $scope.penDataObj.vegetarian = data;
        if (!data) {
            $scope.setVegetarianCount(0);
        }
    };

    $scope.isVegetarian = function () {
        return $scope.penDataObj.vegetarian
    };

    $scope.setVegetarianCount = function (count) {
        $scope.penDataObj.vegetarianCount = count;
    };

    $scope.vegetarianIsDisabled = function () {
        if ($scope.penDataObj.joinOrNot == '不參加' || $scope.penDataObj.joinOrNot == '寄喜帖') {
            return true;
        }
        return false;
    };

    $scope.sendData = function () {
        $('.overlay').fadeToggle();
        $http({
            url: 'https://script.google.com/macros/s/AKfycbwwph2SBqSsKRPxBLlC8uPq6PmQcTur9Zto85Zv7bxQ3anVIUhh/exec', 
            method: "GET",
            params: $scope.penDataObj
        }).then(
            function (resp) {
                $('.overlay span').text("已經登記成功囉，即將跳轉到婚紗牆 ^_^");
                $timeout(function () {
                    $scope.switchAlbumsPage();
                    $('.overlay span').text("慢慢欣賞囉~");
                    $timeout(function () {
                        $scope.overlayHidden();
                    }, 1700);
                }, 3000);
            }, function (resp) {
                $('.overlay span').text("寫入失敗!");
            }
        );
    }

    $scope.overlayHidden = function (ev) {
        $('.overlay').fadeToggle(function () {
            $('span', this).text("資料寫入中...");
        });
    };

    $scope.modalClick = function (ev) {
        ev.stopPropagation();
    };

    $( '.swipebox' ).swipebox();
}])
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});;