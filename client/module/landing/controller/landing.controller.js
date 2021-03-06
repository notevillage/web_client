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
      $scope.myClass = true;
      $scope.myClick = myClick;
      $scope.myUn = myUn;
      $scope.isOutMain = false;
      $scope.outMain = outMain;
      $scope.inMain = inMain;
      
      function signIn() {
          $scope.isSignIn = true;
      }
      
       function signOut() {
          $scope.isSignIn = false;
      }
      
      function myClick(){
          $scope.myClass = false;
      }
      function myUn(){
          $scope.myClass = true;
      }
      
      function outMain(){
          $scope.isOutMain = true;
      }
      function inMain(){
          $scope.isOutMain = false;
      }
  }
})();
