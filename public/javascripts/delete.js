$(document).ready(function(){
	$('#product-delete').click(function(e){
		$target = $(e.target);
		$.ajax({
			type: 'DELETE',
			url: '/products/delete/' + $target.attr('data-product-id'),
			data: {
				_csrf: $target.attr('data-csrf')
			},
			success: function(response){
				$target.parent().parent().remove();
				alert('Product Removed');
				window.location.href='/products';
			},
			error:function(error){
				alert(error);
				console.log(error);
			}
		})
	});

	$('#order-delete').click(function(e){
		$target = $(e.target);
		$.ajax({
			type: 'DELETE',
			url: '/orders/delete/' + $target.attr('data-order-id'),
			data: {
				_csrf: $target.attr('data-csrf')
			},
			success: function(response){
				$target.parent().parent().remove();
				alert('Order Removed');
				window.location.href='/orders';
			},
			error:function(error){
				alert(error);
				console.log(error);
			}
		})
	});
})