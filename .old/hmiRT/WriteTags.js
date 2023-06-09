'use strict'

let net = require('net')
const readline = require('readline')
const logger = require('../../utils/logger')
const PIPE_PATH = process.env.SIMULATION == 'true'  ? {host: 'localhost', port: 4202} : '\\\\.\\pipe\\HmiRuntime'

function writeTags(tagName) {
  return new Promise((resolve, reject) => {
    let client = net.connect(PIPE_PATH, function () {
      const tagWriteCommand = `{"Message":"WriteTag","Params":{"Tags":${JSON.stringify(
        tagName
      )}},"ClientCookie":"CookieReadTags123"}\n`
      logger.info(`tagWriteCommand: ${tagWriteCommand}`)
      client.write(tagWriteCommand)

      const rl = readline.createInterface({ input: client, crlfDelay: Infinity })

      rl.on('line', line => {
        const obj = JSON.parse(line)
        if (obj.Message == 'NotifyWriteTag') resolve(obj.Params.Tags)
        if (obj.Message == 'ErrorWriteTag') reject(false)
        client.end()
      })
    })

    /** client.on("end", () => logger.info("on end") )*/
  })
}

module.exports = { writeTags }
