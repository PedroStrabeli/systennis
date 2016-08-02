angular.module('systennis')
.service('checkoutService', function() {
	var checkout={};

	var chooseAddress=function(Obj){
		checkout.address=Obj;
	}

	var chooseDelivery=function(Obj){
		checkout.partial=Obj;
	}
	
	return {
		checkout:checkout,
    	chooseAddress: chooseAddress,
    	chooseDelivery: chooseDelivery
	};
});