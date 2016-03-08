(function() {

  'use strict';
    
    

  angular
    .module('landing')
    .controller('landingUploadController', landingUploadController);
    
    
  /* @ngInject */
  function landingUploadController($scope) {
    $scope.classQueue= [
        {
            name: ''
        }
    ]
    
    $scope.addClass = addClass;
    $scope.deleteClass = deleteClass;
      
    function addClass() {
        $scope.classQueue.push({
            name: ''
        })
    }
      
      
      function deleteClass(index) {
          if ($scope.classQueue.length !== 1) {
               $scope.classQueue.splice(index,1); 
          }
        
    }
  }
    
})();
