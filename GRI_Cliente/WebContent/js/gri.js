(function($) {
  "use strict"; // Start of use strict

 window.onload = function() {
	 var data = sessionStorage.getItem('sessionId');
//	 if(!data){
//		 if (window.location.pathname!="/GRI_Cliente/login.html"){
//			 window.location.href = "login.html";
//		 }
//	 }else{
		 if (window.location.pathname=="/GRI_Cliente/login.html"){
			 window.location.href = "index.html";
		 }
	 }

  
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
  
  $.fn.DataTable.ext.type.search['string'] = function ( data ) {
      return ! data ?
          '' :
          typeof data === 'string' ?
              data
                  .replace( /έ/g, 'ε')
                  .replace( /ύ/g, 'υ')
                  .replace( /ό/g, 'ο')
                  .replace( /ώ/g, 'ω')
                  .replace( /ά/g, 'α')
                  .replace( /ί/g, 'ι')
                  .replace( /ή/g, 'η')
                  .replace( /\n/g, ' ' )
                  .replace( /[áÁ]/g, 'a' )
                  .replace( /[éÉ]/g, 'e' )
                  .replace( /[íÍ]/g, 'i' )
                  .replace( /[óÓ]/g, 'o' )
                  .replace( /[úÚ]/g, 'u' )
                  .replace( /ê/g, 'e' )
                  .replace( /î/g, 'i' )
                  .replace( /ô/g, 'o' )
                  .replace( /è/g, 'e' )
                  .replace( /ï/g, 'i' )
                  .replace( /ü/g, 'u' )
                  .replace( /ã/g, 'a' )
                  .replace( /õ/g, 'o' )
                  .replace( /ç/g, 'c' )
                  .replace( /ì/g, 'i' ) :
              data;
  };
  
  $("#login").on('click',function(){
	  var username = document.getElementById('userInput').value;
	  var password = document.getElementById('passwordInput').value;
	  
	  var user = {
			 "username": username,
			 "password": password
	  }
	  var data = JSON.stringify(user);
  
	  $.ajax({
		  type: "POST",
		  contentType:"application/json",
		  url: '/GRI_Server/rest/service/user/',
		  data: data,
		  dataType: 'json',
          cache: false,
		  success: function(res){
		    if(res){
		    	sessionStorage.setItem('sessionId', '5b7b086db1c3e1064f82b6251619c4eb');
		    	window.location.href = "index.html";
		    	return false;
		    }else{
		    	document.getElementById('error-message').style.display = "inline-block";
		    	document.getElementById('error-message').innerHTML = 'Error: Datos Incorrectos';
		    }
		  }
		});
		});
  
  $("#logout").on('click',function(){
	  sessionStorage.removeItem('sessionId');
	  location.reload();
	  return false;
  });
  
  $("#input-busqueda").keyup(function(event) {
	    if (event.keyCode === 13) {
	        $("#btn-buscar").click();
	    }
	});
  
  $("#btn-buscar").on('click',function(){
	  var cadena = document.getElementById('input-busqueda').value;
	  var path = cadena.replace(/\s/g, '+');
	  if(document.getElementById("gruplac").checked){
		  window.location.href = "busqueda.html?type=g&search="+path; 
	  } else{
		  window.location.href = "busqueda.html?type=i&search="+path; 
		  
	  }	  
	  return false;
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
                     document.getElementById('badge-centros').innerHTML = data[2];
               }
           });
}

