
/**/
var config = ['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $urlRouterProvider.otherwise('/consulta_prod');

    $stateProvider
        // .state('catalog', {
        //       url: "/",
        //       templateUrl: "pages/catalog.html",
        //       controller: 'catalog_ctrl',
        //       data: { pageTitle: 'Pagina Principal' },
        //   })
        .state('cadastro_prod', {
              url: "/cadastro_prod",
              templateUrl: "pages/cadastro_prod.html",
              controller: 'cadastro_prod_ctrl',
              data: { title: 'Cadastro de Produtos' },
          })
        .state('consulta_prod', {
              url: "/consulta_prod",
              templateUrl: "pages/consulta_prod.html",
              controller: 'consulta_prod_ctrl',
              data: { title: 'Consulta de Produtos' },
          })
}];
    

angular
    .module('systennis',['ui.router', 'ui.bootstrap'])
    .config(config);
