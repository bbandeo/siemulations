const fs = require('fs')
const staticTagsFilename = 'staticTags.json'
const subscribingTagsFilename = 'subscribingTags.json'


exports.multiRead = async function (tagArray) {
    const valuesObject = {}
    
    const tagReadout = await readJSON('multiRead')

    // const valuesObject = 
    // case 'ingreso':
    //     tags = await this.multiRead([`ingreso-${num}-id-plc`, `ingreso-${num}-ID`]);
    //     return {
    //       counter: tags[`ingreso-${num}-ID`],
    //       idPallet: tags[`ingreso-${num}-id-plc`],
    //     };
    // }

    tagArray.forEach(tag => { valuesObject[tag] = tagReadout[tag] })
    // console.log("LA LECTURA DEL MULTIREAD SERÍA: ")
    // console.log(valuesObject)
    // console.log("LA LECTURA DEL MULTIREAD SERÍA <===")

    return valuesObject
}


exports.readTag = async function (tag) {

    const tagReadout = await readJSON('readTag')
    const tagValue = tagReadout[tag].toString()
    console.log("tagValue")
    console.log(tagValue)
    console.log("tagValue")
    return tagValue
}


async function readJSON(type) {
    let data = ''
    switch (type) {
        case 'multiRead':
            data = await JSON.parse(fs.readFileSync(staticTagsFilename, 'utf8'))
            // console.log("Multiread data:")
            // console.log(data)
            // console.log("-------______---------")
            break

        case 'readTag':
            data = await JSON.parse(fs.readFileSync(staticTagsFilename, 'utf8'))
            // console.log("read data:")
            // console.log(data)
            // console.log("-------______---------")
            // fs.readFile(staticTagsFilename, (err, data) => {
            break

        case 'subscribe':
            break

        default:
            return 0
    }


    return data

}


// ██╗███╗   ██╗███████╗ ██████╗     ↓
// ██║████╗  ██║██╔════╝██╔═══██╗    ↓
// ██║██╔██╗ ██║█████╗  ██║   ██║    ↓
// ██║██║╚██╗██║██╔══╝  ██║   ██║    ↓
// ██║██║ ╚████║██║     ╚██████╔╝    ↓
// ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝     ↓



let equivalenciasCodigoViejo =
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





    // 'DBTransportes_CodeBar_2_NewData',
    // 'DBTransportes_Rejection_2_NewData',
    // 'DBTransportes_Load_2_NewData',
    // 'DBIntercSoft_status_Line2_uploadOrDownloadMode',
    // 'DBIntercSoft_status_Line2_readyToDownload',
    // 'DBTransportes_Galibo_2_NewData',
    // 'DBSoft_Galibo_2_NewData'