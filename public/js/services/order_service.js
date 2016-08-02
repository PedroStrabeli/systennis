angular.module('systennis')
.service('orderService', function() {
  //var productDetail;

  var sendOrder = function(newObj) {
  		console.log(newObj)
      sessionStorage.pedido= angular.toJson(newObj); 
  };

  var getOrder = function(){
      return angular.fromJson(sessionStorage.pedido);
  };

  return {
    sendOrder: sendOrder,
    getOrder: getOrder
  };

});