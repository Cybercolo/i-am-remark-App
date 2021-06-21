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
 
//let otroarray = [];

//  getData ////////////captura la data (informacion del array)//////////////
    function getData(){
        let arrayInfo = arrayPrueba;
        return arrayInfo;
    };
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