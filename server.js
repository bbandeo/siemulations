const net = require('net');
const { readTag, multiRead } = require('./staticTags');
const staticPORT = 4202;
const PORT = 4201;



// SERVIDOR PARA READS
// Este servidor simula todas las lecturas individuales llamadas con la función asrs.readTag() o line_1.readTag()

const staticServer = net.createServer((socket) => {
    socket.on('error', err => console.log("Cliente desconectado"))

    socket.on('data', async data => {
        const dataToString = data.toString()


        // MULTIREAD ====> Todavía no funciona del todo el multiread
        if (dataToString.includes('"ReadTag"')) {
            const tagArray = ((JSON.parse(dataToString)).Params.Tags)
            const tag = (await multiRead(tagArray))
            if (tag != undefined) {
                socket.write(tag.toString())
            }
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

    })

    socket.on('end', () => {
        console.log('Conexión cerrada');
    });
});





// SERVIDOR PARA SUBSCRIPTIONS
// Crea el servidor y comienza a escuchar conexiones entrantes

const publisher = net.createServer((client) => {

    // console.log('Cliente conectado al puerto:', client.remotePort)
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


})


// ==============================>
// Listeners de ambos servidores
// ===========================>
publisher.listen(PORT)
.on('listening', () => { console.log(`Servidor escuchando en el puerto ${PORT}`) })
.on('error', (err) => { console.error('Error en el servidor:', err) })
.on('close', () => { console.log('Servidor desconectado') })
.on('error', (error) => { console.error('Error en el servidor:', error) })
staticServer.listen(staticPORT, () => { console.log(`Servidor StaticNet escuchando en el puerto ${staticPORT}`) }) 
.on('error', (error) => { console.error('Error en el servidor:', error) })
// <==============================
// Listeners de ambos servidores
// <===========================











// =======================================
// ========> Funciones viejas ===========>  
// ========> Funciones viejas ===========>  
// ========> Funciones viejas ===========>  
// =======================================

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