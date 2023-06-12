const net = require('net');
const { readSubscriptions } = require('./staticTags');
const PORT = 4201;

const publisher = net.createServer((client) => {
  console.log('Cliente conectado al puerto:', client.remotePort);

  client.on('error', (err) => {
    console.log('Cliente desconectadoooooooooooooooo', err);
  });

  setInterval(async () => {
    const subscription = await readSubscriptions();
    if (!subscription) return;
    client.write(JSON.stringify(subscription));
  }, 3000);
});

publisher.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = publisher;