const net = require('net')
const { readTag, readSubscriptions } = require('./staticTags')
const staticPORT = 4202;
const PORT = 4201;



//            ======> SERVIDOR PARA READS <======

const staticServer = net.createServer((socket) => {

    socket.on('data', async data => {

        const dataToString = data.toString()

        // Si los datos recibidos incluyen la bandera de lectura
        if (dataToString.includes("ReadTagValue")) {

            // => Convierto el string de lectura que envía -CTTO-
            const variable = dataToString.split(" ")[1]

            // => Llamo a función de lectura de JSON
            const tag = (await readTag(variable)).toString()

            // => Si devuelve algo lo envío a -CTTO-
            if (tag != undefined) socket.write(tag)

        }
    })

    socket.on('end', () => { console.log('Conexión cerrada') })
    socket.on('error', () => { console.log('Conexión cerrada')})
})





//            ======> SERVIDOR PARA SUBSCRIPTIONS <====== 

const publisher = net.createServer((client) => {

    console.log('Cliente conectado al puerto:', client.remotePort)
    client.on('error', err => console.log("Cliente desconectadoooooooooooooooo", err))

    setInterval(async () => {
        // Envia un mensaje de suscripción
        // Cada 3 segundos
        const subscription = await readSubscriptions()
        if (!subscription) return
        client.write(JSON.stringify(subscription))
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



// // //
// 
// // //
