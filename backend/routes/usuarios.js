const { Router } = require('express');
const router = Router();
const mysqlconection = require('../db/db');

router.get('/:usuario', (req, res) => {
    const { usuario } = req.params;
    mysqlconection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (error, rows, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const { nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo } = req.body;
    let usuarioA = [nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo];
    let queryUsuario = 'INSERT INTO usuarios(nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo) VALUES(?,?,?,?,?,?,?,?)';
    mysqlconection.query(queryUsuario, usuarioA, (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'Usuario fue registrado.' });
        }
    });
});
module.exports = router;