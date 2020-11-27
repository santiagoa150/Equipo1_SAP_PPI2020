const e = require('express');
const {Router} = require('express');
const mysqlconection = require('../db/db');
const router = Router();
const mySqlConnection = require('../db/db');

/*TODOS LOS GETS*/
/*Este get sirve para traer el conteo de las notificaciones en caso de tener*/
router.get('/get_notificaciones_count/Header2/:id_creador_clase&:id_otro_usuario', (req,res) =>{
    const {id_creador_clase, id_otro_usuario} = req.params;
    let queryGetNotificaciones = `SELECT COUNT(*) AS conteo FROM notificaciones WHERE (id_creador_clase=? AND estado='visto') OR (id_otro_usuario=? AND estado='visto')  `;
    mySqlConnection.query(queryGetNotificaciones, [id_creador_clase, id_otro_usuario], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*TODOS LOS POST*/
/*Este get sirve para crear las notificaciones de un usuario al que se le invitó a una clase*/
router.post('/post_notificaciones_info/Clases', (req,res) =>{
    const {id_clase, id_creador_clase, id_otro_usuario, tipo_notificacion} = req.body;
    let quryPostNotificaion1 = 'INSERT INTO notificaciones(id_clase,id_creador_clase,id_otro_usuario,tipo_notificaicon) VALUES ()'
    mysqlconection.query(quryPostNotificaion1, [id_clase, id_creador_clase, id_otro_usuario, tipo_notificacion], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
module.exports = router;