const net = require('net');
const { readTag } = require('./staticTags');
const staticPORT = 4202;

const staticServer = net.createServer((socket) => {
  socket.on('data', async (data) => {
    const dataToString = data.toString();

    if (dataToString.includes('ReadTagValue')) {
      const variable = dataToString.split(' ')[1];
      const tag = (await readTag(variable)).toString();

      if (tag !== undefined) socket.write(tag);
    }
  });

  socket.on('end', () => {
    console.log('Conexión cerrada');
  });
  
  socket.on('error', () => {
    console.log('Conexión cerrada');
  });
});

staticServer.listen(staticPORT, () => {
  console.log(`Servidor StaticNet escuchando en el puerto ${staticPORT}`);
});

module.exports = staticServer;