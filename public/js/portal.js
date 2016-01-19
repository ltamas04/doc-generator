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

$('#szalloSave').on('click', function(e) {
	var resBe = $('#res-bemeres').val(),
		resKi = $('#res-vissza').val(),
		durvaBe = $('#durva-be').val(),
		durvaKi = $('#durva-ki').val(),
		name = $('#name').html();
	$.ajax({
        url: '/szallorost-save',
        type: 'POST',
        data: JSON.stringify({
        	"name" : name,
        	"resp_be" : resBe,
					"resp_ki" : resKi,
					"durva_be" : durvaBe,
					"durva_ki" : durvaKi
        }),
        dataType: 'json',
        contentType: "application/json"
    });
});

$('#szilardSave').on('click', function(e) {
	var mintabe = $('#mintaBemeres').val(),
		mintaki = $('#mintaVisszameres').val(),
		azon = $('#docId').html();
		console.log(azon);
	$.ajax({
        url: '/szilard-save',
        type: 'POST',
        data: JSON.stringify({
        	"azon" : azon,
					"mintabe" : mintabe,
					"mintaki" : mintaki
        }),
        dataType: 'json',
        contentType: "application/json"
    });
});

$('#nedvessegSave').on('click', function(e) {
	var mintabe = $('#mintaBemeres').val(),
		mintaki = $('#mintaVisszameres').val(),
		azon = $('#docId').html();
	$.ajax({
        url: '/nedvesseg-save',
        type: 'POST',
        data: JSON.stringify({
        	"azon" : azon,
					"mintabe" : mintabe,
					"mintaki" : mintaki
        }),
        dataType: 'json',
        contentType: "application/json"
    });
});

if ($('.szures-tabla').length) {
	$('.link-to-doc').each(function(link) {
		var id = $(this).attr('id');
		var url = "/szallopor/"+id;
		$(this).attr('href', url);
	});
};

if ($('.szures-tabla').length) {
	$('.link-to-szilard').each(function(link) {
		var id = $(this).attr('id');
		var url = "/szilard/"+id;
		$(this).attr('href', url);
	});
};

if ($('.szures-tabla').length) {
	$('.link-to-nedvesseg').each(function(link) {
		var id = $(this).attr('id');
		var url = "/nedvesseg/"+id;
		$(this).attr('href', url);
	});
};

$(document).ready(function() {
	$('#szures-tabla').dataTable({
    aLengthMenu: [
	      [25, 50, 100, 200, -1],
	      [25, 50, 100, 200, "All"]
	  ],
	  iDisplayLength: -1
	});
});

function fnExcelReport()
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('headerTable'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    return (sa);
}

$('#tableExport').on('click', function() {
	$('#szures-tabla').table2excel();
});