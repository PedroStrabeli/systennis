angular.module('systennis')
.service('productService', function() {
  var productDetail;

  var sendProduct = function(newObj) {
      productDetail = newObj;
  };

  var getProducts = function(){
      return productDetail;
  };

  return {
    sendProduct: sendProduct,
    getProducts: getProducts
  };

});