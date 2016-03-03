(function() {

  'use strict';

  angular
    .module('landing')
    .controller('landingController', landingController);

  /* @ngInject */
  function landingController($scope) {
      $scope.isSignIn = false;
      $scope.signIn = signIn;
      $scope.signOut = signOut;
      
      
      
      function signIn() {
          $scope.isSignIn = true;
      }
      
       function signOut() {
          $scope.isSignIn = false;
      }
  }
})();
