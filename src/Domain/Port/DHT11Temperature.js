"use strict";

var Sensor = require('./Sensor');

export default class DHT11Temperature extends Sensor {

	constructor(repository) {

		super('air_temperature');

		if (!repository) throw new Error('No repository provided to DHT11Temperature');
		this.repository = repository;
	}

	record(value, timestamp) {

		let command = {
			created_at: timestamp,
			name: this.dataKey,
			value: parseInt(value, 10),
			unit: 'celcius'
		};

		this.repository.persist(command);
	}
}