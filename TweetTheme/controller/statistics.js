angular.module('TweetThemeApp')
.controller('statisticsController', ['$scope', '$window', '$location', '$timeout', function ($scope, $window, $location, $timeout) {
    $timeout(function () {
        $scope.homeHeaderResize();
        $scope.homeInfoResize();

        //  HOME 主要導覽列
        $('.wrapper .main-wrp .container .content .home-info .home-header .home-info-nav li').on('click', function (ev) {
            var li_list = $('.wrapper .main-wrp .container .content .home-info .home-header .home-info-nav li');
            li_list.removeClass('active');
            $(this).addClass('active');
        });

        $('#voyt_chart').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050', '2080', '2100', '2150', '2180', '2200', '2230', '2245', '2260', '2290', '2300', '2330'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Billions'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000;
                    }
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' millions'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'Asia',
                data: [502, 835, 409, 547, 1402, 734, 1068, 333, 840, 680, 409, 547, 1402, 734, 1068, 333, 840, 654]
            }]
        });

        $('#popular_chart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
            },
            series: [{
                name: 'Population',
                data: [
                    ['', 23.7],
                    ['', 16.1],
                    ['', 14.2],
                    ['', 14.0],
                    ['', 12.5],
                    ['', 11.1],
                    ['', 11.1],
                    ['', 10.5],
                    ['', 10.4],
                    ['', 10.0],
                    ['', 9.3],
                    ['', 9.3],
                    ['', 9.0],
                    ['', 11.1],
                    ['', 11.1],
                    ['', 10.5],
                    ['', 10.4],
                    ['', 10.0],
                    ['', 9.3],
                    ['', 9.3],
                    ['', 9.0],
                    ['', 8.9],
                    ['', 8.9],
                    ['', 11.1],
                    ['', 11.1],
                    ['', 10.5],
                    ['', 10.4],
                    ['', 10.0],
                    ['', 9.3],
                    ['', 9.3],
                    ['', 9.0],
                    ['', 11.1],
                    ['', 10.5],
                    ['', 10.4],
                    ['', 10.0],
                ],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    }, 300);
}]);