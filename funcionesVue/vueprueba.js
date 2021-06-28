let arrayPrueba = [ //////////se crean objetos dentro del array//////////
    {
        id: 0,
         name: "lucas",
         pais: "argentina",
         logro: "I am Remarkable"
     },
    {
        id: 1,
        name: "pablo",
        pais: "españa",
        logro: "I am Remarkable"
    },
    {
        id: 2,
        name: "maria",
        pais: "españa",
        logro: "I am Remarkable"
    },
     {
        id: 3,
        name: "bernat",
        pais: "españa",
        logro: "I am Remarkable"
    },
    {
        id: 4,
        name: "jaume",
        pais: "españa",
        logro: "I am Remarkable"
    },
     {
        id: 5,
        name: "nico",
        pais: "colombia",
        logro: "I am Remarkable"
    },
    {
        id: 6,
        name: "carlos",
        pais: "colombia",
        logro: "I am Remarkable"
    }];
 
let otroArray = [];
let url = `http://jsonplaceholder.typicode.com/users`



async function newApi(){
    const response = await fetch(url);
    const user = await response.json();
    return user;
}


//  getData ////////////captura la data (informacion del array)//////////////
    async function getData(){
        let userData = arrayPrueba
        newApi().then(users => {
           usersData=users;
        })
       
       console.log(userData)
    };
    getData()
   
// loadEachData ///////////Leer objetos del array y los muestra////////////
    function loadEachData(dataList){
        dataList.forEach(element => printItem(element));   
    }

//////////////////////////////imprime la data del array/////////////////////////

    function printItem(itemToPrint){
        console.log(itemToPrint);
        let lista = document.getElementById("ulListado"); 
        let line = document.createElement("div");    
            let contenido = document.createTextNode(itemToPrint.id+' '+itemToPrint.name+' '+itemToPrint.pais+" "+itemToPrint.logro+" ");
            lista.appendChild(line);
            line.appendChild(contenido);

    }

    loadEachData (getData()); // si o si llamar a la función para mostrar datos.

    /*
            baseDatos.forEach(function(data,index){
            
            
            })*/
            
            
            /*Funcion de Capturar, Almacenar datos y Limpiar campos*/
            $(document).ready(function(){    
                $('#boton-guardar').click(function(){        
                    /*Captura de datos escrito en los inputs*/        
                    var nom = document.getElementById("nombretxt").value;
                    var apel = document.getElementById("apellidotxt").value;
                    /*Guardando los datos en el LocalStorage*/
                    localStorage.setItem("Nombre", nom);
                    localStorage.setItem("Apellido", apel);
                    /*Limpiando los campos o inputs*/
                    document.getElementById("nombretxt").value = "";
                    document.getElementById("apellidotxt").value = "";
                });   
            });
            
            /*Funcion Cargar y Mostrar datos*/
            $(document).ready(function(){    
                $('#boton-cargar').click(function(){                       
                    /*Obtener datos almacenados*/
                    var nombre = localStorage.getItem("Nombre");
                    var apellido = localStorage.getItem("Apellido");
                    /*Mostrar datos almacenados*/      
                    document.getElementById("imprimeaqui").innerHTML = nombre;
                    document.getElementById("imprimeaqui2").innerHTML = apellido; 
                });   
            });