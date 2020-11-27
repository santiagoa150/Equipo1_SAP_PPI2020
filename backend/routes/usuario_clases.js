const { Router } = require('express');
const mysqlconection = require('../db/db');
const router = Router();
const mysqlConnection = require('../db/db');
/*TODOS LOS GET*/
/*Este get se utiliza en la pagina de clases para traer las clases inscrritas*/
router.get('/get-usario_claseJOINclases-todo/:id_usuario', (req, res) =>{
    const {id_usuario} = req.params;
    let queryClasesInscritas = 'SELECT usuario_clase.*, clases.*, usuarios.usuario FROM usuario_clase JOIN clases Join usuarios ON usuario_clase.id_clase = clases.id_clase AND usuarios.id_usuario = clases.id_creador WHERE usuario_clase.id_usuario=?';
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
/*TODOS LOS POST*/
/*Este post sirve para unirse a una clases*/
router.post('/post-usuario_clase-Info/Clases', (req, res) =>{
    const {id_usuario, id_clase, fecha_u} = req.body;
    let queryNewUsuarioClase = 'INSERT INTO usuario_clase(id_usuario, id_clase, fecha_u) VALUES (?,?,?)';
    mysqlconection.query(queryNewUsuarioClase, [id_usuario,id_clase,fecha_u], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"});
        }
    });
});
/*TODOS LOS DELETE*/
/*Este delete sirve para borar una tubla de usuario_clase y se utiliza en clases, es decir, salirse de una clase*/
router.delete('/Delete-Clases-todo/Clases/:id_clase&:id_usuario',(req, res) =>{
    const {id_clase, id_usuario} = req.params;
    let queryDeleteClase = 'DELETE FROM usuario_clase WHERE id_clase=? AND id_usuario=?';
    mysqlConnection.query(queryDeleteClase, [id_clase, id_usuario], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
module.exports = router;