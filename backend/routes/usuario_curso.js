const { Router } = require('express');
const mysqlconection = require('../db/db');
const router = Router();
const mysqlConnection = require('../db/db');

/*Usuario inicia un curso*/
router.post('/user-init-curso/:id_curso', (req, res) => {
    const { id_curso } = req.params;
    const { id_usuario } = req.body; 
    console.log("=================" + id_usuario);
    let queryUserInitCurso = 'INSERT INTO usuario_calificacion(id_usuario, id_curso) VALUES (?,?)';
    mysqlconection.query(queryUserInitCurso, [id_usuario, id_curso], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'POST usuario inicia curso' });
        }
    });
});
/*Guardar- CUrso iniciado(Comunidad-Integrados)*/
router.put('/guardar_valoracion-Comunidad_Integrado/Curso/:id_curso', (req, res) => {
    const { id_curso } = req.params;
    const { id_usuario, valoracion } = req.body;
    let queryUserValoracionCurso = 'UPDATE usuario_calificacion SET valoracion=? WHERE id_usuario=? AND id_curso=?';
    mysqlconection.query(queryUserValoracionCurso, [id_curso, id_usuario, valoracion], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'PUT usuario guarda info curso' });
        }
    });
});
/*Traer- Cursos iniciados(Miscursos)*/
router.get('/traer-cursosIniciados/misCursos/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    let queryTraerCursosIniciados = `SELECT *
    FROM cursos
    JOIN usuario_calificacion
    ON cursos.id=usuario_calificacion.id_curso WHERE usuario_calificacion.id_usuario = ?`;
    mysqlconection.query(queryTraerCursosIniciados, [id_usuario], (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
        }
    });
});

/*GET - UsuarioCalificación*/
router.get('/traer-UsuarioCalificacion/Integrado-Comunidad/:id_usuario', (req,res) =>{
    const {id_usuario} = req.params;
    let queryGetUsuarioCalificacion = 'SELECT * from usuario_calificacion WHERE id_usuario=?';
    mysqlConnection.query(queryGetUsuarioCalificacion, [id_usuario], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
module.exports = router;