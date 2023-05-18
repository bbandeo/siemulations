const net = require('net');
const { readTag } = require('./staticTags');

// Define el puerto en el que el servidor escuchará
const staticPORT = 4202;
const PORT = 4201;



// Este servidor simula todas las lecturas individuales llamadas con la función asrs.readTag() o line_1.readTag()
const staticServer = net.createServer((socket) => {

    socket.on('error', err => console.log("Cliente desconectado"))
  // Manejar las conexiones entrantes
  
  socket.on('data', data => {
    // Procesar los datos recibidos
    const dataToString = data.toString()
    
    if(dataToString.includes("ReadTagValue")) {
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



// Crea el servidor y comienza a escuchar conexiones entrantes
const server = net.createServer((client) => {
  console.log('Cliente conectado')
  client.on('error', err => console.log("Cliente desconectado"))


  let message =
  {
      "ClientCookie": "SubscribeTagCookie",
      "Message": "NotifySubscribeTag",
      "Params": {
          "Tags": [
              {
                  "ErrorCode": 0,
                  "ErrorDescription": "The given tag does not exist.",
                  "Name": "status_standart.pallet.taked",
                  "Quality": "Bad",
                  "QualityCode": 0,
                  "TimeStamp": "1601-01-01 00:00:00.0000000",
                  "Value": "TRUE",
                  "hasChanged": 0
              },
              {
                  "ErrorCode": 0,
                  "ErrorDescription": "",
                  "Name": "DBTranselevador_transactionReq_NewData",
                  "Quality": "Uncertain",
                  "QualityCode": 24,
                  "TimeStamp": "2023-05-15 11:35:49.1910386",
                  "Value": "FALSE",
                  "hasChanged": 0
              }
          ]
      }
  }
  
  // Envia un mensaje al cliente
    setInterval(() => {
        
        client.write(JSON.stringify(message));
    }, 3000);

    // Cierra la conexión
    //   client.end();
});

// Cuando el servidor comienza a escuchar en el puerto especificado
server.on('listening', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Si ocurre un error al escuchar conexiones entrantes
server.on('error', (err) => {
  console.error('Error en el servidor:', err);
});

// Cuando el servidor cierra todas las conexiones
server.on('close', () => { console.log('Servidor desconectado')});

server.on('error', (error) => {
    console.error('Error en el servidor:', error);
    // Realiza el manejo del error del servidor según tus necesidades
  });

// Inicia el servidor
server.listen(PORT);



staticServer.listen(staticPORT, () => {
    console.log(`Servidor StaticNet escuchando en el puerto ${staticPORT}`);
  });
  
  staticServer.on('error', (error) => {
      console.error('Error en el servidor:', error);
      // Realiza el manejo del error del servidor según tus necesidades
    });
  
  