const mysql = require('mysql');
const mysqlconection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learn_with_us',
    multipleStatements: true
});
mysqlconection.connect((error) => {
    if (error) { console.error(error); return; } else { console.log('base_de_datos'); }
});
module.exports = mysqlconection;