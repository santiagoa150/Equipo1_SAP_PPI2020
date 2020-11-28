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

/*TODOS LOS POST*/
/*Este post sirve para crear las notificaciones de un usuario al que se le invitó a una clase*/
router.post('/post_notificaciones_info/Clases', (req, res) => {
    const { id_clase, id_creador_clase, id_otro_usuario, tipo_notificacion, titulo_clase, usuario } = req.body;
    let quryPostNotificaion1 = 'INSERT INTO notificaciones(id_clase,id_creador_clase,id_otro_usuario,tipo_notificacion,titulo_clase,usuario) VALUES (?,?,?,?,?,?)'
    mysqlconection.query(quryPostNotificaion1, [id_clase, id_creador_clase, id_otro_usuario, tipo_notificacion, titulo_clase, usuario], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: "CORRECTO" })
        }
    });
});
module.exports = router;