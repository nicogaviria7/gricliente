(function($) {
  "use strict"; // Start of use strict

  $(document).ready( function () {

    var data = JSON.parse(sessionStorage.getItem('data'));
    var type= sessionStorage.getItem('type');

    document.getElementById('titulo').innerHTML = data.nombre;

    if(type=='i'){
      document.getElementById('side-investigadores').classList.add('active');
    }else if(type=='g'){
      document.getElementById('side-grupos').classList.add('active');
    }else if(type=='f'){
      document.getElementById('side-facultades').classList.add('active');
    }else if(type=='p'){
      document.getElementById('side-programas').classList.add('active');
    }else if(type=='c'){
      document.getElementById('side-centros').classList.add('active');
    }else{
      document.getElementById('side-inicio').classList.add('active');
    }
  } );
})(jQuery); // End of use strict
