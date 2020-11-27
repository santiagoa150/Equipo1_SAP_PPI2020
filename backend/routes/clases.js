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
/*TODOS LOS DELETE*/
/*Este delete sirve para eliminar una clase creada*/
router.delete('/Delete-Clases-todo/Clases/:id_clase',(req, res) =>{
    const {id_clase} = req.params;
    let queryDeleteClase = 'DELETE FROM clases WHERE id_clase=?';
    mysqlConnection.query(queryDeleteClase, [id_clase], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }
    });
});
/*TODOS LOS PUTS*/
/*Este put sirve para actualizar la cantidad de usuarios que tiene una clase*/
router.put('/Put-Clases-cantidad_usuarios/Clases/:id_clase', (req, res ) =>{
    const {id_clase} = req.params;
    let queryPutCantUsuarios = `
    SET @VARIABLE = (SELECT count(*) FROM usuario_clase WHERE id_clase=?);
    UPDATE clases SET cont_usuarios = @VARIABLE WHERE id_Clase=?;`;
    mysqlConnection.query(queryPutCantUsuarios, [id_clase, id_clase], (err, results,fields) =>{
        if(err){
            console.error(err);
        }
    });
});
module.exports = router;