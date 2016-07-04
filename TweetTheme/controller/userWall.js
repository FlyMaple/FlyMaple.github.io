angular.module('TweetThemeApp')
.controller('userWallController', ['$scope', '$window', '$location', '$timeout', function ($scope, $window, $location, $timeout) {
    $timeout(function () {
        $scope.homeInfoResize();
        $scope.homeHeaderResize();

        //  HOME 主要導覽列
        $('.wrapper .main-wrp .container .content .home-info .home-header .home-info-nav li').on('click', function (ev) {
            var li_list = $('.wrapper .main-wrp .container .content .home-info .home-header .home-info-nav li');
            li_list.removeClass('active');
            $(this).addClass('active');
        });
    }, 300);
}]);