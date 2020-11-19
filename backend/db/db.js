const mysql = require('mysql');
const mysqlconection = mysql.createConnection({
    host: 'bjzj8bxslnbre6bwhpjo-mysql.services.clever-cloud.com',
    user: 'u2gzp05auoxzxc9p',
    password: 'TdrHGMWCSi7SwRpVioSC',
    database: 'bjzj8bxslnbre6bwhpjo',
    multipleStatements: true
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