const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../db/db');

/*TODOS LOS GETS*/
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
router.delete('/Delete-Clases-todo/Clases/:id_clase',(req, res) =>{
    const {id_clase} = req.params;
    let queryDeleteClase = 'DELETE FROM clases WHERE id_clase=?';
    mysqlConnection.query(queryDeleteClase, [id_clase], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }
    });
});
module.exports = router;