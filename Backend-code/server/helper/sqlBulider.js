const DbConnection = require('../database/connection');
const config = require('../config/config');
const fs = require('fs');
const path = '../src/Models';

const connect = new DbConnection();
class Query {
	constructor() {
		this.db = connect;
	}

	async find(table_name, type, condition = {}) {
		try {
			let table = table_name;
			if (fs.existsSync(config.root_path + 'model/' + table_name + '.js')) {
				let models = require(path + table_name);
				let infomation = new models();

				if (typeof infomation.table_name !== 'undefined') {
					table = infomation.table_name;
				}
			}
			let query = 'select';
			if (type === 'count') {
				delete condition.fields;
			}
			if (typeof condition.fields != 'undefined') {
				let fields = condition.fields.toString();
				query += ' ' + fields;
			} else {
				query += type === 'count' ? ' count(*) as totalRecord ' : ' * ';
			}
			query += ' from ' + table;
			if (condition.hasOwnProperty('join')) {
				for (const joins of condition.join) {
					query += ' join ' + joins;
				}
			}
			if (condition.hasOwnProperty('leftJoin')) {
				for (const joins of condition.leftJoin) {
					query += ' left join ' + joins;
				}
			}
			if (typeof condition.conditions != 'undefined') {
				query += ' where ';
				let its_first = 0;
				for (const c in condition.conditions) {
					if (c === 'or') {
						for (let a in condition.conditions[c]) {
							if (its_first === 0) {
								query +=
									' `' +
									table +
									'`.`' +
									a +
									"` = '" +
									condition.conditions[c][a] +
									"'";
							} else {
								query +=
									' or `' +
									table +
									'`.`' +
									a +
									"` = '" +
									condition.conditions[c][a] +
									"' ";
							}
							its_first++;
						}
					} else if (c === 'FIND_IN_SET') {
						if (its_first === 0) {
							query += ` FIND_IN_SET(${condition.conditions[c][0]}, ${condition.conditions[c][1]}) `;
						} else {
							query += ` and FIND_IN_SET(${condition.conditions[c][0]}, ${condition.conditions[c][1]}) `;
						}
						its_first++;
					} else if (c === 'NotEqual') {
						for (let a in condition.conditions[c]) {
							if (its_first === 0) {
								query += ` ${a} != '${condition.conditions[c][a]}' `;
							} else {
								query += ` and ${a} != '${condition.conditions[c][a]}' `;
							}
							its_first++;
						}
					} else if (c === 'raw') {
						if (its_first === 0) {
							query += condition.conditions[c].join(' and ');
						} else {
							query += ` and ${condition.conditions[c].join(' and ')} `;
						}
						its_first++;
					} else if (c === 'like') {
						let likeCount = 0;
						for (let a in condition.conditions[c]) {
							if (its_first === 0) {
								query += ` ${a} like '%${condition.conditions[c][a]}%' `;
							} else {
								const conditionOpreater = likeCount > 0 ? 'or' : 'and';
								query += ` ${conditionOpreater} ${a} like '%${condition.conditions[c][a]}%' `;
							}
							likeCount++;
							its_first++;
						}
					} else if (c === 'IN') {
						for (let a in condition.conditions[c]) {
							if (its_first === 0) {
								query += ` ${a} IN(${condition.conditions[c][a]}) `;
							} else {
								query += ` and ${a} IN(${condition.conditions[c][a]}) `;
							}
							its_first++;
						}
					} else if (c === 'date') {
						if (its_first === 0) {
							query += ` ${condition.conditions[c][0]} = ${condition.conditions[c][1]} `;
						} else {
							query += ` and ${condition.conditions[c][0]} = ${condition.conditions[c][1]} `;
						}
						its_first++;
					} else {
						if (its_first === 0 && c === 1) {
							query += c + '  ' + condition.conditions[c] + '';
						}
						if (its_first === 0 && c !== '1') {
							query += ` ${c} = '${condition.conditions[c]}'`;
						} else if (its_first !== 0) {
							query += ` and ${c} = '${condition.conditions[c]}'`;
						}
						its_first++;
					}
				}
			}
			if (condition.having) {
				query += ' having ';
				query += condition.having.join();
			}
			if (condition.groupBy) {
				query += ` group by ${condition.groupBy.join()} `;
			}
			if (typeof condition.orderBy != 'undefined') {
				query += ' order by ';
				query += condition.orderBy.join();
			}
			if (typeof condition.limit != 'undefined') {
				const limit = condition.limit;
				if (Array.isArray(limit)) {
					query += ' limit ' + limit[0] + ', ' + limit[1];
				} else {
					query += ' limit ' + limit;
				}
			}
			const query_result = await this.first(query);
			if (type === 'first') {
				return query_result[0];
			}
			return query_result;
		} catch (e) {
			console.log('Error: ===>', e);
			throw e;
		}
	}

	async findall(query) {
		console.log(query);
		const [row] = await this.db.db_connect.query(String(query));
		return row;
	}

	async first(qry) {
		console.log(qry);
		try {
			return new Promise((resolve, reject) => {
				this.db.db_connect.query(String(qry), function (error, results) {
					if (error) reject(error);
					if (results) {
						resolve(results);
					}
				});
			});
		} catch (e) {
			throw { code: 400, message: e };
		}
	}

	async Query(query, type) {
		try {
			query = String(query);
			const [rows] = await this.db.db_connect.query(query);
			if (rows) {
				if (type === 'select') {
					return rows;
				} else if (type === 'insert') {
					return rows.insertId;
				} else if (type === 'update') {
					return rows.insertId;
				}
			} else {
				return [];
			}
		} catch (err) {
			console.log('Error: ===>', err);
			err.message = JSON.stringify(err);
			err.code = 400;
			throw err;
		}
	}
	async save(table_name, object) {
		if (!Object.prototype.hasOwnProperty.call(object, 'id')) {
			object.created = Math.round(new Date().getTime() / 1000, 0);
		}

		object.modified = Math.round(new Date().getTime() / 1000, 0);

		let get_scheme = 'SHOW COLUMNS FROM ' + table_name;
		let row = new Promise((R) => {
			this.db.db_connect.query(String(get_scheme), function (error, result) {
				if (error) throw error;
				R(result);
			});
		});
		row = await row.then((data) => {
			return data;
		});

		let query = '';
		let update = false;
		if (Object.prototype.hasOwnProperty.call(object, 'id')) {
			query = 'Update `' + table_name + '` SET ';
			update = true;
		} else {
			query = 'Insert IGNORE into `' + table_name + '` SET ';
		}
		let value = [];
		for (let i in row) {
			if (object.hasOwnProperty(row[i].Field)) {
				query += row[i].Field + ' = ? ,';
				value.push(object[row[i].Field]);
			}
		}

		query = query.substring(',', query.length - 1);
		if (object.hasOwnProperty('id')) {
			query += ' where id  =  ' + object.id;
		}
		try {
			const result = new Promise((resolve, reject) => {
				this.db.db_connect.query(query, value, function (error, result) {
					if (error) reject(error);
					if (result) {
						let id = update ? object.id : result.insertId;
						resolve(id);
					}
				});
			});
			return await result
				.then((data) => {
					return data;
				})
				.catch((err) => {
					throw err;
				});
		} catch (err) {
			throw { code: 400, message: err };
		}
	}
}

module.exports = Query;