if(document.getElementById('table-prod')) {
	
	   var type = getParameterByName('type');
	   var cadena = getParameterByName('search');
	   
	   var res = cadena.split("+").join(" ");
	   document.getElementById("input-busqueda").value = res;
	   
	   cadena = cadena.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
 
	   if(type == "i"){
		   document.getElementById("gruplac").checked = false;
			  document.getElementById("cvlac").checked = true;
	   }
	
	$.ajax({
        type: "GET",
        contentType:"application/json",
        url: "/GRI_Server/rest/service/busqueda/"+type+"/"+cadena,
        dataType: 'json',
        cache: false,
        success: function (data) {
        	 var tprod = $('#table-prod').DataTable( {
      		    data: data
      		    } );
        	 
        	 $("#table-prod").mark(" "+ cadena+ " ");
        	 
        	 
        	 $('#table-prod_filter input').keyup( function () {  
       		  tprod
       	      .search(
       	        jQuery.fn.DataTable.ext.type.search.string( this.value )
       	      )
       	      .draw(); 
       	  } );
        	 
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
                 document.getElementById('sidebar').classList.add('card-0');
                 if(document.getElementById('info-personal')){
                	 document.getElementById('name').innerHTML = data.nombre;
                	 document.getElementById('categoria').innerHTML = data.categoria;
                	 document.getElementById('nivelAcademico').innerHTML = data.nivelAcademico;
                	 document.getElementById('pertenencia').innerHTML = data.pertenencia;
                	 
                	 
                	 
                	 var grupos = data.grupos;
                	 
                	
                	 for(var i=0; i<grupos.length; i++){			
                		 $('#lista-grupos').append(
          					    $('<div>').addClass('row ml-0').append(
          					    	$('<p>').append('• '+grupos[i].grupo.nombre)        					    	
          					    )); 
            	}
                	 
                	 var idiomas = data.idiomas;
                	 $('#tabla_idiomas').DataTable( {
                		    data: idiomas,
                		      columns: [
                		      { data: "idioma", className:"font-weight-bold"},
                		      { data: "habla" } ,
                		      { data: "escribe" } ,
                		      { data: "lee" },
                		      { data: "entiende" }
                		      ]
                		    } );
                 }            
                 
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
                 document.getElementById('navigation-bar').classList.add('card-'+data.programas[0].facultad.id);
                 document.getElementById('sidebar').classList.add('card-'+data.programas[0].facultad.id);
               }
           });

    }else if(type=='f'){
      document.getElementById('side-grupos').classList.add('active');
      var uri = "/GRI_Server/rest/service/facultades/"+id;
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
                 document.getElementById('navigation-bar').classList.add('card-'+data.id);
                 document.getElementById('sidebar').classList.add('card-'+data.id);
               }
           });
      if(document.getElementById('miembros')){
      $.ajax({
          type: "GET",
          contentType:"application/json",
          url: "/GRI_Server/rest/service/programasfacultad/"+id,
          dataType: 'json',
          cache: false,
          success: function (data) {
            llenarLista(data, 'p');
          }
      });
      }
      
    }else if(type=='p'){
      document.getElementById('side-grupos').classList.add('active');
      var uri = "/GRI_Server/rest/service/programas/"+id;
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
            	 document.getElementById('titulo').innerHTML = data.nombre;
            	 document.getElementById('navigation-bar').classList.add('card-'+data.facultad.id);
            	 document.getElementById('sidebar').classList.add('card-'+data.facultad.id);
               }
           });
      if(document.getElementById('miembros')){
      $.ajax({
          type: "GET",
          contentType:"application/json",
          url: "/GRI_Server/rest/service/gruposprograma/"+id,
          dataType: 'json',
          cache: false,
          success: function (data) {
            llenarLista(data,'g');
          }
      });
      }
    }else if(type=='c'){
    	document.getElementById('side-grupos').classList.remove('active');
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
                 document.getElementById('navigation-bar').classList.add('card-'+data.facultad.id);
                 document.getElementById('sidebar').classList.add('card-'+data.facultad.id);
               }
           });
      
      if(document.getElementById('miembros')){
          $.ajax({
              type: "GET",
              contentType:"application/json",
              url: "/GRI_Server/rest/service/gruposcentro/"+id,
              dataType: 'json',
              cache: false,
              success: function (data) {
                llenarLista(data, 'c');
              }
          });
          }
    }else if(type=='u'){
    	document.getElementById('side-grupos').classList.add('active');
    	 document.getElementById('titulo').innerHTML = "TIPOLOGÍA DE PRODUCTOS PARA LA UNIVERSIDAD DEL QUINDÍO";
    	 $.ajax({
             type: "GET",
             contentType:"application/json",
             url: "/GRI_Server/rest/service/facultades/",
             dataType: 'json',
             cache: false,
             success: function (data) {
         		document.getElementById('navigation-bar').classList.add('card-0');
         		document.getElementById('sidebar').classList.add('card-0');
            	 llenarLista(data, 'f');
            	
             }
         });
    }
}


