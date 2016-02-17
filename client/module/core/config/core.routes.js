(function() {

  'use strict';

  angular
    .module('core')
    .config(config);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    //$urlRouterProvider.otherwise('/');

    //// Home state routing
    //$stateProvider.
    //state('home', {
    //  url: '/',
    //  views: {
    //    contentView: {
    //      controller: 'landingController',
    //      templateUrl: 'module/landing/views/landing.html'
    //    }
    //  }
    //});
  }
})();
