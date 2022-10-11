const { database } = require('../config');
const mysql = require('mysql');
class Database {
	constructor() {
		this.db_connect = mysql.createPool(database[database.default]);
		this.db_connect.getConnection(function (err) {
			try {
				if (err) throw err;
			} catch (err) {
				throw err;
			}
		});
		this.connection = this.db_connect;
	}
}

module.exports = Database;
