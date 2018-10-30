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

  // Scroll to top button appear
  $(document).on('scroll',function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
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

  var table= $('#table_id').DataTable( {
      responsive: true,
      ajax:{
        url:'http://localhost:8080/Test/rest/empservice/emps',
        dataSrc:"" },
        rowId: 'id',
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
      },
        columns: [
        { data: "id" },
        { data: "nombre" }          
        ]
      } );

   $('#table_id tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        sessionStorage.setItem('id', data.id);
        window.location.replace("home.html");
    } );



  } );
})(jQuery); // End of use strict
