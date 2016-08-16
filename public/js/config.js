
/**/
var config = ['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    var path = '../../views/pages/';

    $stateProvider
        .state('catalog', {
              url: "/",
              params: {
                keywordFilter: null,
                brandFilter: null,
                typeFilter: null
              },
              templateUrl: "pages/template/shop-category.html",
              controller: 'catalog_ctrl',
              data: { pageTitle: 'Pagina Principal'}
          })
        .state('cart', {
              url: "/carrinho",
              templateUrl: "pages/template/shop-basket.html",
              controller: 'cart_ctrl',
              data: { pageTitle: 'Carrinho' }
          })
        .state('checkout1', {
              url: "/endereco_entrega",
              templateUrl: "pages/template/shop-checkout1.html",
              controller: 'checkout_address_ctrl',
              data: { pageTitle: 'Endereço de Entrega' }
          })
        .state('checkout1-new', {
              url: "/endereco_entrega/novo",
              templateUrl: "pages/template/shop-checkout1-new-address.html",
              controller: 'checkout_address_ctrl',
              data: { pageTitle: 'Novo Endereço de Entrega' }
          })
        .state('checkout2', {
              url: "/modo_entrega",
              templateUrl: "pages/template/shop-checkout2.html",
              controller: 'checkout_delivery_ctrl',
              data: { pageTitle: 'Modo da Entrega' }
          })
        .state('checkout3', {
              url: "/pagamento",
              templateUrl: "pages/template/shop-checkout3.html",
              controller: 'checkout_payment_ctrl',
              data: { pageTitle: 'Pagamento' }
          })
        .state('checkout4', {
              url: "/review_order",
              templateUrl: "pages/template/shop-checkout4.html",
              controller: 'checkout_review_ctrl',
              data: { pageTitle: 'Reveja seu Pedido' }
          })
        .state('prod_detail', {
              url: "/detalheProduto/prod=:id_prod",
              templateUrl: "pages/template/shop-detail.html",
              controller: 'prod_detail_ctrl',
              data: { pageTitle: 'Detalhes' }
              // param:{ id_prod }
          })
        .state('cadastro_prod', {
              url: "/cadastro_prod",
              templateUrl: "pages/cadastro_prod.html",
              controller: 'cadastro_prod_ctrl',
              data: { pageTitle: 'Cadastro de Produtos' },
          })
        .state('cadastro_cliente', {
              url: "/cadastro",
              templateUrl: "pages/template/customer-register.html",
              controller: '',
              data: { pageTitle: 'Cadastro de Cliente' },
          })
        .state('perfil', {
              url: "/perfil",
              templateUrl: "pages/template/customer-account.html",
              controller: '',
              data: { pageTitle: 'Perfil' },
          })
        .state('order_detail', {
              url: "/detalhes_pedido",
              templateUrl: "pages/template/customer-order.html",
              controller: 'order_detail_ctrl',
              data: { pageTitle: 'Detalhes de Pedido' },
          })
        .state('orders', {
              url: "/pedidos",
              templateUrl: "pages/template/customer-orders.html",
              controller: 'orders_ctrl',
              data: { pageTitle: 'Pedidos' },
          })
        .state('wishlist', {
              url: "/wishlist",
              templateUrl: "pages/template/customer-wishlist.html",
              controller: '',
              data: { pageTitle: 'Lista de Desejos' },
          })

        .state('test', {
              url: "/test",
              templateUrl: "pages/teste.html",
              controller: 'test',
              data: { pageTitle: 'testes' },
          })
        //
        .state('consulta_prod', {
              url: "/consulta_prod",
              templateUrl: "pages/template/startbootstrap-sb-admin-1.0.4/index.html",
              // controller: 'cadastro_prod_ctrl',
              data: { pageTitle: 'Consulta de Produtos' },
          })
        .state('register', {
              url: "/users/register",
              params: {
                userData: null
              },
              templateUrl: "pages/register_page.html",
              controller: 'register_ctrl',
              data: { pageTitle: 'Página de Cadastro - Passo 1' },
          })
        .state('register_2', {
              url: "/users/register_2",
              params: {
                userData: null
              },
              templateUrl: "pages/address_page.html",
              controller: 'register_ctrl',
              data: { pageTitle: 'Página de Cadastro - Passo 2' },
          })
        .state('register_3', {
              url: "/users/register_3",
              params: {
                userData: null,
                addressData: null
              },
              templateUrl: "pages/reg_confirmation_page.html",
              controller: 'register_ctrl',
              data: { pageTitle: 'Página de Cadastro - Confirmação de Cadastro' },
          })
        .state('register_4', {
              url: "/users/register_4",
              params: {
                registrationStatus: null
              },
              templateUrl: "pages/thank_you_page.html",
              controller: 'register_ctrl',
              data: { pageTitle: 'Página de Cadastro - Obrigado pelo cadastro!' },
          })
        .state('register_admin', {
              url: "/users_ad/register_admin",
              params: {
                userData: null
              },
              templateUrl: "pages/register_admin_page.html",
              controller: 'register_admin_ctrl',
              data: { pageTitle: 'Página de Cadastro [ADMIN] - Passo 1' },
          })
        .state('register_admin_2', {
              url: "/users_ad/register_admin_2",
              params: {
                userData: null
              },
              templateUrl: "pages/reg_admin_confirmation_page.html",
              controller: 'register_admin_ctrl',
              data: { pageTitle: 'Página de Cadastro [ADMIN] - Passo 2' },
          })
        .state('register_admin_3', {
              url: "/users_ad/register_admin_3",
              params: {
                registrationStatus: null
              },
              templateUrl: "pages/thank_you_page_admin.html",
              controller: 'register_admin_ctrl',
              data: { pageTitle: 'Página de Cadastro [ADMIN]'},
          })
        .state('login', {
              url: "/users/login",
              templateUrl: "pages/login_page.html",
              controller: 'login_ctrl',
              data: { pageTitle: 'Página de Login' },
          })
        .state('login_admin', {
              url: "/users_ad/login_admin",
              templateUrl: "pages/login_page_admin.html",
              controller: 'login_admin_ctrl',
              data: { pageTitle: 'Página de Login [ADMIN]' },
          })
        // .state('outlook', {
        //     url: "/outlook",
        //     templateUrl: "page/outlook/outlook.html",
        //     data: { pageTitle: 'Outlook view', specialClass: 'fixed-sidebar' }
        // })
}];


angular
    .module('systennis',['ui.router', 'ui.mask', 'ui.bootstrap'])
    .config(config)
    
    // .run(function($rootScope, $state) {
    //     $rootScope.$state = $state;
    // })
    ;
