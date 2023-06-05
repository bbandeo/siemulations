//server original de bruno

const net = require('net');
const { readTag } = require('./staticTags');

// Define el puerto en el que el servidor escuchará
const staticPORT = 4202;
const PORT = 4201;



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




// SERVIDOR PARA READS
// Este servidor simula todas las lecturas individuales llamadas con la función asrs.readTag() o line_1.readTag()
const staticServer = net.createServer((socket) => {

    socket.on('error', err => console.log("Cliente desconectado"))
    // Manejar las conexiones entrantes

    socket.on('data', data => {
        // Procesar los datos recibidos
        const dataToString = data.toString()
        console.log(dataToString)
        // console.log('DATOS ERCIBIDOSSSSSSSSSSSSS')
        // console.log(dataToString)

        if (dataToString.includes("ReadTagValue")) {
            // Elimina info adicional y guarda solo el Tag
            const variable = dataToString.split(" ")[1]
            const tag = readTag(variable)
            // console.log(tag)

            if (tag != undefined) {
                socket.write(tag)
                // return console.log("llego lectura undefined")
            }
        } else {
            // console.log("Vamos a los datos simulados     ")
            // simuloPalletEnQR1(socket);
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
    console.log('Cliente conectado al puerto:', client.remotePort)

    // Bueno ahora se conecta por lo menos, falta que lleguen los datos al otro lado y kabum kabum

    // 'DBTransportes_CodeBar_2_NewData',
    // 'DBTransportes_Rejection_2_NewData',
    // 'DBTransportes_Load_2_NewData',
    // 'DBIntercSoft_status_Line2_uploadOrDownloadMode',
    // 'DBIntercSoft_status_Line2_readyToDownload',
    // 'DBTransportes_Galibo_2_NewData',
    // 'DBSoft_Galibo_2_NewData'
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
                    "id": "DBTransportes_CodeBar_IdPallet",
                    //"id": "DBTransportes_CodeBar_NewData",
                    "value": "TRUE"
                },
                {
                    "id": "galibo-1-new",
                    "value": "FALSE"
                },
                // {
                //     "id": "ingreso-1-new",
                //     "value": "FALSE"
                // },
                // {
                //     "id": "ingreso-1-new",
                //     "value": "FALSE"
                // },
                // {
                //     "id": "ingreso-1-new",
                //     "value": "TRUE"
                // }
            ]
        }
    }

    // El problema que estoy viendo ahora es que si cambiamos algun valor de estos, se desconecta la otra aplicación

    // Envia un mensaje al cliente
    setInterval(() => {
        // cada 3 segundos envia una respuesta al cliente conectado
        // console.log(client.localAddress)
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