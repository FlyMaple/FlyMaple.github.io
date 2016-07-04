angular.module('TweetThemeApp')
.controller('indexController', ['$scope', '$window', '$location', '$timeout', function ($scope, $window, $location, $timeout) {
    $scope.switchHomePage = function () {
        $window.location.href = '#/home.html';
    };
    $scope.switchUserWallPage = function () {
        $window.location.href = '#/userWall.html';
    };
    $scope.switchStatisticsPage = function () {
        $window.location.href = '#/statistics.html';
    };

    $timeout(function () {
        //  變更視窗大小時
        $(window).on('resize', function () {
            $scope.homeInfoResize();
            $scope.homeHeaderResize();
        });

        //  捲動視窗時鎖定 info header nav
        $(window).on('scroll', function (ev) {
            var scrollY = ev.currentTarget.scrollY || ev.currentTarget.pageYOffset;
            if (scrollY >= 228) {
                $('.wrapper .main-wrp .container .content .home-info.userWall .home-header').addClass('fixed');
                $('.wrapper .main-wrp .container .content .home-info.userWall .home-content').addClass('fixed');
            } else {
                $('.wrapper .main-wrp .container .content .home-info.userWall .home-header').removeClass('fixed');
                $('.wrapper .main-wrp .container .content .home-info.userWall .home-content').removeClass('fixed');
            }
        });

        //  第一次網頁載入 resize event 會有問題，要先等一下在執行
        $timeout(function () {
            $scope.homeInfoResize();
            $scope.homeHeaderResize();
        }, 0);

        //  調整 home info header nav 寬度
        $scope.homeHeaderResize = function () {
            var $home_info = $('.wrapper .main-wrp .container .content .home-info');
            $('.wrapper .main-wrp .container .content .home-info .home-header').width($home_info.width());
        }

        //  調整 home info 寬度 / 高度
        $scope.homeInfoResize = function () {
            var infoWidth = $('.wrapper .main-wrp .container .content').width() - 300;
            var $homeInfo = $('.wrapper .main-wrp .container .content .home-info');
            $homeInfo.width(infoWidth);
            
            var containerHeight = $('.wrapper.open-menu .main-wrp .container').height();
            if (containerHeight > $homeInfo.height()) {
                $homeInfo.height(containerHeight - 50);
            } else {
                $homeInfo.css({height: 'auto'});
            }
        }
    }, 100);
}]);