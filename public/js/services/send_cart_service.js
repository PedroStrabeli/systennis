angular.module('systennis')
.service('cartService', function() {
  var productList = [];

  var addProduct = function(newObj, user) {
        var exists = false;
        for (i=0; i<productList.length;i++)
          if (newObj == productList[i]) exists = true;
        if (exists === false) productList.push(newObj);
        alert("Produto adicionado ao carrinho com sucesso.");
        sessionStorage.cart = angular.toJson(productList)
      }

  var getProducts = function(){
      return angular.fromJson(sessionStorage.cart);
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

});