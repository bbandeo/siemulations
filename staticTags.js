exports.readTag = function (tag) {
    // Los valores los usamos como 'string' porque asi llegan de la API de Siemens
    switch (tag) {
        case 'DBTransportes_CodeBar_IdPallet':
            const idPallet = '2500'
            console.log('Valor que asigna el PLC cada vez que lee un pallet nuevo en la linea:', idPallet);
            // Lo asocia al pallet en cuestión y lo transporta por todo el sistema a ese ID
            // Para el PLC el pallet es un idPallet, y no tiene otra info mas que ese idPallet
            return idPallet

        case 'DBTransportes_CodeBar_ID':
            // Contador que igualamos para cerrar el punto de comunicación
            const counter = '2'
            console.log('Valor obtenido de readTag:', counter);
            return counter

        case 'DBTransportes_CodeBar_Error':
            const error = '0'
            console.log('PLC avisa si tuvo error en el punto de lectura (leyendo el codebar en este caso):', error);
            return error

        case 'DBTransportes_CodeBar_CodeBar':
            // El famoso LPN
            const codebar = '100000000003668107S1'
            console.log('Codigo de barras o QR leído por PLC:', codebar);
            return codebar


        default:
        console.log(tag, 'No emparejada en SWITCH-CASE static')
            return null
            break;

    }

}