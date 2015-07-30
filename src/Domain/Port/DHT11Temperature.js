"use strict";

var Sensor = require('./Sensor');

export default class DHT11Temperature extends Sensor {

	constructor(repository) {

		super('air_temperature');

		if (!repository) throw new Error('No repository provided to DHT11Temperature');
		this.repository = repository;
	}

	record(value) {

		let command = {
			created_at: (new Date).getTime(),
			name: this.dataKey,
			value: value,
			unit: 'celcius'
		};

		this.repository.persist(command);
	}
}