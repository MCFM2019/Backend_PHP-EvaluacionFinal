/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

function PeticionAjax(idSelector,descripcion){
  var nomarch='data-1.json';
  var fd=new FormData();
  fd.append('archivo',nomarch);
  fd.append('propiedad',descripcion);

  $.ajax({
    url:'cargaListas.php',
    type:'POST',
    data:fd,
    processData: false,
    contentType: false
  }).done(function(data){
    idSelector.append(data).material_select();
  })
}

function MuestraResultadosEnPantallaConPeticionAjax(fCiudad,fTipo,fPrecMin,fPrecMax){
  var fd=new FormData();
  fd.append('ciudad',fCiudad);
  fd.append('tipo',fTipo);
  fd.append('precMin',fPrecMin);
  fd.append('precMax',fPrecMax);

  $.ajax({
    url:'buscador.php',
    type:'POST',
    data:fd,
    processData:false,
    contentType:false
  }).done(function(data){
    $(".casaVista").remove();
    $(".colContenido").append(data);
  })
}

$(document).ready(function(){
  // Se cargan las opciones de la ciudad y tipo mediante la peticion AJAX
  PeticionAjax($('#selectCiudad'),'Ciudad');
  PeticionAjax($('#selectTipo'),'Tipo');

  // Los 2 botones hacen lo mismo, asi que se usará un solo método en el que se le pasarán filtros o cargará todo
  $('#mostrarTodos').click(function(){
    MuestraResultadosEnPantallaConPeticionAjax('','','0','100000');
  })

  $('#submitButton').click(function(event){
    event.preventDefault();
    var fCiudad = $("#selectCiudad").val();
    var fTipo = $("#selectTipo").val();
    var fPrecMin = $("#rangoPrecio").val().split(";")[0];
    var fPrecMax = $("#rangoPrecio").val().split(";")[1];

    MuestraResultadosEnPantallaConPeticionAjax(fCiudad,fTipo,fPrecMin,fPrecMax);
  })
})
