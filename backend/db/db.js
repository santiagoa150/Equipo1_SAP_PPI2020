const mysql = require('mysql');
const mysqlconection = mysql.createConnection({
    host: 'bd3wbemaaqtbjvrv8skh-mysql.services.clever-cloud.com',
    user: 'u8kn0kxztkhaaxcb',
    password: 'Uyy81rd0PqO5H2U5Jgv9',
    database: 'bd3wbemaaqtbjvrv8skh',
    multipleStatements: true
   /*
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'learn_with_us'
   */
});
mysqlconection.connect((error) => {
    if (error) {
        console.error(error);
        return;
    } else {
        console.log('base_de_datos');
    }
});
module.exports = mysqlconection;