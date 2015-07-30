
var serialport = require("serialport");

var SerialPort = serialport.SerialPort
var MyDev = new SerialPort("/dev/cu.usbmodem1421", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

MyDev.open(function (error) {
  if ( error ) {

    console.log('failed to open: '+error);

  } else {
    console.log('open');


    MyDev.on('data', function(data) {

    	process.stdout.write('                                ' + data + '                       \n');
    });
  }
});