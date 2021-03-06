"use strict";

var Sensor = require('./Sensor');

export default class DHT11Humidty extends Sensor {

	constructor(repository) {

		super('air_humidity');

		if (!repository) throw new Error('No repository provided to DHT11Humidty');
		this.repository = repository;
	}

	record(value, timestamp) {

		let command = {
			created_at: timestamp,
			name: this.dataKey,
			value: parseInt(value, 10),
			unit: 'percentage'
		};

		this.repository.persist(command);
	}
}