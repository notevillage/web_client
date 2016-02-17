(function() {

  angular
    .module('landing')
    .config(config);

  /* @ngInject */
  function config($stateProvider) {

    // Home state routing
    $stateProvider.
    state('home', {
      url: '/',
      views: {
        contentView: {
          controller: 'landingController',
          templateUrl: 'module/landing/views/landing.html'
        }
      }
    });
  }
})();
