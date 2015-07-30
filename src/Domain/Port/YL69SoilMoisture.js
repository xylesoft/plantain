"use strict";

var Sensor = require('./Sensor');

export default class YL69SoilMoisture extends Sensor {

	constructor(repository) {

		super('soil_humidity');

		if (!repository) throw new Error('No repository provided to ' + this.dataKey);
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