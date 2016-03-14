(function () {

    angular
        .module('landing')
        .config(config);

    /* @ngInject */
    function config($stateProvider) {

        // Home state routing
        $stateProvider
            .state('home', {
                url: '/',
                abstract: true,
                views: {
                    contentView: {
                        controller: 'landingController',
                        templateUrl: 'module/landing/views/landing.html',

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
            .state('home.myclass', {
                url: 'myclass',
                views: {
                    mainView: {
                        controller: 'landingController',
                        templateUrl: 'module/landing/views/myclass.html'
                    }
                }
            })
            .state('home.upload', {
                url: 'upload',
                views: {
                    mainView: {
                        controller: 'landingUploadController',
                        templateUrl: 'module/landing/views/upload.html'
                    }
                }
            })
        .state('home.buy', {
                url: 'buy',
                views: {
                    mainView: {
                        controller: 'landingController',
                        templateUrl: 'module/landing/views/buy.html'
                    }
                }
            })
            .state('home.search', {
                url: 'search',
                views: {
                    mainView: {
                        controller: 'landingController',
                        templateUrl: 'module/landing/views/search.html'
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