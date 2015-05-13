/**
  * @file        main.js
  * @author      Antonino Parisi <tabman83@gmail.com>
  * @author      Nejc Trdin <nejc.trdin@gmail.com>
  * @date        13/05/2015 13:39
  * @description Main view controller
  */

(function(angular, undefined) {
    'use strict';
    angular.module('LjubljanaBusTrackerApp').controller('MainController', ['$scope', '$interval', '$rootScope', 'ngAudio', function($scope, $interval, $rootScope, ngAudio) {
      
        var sound = ngAudio.load("sounds/klaxon.mp3");
        //git sound.loop = true;

        $scope.$on('socket:bus', function (event, data) {
          if (data.length > 0) {
            $scope.nextBus = data.slice(0,1).pop();
            $scope.otherBuses = data.slice(1);
          } else {
            $scope.nextBus = null;
            $scope.otherBuses = {};
          }
        });
        
        //$timeout        
        $interval(function() {
          
          if(!$scope.nextBus) return;
          
          if( moment($scope.nextBus.expectedTime).diff(moment.utc(), 'minutes') < $scope.$storage.warningTime ) {
            $rootScope.isRunningOutOfTime = true;
            if($scope.$storage.isAudioEnabled) {
              sound.play();
            }
          } else {
            $rootScope.isRunningOutOfTime = false;
            if($scope.$storage.isAudioEnabled) {
              sound.stop();
            }
          }
        }, 1000);
        
    }]);

    
})(angular);
