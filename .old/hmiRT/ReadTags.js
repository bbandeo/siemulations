'use strict'

const PIPE_PATH = process.env.SIMULATION == 'true' ? {host: 'localhost', port: 4202} : '\\\\.\\pipe\\HmiRuntime'

const readline = require('readline')
let net = require('net')

function multiRead(tagArray) {
  return new Promise((resolve, reject) => {
    let client = net.connect(PIPE_PATH, function () {
      const readArray = JSON.stringify(tagArray)
      const tagReadCommand = `{"Message":"ReadTag","Params":{"Tags":${readArray}},"ClientCookie":"myReadTagRequest1"}\n`
      client.write(tagReadCommand)

      const rl = readline.createInterface({ input: client, crlfDelay: Infinity })

      rl.on('line', line => {
        let obj = JSON.parse(line)
        if (obj.Message == 'NotifyReadTag') {
          if (obj.Params) resolve(obj.Params.Tags)
        }
        if (obj.Message == 'ErrorReadTag') reject(obj)
        client.end()
      })
    })

    client.on('error', err => {
      client.end()
      reject('multiRead errored', err)
    })
  })
}

module.exports = { multiRead }
