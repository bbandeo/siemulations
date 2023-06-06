//server original de bruno

const net = require('net');
const { readTag } = require('./staticTags');

// Define el puerto en el que el servidor escuchará
const staticPORT = 4202;
const PORT = 4271;



function simuloErrorEnQR1(){

}



function simuloPalletEnQR1(){


}

// SERVIDOR PARA READS
// Este servidor simula todas las lecturas individuales llamadas con la función asrs.readTag() o line_1.readTag()
const staticServer = net.createServer((socket) => {

    socket.on('error', err => console.log("Cliente desconectado"))
    // Manejar las conexiones entrantes

    socket.on('data', data => {
        // Procesar los datos recibidos
        const dataToString = data.toString()

        console.log('DATOS ERCIBIDOSSSSSSSSSSSSS')

        if (dataToString.includes("ReadTagValue")) {
            // Elimina info adicional y guarda solo el Tag
            const tag = dataToString.split(" ")[1]
            socket.write(readTag(tag).toString())
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
                    "value": "TRUE"
                },
                {
                    "id": "galibo-1-new",
                    "value": "FALSE"
                },
                {
                    "id": "ingreso-1-new",
                    "value": "FALSE"
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

// Cuando el servidor comienza a escuchar en el puerto especificado
publisher.on('listening', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Si ocurre un error al escuchar conexiones entrantes
publisher.on('error', (err) => {
    console.error('Error en el servidor:', err);
});

// Cuando el servidor cierra todas las conexiones
publisher.on('close', () => { console.log('Servidor desconectado') });

publisher.on('error', (error) => {
    console.error('Error en el servidor:', error);
    // Realiza el manejo del error del servidor según tus necesidades
});

// Inicia el servidor
publisher.listen(PORT);



staticServer.listen(staticPORT, () => {
    console.log(`Servidor StaticNet escuchando en el puerto ${staticPORT}`);
});

staticServer.on('error', (error) => {
    console.error('Error en el servidor:', error);
    // Realiza el manejo del error del servidor según tus necesidades
});

