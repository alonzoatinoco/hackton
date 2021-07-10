//variable Globales
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');

let arrayUser = [];



//function

const CrearNombre = (actividad) => {
    let nombre = {
        nombre: actividad,
    }
    arrayUser.push(nombre);
    return nombre;
}

const GuardarDB = () =>{
    localStorage.setItem('Nombres', JSON.stringify(arrayUser));
    localStorage.setItem('jsonNombre', JSON.stringify(userUrl));
    PintarDB();
}
const PintarDB = () =>{
    listaActividadesUI.innerHTML = '';
    arrayUser =  JSON.parse(localStorage.getItem('Nombres'));
    if(arrayUser === null){
        arrayUser = [];
    }else{
        arrayUser.forEach(element => {
            /* console.log(element); */
            listaActividadesUI.innerHTML += `<div class="alert alert-primary"  role="alert">
            <b>${element.nombre}</b>
            <span class="float-end">
            <i class="material-icons ">delete</i>
            </span>
        </div> `
            
        });
    }
}

const EliminarDB = (actividad) =>{
    let indexArray;
    arrayUser.forEach((element, index) =>{
        if(element.actividad === actividad){
            indexArray = index;
        }

    });


    arrayUser.splice(indexArray,1);
    
    GuardarDB();
}

//EventListener

formularioUI.addEventListener('submit', (e) =>{
    e.preventDefault()
    let actividadUI = document.querySelector('#actividad').value;

    CrearNombre(actividadUI);
    GuardarDB();
    formularioUI.reset();
})

document.addEventListener('DOMContentLoaded', PintarDB)

listaActividadesUI.addEventListener('click', (e) =>{
    e.preventDefault();
    /* console.log(e.target.innerHTML); */
    //se consigue explorando las funciones en consola
    if(e.target.innerHTML === 'delete'){
        let texto = e.path[2].childNodes[1].innerHTML;
        //accion eliminar
        if(e.target.innerHTML === 'delete'){
            EliminarDB(texto);
        };
    };
})

const userUrl = 'http://localhost:3000/users';
  


const xhttp = new XMLHttpRequest();


function onRequestHandler() {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.response);
        console.log(data);

        const htmlResponse = document.querySelector('#listar');

        const tlp = data.map(user => `<div class="alert alert-primary"  role="alert">
        <b>${user.name}</b>
        <span class="float-end">
        <i class="material-icons ">delete</i>
        </span>
    </div>`)
        
    GuardarDB();
        htmlResponse.innerHTML = `<div>${tlp}</div>`;
        
        
    }
}
xhttp.addEventListener('load',onRequestHandler )
xhttp.open("GET", `${userUrl}`, true);
xhttp.send();


