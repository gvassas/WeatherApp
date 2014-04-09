forecastApp.factory("forecastService", function ($http) {
    'use strict';
    return {
        getForecast: function ($scope) {


            var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fweather.yahooapis.com%2Fforecastrss%3Fp%3DCAXX0518'&format=json&diagnostics=true&callback=";
            $http.get(url).success(function (data) {
                try {

                    var stringified = JSON.stringify(data);              // Convert to a string.
                    stringified = stringified.split("\\n").join(""); // Remove new line '/n'.
                    var listing = JSON.parse(stringified);           // Convert to object.

                    var forecast = [];
                    var dates = [];
                    var days = [];
                    var highs = [];
                    var lows = [];
                    var text = [];
                    var codes = [];// Store 5 day forecast.


                    for (var result in listing) {
                        for (var item in listing[result].results) {
                            for (var i in listing[result].results.item.forecast) {
                                forecast.push(listing[result].results.item.forecast[i]);
                                dates.push(listing[result].results.item.forecast[i].date.substring(0,6));
                                days.push(listing[result].results.item.forecast[i].day);
                                highs.push(((listing[result].results.item.forecast[i].high) - 32) * 5 / 9);
                                lows.push(((listing[result].results.item.forecast[i].low) - 32) * 5 / 9);
                                text.push(listing[result].results.item.forecast[i].text);
                                codes.push(listing[result].results.item.forecast[i].code)

                            }
                        }
                    }

                }
                catch (error) {
                    alert("Weather reading error:" + error.name + ": "
                        + error.message);
                }
                console.log(forecast);
                console.log(codes);
                $scope.forecast = forecast;
                var largest = Math.max.apply(Math, highs);

                $scope.chartConfig = {
                    options: {
                        chart: {
                            type: 'spline'
                        }
                    },

                    series: [

                        {
                            tooltip: {
                                shared: true,
                                crosshairs: true},
                            name: 'Highs',
                            lineColor: '#FF0000',
                            marker: {symbol: 'circle', fillColor: '#FFD700'},
                            data: [
                                    parseInt(highs[0]),
                                parseInt(highs[1]),
                                parseInt(highs[2]),
                                parseInt(highs[3]),
                                parseInt(highs[4])
                            ]
                        },
                        {
                            type: 'scatter',
                            showInLegend: false,
                            enableMouseTracking: false,
                            data: [{y: largest+2,
                                    marker: {
                                        symbol: 'url(http://l.yimg.com/a/i/us/we/52/'+codes[0]+'.gif)'
                                    }}, {y: largest+2,
                                marker: {
                                    symbol: 'url(http://l.yimg.com/a/i/us/we/52/'+codes[1]+'.gif)'
                                }}, {y: largest+2,
                                marker: {
                                    symbol: 'url(http://l.yimg.com/a/i/us/we/52/'+codes[2]+'.gif)'
                                }},{y: largest+2,
                                marker: {
                                    symbol: 'url(http://l.yimg.com/a/i/us/we/52/'+codes[3]+'.gif)'
                                }},{y: largest+2,
                                marker: {
                                    symbol: 'url(http://l.yimg.com/a/i/us/we/52/'+codes[4]+'.gif)'
                                }}]

                        },

                        {
                            tooltip: {
                                shared: true,
                                crosshairs: true},
                            lineColor: '#6495ED',
                            name: 'Lows',
                            marker: {symbol: 'diamond', fillColor: '#6495ED'},
                            data: [parseInt(lows[0]), parseInt(lows[1]), parseInt(lows[2]), parseInt(lows[3]), parseInt(lows[4]) ]
                        }
                    ],
                    title: {
                        text: 'Vancouver Weather'
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature'
                        },
                        labels: {
                            formatter: function () {
                                return this.value + '°C'
                            }
                        }
                    },
                    xAxis: {
                        categories: [days[0]+', ' +dates[0], days[1]+', ' +dates[1],days[2]+', ' + dates[2],days[3]+', ' + dates[3],days[4]+', ' + dates[4]]
                    },
                    loading: false
                }
            });
        }
    }
});
