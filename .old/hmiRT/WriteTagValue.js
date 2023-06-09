'use strict'

let net = require('net')
const readline = require('readline')
const logger = require('../../utils/logger')
const PIPE_PATH = process.env.SIMULATION == 'true' ? {host: 'localhost', port: 4202} : '\\\\.\\pipe\\HmiRuntime'


function writeTagValue(tag, value) {
  return new Promise((resolve, reject) => {
    //open named pipe
    let client = net.connect(PIPE_PATH, () => {
      const rl = readline.createInterface({
        input: client,
        crlfDelay: Infinity,
      })

      rl.on('line', function (line) {
        logger.info(`line: ${line}`)
        var tokens = line.split(/[\s,]+/)
        var cmd = tokens.shift()
        if ('NotifyWriteTagValue' == cmd) {
          var tagName = tokens.shift()
          logger.info(`command: ${cmd} - tagName: ${tagName}`)
          resolve(true)
        }
        if ('ErrorWriteTagValue' == cmd) {
          logger.error(`line: ${line}`)
          resolve(false)
        }

        client.end()
      })
      client.on('end', () => {
        logger.info('on end')
      })

      client.write(`WriteTagValue ${tag} ${value}\n`)
    })
    client.on('error', err => reject(err))
  })
}

module.exports = { writeTagValue }
