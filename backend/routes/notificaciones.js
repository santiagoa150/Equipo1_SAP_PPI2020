const e = require('express');
const {Router} = require('express');
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

module.exports = router;