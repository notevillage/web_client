(function() {

  'use strict';

  angular
    .module('core')
    .config(config);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

  }
})();
