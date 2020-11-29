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
    let queryTraerContD = 'SELECT contenido_d_text,id_creador,id, d_permiso, d_propio FROM cursos WHERE id=?';
    mysqlconection.query(queryTraerContD, [id],(err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            if (rows[0].contenido_d_text != null || rows[0].contenido_d_text != "") {
                let ruta = `./public/${usuario}.html`;
                fs.writeFile(ruta, rows[0].contenido_d_text, (err) =>{
                    if(err){
                        console.error(err);
                    }else{
                       res.json(rows);
                    }
                });
            }else{
                res.json(rows);
            }
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
                deleteFs(usuario);
            res.json({ message: "Correcto" });
        }
    });
});

/*Nos muestra el archivo del contenido didáctico*/
router.use('/file-Didactico/:usuario', (req, res) => {
    const { usuario} = req.params;
    var path = require('path');
    res.sendFile(path.join(__dirname, `../public/${usuario}.html`));
});

/*Este metodo elimina el archivo que se va a mostrar en el contenido didactico*/
function deleteFs(usuario) {
    fs.unlink(`./public/${usuario}.html`, (err) => {
        if (err) {
            console.error(err);
        } else {
        }
    })
}
module.exports = router;