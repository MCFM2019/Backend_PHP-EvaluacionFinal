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

$(document).ready(function(){
  // Se cargan las opciones de la ciudad y tipo mediante la peticion AJAX
  PeticionAjax($('#selectCiudad'),'Ciudad');
  PeticionAjax($('#selectTipo'),'Tipo');  
})
