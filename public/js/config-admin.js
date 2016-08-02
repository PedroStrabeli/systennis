
/**/
var config = ['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
        //DASHBOARD GERAL
        .state('dashboard', {
              url: "/dashboard",
              templateUrl: "pages/admin/dashboard.html",
              controller: 'dashboard_ctrl',
              data: { title: 'Dashboard' }, 
          })
        //CRUD PRODUTOS
        .state('cadastro_prod', {
              url: "/cadastro_prod",
              templateUrl: "pages/admin/cadastro_prod.html",
              controller: 'cadastro_prod_ctrl',
              data: { title: 'Cadastro de Produtos' }, 
          })
        .state('consulta_prod', {
              url: "/consulta_prod",
              templateUrl: "pages/admin/consulta_prod.html",
              controller: 'consulta_prod_ctrl',
              data: { title: 'Consulta de Produtos' },
          })
        .state('edicao_prod', {
              url: "/edicao_prod",
              templateUrl: "pages/admin/edicao_prod.html",
              controller: 'edicao_prod_ctrl',
              data: { title: 'Edição de Produtos' },
          })
        .state('visualizar_prod', {
              url: "/visualizar_prod",
              templateUrl: "pages/admin/visualizar_prod.html",
              controller: 'visualizar_prod_ctrl',
              data: { title: 'Visualização de Produtos' },
          })
        //GESTÃO DE ENTREGAS
        .state('controle_entregas', {
              url: "/controle_entregas",
              templateUrl: "pages/admin/controle_entregas.html",
              controller: 'controle_entregas_ctrl',
              data: { title: 'Controle de Entregas' },
          })
        .state('visualizar_pedido', {
              url: "/visualizar_pedido",
              templateUrl: "pages/admin/visualizar_pedido.html",
              controller: 'visualizar_pedido_ctrl',
              data: { title: 'Visualizar Pedidos' },
          })
        .state('gestao_pedidos', {
              url: "/gestao_pedidos",
              templateUrl: "pages/admin/gestao_pedidos.html",
              controller: 'gestao_pedidos_ctrl',
              data: { title: 'Gestão de Pedidos' },
          })
}];
    

var app = angular
    .module('systennis',['ui.router', 'ui.bootstrap'])
    
    app.config(config);
    app.service('edit', function (){
      this.item = {};
      this.addId = function (id) {
        this.item.id = id;
      }
    });
    