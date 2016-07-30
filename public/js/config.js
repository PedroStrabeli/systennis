
/**/
var config = ['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    var path = '../../views/pages/';

    $stateProvider
        .state('catalog', {
              url: "/",
              templateUrl: "pages/catalog.html",
              controller: 'catalog_ctrl',
              data: { pageTitle: 'Pagina Principal' }
          })
        .state('cart', {
              url: "/carrinho",
              templateUrl: "pages/cart.html",
              controller: 'cart_ctrl',
              data: { pageTitle: 'Carrinho' }
          })
        .state('prod_detail', {
              url: "/detalheProduto",
              templateUrl: "pages/prod_detail.html",
              controller: 'prod_detail_ctrl',
              data: { pageTitle: 'Detalhes' },
              param:{ detail: null }
          })
        .state('cadastro_prod', {
              url: "/cadastro_prod",
              templateUrl: "pages/cadastro_prod.html",
              controller: 'cadastro_prod_ctrl',
              data: { title: 'Cadastro de Produtos' },
          })
        .state('consulta_prod', {
              url: "/consulta_prod",
              templateUrl: "pages/template/startbootstrap-sb-admin-1.0.4/index.html",
              // controller: 'cadastro_prod_ctrl',
              data: { title: 'Consulta de Produtos' },
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
