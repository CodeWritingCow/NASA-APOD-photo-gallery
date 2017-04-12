/**
 * You must include the dependency on 'ngMaterial' 
 */
var app = angular.module('photoApp', ['ngMaterial']);

    // Get API token from server
    app.factory('tokenFactory', function($http){
      return {
        async: function (){
          return $http.get('/token');
        }
      };
    });

    // Create custom HTTP header name 'allow-access'
    app.factory('httpRequestInterceptor', function(){
      return {
        request: function(config) {
          config.headers['x-custom-header-name'] = 'allow-access';
          return config;
        }
      };
    });

    // Inject custom HTTP header name into http requests from Angular app
    app.config(function($httpProvider){
      $httpProvider.interceptors.push('httpRequestInterceptor');
    });

    app.controller('photoCtrl', function($scope, $http, $sce, tokenFactory) {
      tokenFactory.async().then(function(data){
        $scope.data = data;
        $scope.token = $scope.data.data.token;

        // Make call to NASA API using token returned by server.
        // Since the server response is asynchronous, it returns data that are "undefined" everywhere but here.
        $scope.loadPhoto($scope.NASA, $scope.token);
      });

      $scope.token;

      $scope.NASA = 'https://api.nasa.gov/planetary/apod?';
      $scope.customUrl = $scope.NASA + '&date=';
      $scope.customDate = new Date();
      $scope.minDate = new Date('1995-06-16');
      $scope.maxDate = new Date();
      $scope.videoUrl;
      
      // Get photo data from NASA API
      $scope.loadPhoto = function(url, token) {
        $http.get(url, {
          params: {api_key: token}
        }).then(function(response) {
          $scope.photo = response.data;

          // If media is video, save url as videoUrl. (ex. APOD for 2017-02-01 is a video.)
          // Must use $sce.trustAsResourceUrl, or 'website' won't open inside iframe.
          // sce stands for 'Strict Contextual Escaping'
          if ($scope.photo.media_type === 'video') {
            $scope.videoUrl = $sce.trustAsResourceUrl($scope.photo.url);
          }
        });
      };

      // Convert date from '"YYYY-MM-DDT00:00:00.000Z"' to 'YYYY-MM-DD' per date parameter format for NASA API
      $scope.convertDate = function(date) {
        return date.toISOString().split('T')[0].toString();
      };
    });