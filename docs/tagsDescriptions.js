///////////////////////////////////////////////////////////////////////////////////                                                               
///////////////////////////////////////////////////////////////////////////////////                                                               
//                /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$               
//               | $$__  $$ /$$__  $$ /$$__  $$ /$$__  $$              
//               | $$  \ $$| $$  \ $$| $$  \__/| $$  \__/              
//  /$$$$$$      | $$  | $$| $$  | $$| $$      |  $$$$$$        /$$$$$$
// |______/      | $$  | $$| $$  | $$| $$       \____  $$      |______/
//               | $$  | $$| $$  | $$| $$    $$ /$$  \ $$              
//               | $$$$$$$/|  $$$$$$/|  $$$$$$/|  $$$$$$/              
//               |_______/  \______/  \______/  \______/               
///////////////////////////////////////////////////////////////////////////////////                                                               
///////////////////////////////////////////////////////////////////////////////////                                                               
//                                                         
//  En staticTags están marcados los Tags que irían en el archivo de subscriptionTags.json       
//  Ya que son Tags que disparan eventos ante los cuales debemos tomar algun tipo de decisión

//  Por ejemplo, cuando el ASRS me marca algún tipo de error, debo informar de inmediato al
//  usuario y quitar el modo autónomo para no seguir emitiendo órdenes al PLC
//
// En cambio los staticTags son variables las cuales leemos en determinados momentos de ejecución
// para saber el estado del sistema o la información que el PLC nos brinde para tomar caminos de acción
//
//
//
//
// 

const puntos_de_comunicacion = {
    //
    "qr-1-id-plc": 2500,
    "galibo-1-id-plc": 2800,
    "ingreso-1-id-plc": 2500,
    "peso-1-id-plc": 2500,
    "altura-1-id-plc": 2500,
    // 
    //  ! Los valores de plc-id también idPallet en proyectos mas viejos
    //  ! Son comunes a cada punto ya que nos indican el pallet en cuestión
    //  ! La primera asociación se da en el punto qr-1, donde PLC nos envía 
    //  ! el codigo que leyó la cámara y el id-plc con el cual asoció ese pallet
    //  ! Con esta info, en cualquier punto del sistema el PLC nos dice que tiene ese Id
    //  ! Y CTTO sabe a que pallet hace referencia, pudiendo moodificar los atributos
    //  ! Del mismo, tales como Altura, en galibo. Posición en punto ASRS, etc.
    //
    //
    "qr-1-ID": 123,
    "galibo-1-ID": 124,
    "ingreso-1-ID": 2950,
    "peso-1-ID": 125,
    "altura-1-ID": 126,
    //
    //
    //
    //
    // "qr-1-error": 0,
    // "galibo-1-error": "E200",
    // "peso-1-error": 0,
    // "altura-1-error": 0,
    //
    //
    // "qr-1-codebar": "100000000003668107S1",
    // "peso-1-valor": 750,
    // "altura-1-valor": 2,
    //
    //
    //
    //
    //
}


const tagsAsrs = {
    "asrs-ready": "Booleano que indica si el ASRS se encuentra libre de fallas y fuera de operación, listo para recibir una órden",
    "asrs-ok" : "Similar al anterior. Quedó deprecado",
    "busy": "Booleano que indica si el ASRS se encuentra ocupado realizando alguna tarea",
    "modo": "Modo del sistema ASRS, es un entero que indica modo 0: desactivado - 1: automático - 2: manual. Para el modo autónomo existe otro tag aparte",
    "cancelar": "Enviamos un 1 para cancelar la operación en curso. Es la manera por defecto de frenar una operación ya que la parada de emergencia es mas agresiva",
    "error": "Booleano que indica la presencia de un error en TRUE, o FALSE en caso contrario",
    "error-id": "Número de tipo Entero - Identificador de error del sistema, con el cual se busca en plant.json la descripción para mostrarsela al operario a través de una notificación",
    "contador-operaciones": "Tipo entero. Es el contador de operaciones interna que lleva el PLC, no le estamos dando un uso productivo aun",
    "estado-transelevador" : "Numero entero que representa el estado de operacion actual del transelevador. Se buca en el archivo plant.json->010000",
    "estado-emergencia": "Variable booleana de suscripción que nos avisa si han puesto una parada de emergencia física o desde otro sistema, tomamos acciones como apagar el autónomo o enviar notificaciones al usuario",
    "comando-emergencia": "Variable booleana la cual escribimos desde Usuario hacia PLC para darle una orden de Parada DE EMERENCIA al equipo",
    "comando-emergencia": "Variable booleana la cual escribimos desde Usuario hacia PLC para darle una orden de Parada DE EMERENCIA al equipo",
    "pallet-cuna": "Booleano que indica presencia de pallet arriba de la cuna del transelevador. En Ultimo proyecto está en desuso ya que usamos variables internas del software según eventos disparados por punto de comunicacion asrs",
    "done": "Booleano que indica cuando el asrs terminó de realizar una operación. De mucha utilidad para registros y logs de operaciones."
    
}