var formCounter = 0;

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

$('body').on('change', '.component-label', function() {
  $(this).parent().next('.component-value').find('select').prop('selectedIndex',0);
  var val = $(this).val();
  $(this).parent().next('.component-value').find('option').hide();
  $(this).parent().next('.component-value').find('.' + val).show();
});

$('body').on('click', '[data-mark="#myModal"]', function(){
  $(this).closest('.korker-form').find('#myModal').modal('show');
});

$('body').on('click', '#modal-save', function(){
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
  $(this).closest('.korker-form').find('.label-input').val(labelNames);
  valueNames = valueNames.substring(0, valueNames.length - 2);
  $(this).closest('.korker-form').find('.value-input').val(valueNames);
  $('.label-input').trigger('change');
  $('.value-input').trigger('change');
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

$('body').on('change', '.korker-form input, .korker-form select, .korker-form textarea', function () {
  var dataSel = $(this).closest('.korker-form').data('form');
  var selector = $(this).attr('name');
  console.log('[data-form = \"' + dataSel + '\"]');
  $('#preview').find('[data-form = \"' + dataSel + '\"]').find('.' + selector).text($(this).val());
});

$('#form-adder').on('click', function() {
  $('.korker-form-container').append('<div class="korker-form" data-form=\"form-' + formCounter + '\"></div>');
  var content = $('.form-type[data-type=' + $('#form-select').val() + ']').clone().css('display', 'block');
  $('.korker-form[data-form=\"form-' + formCounter + '\"]').html(content.get(0));

  $('#korkerContent').append('<div class="korker-doc" data-form=\"form-' + formCounter + '\"></div>');
  var doccontent = $('.doc-type[data-doc-type=' + $('#form-select').val() + ']').clone().css('display', 'block');
  $('.korker-doc[data-form=\"form-' + formCounter + '\"]').html(doccontent.get(0));
  formCounter++;

  $('.combobox').selectize({
    create: true,
    sortField: Text
  });

  $('.korker-form').find('.combobox').removeClass('combobox');
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

$(document).ready(function($) {
    $("a.jquery-word-export").click(function(event) {
        $("#korkerContent").wordExport();
    });
});

// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
  // Grab elements, create settings, etc.
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    video = document.getElementById("video"),
    photo  = document.querySelector('#photo'),
    videoObj = { "video": true },
    errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  // Put video listeners into place
  if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function(stream) {
      video.src = stream;
      video.play();
    }, errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
  else if(navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoObj, function(stream){
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }

document.getElementById("snap").addEventListener("click", function() {
  context.drawImage(video, 0, 0, 640, 480);
  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
});