
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
        .state('teste', {
              url: "/teste",
              templateUrl: "pages/teste.html",
              // controller: 'cadastro_prod_ctrl',
              data: { title: 'Teste' },
          })
        .state('register', {
              url: "/users/register2",
              params: {
                userData: null
              },
              templateUrl: "pages/register_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Passo 1' },
          })
        .state('register_2', {
              url: "/users/register2_2",
              params: {
                userData: null
              },
              templateUrl: "pages/address_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Passo 2' },
          })
        .state('register_3', {
              url: "/users/register2_3",
              params: {
                userData: null,
                addressData: null
              },
              templateUrl: "pages/reg_confirmation_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Confirmação de Cadastro' },
          })
        .state('register_4', {
              url: "/users/register2_4",
              params: {
                registrationStatus: null
              },
              templateUrl: "pages/thank_you_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Obrigado pelo cadastro!' },
          })
        .state('login', {
              url: "/users/login",
              templateUrl: "pages/login_page.html",
              controller: 'login_ctrl',
              data: { title: 'Página de Login' },
          })
        // .state('outlook', {
        //     url: "/outlook",
        //     templateUrl: "page/outlook/outlook.html",
        //     data: { pageTitle: 'Outlook view', specialClass: 'fixed-sidebar' }
        // })
}];


angular
    .module('systennis',['ui.router', 'ui.mask'])
    .config(config)
    // .run(function($rootScope, $state) {
    //     $rootScope.$state = $state;
    // })
    ;
