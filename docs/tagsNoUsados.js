let line1 = [
    //  Ingresar pallet button
    {
        Id: "ingresar-pallets",
        Tag: "acp_ing_l1_coord_cmd_act_ingr_1",
        comment: ""
    },
    //
    //  ██████╗ ██████╗   ██╗    LECTURA DE CODIGO DE BARRAS
  
    // QR-1-Response
    {
        Id: "qr-1-new-response",
        Tag: "DBSoft_CodeBar_NewData",
        comment: ""
    },
    {
        Id: "qr-1-id-plc-response",
        Tag: "DBSoft_CodeBar_IdPallet",
        comment: ""
    },
    {
        Id: "qr-1-ID-response",
        Tag: "DBSoft_CodeBar_ID",
        comment: ""
    },
    {
        Id: "qr-1-error-response",
        Tag: "DBSoft_CodeBar_Error",
        comment: ""
    },
    {
        Id: "qr-1-codebar-response",
        Tag: "DBSoft_CodeBar_CodeBar",
        comment: ""
    },
    //  ██████╗  █████╗ ██╗     ██╗██████╗  ██████╗   Control de rechazos (galibo y demás)
  
    // Galibo-1-response
    {
        Id: "galibo-1-new-response",
        Tag: "DBSoft_Rejection_NewData",
        comment: ""
    },
    {
        Id: "galibo-1-ID-response",
        Tag: "DBSoft_Rejection_ID",
        comment: ""
    },
    {
        Id: "galibo-1-error-response",
        Tag: "DBSoft_Rejection_Error",
        comment: ""
    },
    // ██╗███╗   ██╗ ██████╗ ██████╗ ███████╗███████╗ ██████╗   Ingreso 
    // ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ 
    // 
  
    // Response-ingreso
    {
        Id: "ingreso-1-new-response",
        Tag: "DBSoft_Load_NewData",
        comment: ""
    },
    {
        Id: "ingreso-1-ID-response",
        Tag: "DBSoft_Load_ID",
        comment: ""
    },
    {
        Id: "ingreso-1-id-plc-response",
        Tag: "DBSoft_Load_IdPallet",
        comment: ""
    },
  
  
  
    // Pesaje 
  
    // Pesaje-1-Response
  
    {
        Id: "peso-1-id-plc-response",
        Tag: "DBSoft_Weight_IdPallet",
        comment: ""
    },
    {
        Id: "peso-1-ID-response",
        Tag: "DBSoft_Weight_ID",
        comment: ""
    },
    {
        Id: "peso-1-error-response",
        Tag: "DBSoft_Weight_Error",
        comment: ""
    },
  
  
    // OTROS
    {
        Id: "ingreso_l1_ok",
        Tag: "Static_varios_DatosIngresadosOk_L1",
        comment: ""
    },
  
  
    // ALTURA EN GALIBO  
  
    // Galibo-1-Response
  
    {
        Id: "altura-1-id-plc-response",
        Tag: "DBSoft_Galibo_IdPallet",
        comment: ""
    },
    {
        Id: "altura-1-ID-response",
        Tag: "DBSoft_Galibo_ID",
        comment: ""
    },
    {
        Id: "altura-1-error-response",
        Tag: "DBSoft_Galibo_Error",
        comment: ""
    },
  ]
  
  
  
  
  
  
  let asrs = [
  
  
    // ██████╗ ██████╗ ███████╗ ██████╗ ███████╗████████╗
    // ██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔════╝╚══██╔══╝
    // ██║  ██║██████╔╝███████╗██║   ██║█████╗     ██║   
    // ██║  ██║██╔══██╗╚════██║██║   ██║██╔══╝     ██║   
    // ██████╔╝██████╔╝███████║╚██████╔╝██║        ██║   
    // ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝        ╚═╝   
  
    {
      Id: "read-task",
      Tag: "s_stacker.task.counter",
      comment: ""
    },
    {
      Id: "nueva-tarea",
      Tag: "DBSoft_taskExecution_newTask",
      comment: ""
    },
    {
      Id: "tipo-tarea",
      Tag: "DBSoft_taskExecution_task",
      comment: ""
    },
    {
      Id: "dest-lado",
      Tag: "DBSoft_taskExecution_destination.side",
      comment: ""
    },
    {
      Id: "dest-calle",
      Tag: "DBSoft_taskExecution_destination.street",
      comment: ""
    },
    {
      Id: "dest-nivel",
      Tag: "DBSoft_taskExecution_destination.level",
      comment: ""
    },
    {
      Id: "dest-prof",
      Tag: "DBSoft_taskExecution_destination.depth",
      comment: ""
    },
    {
      Id: "orig-lado",
      Tag: "DBSoft_taskExecution_origin.side",
      comment: ""
    },
    {
      Id: "orig-calle",
      Tag: "DBSoft_taskExecution_origin.street",
      comment: ""
    },
    {
      Id: "orig-nivel",
      Tag: "DBSoft_taskExecution_origin.level",
      comment: ""
    },
    {
      Id: "orig-prof",
      Tag: "DBSoft_taskExecution_origin.depth",
      comment: ""
    },
    // ~~~ RESPONSES
    {
      Id: "response",
      Tag: "DBSoft_transactionRep_NewData",
      comment: ""
    },
    {
      Id: "response-id",
      Tag: "DBSoft_transactionRep_ID",
      comment: ""
    },
  
  
    // ██████╗ ██████╗ ████████╗██████╗  █████╗ ███╗   ██╗███████╗
    // ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝
    // ██║  ██║██████╔╝   ██║   ██████╔╝███████║██╔██╗ ██║███████╗
    // ██║  ██║██╔══██╗   ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║
    // ██████╔╝██████╔╝   ██║   ██║  ██║██║  ██║██║ ╚████║███████║
    // ╚═════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
  
  
    {
      Id: "asrs-id",
      Tag: "DBTranselevador_transactionReq_ID",
      comment: ""
    },

    //                         ---> OPERACIONES DENTRO DEL WAREHOUSE <----
    //  
    //    En simplificación, todas las operaciones de movimiento de unidades de carga (pallets/cajas)
    //    Son intercambios entre un destino y el otro. Se setean estos valores en Tags de PLC
    //    Estos valores combinados terminan formando un id de coordenadas o slot: L0C1N1P1

    {
      Id: "asrs-origen-side",
      Tag: "DBTranselevador_transactionReq_origin.side",
      comment: "Lado de origen. 0 izquierda, 1 derecha "
    },
    ,
    {
      Id: "asrs-origen-depth",
      Tag: "DBTranselevador_transactionReq_origin.depth",
      comment: "Profundidad de origen"
    },
    ,
    {
      Id: "asrs-origen-street",
      Tag: "DBTranselevador_transactionReq_origin.street",
      comment: "Calle de origen"
    },
    ,
    {
      Id: "asrs-origen-level",
      Tag: "DBTranselevador_transactionReq_origin.level",
      comment: "Nivel de origen"
    },
    {
      Id: "asrs-destino-side",
      Tag: "DBTranselevador_transactionReq_destination.side",
      comment: "Lado de destino"
    },
    ,
    {
      Id: "asrs-destino-depth",
      Tag: "DBTranselevador_transactionReq_destination.depth",
      comment: "Profundidad de destino"
    },
    ,
    {
      Id: "asrs-destino-street",
      Tag: "DBTranselevador_transactionReq_destination.street",
      comment: "Calle de destino"
    },
    ,
    {
      Id: "asrs-destino-level",
      Tag: "DBTranselevador_transactionReq_destination.level",
      comment: "Nivel de destino"
    },
    {
      Id: "asrs-transaction",
      Tag: "DBTranselevador_transactionReq_status",
      comment: "Estado de la tarea tomar o dejar pallet del transelevador. 0: Nada - 1: Pallet tomado en origen - 2: Pallet depositado en destino"
    },
  
    {
      Id: "reset",
      Tag: "c_stacker.reset",
      comment: ""
    },
    {
      Id: "cancelar",
      Tag: "c_stacker.task.cancel",
      comment: ""
    },
  
    {
      Id: "disponible-l1",
      Tag: "DBIntercSoft_status_Line1_readyToDownload",
      comment: "Subscribe"
    },
    {
      Id: "modo-l2",
      Tag: "DBIntercSoft_status_Line2_uploadOrDownloadMode",
      comment: "Subscribe"
    },
    {
      Id: "disponible-l2",
      Tag: "DBIntercSoft_status_Line2_readyToDownload",
      comment: "Subscribe"
    },
  
  ]
  
  