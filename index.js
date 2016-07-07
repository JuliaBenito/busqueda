
$(document).ready(function(){ 
    var enviar = document.getElementById('buscar');
    enviar.addEventListener('click', busca);
    window.addEventListener('keypress', function(e){
         if (e.keyCode === 13) {busca();}
    });

});

function busca(){
    
    var limpiar = document.getElementById('datos');
    limpiar.innerHTML = "";
    var aviso = document.getElementById('aviso');
    aviso.innerHTML = "buscando...";
    
    var nombre = document.getElementById('nombre').value;

    var palabra = nombre.split(" ");
    for(var i=0; i<palabra.length;i++){
        buscarJuego(palabra[i]);
    }

}

function buscarJuego(nombre){
    //
    $.ajax({
        url: "http://api.giantbomb.com/search/",
        type: "GET",
        data: {api_key : "6ce1b9ca1ccfd4c2d49577c0e8c9278b1b3dbcb0", format : "jsonp", query: nombre, resources : "game", json_callback : "juegos" },
        dataType: "jsonp"
    });
}

function juegos(data) {
    datos = document.getElementById('datos');
    var aviso = document.getElementById('aviso');
    aviso.innerHTML="";
    
    if(data.results.length !== 0){  //si hay resultados
        for(var i=0; i<data.results.length;i++){
            
            //eliminar etiquetas html
            var contenido = data.results[i].description;
            var descripcion = $(contenido).text();
            
            //crear elementos
            var dl = document.createElement("dl");  
            datos.appendChild(dl); 
            var dt = document.createElement("dt");
            var t = document.createTextNode(data.results[i].name);
            dt.appendChild(t);
            dl.appendChild(dt);
            var dd = document.createElement("dd");
            var t2 = document.createTextNode(descripcion);       
            dd.appendChild(t2);                    
            dl.appendChild(dd);   
        
        }
    }else{
        datos.innerHTML = "No se encontraron resultados";
    }
}