if(document.getElementById('table')) {
	var titulo;
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
        className: 'excelButton',
        customize: function ( xlsx ) {
        	  var sheet = xlsx.xl.worksheets['sheet1.xml'];
        	  if(document.getElementById('tabla_integrantes')){
        		  $('c[r=A1] t', sheet).text( 'INTEGRANTES - '+document.getElementById('titulo').textContent );
        	  }
        	  else if(document.getElementById('tabla_reporte')){
        		  $('c[r=A1] t', sheet).text(document.getElementById('titulo').textContent + ' - '+document.getElementById('subtitulo').textContent );
        		  var table = document.getElementById('tabla_reporte');
        		 
        	  }
        	  else if(document.getElementById('tabla_centros')){
        		  $('c[r=A1] t', sheet).text('Centros de Investigación'); 
        	  }
        	  else if(document.getElementById('tabla_investigadores_wrapper')){
        		  $('c[r=A1] t', sheet).text('Investigadores'); 
        	  }
          },
      filename: function() {
    	  if(document.getElementById('tabla_integrantes')){
    		  return 'INTEGRANTES - '+document.getElementById('titulo').textContent ;
    	  }
    	  else if(document.getElementById('tabla_reporte')){
    		  return document.getElementById('titulo').textContent + ' - '+document.getElementById('subtitulo').textContent ;
    	  }
    	  else if(document.getElementById('tabla_centros')){
    		  return 'Centros de Investigación'; 
    	  }
    	  else if(document.getElementById('tabla_investigadores_wrapper')){
    		  return 'Investigadores'; 
    	  }      
        },
        exportOptions: {
            columns: ':visible'
        },
        messageTop: 'PRUEBA'
        
      },
      {
        extend: 'pdf',
        text: 'PDF',
        className: 'pdfButton',
        filename: function() {
      	  if(document.getElementById('tabla_integrantes')){
      		  return 'INTEGRANTES - '+document.getElementById('titulo').textContent ;
      	  }
      	  else if(document.getElementById('tabla_reporte')){
      		  return document.getElementById('titulo').textContent + ' - '+document.getElementById('subtitulo').textContent ;
      	  }
      	  else if(document.getElementById('tabla_centros')){
      		  return 'Centros de Investigación'; 
      	  }
      	  else if(document.getElementById('tabla_investigadores_wrapper')){
      		  return 'Investigadores'; 
      	  }      
          },
          title : function() {
        	  if(document.getElementById('tabla_integrantes')){
        		  return 'INTEGRANTES - '+document.getElementById('titulo').textContent ;
        	  }
        	  else if(document.getElementById('tabla_reporte')){
        		  return document.getElementById('titulo').textContent + ' - '+document.getElementById('subtitulo').textContent ;
        	  }
        	  else if(document.getElementById('tabla_centros')){
        		  return 'Centros de Investigación'; 
        	  }
        	  else if(document.getElementById('tabla_investigadores_wrapper')){
        		  return 'Investigadores'; 
        	  }      
            },
            exportOptions: {
                columns: ':visible'
            }
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
  
  $('#tabla_investigadores_filter input').keyup( function () {  
	  tabla_investigadores
        .search(
          jQuery.fn.DataTable.ext.type.search.string( this.value )
        )
        .draw(); 
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
  
  $('#tabla_centros_filter input').keyup( function () {  
	  tabla_centros
        .search(
          jQuery.fn.DataTable.ext.type.search.string( this.value )
        )
        .draw(); 
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
    window.location.href="general.html"+"?id="+data.id+"&type=c";
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
		var type = getParameterByName('type');
		var id = '';
		if(type == 'u'){
			id = 1;
		}else{
			id = getParameterByName('id');
		}

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
	        	 $.ajax({
	    	         type: "GET",
	    	         contentType:"application/json",
	    	         url: url,
	    	         dataType: 'json',
	    	         cache: false,
	    	         success: function (json) {
	    	        	 mostrarTabla(data, json);
	    	        	 mostrarGraficoBarras(data, json);
	    	         }
	        	 });
 		
	         }
	     });

	  }

  
if(document.getElementById('tabla_integrantes')){
	  var type = getParameterByName('type');
	  var id = '';
	  if(type == 'u'){
		  id = '1';
	  }else{
		  id = getParameterByName('id');
	  }
  
	  var url = "/GRI_Server/rest/service/integrantes/"+type+"/"+id;
	  
	  $.ajax({
	         type: "GET",
	         contentType:"application/json",
	         url: url,
	         dataType: 'json',
	         cache: false,
	         success: function (json) { 
	        var tabla_integrantes= $('#tabla_integrantes').DataTable( {
	      	         data: json,
	      	         rowId: 'id',
	      	         columns: [
	      	         { data: "id" , visible:false},
	      	         { data: "nombre" } ,
	      	         { data: "categoria" } ,
	      	         { data: "nivelAcademico" } ,
	      	         { data: "pertenencia" }
	      	         ]
	      	       } );
	        	
	        	 
	        	 var res = getData(json, 'categoria')
	        	 var tituloTemp = document.getElementById("titulo").textContent;
	        	 var tituloCategoria = 'Investigadores por Categoría COLCIENCIAS - '+tituloTemp;
	        	 Highcharts.chart('pie-categorias', {
	        		    chart: {
	        		        plotBackgroundColor: null,
	        		        plotBorderWidth: null,
	        		        plotShadow: false,
	        		        type: 'pie'
	        		    },
	        		    title: {
	        		    	text: tituloCategoria
	        		    },
	        		    tooltip: {
	        		        pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
	        		    },
	        		    plotOptions: {
	        		        pie: {
	        		            allowPointSelect: true,
	        		            cursor: 'pointer',
	        		            dataLabels: {
	        		                enabled: true,
	        		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	        		                style: {
	        		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	        		                }
	        		            }
	        		        }
	        		    },
	        		    series: [{
	        	            name: "Investigadores",
	        	            colorByPoint: true,
	        	            data: res
	        	        }]
	        		});
	                  
	        	 var tituloFormacion = 'Investigadores por su Formación Académica - '+tituloTemp;
	        	 var res2 = getData(json, 'nivelAcademico')
	        	 console.log(res2);
	        	 Highcharts.chart('pie-formacion', {
	        		    chart: {
	        		        plotBackgroundColor: null,
	        		        plotBorderWidth: null,
	        		        plotShadow: false,
	        		        type: 'pie'
	        		    },
	        		    title: {
	        		    	text: tituloFormacion
	        		    },
	        		    tooltip: {
	        		        pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
	        		    },
	        		    plotOptions: {
	        		        pie: {
	        		            allowPointSelect: true,
	        		            cursor: 'pointer',
	        		            dataLabels: {
	        		                enabled: true,
	        		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	        		                style: {
	        		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	        		                }
	        		            }
	        		        }
	        		    },
	        		    series: [{
	        	            name: "Investigadores",
	        	            colorByPoint: true,
	        	            data: res2
	        	        }]
	        		});
	        	 
	        	 
	        	 $('#tabla_integrantes tbody').on('click', 'tr', function () {
	        		    var data = tabla_integrantes.row( this ).data();
	        		    window.location.href="../home.html"+"?id="+data.id+"&type=i";
	        		  });
	         		}
	        	 }); 
	  }





});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

