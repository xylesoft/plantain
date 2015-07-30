"use strict";

export default class Sensor {

	constructor(dataKey) {

		this.dataKey = dataKey;
	}

	digest(data, timestamp) {

		if (data.substring(0, this.dataKey.length) === this.dataKey) {
			let value = data.substring((this.dataKey + ':').length);
			this.record(value, timestamp);
		}
	}
}