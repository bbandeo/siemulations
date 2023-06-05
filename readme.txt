Reemplazar los archivos originales que se encuentran en src/lib/hmiRT por los de este 
repositorio

Adicionalmente se deben modificar las funciones _subscribe de runtime.js:

  _subscribe() {
    this.runtime.SubscribeTag(this.subTags, 'SubscribeTagCookie')
    this.runtime.on('NotifySubscribeTag', tagsList => {
      for (let tagobject of tagsList) {
        if(SIMULATION=='true') {
          let {id, value} = tagobject
          return {id: value}
        }
        // logger.info(tagobject)

        if (tagobject.hasChanged === 1) {
          let tag = tagobject.Name
          let id = this.exchangeid[tag]
          let value = tagobject.Value
          let suscr = {}
          
          this.oldImage[tag] = this.image[tag]
          suscr[id] = value
          
          this.image[tag] = value
          if (this.oldImage[tag] != this.image[tag]) this.emit('change-subscriptions', suscr)
        }
      }
    })
  }


* Adicionalmente en las funciones asrsListener y lineListener de app-controller modificar la declaracion

        let id = Object.keys(data)[0]