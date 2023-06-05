//server original de bruno

const net = require('net');
const { readTag, multiRead } = require('./staticTags');

// Define el puerto en el que el servidor escuchará
const staticPORT = 4202;
const PORT = 4201;



// SERVIDOR PARA READS
// Este servidor simula todas las lecturas individuales llamadas con la función asrs.readTag() o line_1.readTag()
const staticServer = net.createServer((socket) => {

    socket.on('error', err => console.log("Cliente desconectado"))
    // Manejar las conexiones entrantes

    socket.on('data', async data => {
        // Procesar los datos recibidos
        const dataToString = data.toString()


        // MULTIREAD ====>
        if (dataToString.includes('"ReadTag"')) {

            const tagArray = ((JSON.parse(dataToString)).Params.Tags)
            
            // const variable = dataToString.split(" ")[1]
            const tag = (await multiRead(tagArray))
            // console.log(tag)
            if (tag != undefined) {
                socket.write(tag.toString())
            }
            // console.log("Este es un multiRead")
            // console.log(dataToString)
        }
        // <==== MULTIREAD 


        // READ ONE TAG ====>
        if (dataToString.includes("ReadTagValue")) {

            const variable = dataToString.split(" ")[1]
            const tag = (await readTag(variable)).toString()

            if (tag != undefined) {
                socket.write(tag)
            }
        }

    });

    socket.on('end', () => {
        // Manejar el cierre de la conexión
        console.log('Conexión cerrada');
    });
});





// SERVIDOR PARA SUBSCRIPTIONS
// Crea el servidor y comienza a escuchar conexiones entrantes


const publisher = net.createServer((client) => {

    console.log('Cliente conectado al puerto:', client.remotePort)
    client.on('error', err => console.log("Cliente desconectado", err));

    const subscriptionMsg =
    {
        "ClientCookie": "SubscribeTagCookie",
        "Message": "NotifySubscribeTag",
        "Params": {
            "Tags": [
                {
                    "id": "qr-1-new",
                    "value": "TRUE"
                },
                {
                    "id": "DBTransportes_CodeBar_IdPallet",
                    //"id": "DBTransportes_CodeBar_NewData",
                    "value": "TRUE"
                },
                {
                    "id": "galibo-1-new",
                    "value": "FALSE"
                }
            ]
        }
    }


    setInterval(() => {
        // cada 3 segundos envia una respuesta al cliente conectado
        // console.log(client.localAddress)
        client.write(JSON.stringify(subscriptionMsg))
    }, 3000)

    // Cierra la conexión
    //   client.end();
})

// Inicia el servidor
publisher.listen(PORT)
.on('listening', () => { console.log(`Servidor escuchando en el puerto ${PORT}`) })
.on('error', (err) => { console.error('Error en el servidor:', err) })
.on('close', () => { console.log('Servidor desconectado') })
.on('error', (error) => { console.error('Error en el servidor:', error) })

staticServer.listen(staticPORT, () => { console.log(`Servidor StaticNet escuchando en el puerto ${staticPORT}`) }) 
.on('error', (error) => { console.error('Error en el servidor:', error) })
















function simuloErrorEnQR1() {

}


function simuloPalletEnQR1(socket) {
    // Simula los datos entrantes del cliente
    const datosCliente = {
        "Message": "ReadTag",
        "Params": {
            "Tags": [
                "DBTransportes_CodeBar_IdPallet"
            ]
        },
        "ClientCookie": "myReadTagRequest1"
    };

    console.log('Simulando datos del cliente:');
    console.log(datosCliente);

    // Obtiene el valor del tag "DBTransportes_CodeBar_IdPallet" utilizando readTag()
    const tag = "DBTransportes_CodeBar_IdPallet";
    const value = readTag(tag);

    socket.write(value.toString());
    //socket.write(JSON.stringify(value) + '\n');
}



