(function() {

  angular
    .module('landing')
    .config(config);

  /* @ngInject */
  function config($stateProvider) {

    // Home state routing
    $stateProvider
        .state('home', {
          url: '/',
          views: {
            contentView: {
              controller: 'landingController',
              templateUrl: 'module/landing/views/landing.html'
            }
          }
        })
        .state('home.main', {
          url: 'main',
          views: {
            mainView: {
              controller: 'landingController',
              templateUrl: 'module/landing/views/landing.main.html'
            }
          }
        })
        .state('home.signup', {
          url: 'signup',
          views: {
            mainView: {
              controller: 'landingController',
              templateUrl: 'module/landing/views/landing.signup.html'
            }
          }
        });;
  }
})();
