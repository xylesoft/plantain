"use strict";

export default class EventRepository {

	constructor(dataStorage) {

		this.dataStorage = dataStorage;
	}

	persist(data) {

		this.dataStorage.getConnection(function(err, connection) {
		  	// Use the connection

		  	let insert = {
		  		'id': null, 
		  		'event': JSON.stringify(data), 
		  		'command_name': data.name,
		  		'created_at': data.created_at
		  	};
			connection.query('INSERT INTO events SET ?', insert, function(err, rows) {
				if (err) throw err;

				// And done with the connection.
				connection.release();
			});
		});
	}
}