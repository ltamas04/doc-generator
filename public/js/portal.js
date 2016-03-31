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

$('body').on('click', '[data-mark]', function(){
  var sel = $(this).data('mark'); 
  $(this).closest('.korker-form').find(sel).modal('show');
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

$('body').on('click', '.bakteriumSave', function() {
  var str = '';
  var bakter = $(this).closest('.modal').find('.bakterium-value').each(function() {
    str += $(this).val() + ', ';
  });
  str = str.substring(0, str.length - 2);
  $('.bakter-input').val(str);
  $('.bakter-input').trigger('change');
});

$('body').on('click', '.kemiaiSave', function() {
  var str = '';
  var bakter = $(this).closest('.modal').find('.bakterium-value').each(function() {
    str += $(this).val() + ', ';
  });
  str = str.substring(0, str.length - 2);
  console.log(str);
  $('.kemia-input').val(str);
  $('.kemia-input').trigger('change');
});


$('body').on('click', '#bakterAdd', function() {
  var item = $(this).closest('.modal').find('#bakteriumVal').first().clone();
  $(this).closest('.modal-body').prepend(item);
});

$('#szalloSave').on('click', function(e) {
  var resBe = $('#res-bemeres').val(),
    resKi = $('#res-vissza').val(),
    durvaBe = $('#durva-be').val(),
    durvaKi = $('#durva-ki').val(),
    azon = $('#docId').html();
  $.ajax({
        url: '/szallorost-save',
        type: 'POST',
        data: JSON.stringify({
          "azon" : azon,
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

$('body').on('change dateChange', '.korker-form input, .korker-form select, .korker-form textarea', function () {
  var dataSel = $(this).closest('.korker-form').data('form');
  var selector = $(this).data('name');
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

  var lastForm = $('.korker-form').last();
  
  var tmp = $('#formNames').val();
  tmp += $('form .form-type').last().data('type') + ' ';
  $('#formNames').val(tmp);

  $('.korker-form .mintavetel-ido').timepicker({step: 1})
  $('.static').trigger('change');
});

$('#form-adder').on('click added', function() {
  console.log('hehe');
  $('.korker-form').last().find('.combobox').append($("<option></option>").attr("value", "beirom").text("Beírom én"));
  $('.korker-form').last().find('.combobox').addClass('form-control');
});




$('body').on('change', '.combobox', function() {
    if($(this).val() == 'beirom') {
      console.log('hell', $(this).val(), $(this).val() == 'beirom');
      var ts = $.now();
      $(this).attr('id', ts);
      $(this).after('<input class="inserted form-control" data-target="' + ts + '">');
    }
})

$('body').on('change', '.inserted', function() {
  var sel = $(this).data('target');
  var val = $(this).val();
  $('#' + sel).append($("<option></option>").attr("value", val).text(val));
  $('#' + sel).val(val);
  $('#' + sel).trigger('change');
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

$('body').on('click', '#addGep', function() {
  var form = $(this).closest('.modal-body').find('#gep-form').clone();
  $(this).closest('.modal-body').find('.gepform-container').append(form);
})

$('body').on('change', '[type="checkbox"]',  function(e) {
  var sel = $(e.target).data('target');
  $('[data-emisszio=\"' + sel + '\"]').toggleClass('hidden');
});

$(document).ready(function() {
  $('#szures-tabla').dataTable({
    aLengthMenu: [
        [25, 50, 100, 200, -1],
        [25, 50, 100, 200, "All"]
    ],
    iDisplayLength: -1
  });
});

$('#form-adder').on('click', function() {
  if($('[data-name="mintavetel_helye"]').val()) {
    var nev = $('[data-name="mintavetel_helye"]').val();
    var hely = $('[data-name="mintavetel_helyszine"]').val();
    console.log(nev, hely);
    Cookies.set('cegneve', nev);
    Cookies.set(nev, hely);
  }
});

$('form').on('submit', function() {
  if($('[data-name="mintavetel_helye"]').val()) {  
    var nev = $('[data-name="mintavetel_helye"]').val();
    var hely = $('[data-name="mintavetel_helyszine"]').val();
    console.log(nev, hely);
    Cookies.set('cegneve', nev);
    Cookies.set(nev, hely);
  }
});

$('body').on('keyup', '[data-name="mintavetel_helye"]',  function() {
  console.log('>>>', Cookies.get($(this).val()));
  if(Cookies.get($(this).val())) {
    $('[data-name="mintavetel_helyszine"]').val(Cookies.get($(this).val()));
  }
});

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

$('#form-delete').on('click', function() {
  $('.korker-form').last().remove();
  $('.doc-type').last().remove();
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
    $(".korker-doc").click(function(event) {
        $("#korkerContent").find('input[type="hidden"]').remove();              
        $("#korkerContent").find('br').last().remove();
        $("#korkerContent").find('img').each(function() {
          if($(this).attr('src') === "") {
            console.log('removed');
            $(this).remove();
          }
        });
        if($('#korkerContent').find('[data-doc-type="szallorost"]').length || $('#korkerContent').find('[data-doc-type="szallorostkonc"]').length) {
          $('.doc-header').first().remove();
        }      
        $("#korkerContent").wordExport();
        $('#saveToDb').removeClass('hidden');
    });
});

// Put event listeners into place
$('#form-adder').on('click' , function() {
  // Grab elements, create settings, etc.
  if($('.korker-form').last().find('.canvas').length) {


  var canvasList = document.getElementsByClassName('canvas'),  
    canvas = canvasList[canvasList.length - 2],
    context = canvas.getContext("2d"),
    video = document.querySelector(".video"),
    photo  = document.querySelector('.photo'),
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

  $(".snap").on("click", function() {
    context.drawImage(video, 0, 0, 350, 260);
    var data = canvas.toDataURL('image/png');
    var dataSel = $(this).closest('.korker-form').data('form');
    var target = $('#preview').find('[data-form = \"' + dataSel + '\"]').find('.image-container .photo');
    target.attr('src', data);
    target.parents('.image-container').find('#imageInput').attr('value', data);
  });

  }
});

// Put event listeners into place
$('#form-adder').on('click' , function() {
  // Grab elements, create settings, etc.
  if($('.korker-form').last().find('.canvas-uzemviteli').length) {


  var canvasList = document.getElementsByClassName('canvas-uzemviteli'),  
    canvas = canvasList[canvasList.length - 2],
    context = canvas.getContext("2d"),
    video = document.querySelector(".video-uzemviteli"),
    photo  = document.querySelector('.photo-uzemviteli'),
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

  $(".snap-uzemviteli").on("click", function() {
    context.drawImage(video, 0, 0, 350, 260);
    var data = canvas.toDataURL('image/png');
    var dataSel = $(this).closest('.korker-form').data('form');
    var target = $('#preview').find('[data-form = \"' + dataSel + '\"]').find('.image-container-uzemviteli .photo');
    target.attr('src', data);
    target.parents('.image-container-uzemviteli').find('#imageInput').attr('value', data);
  });

  }

});

  //localStorage logic
$('#localSave').on('click offline', function() {
    var formname = $('#localName').val();
    var formObject = $('form').serializeObject();
    localStorage[formname] = JSON.stringify(formObject);
});

$('#localGet').on('click', function() {
  var localStorageObject = JSON.parse(localStorage[$('#localsList').val()]);
  console.log(localStorageObject);
  localStorageObject.forms.split(' ').forEach(function(element) {
    if(element) {
      console.log(element);
      $('.korker-form-container').append('<div class="korker-form" data-form=\"form-' + formCounter + '\"></div>');
      var content = $('.form-type[data-type=' + element + ']').clone().css('display', 'block');
      $('.korker-form[data-form=\"form-' + formCounter + '\"]').html(content.get(0));

      $('#korkerContent').append('<div class="korker-doc" data-form=\"form-' + formCounter + '\"></div>');
      var doccontent = $('.doc-type[data-doc-type=' + element + ']').clone().css('display', 'block');
      $('.korker-doc[data-form=\"form-' + formCounter + '\"]').html(doccontent.get(0));
      formCounter++;
    }
  });

  for (var property in localStorageObject) {
    if (localStorageObject.hasOwnProperty(property)) {
      var $el = $('form [name=\"' + property + '\"]');
      var i = 0;
      if ($el.length > 1) { 
        $el.each(function() {
          $(this).val(localStorageObject[property][i]);
          i++;
        });
      } else {
        var val = (localStorageObject[property].constructor === Array) ? localStorageObject[property][0] : localStorageObject[property];
        $el.val(val);
      }
    }
  }

  $('.image-container').each(function() {
    $(this).find('img').attr('src', $(this).find('input').val());
  });
  $('.korker-form').last().find('.combobox').append($("<option></option>").attr("value", "beirom").text("Beírom én"));
  $('.korker-form').last().find('.combobox').addClass('form-control');
  
  $('input[name]').trigger('change');
  $('select').trigger('change');
});


$('#localOpener').one('click', function() {
  for (var key in localStorage){
   var str = '<option value=' + key + '>' + key + '</option>';
   $('#localsList').append(str);
  }
});

$('#localDelete').on('click', function() {
  localStorage.removeItem($('#localsList').val());
});


//offline support 
$('#saveToDb').on('click', function(e) {
  e.preventDefault();
  if(checkNetConnection()) {
    $('form').submit();    
  } else {
    $('#saveLocals').modal('show');
  }
});


function checkNetConnection(){
 jQuery.ajaxSetup({async:false});
 re="";
 r=Math.round(Math.random() * 10000);
 $.get("https://scontent-vie1-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10383573_615502271885170_3050415218211596357_n.jpg?oh=bcaa017fc1607700c14f815ab041d8f8&oe=574D1DF1",{subins:r},function(d){
  re=true;
 }).error(function(){
  re=false;
 });
 return re;
}


$('body').on('change', '.mintavetel-ido', function() {
  var val = $(this).val();
  console.log(val);
  if(val.indexOf('am') > 0) {
    val = val.substring(0, val.length - 2);    
  } else if (val.indexOf('pm') > 0)  {
    val = val.substring(0, val.length - 2);
    val = (Number(val.split(':')[0])+12)+ ':' + val.split(':')[1]
  } else {
    return ;
  }
  $(this).val(val);
  $(this).trigger('dateChange');
});
