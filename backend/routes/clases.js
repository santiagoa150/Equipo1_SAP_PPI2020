const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../db/db');

/*Traer Clases las clases creadas*/
router.get('/Get-Clases-Creadas/:id_creador', (req, res) =>{
    const {id_creador} = req.params;
    let queryGetClaseParticipacion = 'SELECT * FROM clases WHERE id_creador=?';
    mysqlConnection.query(queryGetClaseParticipacion, [id_creador], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});

module.exports = router;