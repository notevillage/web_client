(function () {

  'use strict';

  angular
    .module('core')
    .factory('authInterceptor', authInterceptor);


  /*@ngInject*/
  function authInterceptor($q, $injector, Authentication) {
    return {
      responseError: function (rejection) {
        if (!rejection.config.ignoreAuthModule) {
          switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              $injector.get('$state').transitionTo('authentication.signin');
              break;
            case 403:
              $injector.get('$state').transitionTo('forbidden');
              break;
          }
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      }
    };
  }
})();



