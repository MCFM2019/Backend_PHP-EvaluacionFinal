<?php
 try{
	 $archivo='data-1.json';
	 $filCiudad=$_POST['ciudad'];
	 $filTipo=$_POST['tipo'];
	 $filPrecMin=$_POST['precMin'];
	 $filPrecMax=$_POST['precMax'];
	 // Se convierten los precios a numeros reales porque son string
	 $filPrecMinReal=floatval($filPrecMin);
	 $filPrecMaxReal=floatval($filPrecMax);

	 $file=fopen($archivo,'r');
	 $response=fread($file,filesize($archivo));
	 //Se devuelve el arreglo con los datos JSON
	 $arrJSON=json_decode($response,true);
	 //Se recorre el arreglo JSON para obtener los elementos que se agregarán en un nuevo arreglo, considerando los filtros
	 $arrCasasSegunFiltros=[];
	 foreach($arrJSON as $valor){
		 $muestraxCiudad=false;
		 $muestraxTipo=false;
		 $muestraxPrecio=false;

		 $ciudadJSON=$valor['Ciudad'];
		 $tipoJSON=$valor['Tipo'];
		 $precioJSON=$valor['Precio'];
		 // Se le debe sacar los caracteres $ y , al precio para convertirlo a float
		 $precioJSON=str_ireplace(["$",","], "",$precioJSON);
		 $precMinJSONReal=floatval($precioJSON);

		 if($filCiudad=='' || $filCiudad==$ciudadJSON){
			 $muestraxCiudad=true;
		 }
		 if($filTipo=='' || $filTipo==$tipoJSON){
			 $muestraxTipo=true;
		 }
		 if($filPrecMinReal<=$precMinJSONReal && $filPrecMaxReal>=$precMinJSONReal){
			 $muestraxPrecio=true;
		 }
		 // Si cumple con la condicion de todos los filtros, se guarda en el nuevo arreglo
		 if($muestraxCiudad && $muestraxTipo && $muestraxPrecio){
			 echo 	'<div class="card casaVista itemMostrado">'.
			 					'<img src="img/home.jpg">'.
								'<div class="card-stacked">'.
									'<div class="card-content">'.
										'<p><strong>Direccion:</strong>'.$valor['Direccion'].'<p>'.
									 	'<p><strong>Ciudad:</strong>'.$ciudadJSON.'<p>'.
									 	'<p><strong>Telefono:</strong>'.$valor['Telefono'].'<p>'.
									 	'<p><strong>Codigo_Postal:</strong>'.$valor['Codigo_Postal'].'<p>'.
									 	'<p><strong>Tipo:</strong>'.$tipoJSON.'<p>'.
									 	'<p><strong>Precio:</strong><span class="precioTexto">'.$valor['Precio'].'</span><p>'.
								 	'</div>'.
								 	'<div class="card-action">'.
									 	'<a href="#" class="precioTexto">VER MÁS</a>'.
								 	'</div>'.
								'</div>'.
							'</div>';
		 }
	 }
	 fclose($file);
 }
 catch(Exception $e){
	 echo $e->getMessage();
 }
?>
