const net = require('net');
const { readTag, readSubscriptions } = require('./staticTags');
const staticPORT = 4202;
const PORT = 4201;



//            ==> SERVIDOR PARA READS <==
//                %==================%
// Este servidor simula todas las lecturas individuales 
// llamadas con las funciones .readTag() o .multiRead()

const staticServer = net.createServer((socket) => {

    
    socket.on('data', async data => {

        const dataToString = data.toString()

        // Si los datos recibidos incluyen la bandera de lectura
        if (dataToString.includes("ReadTagValue")) {

            // => Convierto el string de lectura que envía CTTO
            const variable = dataToString.split(" ")[1]
            
            // => Llamo a función de lectura de JSON
            const tag = (await readTag(variable)).toString()

            // => Si devuelve algo lo envío a CTTO
            if (tag != undefined) {
                socket.write(tag)
            }
        }

    })

    socket.on('end', () => {
        console.log('Conexión cerrada');
    });

    
    socket.on('error', () => {
        // Manejar el cierre de la conexión
        console.log('Conexión cerrada');
    });
});





// SERVIDOR PARA SUBSCRIPTIONS
// Crea el servidor y comienza a escuchar conexiones entrantes
const publisher = net.createServer((client) => {
    //console.log('Cliente conectado')
    //console.log('Cliente conectado:', client.remoteAddress, client.remotePort);
    console.log('Cliente conectado al puerto:', client.remotePort);
    //client.on('error', err => console.log("Cliente desconectadoooooooooooooooo"))
    client.on('error', err => console.log("Cliente desconectadoooooooooooooooo", err));

    let message =
    {
        "ClientCookie": "SubscribeTagCookie",
        "Message": "NotifySubscribeTag",
        "Params": {
            "Tags": [
                {
                    "id": "qr-1-new",
                    //"value": "TRUE"
                    "value": "FALSE"
                },
                {
                    "id": "galibo-1-new",
                    "value": "FALSE"
                    //"value": "TRUE"
                },
                {
                    "id": "ingreso-1-new",
                    //"value": "FALSE"
                    "value": "TRUE"
                },
                {
                    "id": "ingreso-1-new",
                    "value": "FALSE"
                },
                {
                    "id": "ingreso-1-new",
                    "value": "FALSE"
                }
            ]
        }
    }

    // Envia un mensaje al cliente
    setInterval(() => {

        // cada 3 segundos envia una respuesta al cliente conectado

        client.write(JSON.stringify(message));
    }, 3000);

    // Cierra la conexión
    //   client.end();
});





//  <> <> Mañana arreglo las subscriptions <> <> 
// const publisher = net.createServer(client => {

//     console.log('Cliente conectado a subscriptions'/**, client.remotePort */)


//     setInterval(async () => {
//         // const subscription = (await readSubscriptions())
//         // if(!subscription) return
//         // const subscriptionMsg = subscription.toString()
//         // console.log("subscriptionMsg")
//         // cada 3 segundos envia una respuesta al cliente conectado
//         const subscriptionMsg =
//         {
//             "ClientCookie": "SubscribeTagCookie",
//             "Message": "NotifySubscribeTag",
//             "Params": {
//                 "Tags": [
        
//                 ]
//             }
//         }
//         client.write(subscriptionMsg.toString())
//     }, 3000)

//     client.on('end', () => {
//         console.log('Conexión cerrada');
//     });
//     client.on('error', () => {
//         // Manejar el cierre de la conexión
//         console.log('Conexión cerrada');
//     });

// })


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