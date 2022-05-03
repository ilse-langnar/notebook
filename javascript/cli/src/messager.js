
const printf                        = console.log
const EventEmitter                 = require( "./EventEmitter.js")
// import EventEmitter                 from 'events'

class Messager extends EventEmitter {

    constructor() {
        super()
    }

}

let messager = new Messager()

module.exports = messager;