function llenarLista(data, tipo){
	var i;
	if(tipo =='f'){
		for(i=0; i<data.length; i++){	
			 $('#miembros').append(
					    $('<li>').addClass('cards-item ci-'+calcularEspacio(data.length)).append(
					    	$('<div>').addClass('card ').append(
					    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i].id+'&type='+tipo).append(
					    		$('<div>').addClass('card-title-container-s').append(
					            $('<h3>').addClass('card-title-s').append(data[i].nombre)		
					))).append(
				            $('<div>').addClass('card-bar card-'+data[i].id)
		            ))); 
			 
			
		 }
	}else if(tipo == 'p'){
		for(i=0; i<data.length; i++){			
			 $('#miembros').append(
					    $('<li>').addClass('cards-item ci-'+ calcularEspacio(data.length)).append(
					    	$('<div>').addClass('card ').append(
					    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i].id+'&type='+tipo).append(
					    		$('<div>').addClass('card-title-container-s').append(
					            $('<h3>').addClass('card-title-s').append(data[i].nombre)
					))).append(
				            $('<div>').addClass('card-bar card-'+(data[i].facultad.id))
					)));    
		 }
	} else if (tipo == 'g'){		
		for(i=0; i<data.length; i++){			
			 $('#miembros').append(
					    $('<li>').addClass('cards-item ci-'+ calcularEspacio(data.length)).append(
					    	$('<div>').addClass('card card-').append(
					    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i][0].id+'&type='+tipo).append(
					    		$('<div>').addClass('card-title-container-s').append(
					            $('<h3>').addClass('card-title-s').append(data[i][0].nombre)
					))).append(
				            $('<div>').addClass('card-bar card-'+(data[i][1].facultad.id))
					))); 
	}
	 
} else if (tipo == 'c'){		
	console.log(data);
	for(i=0; i<data.length; i++){			
		 $('#miembros').append(
				    $('<li>').addClass('cards-item ci-'+ calcularEspacio(data.length)).append(
				    	$('<div>').addClass('card card-').append(
				    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i].id+'&type=g').append(
				    		$('<div>').addClass('card-title-container-s').append(
				            $('<h3>').addClass('card-title-s').append(data[i].nombre)
				))).append(
			            $('<div>').addClass('card-bar card-'+(data[i].centro.facultad.id))
				))); 
}

} 
}

