
/**/
var config = ['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    var path = '../../views/pages/';

    $stateProvider
        .state('catalog', {
              url: "/",
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
              data: { title: 'Cadastro de Produtos' },
          })
        .state('cadastro_cliente', {
              url: "/cadastro",
              templateUrl: "pages/template/customer-register.html",
              controller: '',
              data: { title: 'Cadastro de Cliente' },
          })
        .state('perfil', {
              url: "/perfil",
              templateUrl: "pages/template/customer-account.html",
              controller: '',
              data: { title: 'Perfil' },
          })
        .state('order_detail', {
              url: "/detalhes_pedido",
              templateUrl: "pages/template/customer-order.html",
              controller: '',
              data: { title: 'Detalhes de Pedido' },
          })
        .state('orders', {
              url: "/pedidos",
              templateUrl: "pages/template/customer-orders.html",
              controller: '',
              data: { title: 'Pedidos' },
          })
        .state('wishlist', {
              url: "/wishlist",
              templateUrl: "pages/template/customer-wishlist.html",
              controller: '',
              data: { title: 'Lista de Desejos' },
          })

        .state('test', {
              url: "/test",
              templateUrl: "pages/teste.html",
              controller: 'test',
              data: { title: 'testes' },
          })

}];
    

// var  = 


angular
    .module('systennis',['ui.router'])
    .config(config)
    // .run(function($rootScope, $state) {
    //     $rootScope.$state = $state;
    // })
    ;
