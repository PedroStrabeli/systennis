
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
        .state('register', {
              url: "/users/register",
              params: {
                userData: null
              },
              templateUrl: "pages/register_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Passo 1' },
          })
        .state('register_2', {
              url: "/users/register_2",
              params: {
                userData: null
              },
              templateUrl: "pages/address_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Passo 2' },
          })
        .state('register_3', {
              url: "/users/register_3",
              params: {
                userData: null,
                addressData: null
              },
              templateUrl: "pages/reg_confirmation_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Confirmação de Cadastro' },
          })
        .state('register_4', {
              url: "/users/register_4",
              params: {
                registrationStatus: null
              },
              templateUrl: "pages/thank_you_page.html",
              controller: 'register_ctrl',
              data: { title: 'Página de Cadastro - Obrigado pelo cadastro!' },
          })
        .state('register_admin', {
              url: "/users_ad/register_admin",
              params: {
                userData: null
              },
              templateUrl: "pages/register_admin_page.html",
              controller: 'register_admin_ctrl',
              data: { title: 'Página de Cadastro [ADMIN] - Passo 1' },
          })
        .state('register_admin_2', {
              url: "/users_ad/register_admin_2",
              params: {
                userData: null
              },
              templateUrl: "pages/reg_admin_confirmation_page.html",
              controller: 'register_admin_ctrl',
              data: { title: 'Página de Cadastro [ADMIN] - Passo 2' },
          })
        .state('register_admin_3', {
              url: "/users_ad/register_admin_3",
              params: {
                registrationStatus: null
              },
              templateUrl: "pages/thank_you_page_admin.html",
              controller: 'register_admin_ctrl',
              data: { title: 'Página de Cadastro [ADMIN]'},
          })
        .state('login', {
              url: "/users/login",
              templateUrl: "pages/login_page.html",
              controller: 'login_ctrl',
              data: { title: 'Página de Login' },
          })
        .state('login_admin', {
              url: "/users_ad/login_admin",
              templateUrl: "pages/login_page_admin.html",
              controller: 'login_admin_ctrl',
              data: { title: 'Página de Login [ADMIN]' },
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
