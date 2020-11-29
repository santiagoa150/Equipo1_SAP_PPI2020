const e = require('express');
const { Router } = require('express');
const mysqlconection = require('../db/db');
const router = Router();
const mySqlConnection = require('../db/db');

/*TODOS LOS GETS*/
/*Este get sirve para traer el conteo de las notificaciones en caso de tener*/
router.get('/get_notificaciones_count/Header2/:id_creador_clase&:id_otro_usuario', (req, res) => {
    const { id_creador_clase, id_otro_usuario } = req.params;
    let queryGetNotificaciones = `SELECT COUNT(*) AS conteo FROM notificaciones WHERE (id_creador_clase=? AND estado='pendiente' AND tipo_notificacion=0) OR (id_otro_usuario=? AND estado='pendiente' AND tipo_notificacion=1) `;
    mySqlConnection.query(queryGetNotificaciones, [id_creador_clase, id_otro_usuario], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
        }
    });
});
/*Este get sirve para traer todas las notificaciones*/
router.get('/get_notificaciones_info/Notificaciones/:id_creador_clase&:id_otro_usuario', (req, res) => {
    const { id_creador_clase, id_otro_usuario } = req.params;
    let queryGetNotificaciones2 = 'SELECT * FROM notificaciones WHERE (id_creador_clase=?) OR (id_otro_usuario=?)';
    mySqlConnection.query(queryGetNotificaciones2, [id_creador_clase, id_otro_usuario], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
        }
    });
});

/*Este get sirve para traer una notificacion en caso de tener ya la de un curso*/
router.get('/get_notificaciones_uclase/clases/:id_clase&:id_otro_usuario', (req, res) => {
    const { id_clase, id_otro_usuario } = req.params;
    let queryGetNotificaciones = `SELECT COUNT(*) AS conteo FROM notificaciones WHERE id_clase=? AND id_otro_usuario=? `;
    mySqlConnection.query(queryGetNotificaciones, [id_clase, id_otro_usuario], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
        }
    });
});
/*Este get sirve para traer las notificaciones por sus 3 primary key*/
router.get('/get-notificaciones-length/clases/:id_clase&:id_creador_clase&:id_otro_usuario' , (req,res) =>{
    const {id_clase, id_otro_usuario, id_creador_clase} = req.params;
    let queryGetNotificaciones = 'SELECT COUNT(*) AS conteo FROM notificaciones WHERE id_clase=? AND id_otro_usuario=? AND id_creador_clase=?';
    mysqlconection.query(queryGetNotificaciones, [id_clase, id_otro_usuario, id_creador_clase], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*TODOS LOS POST*/
/*Este post sirve para crear las notificaciones de un usuario al que se le invitó a una clase*/
router.post('/post_notificaciones_info/Clases', (req, res) => {
    const { id_clase, id_creador_clase, id_otro_usuario, tipo_notificacion, titulo_clase, usuario,usuario2 } = req.body;
    let quryPostNotificaion1 = 'INSERT INTO notificaciones(id_clase,id_creador_clase,id_otro_usuario,tipo_notificacion,titulo_clase,usuario, usuario2) VALUES (?,?,?,?,?,?,?)'
    mysqlconection.query(quryPostNotificaion1, [id_clase, id_creador_clase, id_otro_usuario, tipo_notificacion, titulo_clase, usuario, usuario2], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: "CORRECTO" })
        }
    });
});
/*TODOS LOS DELETES*/
/*Este delete sirve para borrar las notificaciones creadas*/
router.delete('/delete_notificaciones_info/Notificaciones/:id_clase&:id_creador_clase&:id_otro_usuario', (req,res) =>{
    const {id_clase, id_creador_clase, id_otro_usuario} = req.params;
    let queryDeleteNotificacion = 'DELETE FROM notificaciones WHERE id_clase=? AND id_creador_clase=? AND id_otro_usuario=?';
    mysqlconection.query(queryDeleteNotificacion, [id_clase, id_creador_clase, id_otro_usuario], (err, rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message:"CORRECTO"});
        }
    });
});
/*TODOS LOS PUT*/
/*Este put sirve para actualizar el estado de las notificaciones a visto*/
router.put('/put-notificaciones-estado/Notificaciones/:id_otro_usuario&:id_creador_clase', (req,res) =>{
   const {id_otro_usuario, id_creador_clase} = req.params;
    let queryPutEstado = 'UPDATE notificaciones SET estado="visto" WHERE (id_creador_clase=? AND tipo_notificacion=0) OR (id_otro_usuario=? AND tipo_notificacion=1)';
   mysqlconection.query(queryPutEstado, [id_creador_clase, id_otro_usuario], (err, results, fields) =>{
    if(err){
        console.error(err);
    }else{
        res.json({message: "CORRECTO"});
    }
   });
});
module.exports = router;