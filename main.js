/*
Estevez Baliñas Alan David Nc: 19200850
Taller de programación avanzada
Instituto Tecnologico de Pachuca
Examen tema 1

*/

let registrosDInamicos = document.getElementById("registrosDinamicos");
let recarga = document.getElementById("recarga");
let registrarUsuario = document.getElementById("registrarUsuario");
var idEditable;
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
const modalBusqueda = new bootstrap.Modal(document.getElementById('modalBusqueda'));


const imgBorrar = document.createElement("imgBorrar");
imgBorrar.src = "img/basura.png";
//document.body.appendChild(img);

const imgEditar = document.createElement("imgEditar");
imgEditar.src = '/Users/alanestevez/Desktop/TallerProgAvanzada/CRUD Bootstrap/img/editar.png';
//document.body.appendChild(img);


recarga.onclick =
    () => {

        registrosDInamicos.innerHTML = "";
        recarga.innerHTML = "Recargar registros";

        axios({

            method: "get",
            url: "https://63ffa61d63e89b0913a0b33d.mockapi.io/itp/apiv1/empleados/",

        })
            .then((res) => {
                //console.log(res.data)
                let array = res.data;
                //console.log(array);

                array.forEach((registro, index) => {
                    //console.log("Registro: "+(index+1)+" : "+registro.nombre) 
                    registrosDInamicos.innerHTML =
                        registrosDInamicos.innerHTML + "<tr><th scope='row'>" + registro.id + "</th><td>" +
                        registro.nombre + "</td><td>" + registro.apellido + "</td> <td>" + registro.puesto +
                        "</td><td>" + registro.edad + "</td><td>" + registro.genero + "</td>"
                        + "<td><img src='img/basura.png' width=25%  style='cursor: pointer' id='" + registro.id + "' onclick='eliminarUsuario(this.id)'></img>"
                        + "<img src='img/editar.png' width=25% style='cursor: pointer' onclick='establecerModal(this.id)' id='" + registro.id + "'></img>"
                        + "</td></tr>";
                });

            })
            .catch((err) => console.error(err));

    }
function eliminarUsuario(id) {

    if (window.confirm('¿Quieres eliminar este usuario?')) {
        axios.delete('https://63ffa61d63e89b0913a0b33d.mockapi.io/itp/apiv1/empleados/' + id, {

        })
            .then(function (response) {
                console.log(response);
                recarga.onclick();
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {

    }
}

function establecerModal(id) {

    const nombreEmpleadoEdicion = document.getElementById("nombreEmpleadoEdicion");
    const apellidoEmpleadoEdicion = document.getElementById("apellidoEmpleadoEdicion");
    const generoEmpleadoEdicion = document.getElementById("generoEmpleadoEdicion");
    const edadEmpleadoEdicion = document.getElementById("edadEmpleadoEdicion");
    const puestoEmpleadoEdicion = document.getElementById("puestoEmpleadoEdicion");
    idEditable = id;

    myModal.show();

    axios({
        method: "get",
        url: "https://63ffa61d63e89b0913a0b33d.mockapi.io/itp/apiv1/empleados/" + id + "",
    })
        .then((res) => {

            let array = res.data;
            console.log(array);
            nombreEmpleadoEdicion.value = array.nombre;
            apellidoEmpleadoEdicion.value = array.apellido;
            generoEmpleadoEdicion.value = array.genero;
            edadEmpleadoEdicion.value = array.edad;
            puestoEmpleadoEdicion.value = array.puesto;


        })
        .catch((err) => console.error(err));
}

function editarUsuario() {
    console.log(idEditable);
    axios.put('https://63ffa61d63e89b0913a0b33d.mockapi.io/itp/apiv1/empleados/' + idEditable + '', {

        nombre: document.getElementById("nombreEmpleadoEdicion").value,
        apellido: document.getElementById("apellidoEmpleadoEdicion").value,
        genero: document.getElementById("generoEmpleadoEdicion").value,
        edad: document.getElementById("edadEmpleadoEdicion").value,
        puesto: document.getElementById("puestoEmpleadoEdicion").value

    })
        .then(function (response) {
            console.log(response);
            myModal.hide();
            recarga.onclick();
        })
        .catch(function (error) {
            console.log(error);
        });

}

function registrarUsuarios() {
    //let n = document.getElementById("nombreEmpleado");
    let formulario = document.forms.registrarUsuario;
    let datosFormulario = new FormData(formulario);
    console.log(datosFormulario);

    axios.post('https://63ffa61d63e89b0913a0b33d.mockapi.io/itp/apiv1/empleados/', {

        nombre: document.getElementById("nombreEmpleado").value,
        apellido: document.getElementById("apellidoEmpleado").value,
        genero: document.getElementById("generoEmpleado").value,
        edad: document.getElementById("edadEmpleado").value,
        puesto: document.getElementById("puestoEmpleado").value

    })
        .then(function (response) {
            console.log(response);
            recarga.onclick();
        })
        .catch(function (error) {
            console.log(error);
        });
        
        document.getElementById("nombreEmpleado").value = ""
        document.getElementById("apellidoEmpleado").value = "";
        document.getElementById("generoEmpleado").value = "";
        document.getElementById("edadEmpleado").value ="";
        document.getElementById("puestoEmpleado").value = "";
}


function busquedaUsuario() {
    let array;
    id = document.getElementById("idEmpleadoBuscar").value;
    console.log(id);
    
    if(id > 0 ){
        axios({
            method: "get",
            url: "https://63ffa61d63e89b0913a0b33d.mockapi.io/itp/apiv1/empleados/" + id + "",
        })
            .then((res) => {
                
                array = res.data;
                console.log(array);
                registrosDInamicos.innerHTML =
                    "<tr><th scope='row'>" + array.id + "</th><td>" +
                    array.nombre + "</td><td>" + array.apellido + "</td> <td>" + array.puesto +
                    "</td><td>" + array.edad + "</td><td>" + array.genero + "</td>"
                    + "<td><img src='img/basura.png' width=25%  style='cursor: pointer' id='" + array.id + "' onclick='eliminarUsuario(this.id)'></img>"
                    + "<img src='img/editar.png' width=25% style='cursor: pointer' onclick='establecerModal(this.id)' id='" + array.id + "'></img>"
                    + "</td></tr>";
                    
            })
            .catch((err) =>{
                alert("No se ha encontrado ese usuario");
                console.error(err)
            })
            
            modalBusqueda.hide();
    }else{
        alert("El campo no puede estar vacio");
    }
}

function mostrarModalBusqueda() {
    document.getElementById("idEmpleadoBuscar").value = "";
    modalBusqueda.show();
}


