
/**/
var config = ['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    var path = '../../views/pages/';

    $stateProvider
        .state('catalog', {
              url: "/",
              templateUrl: "pages/catalog.html",
              controller: 'catalog_ctrl',
              data: { pageTitle: 'Pagina Principal' },
          })


        // .state('outlook', {
        //     url: "/outlook",
        //     templateUrl: "page/outlook/outlook.html",
        //     data: { pageTitle: 'Outlook view', specialClass: 'fixed-sidebar' }
        // })
}];
    

// var  = 


angular
    .module('systennis',['ui.router'])
    .config(config)
    // .run(function($rootScope, $state) {
    //     $rootScope.$state = $state;
    // })
    ;