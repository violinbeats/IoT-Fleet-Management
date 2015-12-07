'use strict'

var events = require('events');
var util = require('util');
var grove = require('node-grovepi').GrovePi;

var Temperature = function(pin) {
    this.sensor = null;
    this._value = this.readValue();
    this.board = new grove.board({
	debug : false,
	onError: function(err) {
	    console.log(err);
	},
	onInit: function(res) {
	    if (res) {
		console.log('GrovePi Temperature version: ' + this.board.version());
		this.sensor = new grove.sensors.TemperatureAnalogSensor(pin);
	    }
	}
    });
    this.board.init();
    
    function checkChange() {
	var newValue = this.readValue();
	if (Math.abs(newValue - this._value) > 1) {
	    this._value = newValue;
	    this.emit('change', newValue);
	}
    }
    
    if (sampleRate) {
	setInterval(checkChange.bind(this), sampleRate);
    }
};

util.inherits(Temperature, events.EventEmitter);
Temperature.prototype.readValue = function () {
    return this.sensor.read();
};

module.exports = Temperature;