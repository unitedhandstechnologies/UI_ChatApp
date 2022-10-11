const mysql = require('mysql');
const fs = require('fs');
const sqlTables = fs.readFileSync(`${__dirname}/shushly.sql`).toString();
const con = mysql.createConnection({
	host: process.env.HOST || '127.0.0.1',
	user: process.env.USERNAME || 'root',
	password: process.env.PASSWORD || '',
});
(async () => {
	console.log('--Migration start--');
	try {
		con.connect(async function (err) {
			if (err) throw err;
			console.log('Connected!');
			const databaseName = process.env.DATABASE || 'shushly';
			await con.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
			console.log('--Database created--');
			// now creating the table
			await con.query(sqlTables);
			console.log('--Table Added--');
			console.log('--Migration complete--');
		});
	} catch (err) {
		console.log('--Migration falied--');
		console.error(err);
	}
})();
