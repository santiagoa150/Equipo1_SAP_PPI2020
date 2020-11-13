const { Router } = require('express');
const router = Router();
const mysqlconection = require('../db/db');
/* inicio de sesion */
router.get('/usuario-sesion/:usuario', (req, res) => {
    const { usuario } = req.params;
    mysqlconection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (error, rows, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.json(rows);
        }
    });
});
/* registrar usuario */
router.post('/registro-sesion', (req, res) => {
    const { nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, tipo_registro } = req.body;
    let usuarioA = [nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, tipo_registro];
    let queryUsuario = 'INSERT INTO usuarios(nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, tipo_registro) VALUES(?,?,?,?,?,?,?,?,?)';
    mysqlconection.query(queryUsuario, usuarioA, (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'Usuario fue registrado.' });
        }
    });
});
/* cerrar sesion */
router.put('/cerrar-sesion/estado/:id', (req, res) => {
    const { id } = req.params;
    let querycerrarsesion = 'UPTADE usuarios SET estado=false WHERE id=?';
    mysqlconection.query(querycerrarsesion, [id], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se cerro sesion correctamente.' });
        }
    });
});
/* iniciar sesion */
router.put('/inicio-sesion/estado/:id', (req, res) => {
    const { id } = req.params;
    let queryiniciarsesion = 'UPTADE usuarios SET estado=true WHERE id=?';
    mysqlconection.query(queryiniciarsesion, [id], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se inicio sesion correctamente.' });
        }
    });
});
/* actualizar informacion */
router.put('/actualizacion-perfil/datos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo } = req.body;
    let queryactualizarperfil = 'UPTADE usuarios SET nombre=?, apellido=?, genero=?, fecha_n=?, edad=?, usuario=?, contraseña=?, correo=? WHERE id=?';
    mysqlconection.query(queryactualizarperfil, [nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, id], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se actualizo el perfil correctamente.' });
        }
    });
});
/* cambiar imagen */
router.put('/actualizacion-perfil/imagen/:id', (req, res) => {
    const { id } = req.params;
    const { avatar } = req.body;
    let queryimagen = 'UPTADE usuarios SET avatar=? WHERE id=?';
    mysqlconection.query(queryimagen, [avatar, id], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se actualizo la imagen correctamente.' });
        }
    });
});

module.exports = router;