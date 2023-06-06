'use strict'

const net = require('net')
const readline = require('readline')
const logger = require('../../utils/logger')
const PIPE_PATH = process.env.SIMULATION == 'true'  ? {host: 'localhost', port: 4202} : '\\\\.\\pipe\\HmiRuntime'

//open named pipe
function readTagValue(tagName) {
  return new Promise((resolve, reject) => {
    let client = net.connect(PIPE_PATH, () => {
      const rl = readline.createInterface({
        input: client,
        crlfDelay: Infinity,
      })

      rl.on('line', function (line) {
        var tokens = line.split(/[\s,]+/)
        var cmd = tokens.shift()
        if ('NotifyReadTagValue' == cmd) {
          var tagName = tokens.shift()
          var quality = tokens.shift()
          var value = tokens.shift()
          resolve({
            tagName,
            value,
            quality,
          })
          //logger.info("\ntagName: " + tagName + "\ntagValue: " + value + "\nQuality: " + quality)
        }
        if ('ErrorReadTagValue' == cmd) {
          logger.error('ErrorReadTagValue')
        }

        client.end()
      })
      client.on('error', function () {})
      client.on('end', function () {})
      client.on('data', data => resolve({
        tagName,
        value: data.toString()
      }))
      client.write(`ReadTagValue ${tagName} \n`)
    })
  })
}
module.exports = { readTagValue }
