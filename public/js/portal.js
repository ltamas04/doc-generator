$('#filterButton').on('click', function(){
	var val = $( "#filterSelect option:selected" ).val();
	$('td:first-child').each(function() {
		if( $(this).data('gep') !== val ) {
			$(this).parent().hide();	
		} else {
			$(this).parent().show();				
		}
	});
});