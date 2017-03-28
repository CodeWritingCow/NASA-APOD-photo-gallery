/**
 * You must include the dependency on 'ngMaterial' 
 */
var app = angular.module('photoApp', ['ngMaterial']);

    app.controller('photoCtrl', function($scope, $http, $sce){

      $scope.TOKEN = 'DEMO_KEY';
      $scope.NASA = 'https://api.nasa.gov/planetary/apod?api_key=' + $scope.TOKEN;
      $scope.customUrl = $scope.NASA + '&date=';
      $scope.customDate = new Date();
      $scope.minDate = new Date('1995-06-16');
      $scope.maxDate = new Date();
      $scope.videoUrl;
      
      $scope.loadPhoto = function(url) {
        $http.get(url).then(function(response) {
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