function calcularEspacio(tamanio){
	var i;
	for (i=5; i>1 ; i--){
		if((tamanio%i)==0){
			return i;
		}
	}
	return calcularEspacio(tamanio+1);
}


function mostrarTabla(data, json){
	if(data.tipoProduccion.id==3){
		 $("#tabla_reporte>thead>tr").append("<th>ISSN/ISBN</th>");
		 var table= $('#tabla_reporte').DataTable( {
			 	search: {"bSmart": false},
			    data: json,
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
		 var table= $('#tabla_reporte').DataTable( {
			    data: json,
			      rowId: 'id',
			      columns: [
			      { data: "id" , visible:false},
			      { data: "referencia" } ,
			      { data: "autores" } ,
			      { data: "anio" }
			      ]
			    } );
	 }
	
	$('#tabla_reporte_filter input').keyup( function () {  
		  table
	      .search(
	        jQuery.fn.DataTable.ext.type.search.string( this.value )
	      )
	      .draw(); 
	  } );
}

function mostrarGraficoBarras(data, json){
	var nombre = data.nombre;
	var datos = getData(json, 'anio');
	var labels = datos.labels;
	var data = datos.data;
	var colors = ['#007f36','#FFCC00','#DC911B','#1169B0','#009DE0','#C20B19','#8FB435','#8E1C7D'];
	var tipo = getParameterByName('type');
	var id = getParameterByName('id');
	var index;
	var titulo1 = document.getElementById("subtitulo").textContent;
	var titulo2 = document.getElementById("titulo").textContent;
	var titulo = titulo1 + " - " + titulo2;
	if(tipo=='u'){
		index=0;
	}
	else if(tipo=='f'){
		index=getParameterByName('id');
	}
	else if(tipo=='p'){
		var uri = "/GRI_Server/rest/service/programas/"+id;
		 $.ajax({
			 'async': false,
             type: "GET",
             contentType:"application/json",
             url: uri,
             dataType: 'json',
             cache: false,
             success: function (data) { 
            	index =data.facultad.id;
             } 
         });
	}
	else if(tipo=='g'){
		var uri = "/GRI_Server/rest/service/grupos/"+id;
		 $.ajax({
			 'async': false,
             type: "GET",
             contentType:"application/json",
             url: uri,
             dataType: 'json',
             cache: false,
             success: function (data) { 
            	index =data.programas[0].facultad.id; 
             } 
         });
	}
	else if(tipo=='c'){
		var uri = "/GRI_Server/rest/service/centros/"+id;
		 $.ajax({
			 'async': false,
             type: "GET",
             contentType:"application/json",
             url: uri,
             dataType: 'json',
             cache: false,
             success: function (data) { 
            	index =data.facultad.id;
             } 
         });
	}
	 Highcharts.chart('barras-anio',{
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: titulo
	    },
	    xAxis: {
	        type: 'category',
	        labels: {
	            rotation: -45,
	            style: {
	                fontSize: '13px',
	                fontFamily: 'Helvetica Neue, sans-serif'
	            }
	        },
	    title: {
            text: 'Año'
        }
	    },
	    yAxis: { 
	        min: 0,
	        title: {
	            text: 'Cantidad'
	        }
	    },
	    legend: {
	        enabled: false
	    },
	    tooltip: {
	        pointFormat: 'Producciones científicas: <b>{point.y:.0f}</b>'
	    },
	    series: [{ 
	        data: datos, 
	        color: colors[index]
	    }]
	});
}

function getData(json, key){
	var arrayAux = [];
    var arrayAnios = [];
    var labels = [];
    var data = [];
    arrayAux= json;
    var i;
    for(i=0;i<arrayAux.length;i++){
      var aux = arrayAux[i];
      arrayAnios.push(aux[key]);
    }
    arrayAnios.sort();

    var current = null;
    var cnt = 0;
    
    for (var i = 0; i <= arrayAnios.length; i++) {
        if (arrayAnios[i] != current) {
            if (cnt > 0) {
            	labels.push(current);
                data.push(cnt);
            }
            current = arrayAnios[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    var res= [];
    for(var i=0; i < labels.length; i++) {
        res.push({
            name: labels[i],
            y: data[i]           
        });        
    }  
    
    return res;
}



})(jQuery); // End of use strict
