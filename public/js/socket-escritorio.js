
var socket = io();

socket.on('connect',function(){
    console.log("Conexión existosa")
})

socket.on('disconnect',function(){
    console.log("Conexión no existosa")
})

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get("escritorio");
var label = $("small");
$("h1").text('Escritorio '+escritorio);

$("button").on("click",function(event){
    socket.emit("atenderTicket",{
        escritorio: escritorio
    },function(resp){
        if(!resp.err && resp.numero){
            label.text('Ticket: '+resp.numero)
        }else{
            label.text('No hay más tickets')
        }
        console.log(resp)
    })
})

console.log(escritorio);
