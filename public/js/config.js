
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
        .state('cadastro_prod', {
              url: "/cadastro_prod",
              templateUrl: "pages/cadastro_prod.html",
              controller: 'cadastro_prod_ctrl',
              data: { title: 'Cadastro de Produtos' },
          })
        .state('teste', {
              url: "/teste",
              templateUrl: "pages/teste.html",
              // controller: 'cadastro_prod_ctrl',
              data: { title: 'Teste' },
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
