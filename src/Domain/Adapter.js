"use strict";

class Adapter {

    constructor(options) {
        this.port = options['serial_port'];
    }
}

exports.CLASS = Adapter;
