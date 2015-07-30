"use strict";

var Sensor = require('./Sensor');

export default class BH1750LightIntensity extends Sensor {

	constructor(repository) {

		super('light_intensity');

		if (!repository) throw new Error('No repository provided to ' + this.dataKey);
		this.repository = repository;
	}

	record(value, timestamp) {

		let parts = value.split(':');
		let command = {
			created_at: timestamp,
			name: this.dataKey,
			value: parseInt(parts[0], 10),
			unit: 'lux',
			mode: parts[1].trim()
		};

		this.repository.persist(command);
	}
}