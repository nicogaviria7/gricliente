(function($) {
  "use strict"; // Start of use strict
  $(document).ready( function () {

    var id = getParameterByName('id');
    var type = getParameterByName('type');


    if(type=='i'){
      document.getElementById('side-investigadores').classList.add('active');
      var uri = "http://localhost:8080/GRI_Server/rest/service/investigadores/"+id; 
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
               }
           });

    }else if(type=='g'){
      document.getElementById('side-grupos').classList.add('active');
       var uri = "http://localhost:8080/GRI_Server/rest/service/grupos/"+id; 
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
               }
           });

    }else if(type=='f'){
      document.getElementById('side-facultades').classList.add('active');
      var uri = "http://localhost:8080/GRI_Server/rest/service/facultades/"+id; 
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
               }
           });
    }else if(type=='p'){
      document.getElementById('side-programas').classList.add('active');
      var uri = "http://localhost:8080/GRI_Server/rest/service/programas/"+id; 
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
               }
           });
    }else if(type=='c'){
      document.getElementById('side-centros').classList.add('active');
      var uri = "http://localhost:8080/GRI_Server/rest/service/centros/"+id; 
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
               }
           });
    }else{
      document.getElementById('side-inicio').classList.add('active');
    }
  } );

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
})(jQuery); // End of use strict
