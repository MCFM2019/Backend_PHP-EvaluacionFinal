<?php
try
{
  $archivo=$_POST['archivo'];
  $propiedadJSON=$_POST['propiedad'];

  $file=fopen($archivo,'r');
  $response=fread($file,filesize($archivo));

  //Se devuelve el arreglo con los datos JSON
  $arrJSON = json_decode($response,true);
  $arrElementos=[];
  // Se recorre el archivo JSON para obtener sólo la propiedad que se está consultando
  foreach ($arrJSON as $valor) {
    array_push($arrElementos,$valor[$propiedadJSON]);
  }
  // Se quitan los elementos repetidos
  $arrElementos = array_unique($arrElementos);
  $opcionesListaHTML = '';
  foreach ($arrElementos as $valor) {
    $opcionesListaHTML .= "<option value=\"$valor\">$valor</option>";
  }
  echo $opcionesListaHTML;

  fclose($file);
}
catch(Exception $ex)
{
  echo $ex->getMessage();
}
?>
