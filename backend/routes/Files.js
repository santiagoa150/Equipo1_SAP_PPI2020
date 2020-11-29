const e = require('express');
const { Router } = require('express');
const mysqlconection = require('../db/db');
const router = Router();
const fs = require('fs');
/*ARCHIVO BENDITO*/
/*GETS*/
/*Este get trae toda la información didactica de un curso*/
router.get('/get-Examne-Contenido/Didactico/:id&:usuario', (req, res) => {
    const { id, usuario } = req.params;
    let queryTraerContD = 'SELECT contenido_d_text,id_creador,id, d_permiso FROM cursos WHERE id=?';
    mysqlconection.query(queryTraerContD, [id], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            if (rows[0].contenido_d_text != null || rows[0].contenido_d_text != "") {
                Fs(rows, usuario);
            }
            res.json(rows);
        }
    });
});

/*Este get nos elimina el archivo creado al salir del componente*/
router.get('/get-Examne-Contenido-delete/Didactico/:id&:usuario', (req, res) => {
    const { id, usuario } = req.params;
    let queryTraerContD = 'SELECT id_creador, contenido_d_text FROM cursos WHERE id=?';
    mysqlconection.query(queryTraerContD, [id], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            if (rows[0].contenido_d_text != null || rows[0].contenido_d_text != "") {
                deleteFs(rows, usuario, id);
            }
            res.json({ message: "Correcto" });
        }
    });
});

/*Nos muestra el archivo del contenido didáctico*/
router.use('/file-Didactico/:usuario&:id_creador&:id', (req, res) => {
    const { usuario, id_creador, id } = req.params;
    var path = require('path');
    res.sendFile(path.join(__dirname, `../public/${usuario}-${id_creador}-${id}.html`));
});

/*Este metodo crea el archivo que se va a mostrar en el contenido didáctico*/
function Fs(rows, usuario) {
    let ruta = `./public/${usuario}-${rows[0].id_creador}-${rows[0].id}.html`;
    fs.writeFileSync(ruta, rows[0].contenido_d_text);
}
/*Este metodo elimina el archivo que se va a mostrar en el contenido didactico*/
function deleteFs(rows, usuario, id) {
    fs.unlink(`./public/${usuario}-${rows[0].id_creador}-${id}.html`, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Se borró el archivo");
        }
    })
}
module.exports = router;