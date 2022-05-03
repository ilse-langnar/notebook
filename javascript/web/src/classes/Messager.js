const printf                                        = console.log

/*
import EventEmitter                                 from "event-emitter"

const MyClass = function() {}
EventEmitter( MyClass.prototype )
*/

let isFunction = function(obj) {
    return typeof obj == 'function' || false;
}

class EventEmitter {

    constructor() {

        // this.last_attempt   = 0;
        // this.delay          = 100;
        this.listeners = new Map();
    }

    on(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

    off(label, callback) {
        let listeners = this.listeners.get(label),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (isFunction(listener) && listener === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }

    emit(label, ...args) {

        // printf( ">>>> label -> ", label, args )
        // let is_attempting_too_fast  = this.last_attempt >= ( Date.now() - this.delay )
            // if( is_attempting_too_fast ) return

        // this.last_attempt           =  Date.now()

        let listeners               = this.listeners.get( label )
        // printf( "listeners -> ", listeners )
        let has_listeners           = listeners && listeners.length

        // if( listeners && listeners.length ) {
        if( has_listeners ) {

            listeners.forEach( listener => {
                listener( ...args )
            })

            return true
        }

        return false

    }

}

// export default EventEmitter
let instance = new EventEmitter()
export default instance
