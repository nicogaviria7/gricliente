(function($) {
  "use strict"; // Start of use strict

  $(document).ready( function () {

  // Toggle the side navigation
  $("#sidebarToggle").on('click',function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

if(document.getElementById('badge')) {
 $.ajax({
               type: "GET",
               contentType:"application/json",
               url: "/GRI_Server/rest/service/stats",
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('badge-investigadores').innerHTML = data[0];
                  document.getElementById('badge-grupos').innerHTML = data[1];
                   document.getElementById('badge-facultades').innerHTML = data[2];
                    document.getElementById('badge-programas').innerHTML = data[3];
                     document.getElementById('badge-centros').innerHTML = data[4];
               }
           });
}

if(document.getElementById('titulo')){
   var id = getParameterByName('id');
    var type = getParameterByName('type');

    if(type=='i'){
      document.getElementById('side-investigadores').classList.add('active');
      var uri = "/GRI_Server/rest/service/investigadores/"+id;
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
       var uri = "/GRI_Server/rest/service/grupos/"+id;
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
      var uri = "/GRI_Server/rest/service/facultades/"+id;
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
      var uri = "/GRI_Server/rest/service/programas/"+id;
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
      var uri = "/GRI_Server/rest/service/centros/"+id;
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
}


  if(document.getElementById('table')) {
    $.extend( $.fn.dataTable.defaults, {
      responsive: true,
      dom: 'Bfrtip',
      buttons: [
      {
        extend: 'copy',
        text: 'Copiar',
        className: 'copyButton'
      },
      {
        extend: 'excel',
        text: 'Excel',
        className: 'excelButton'
      },
      {
        extend: 'pdf',
        text: 'PDF',
        className: 'pdfButton'
      },
      {
        extend: 'print',
        text: 'Imprimir',
        className: 'printButton'
      }
      ],

      language: {
        processing:     "Procesamiento en curso...",
        search:         "Buscar: ",
        lengthMenu:    "Mostrando _MENU_ elementos",
        info:           "Mostrando _START_ a _END_ de _TOTAL_ elementos",
        infoEmpty:      "Mostrando 0 a 0 de 0 elementos",
        infoFiltered:   "(filtrado de _MAX_ elementos en total)",
        infoPostFix:    "",
        loadingRecords: "Cargando resultados...",
        zeroRecords:    "No hay información para mostrar",
        emptyTable:     "No hay información para mostrar",
        paginate: {
          first:      "Primera",
          previous:   "Anterior",
          next:       "Siguiente",
          last:       "última"
        }
      }
    } );
  }

  var tabla_investigadores= $('#tabla_investigadores').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/investigadores',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id" , visible:false},
      { data: "nombre" } ,
      { data: "categoria" } ,
      { data: "nivelAcademico" }
      ]
    } );

  var tabla_grupos= $('#tabla_grupos').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/grupos',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id" , visible:false},
      { data: "nombre" },
      { data: "areaConocimiento" }   ,
      { data: "anioFundacion" }  ,
      { data: "lider" }   ,
      { data: "categoria" }
      ]
    } );

  var tabla_facultades= $('#tabla_facultades').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/facultades',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id", "visible": false },
      { data: "nombre" }
      ]
    } );

  var tabla_programas= $('#tabla_programas').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/programas',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id", "visible": false },
      { data: "nombre" } ,
      { data: "facultad.nombre" }
      ]
    } );



  var tabla_centros= $('#tabla_centros').DataTable( {
    responsive: true,
    ajax:{
      url:'/GRI_Server/rest/service/centros',
      dataSrc:"" },
      rowId: 'id',
      columns: [
      { data: "id", "visible": false },
      { data: "nombre" },
      { data: "facultad.nombre" }
      ]
    } );

  $('#tabla_investigadores tbody').on('click', 'tr', function () {
    var data = tabla_investigadores.row( this ).data();
    window.location.href="home.html"+"?id="+data.id+"&type=i";
  } );

  $('#tabla_grupos tbody').on('click', 'tr', function () {
    var data = tabla_grupos.row( this ).data();
    window.location.href="home_grupos.html"+"?id="+data.id+"&type=g";
  } );

  $('#tabla_facultades tbody').on('click', 'tr', function () {
    var data = tabla_facultades.row( this ).data();
    window.location.href="home_grupos.html"+"?id="+data.id+"&type=f";
  } );

  $('#tabla_programas tbody').on('click', 'tr', function () {
    var data = tabla_programas.row( this ).data();
    window.location.href="home_grupos.html"+"?id="+data.id+"&type=p";
  } );

  $('#tabla_centros tbody').on('click', 'tr', function () {
    var data = tabla_centros.row( this ).data();
    window.location.href="home_grupos.html"+"?id="+data.id+"&type=c";
  });

  $("a[rel~='keep-params']").click(function(e) {
    e.preventDefault();
    var params = window.location.search;
    var url = $(this).attr('href');
    if(url.includes('?')){
      params= params.substring(1);
    }
    var dest = url + params;
    window.location.href = dest;
  });

  if(document.getElementById('subtitulo')){
		var tipo = getParameterByName('prod');
		var id = getParameterByName('id');
		var type = getParameterByName('type');

		var uri = "/GRI_Server/rest/service/tipos/"+tipo;
		 $.ajax({
	         type: "GET",
	         contentType:"application/json",
	         url: uri,
	         dataType: 'json',
	         cache: false,
	         success: function (data) {
	        	 document.getElementById('subtitulo').innerHTML = data.nombre;
	        	 
	        	 var url = "/GRI_Server/rest/service/producciones/"+type+"/"+id+"/"+tipo;
	        	 
	        	 if(data.tipoProduccion.id==3){
	        		 $("#tabla_reporte>thead>tr").append("<th>ISSN/ISBN</th>");
	        		 $('#tabla_reporte').DataTable( {
		    			    ajax:{
		    			      url: url,
		    			      dataSrc:"" },
		    			      rowId: 'id',
		    			      columns: [
		    			      { data: "id" , visible:false},
		    			      { data: "referencia" } ,
		    			      { data: "autores" } ,
		    			      { data: "anio" },
		    			      { data: "identificador" } 
		    			      ]
		    			    } );
	        	 }else{
	        		 $('#tabla_reporte').DataTable( {
		    			    ajax:{
		    			      url: url,
		    			      dataSrc:"" },
		    			      rowId: 'id',
		    			      columns: [
		    			      { data: "id" , visible:false},
		    			      { data: "referencia" } ,
		    			      { data: "autores" } ,
		    			      { data: "anio" }
		    			      ]
		    			    } );
	        	 }

	    		
	         }
	     });

	  }


if(document.getElementById('tabla_integrantes')){
  var id = getParameterByName('id');
  var url = "/GRI_Server/rest/service/integrantes/"+id;

  $('#tabla_integrantes').DataTable( {
       ajax:{
         url: url,
         dataSrc:"" },
         rowId: 'id',
         columns: [
         { data: "id" , visible:false},
         { data: "nombre" } ,
         { data: "nivelAcademico" } ,
         { data: "pertenencia" }
         ]
       } );
}


});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }



})(jQuery); // End of use strict
