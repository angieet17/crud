//DECLARACION DE VARIABLES
let nombrePro= document.querySelector(".nombre-producto")
let presentacionPro = document.querySelector(".presentacion-producto")
let precioPro = document.querySelector(".precio-producto")
let imagenPro = document.querySelector(".imagen-producto")
let botonGuardar = document.querySelector(".btn-guardar")
let tabla = document.querySelector(".table > tbody")
//agregar evento al boton del formulario
botonGuardar.addEventListener("click", function(){
    //alert(nombrePro.value);
    let datos = obtenerDatos();
    if(datos != null){
        guarDatos (datos);
    }
    
    borrarTabla();
    mostrarDatos();
});

//FUNCION PARA RECOGER LOS DATOS DEL FORMULARIO
function obtenerDatos(){
    //VALIDAR CAMPOS DEL FORMULARIO
    if(nombrePro.value =="" || presentacionPro.value ==" " || precioPro.value ==""
        || imagenPro.value == ""){
        alert("Todos los campos son obligatorios");
    }else{
        //CREAR OBJECTO CON LA INFORMACION DEL FORMULARIO
        let producto ={
            nombre: nombrePro.value,
            presentacion: presentacionPro.value,
            precio: precioPro.value,
            imagen: imagenPro.value,
    
        }
        //limpiar los datos del formulario
        nombrePro.value = "";
        presentacionPro.value = "";
        precioPro.value = "";
        imagenPro.value = "";
    
        return producto;

    }
    

 //**FUNCION PARA GUARDAR DATOS EN LOCALSTORAGE    
}
const listadoPedidos = "pedidos";//VARIABLE GLOBAL DE PEDIDOS

function guarDatos(datos){
    let pedidos =[]; //UN ARREGLO PARA GUARDAR LOS PEDIDOS
    //EXTRAER DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));//getItem funcion que hace traer los datos
    //VALIDAR DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios;//ES PARA QUE SE ESTE GUARDANDO EN LA POSICION DEL ARREGLO
    }
    //AGREGAR EL PEDIDO NUEVO AL ARRAY
    pedidos.push(datos);
    //GUARDAR EN LOCALSTORAGE
    localStorage.setItem(listadoPedidos,JSON.stringify(pedidos) );//stringify convierte los objetos en texto
    //VALIDAR QUE LOS DATOS FUERON GUARDADOS
    alert("Datos guardados con exitos")
}

//**FUNCION PARA EXTRAER LOS DATOS GUARDADOS EN LOCALSTORAGE

function mostrarDatos( ){
    let pedidos =[];
    //EXTRAER DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));//getItem funcion que hace traer los datos
    //VALIDAR DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios;//ES PARA QUE SE ESTE GUARDANDO EN LA POSICION DEL ARREGLO
    }
    //console.log(pedidos)
    // MOSTRAR LOS DATOS EN LA TABLA
     pedidos.forEach((p,i) => {
         let fila = document.createElement("tr");
         fila.innerHTML= `
             <td> ${i+1}</td>
             <td> ${p.nombre} </td>
             <td> ${p.presentacion}</td>
             <td> ${p.precio}</td>
             <td> <img src="${p.imagen}" width="50%"></td>
             <td>
                <span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning">⭐</span>
                
                
             </td>
             <td><span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger">❌</span></td>
         `;
         tabla.appendChild(fila)
     });
     

}

//FUNCION PARA QUITAR LOS DATOS DE LA TABLA Y QUE NO SE DUPLIQUE LOS DATOS 
function borrarTabla(){
    let fila=document.querySelectorAll(".table > tbody > tr");
    // console.log(fila)
    fila.forEach((f)=>{
        f.remove();
    })
}

//FUNCION ELIMINAR UN PEDIDO DE LA TABLA
function eliminarPedido(pos){
    let pedidos =[];
    //EXTRAER DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));//getItem funcion que hace traer los datos
    //VALIDAR DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios;//ES PARA QUE SE ESTE GUARDANDO EN LA POSICION DEL ARREGLO
    }
    //NUEVA VARIABALE CONFIRMAR PEDIDO A ELIMINAR
    let confirmar= confirm('¿Deseae eliminar el pedido '+pedidos[pos].nombre+ "?")
    if(confirmar){
        //alert("Eliminado");
        pedidos.splice(pos,1)
        alert("El pedido eliminado con exito")
        //GUARDAR LOS DATOS QUE QUEDARON
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
        
    }
}

//FUNCION PARA EDITAR LOS DATOS DE LA TABLA
function actualizarPedido(pos){
    let pedidos =[];
    //EXTRAER DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));//getItem funcion que hace traer los datos
    //VALIDAR DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios;//ES PARA QUE SE ESTE GUARDANDO EN LA POSICION DEL ARREGLO
    }
    //PASAR LOS DATOS AL FORMULARIO
    nombrePro.value=pedidos[pos].nombre
    presentacionPro.value=pedidos[pos].presentacion
    precioPro.value=pedidos[pos].precio

    //SELECCIONAR EL BOTON DE ACTUALIZAR
    let btnActualizar = document.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none")//toggle si la etiqueta contiene esa clase la quita si no la tiene la agrega
    botonGuardar.classList.toggle("d-none")
    //AGREGAR EVENTO AL BOTON ACTUALIZAR
    btnActualizar.addEventListener("click", function(){
        pedidos[pos].nombre=nombrePro.value
        pedidos[pos].presentacion=presentacionPro.value
        pedidos[pos].precio=precioPro.value
        //GUARDAR LOS DATOS EDITADOS EN LOCALSTORAGE
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        alert("El dato fue actualizado con exito");
        
        nombrePro.value = "";
        presentacionPro.value = "";
        precioPro.value = "";

        btnActualizar.classList.toggle("d-none")
        botonGuardar.classList.toggle("d-none")
        borrarTabla();
        mostrarDatos();

    });
}
    // FUNCION PARA BUSCAR UN PEDIDO
function buscarPedido() {
    let pedidos =[];
    //EXTRAER DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));//getItem funcion que hace traer los datos
    //VALIDAR DATOS GUARDADOS PREVIAMENTE EN EL LOCALSTORAGE
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios;//ES PARA QUE SE ESTE GUARDANDO EN LA POSICION DEL ARREGLO
    }
    //OBTENER EL TEXTO DE BUSQUEDA
    let textoBusqueda = document.querySelector('.buscar').value.toLowerCase();
    // FILTRAR LOS PEDIDOS
    let pedidosFiltrados = pedidos.filter(function(pedido) {
        return pedido.nombre.toLowerCase().includes(textoBusqueda);
    });

    // BORRAR LA TABLA
    borrarTabla();

    // MOSTRAR LOS PEDIDOS FILTRADOS
    pedidosFiltrados.forEach((p, i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${p.nombre}</td>
            <td>${p.presentacion}</td>
            <td>${p.precio}</td>
            <td><img src="${p.imagen}" width="50%"></td>
            <td><span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning">⭐</span></td>
            <td><span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger">❌</span></td>
        `;
        tabla.appendChild(fila);
    });
    
    


}


//ESTE EVENTO ES PARA QUE CUANDO RECARGUE LA PAGINA MUESTRE LOS DATOS
document.addEventListener("DOMContentLoaded", function(){
    borrarTabla();
    mostrarDatos();
    
})

