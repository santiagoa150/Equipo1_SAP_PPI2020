const { Router } = require('express');
const mysqlconection = require('../db/db');
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
/*Este get sirve para saber la id de una clase mediante su fecha de creación*/
router.get('/Get-Clases-id/clases/:fecha_c&:id_creador',(req,res) =>{
    const {fecha_c, id_creador} = req.params;
    let queryGetIdClase = 'SELECT id_clase FROM clases WHERE fecha_c=? AND id_creador=?';
    mysqlconection.query(queryGetIdClase, [fecha_c, id_creador], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*Este get sirve para traer una clase por su id*/
router.get('/Get-Clases-id_Min/clases/:id_clase', (req,res) =>{
    const {id_clase} =req.params;
    let queryGetIdClase = 'SELECT clases.id_creador, clases.auto_u, clases.id_clase, clases.titulo, usuarios.usuario FROM clases JOIN usuarios ON clases.id_creador = usuarios.id_usuario WHERE id_clase=?';
    mysqlconection.query(queryGetIdClase, [id_clase], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    })
});
/*TODOS LOS POST*/
/*Este post sirve para crear una clase nueva*/
router.post('/Post-Clases-NuevaClase', (req,res) =>{
    const {titulo, id_creador, fecha_c, auto_u} = req.body;
    let queryNewClase = 'INSERT INTO clases(titulo,id_creador,fecha_c,auto_u) VALUES (?,?,?,?)';
    mysqlconection.query(queryNewClase, [titulo, id_creador, fecha_c, auto_u], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CLASE CREADA"});
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
        }else{
            res.json({message: "CORRECTO"});
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
        }else{
            res.json({message: "CORRECTO"});
        }
    });
});
module.exports = router;