$(document).ready(function(){
	var $selectProduct = $('#selectProduct');
	var productId = $selectProduct.attr('data-product-id');

	var options = $selectProduct.children();
	for(var i=0;i<options.length;i++){
		var id = options[i].value;
		console.log(options[i].value);
		if(id == productId){
			$selectProduct[0].selectedIndex = i;
			break;
		}
	}
});
