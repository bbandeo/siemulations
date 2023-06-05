//'use strict'
require('dotenv').config({ path: '../../.env' })
const net = require('net')
const readline = require('readline')
const os = require('os')
const logger = require('../../utils/logger')
const rt_objects = require(__dirname + '/opn_runtime_api.js')

const PIPE_PATH =
  process.env.SIMULATION == true  ?
    { port: 4201, host: '127.0.0.1' } :
    '\\\\.\\pipe\\HmiRuntime'


class RuntimeClass {
  constructor(client) {
    this.m_client = client

    this.m_objects = {
      Runtime: new rt_objects.TheRuntimeClass(this.m_client),
    }

    const rl = readline.createInterface({
      input: client,
      crlfDelay: Infinity,
    })
    rl.on('error', () => console.log("er"))
    rl.on('line', line => {
      let obj = JSON.parse(line)
      this.m_objects['Runtime'].process(obj)
    })
  }

  close() {
    this.m_client.end()
  }

  get Runtime() {
    return this.m_objects['Runtime']
  }
}

function get_pipe_name() {
  if (os.platform() === 'win32') {
    return PIPE_PATH
  } else {
    return os.tmpdir() + '/HmiRuntime'
  }
}

function ConnectRT(connected_func, error_func, disconnect_func) {
  let client = net.createConnection(get_pipe_name(), () => {
    connected_func(new RuntimeClass(client))
  })


  // client.on('message', err => {
  // console.log(err)
  // })

  client.on('error', err => {
    if (error_func) {
      error_func(err.message)
    }
    // console.error('pipe connection error=\'' + err.message + '\'')
  })

  client.on('close', () => {
    if (disconnect_func) {
      disconnect_func()
    }
  })
}

function DisconnectRT(runtime_class_object) {
  if (runtime_class_object) {
    runtime_class_object.close()
  } else {
    logger.error('pipe not connected!')
  }
}

exports.Connect = ConnectRT
exports.Disconnect = DisconnectRT
