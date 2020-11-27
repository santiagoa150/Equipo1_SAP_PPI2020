const e = require('express');
const {Router} = require('express');
const router = Router();
const mySqlConnection = require('../db/db');

/*TODOS LOS GETS*/
/*Este get sirve para traer el conteo de las notificaciones en caso de tener*/
router.get('/get_notificaciones_count/Header2/:id_creador&:id_recibidor', (req,res) =>{
    const {id_creador, id_recibidor} = req.params;
    let queryGetNotificaciones = `SELECT COUNT(*) AS conteo FROM notificaciones WHERE id_creador=? OR id_recibidor=?`;
    mySqlConnection.query(queryGetNotificaciones, [id_creador, id_recibidor], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }
    });
});
module.exports = router;