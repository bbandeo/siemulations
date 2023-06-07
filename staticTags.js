const fs = require('fs')
const staticTagsFilename = 'staticTags.json'
const subscribingTagsFilename = 'subscribingTags.json'


exports.multiRead = async function (tagArray) {
    const valuesObject = {}
    const tagReadout = await readJSON('readTag')
    tagArray.forEach(tag => { valuesObject[tag] = tagReadout[tag] })
    return valuesObject
}

exports.readTag = async function (tag) {
    const tagReadout = await readJSON('readTag')
    const tagValue = tagReadout[tag].toString()
    console.log(`Value de ${tag} ==> ${tagValue}`)
    return tagValue
}

exports.readSubscriptions = async function () {
    const subscriptionValues = await readJSON('subscribe')
    return subscriptionValues
}


async function readJSON(type) {
    let data = ''
    switch (type) {
        case 'multiRead':
            data = await JSON.parse(fs.readFileSync(staticTagsFilename, 'utf8'))
            break

        case 'readTag':
            data = await JSON.parse(fs.readFileSync(staticTagsFilename, 'utf8'))
            break

        case 'subscribe':

            const jsonFile = await JSON.parse(fs.readFileSync(subscribingTagsFilename, 'utf8'))
            const subsIds = Object.keys(jsonFile)
            data = JSON.parse(JSON.stringify(subscriptionMsg))
            
            subsIds.forEach(tag => {
                data.Params.Tags.push({ id: tag, value: jsonFile[tag] })
            })

            break

        default:
            return 0
    }

    return data

}



const subscriptionMsg =
{
    "ClientCookie": "SubscribeTagCookie",
    "Message": "NotifySubscribeTag",
    "Params": {
        "Tags": [

        ]
    }
}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// ██╗███╗   ██╗███████╗ ██████╗     ↓
// ██║████╗  ██║██╔════╝██╔═══██╗    ↓
// ██║██╔██╗ ██║█████╗  ██║   ██║    ↓
// ██║██║╚██╗██║██╔══╝  ██║   ██║    ↓
// ██║██║ ╚████║██║     ╚██████╔╝    ↓
// ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝     ↓
// Info del punto de comunicación QR-1
exports.equivalenciasCodigoViejo =
{
    "qr-1-id-plc": 'DBTransportes_CodeBar_IdPallet',
    //Valor que asigna el PLC cada vez que lee un pallet nuevo en la linea:', idPallet);
    // Lo asocia al pallet en cuestión y lo transporta por todo el sistema a ese ID
    // Para el PLC el pallet es un idPallet, y no tiene otra info mas que ese idPallet

    "qr-1-ID": 'DBTransportes_CodeBar_ID',
    // Contador que igualamos para cerrar el punto de comunicación

    "qr-1-error": 'DBTransportes_CodeBar_Error',
    // PLC avisa si tuvo error en el punto de comunicacion (leyendo el codebar en este caso)

    "qr-1-codebar": 'DBTransportes_CodeBar_CodeBar'
    // Codigo de barras o QR leído por PLC
}