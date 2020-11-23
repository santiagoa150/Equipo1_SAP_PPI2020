const e = require('express');
const { Router } = require('express');
const router = Router();
const mysqlconection = require('../db/db');
/*TODOS LOS GETS*/
/*Este get se utiliza en el inicio de sesión para saber si un usuario esta registrado o no.
También se utiliza en el registro para saber si el usuario ya está en la plataforma.*/
router.get('/usuario-sesion/:usuario', (req, res) => {
    const { usuario } = req.params;
    mysqlconection.query('SELECT * FROM usuarios WHERE LOWER(usuario)=?', [usuario], (error, rows, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.json(rows);
        }
    });
});
/*Este get se utiliza en el registro de usuarios para saber si el correo ya está en la plataforma.*/
router.get('/correo-sesion/:correo', (req, res) => {
    const { correo } = req.params;
    mysqlconection.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (error, rows, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.json(rows);
        }
    });
});
/*Este get se utiliza en diversas paginas para obtener la información del usuario por la Id.*/
router.get('/ID-Get/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    mysqlconection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (error, rows, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.json(rows);
        }
    });
});
/*TODOS LOS POST*/
/*Este post se utiliza para registrar un usuario nuevo en la plataforma.*/
router.post('/registro-sesion', (req, res) => {
    const { nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, registro_sistema} = req.body;
    let usuarioA = [nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, registro_sistema];
    console.log(usuarioA);
    let queryUsuario = 'INSERT INTO usuarios(nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, registro_sistema) VALUES(?,?,?,?,?,?,?,?,?)';
    mysqlconection.query(queryUsuario, usuarioA, (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'Usuario fue registrado.' });
        }
    });
});
/*TODOS LOS PUT*/
/*Este put se utiliza en el perfíl para actualizar toda la información del usuario.*/
router.put('/actualizacion-perfil/datos/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo } = req.body;
    let queryactualizarperfil = 'UPDATE usuarios SET nombre=?, apellido=?, genero=?, fecha_n=?, edad=?, usuario=?, contraseña=?, correo=? WHERE id_usuario=?';
    mysqlconection.query(queryactualizarperfil, [nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo, id_usuario], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se actualizo el perfil correctamente.' });
        }
    });
});

/*Este put se utiliza para actualizar el avatar de un usuario.*/
router.put('/actualizacion-perfil/imagen/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const { avatar } = req.body;
    let queryimagen = 'UPDATE usuarios SET avatar = ? WHERE id_usuario=?';
    mysqlconection.query(queryimagen, [avatar, id_usuario], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se actualizo la imagen correctamente.' });
        }
    });
});
/*Este put se utiliza para actualizar la edad del usuario al iniciar sesión.*/
router.put('/put-usuarios-edad/:id_usuario', (req, res) =>{
    const {id_usuario} = req.params;
    const {edad} = req.body;
    console.log(edad);
    let queryPutEdad = 'UPDATE usuarios SET edad=? WHERE id_usuario=?';
    mysqlconection.query(queryPutEdad, [edad,id_usuario],(err, results, fields) =>{
        if(err){
            console.error(err);
        }
    });
})
module.exports = router;