const { Router } = require('express');
const mysqlconection = require('../db/db');
const router = Router();
const mysqlConnection = require('../db/db');

/*Usuario inicia un curso*/
router.post('/user-init-curso/:id_curso', (req, res) => {
    const { id_curso } = req.params;
    const { id_usuario } = req.body; 
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
    const { id_usuario, calificacion } = req.body;
    let queryUserValoracionCurso = 'UPDATE usuario_calificacion SET calificacion=? WHERE id_usuario=? AND id_curso=?';
    mysqlconection.query(queryUserValoracionCurso, [id_curso, id_usuario, calificacion], (err, results, fields) => {
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
    let queryTraerCursosIniciados = `SELECT calificacion
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
/*Traer- Cursos iniciados(Miscursos)*/
router.get('/traer-calificacion/Examen/:id_usuario&:id_curso', (req, res) => {
    const { id_usuario, id_curso } = req.params;
    let queryTraerCursosIniciados = `SELECT *
    FROM  usuario_calificacion
    WHERE id_usuario = ? AND id_curso=?`;
    mysqlconection.query(queryTraerCursosIniciados, [id_usuario , id_curso], (err, rows, fields) => {
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
/*Actualizar usuario-calificación// actualizar valoración de un curso*/
router.put('/Put_Usuario-calificacion/Comunidad/:id_usuario&:id_curso', (req,res)=>{
    const {id_usuario, id_curso} = req.params;
    
    let queryPutValorCurso = 'UPDATE usuario_calificacion SET valoracion_curso=1 WHERE id_usuario=? AND id_curso=?';
    mysqlConnection.query(queryPutValorCurso, [id_usuario,id_curso], (err, results, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
/*Actualizar usuario-calificación// actualizar calificacion de un curso*/
router.put('/Put_Usuario-calificacion_calificacion/Comunidad/:id_usuario&:id_curso&:calificacion', (req,res)=>{
    const {id_usuario, id_curso,calificacion} = req.params;    
    let queryPutValorCurso = 'UPDATE usuario_calificacion SET calificacion=? WHERE id_usuario=? AND id_curso=?';
    mysqlConnection.query(queryPutValorCurso, [calificacion,id_usuario,id_curso], (err, results, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
module.exports = router;