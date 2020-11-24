const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../db/db');
/*TODOS LOS GET*/
/*Este get se utiliza en la pagina de clases para traer las clases inscrritas*/
router.get('/get-usario_claseJOINclases-todo/:id_usuario', (req, res) =>{
    const {id_usuario} = req.params;
    let queryClasesInscritas = 'SELECT * FROM usuario_clase JOIN clases ON usuario_clase.id_clase = clases.id_clase WHERE usuario_clase.id_usuario=?';
    mysqlConnection.query(queryClasesInscritas, [id_usuario], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*Este get se utiliza en la pagina de clase para traer el nombre del participante de la clase*/
router.get('/get-usuario_claseJOINclases-nombre_apellido/clase/:id_clase', (req, res) =>{
    const {id_clase} = req.params;
    let queryParticipantesClase = 'SELECT CONCAT(usuarios.nombre," ",usuarios.apellido) AS concat FROM usuario_clase JOIN usuarios ON usuario_clase.id_usuario = usuarios.id_usuario WHERE usuario_clase.id_clase=?';
    mysqlConnection.query(queryParticipantesClase, [id_clase], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
module.exports = router;