var dgram = require('dgram');
var a = "
var TARGET_PORT = 3333;
var TARGET_HOST = '192.168.1.113';
var PORT = 1337;
var HOST = require('./ip')();

var client = dgram.createSocket('udp4');
var data = new Buffer('' + PORT);
client.send(data, 0, data.length, TARGET_PORT, TARGET_HOST, function(err, bytes) {
    if (err) {
	console.log('UDP Server error: ' + err);
	client.close();
    }
});
console.log('<<' + data);

var server = dgram.createSocket('udp4');
server.on('listening', function () {
    console.log('UDP Server listening');
});

server.on('message', function (message, remote) {
    console.log('>> ' + message);
});
server.bind(PORT, HOST);"
console.log("hi");