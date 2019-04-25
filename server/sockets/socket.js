const { io } = require('../server');
const {TicketControl} = require('../clases/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data,callback) => {
        let siguiente = ticketControl.siguiente()
        console.log(siguiente)
        callback(siguiente)
    })

    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket()
    })

    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje: 'El escritorio es necesario'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        return callback(atenderTicket)
    })

});