angular.module('systennis')
.service('cartService', function() {
  var productList = [];

  var addProduct = function(newObj, user) {
        productList.push(newObj);
        alert("Produto adicionado ao carrinho com sucesso.");
      }

  var getProducts = function(){
      return productList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

});