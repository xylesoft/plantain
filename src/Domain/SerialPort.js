"use strict";

var serial = require('serialport').SerialPort;

export default class SerialPort {

	constructor(options) {
    	this.port = options['serial_port'];

    	this.port.on('data', this.dataHandler);
    	this.port.on('error', this.errorHandler);
    }

    dataHandler(input) {
    	throw new Error('overload dataHandler()');
    }

    errorHandler(err) {

    	console.error(err);
    }
};