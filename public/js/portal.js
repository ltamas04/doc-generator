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

$('#modifypicker').on('click', function() {
  var val = $( "#filterSelect option:selected" ).val();
  console.log('>>' + val);
});

$('.component-label').on('change', function() {
	$(this).parent().next('.component-value').find('select').prop('selectedIndex',0);
	var val = $(this).val();
	$(this).parent().next('.component-value').find('option').hide();
	$(this).parent().next('.component-value').find('.' + val).show();
});

$('#modal-save').on('click', function(){
	var $label = $('.component-label'),
		$values = $('.component-value select'),
		labelNames = '',
		valueNames = '';
	$label.each(function() {
		labelNames += ($(this).val() !=='' ? $(this).val() + ', ' : "");
	});
	$values.each(function() {
		valueNames += ($(this).val() !=='' ? $(this).val() + ', ' : "");
		console.log($(this).val());
	});
	labelNames = labelNames.substring(0, labelNames.length - 2).toUpperCase();
	$('.label-input').val(labelNames);
	valueNames = valueNames.substring(0, valueNames.length - 2);
	$('.value-input').val(valueNames);
});

$(function() {
    $('.mintavetel-ido').datetimepicker({
      pickDate: false
    });
});