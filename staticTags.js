exports.readTag = function (tag) {

    switch (tag) {
        case 'DBTransportes_CodeBar_IdPallet':
            return 1
        
        case 'DBTransportes_CodeBar_ID':
            return 2
        
        case 'DBTransportes_CodeBar_Error':
            return 3
        
        case 'DBTransportes_CodeBar_CodeBar':
            return 88888888
        
            default:
                break;
        }

}