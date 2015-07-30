"use strict";

// const SERIAL_PORT = "/dev/ACM0";
const SERIAL_PORT = "/dev/cu.usbmodem1421";

// Classes
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var MySQL = require('mysql');
var EventRepository = require('./Repositories/EventRepository');

// Sensors / Ports
var DHT11Temperature = require("./Domain/Port/DHT11Temperature");
var DHT11Humidty = require("./Domain/Port/DHT11Humidty");
var YL69SoilMoisture = require("./Domain/Port/YL69SoilMoisture");
var BH1750LightIntensity = require("./Domain/Port/BH1750LightIntensity");

// Serial port setup
var Arduino = new SerialPort(SERIAL_PORT, {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

// Connect to the Database
var database = MySQL.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'plantain'
});

// Prepare Repositories
var events = new EventRepository(database);

// Sensors
var temperature = new DHT11Temperature(events);
var humidty = new DHT11Humidty(events);
var soil = new YL69SoilMoisture(events);
var lux = new BH1750LightIntensity(events);

// Array of avilable sensors
var monitors = [
	temperature,
	humidty,
	soil,
	lux
];

Arduino.open(function (error) {

  if ( error ) {

    console.log('failed to open: ' + error);

  } else {
    console.log('Connection successfully opened with: ' + SERIAL_PORT);
//    database.connect();

    Arduino.on('data', function(data) {

    	let timestamp = (new Date).getTime() / 1000;
    	for (var i = monitors.length - 1; i >= 0; i--) {
    		monitors[i].digest(data, timestamp);
    	};
    });
  }
});
