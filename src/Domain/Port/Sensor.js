"use strict";

export default class Sensor {

	constructor(dataKey) {

		this.dataKey = dataKey;
	}

	digest(data) {

		if (data.substring(0, this.dataKey.length) === this.dataKey) {
			let value = parseInt((data.substring((this.dataKey + ':').length)), 10);
			this.record(value);
		}
	}
}