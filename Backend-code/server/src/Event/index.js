const EventEmitter = require("events");
class ChatEvent extends EventEmitter {}
const emmiter = new ChatEvent();
emmiter.setMaxListeners(0);
module.exports = emmiter;
