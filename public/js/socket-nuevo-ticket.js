
var socket = io();

var label = $("#lblNuevoTicket");

socket.on('connect',function(){
    console.log("Conexión existosa")
})

socket.on('disconnect',function(){
    console.log("Conexión no existosa")
})

socket.on('estadoActual',function(data){
    label.html(data.actual)
})

$("button").on('click',function(){
    socket.emit("siguienteTicket",null,function(data){
        label.html(data)
    })
})