const e = require('express');
const { Router } = require('express');
const mysqlconection = require('../db/db');
const router = Router();
const mysqlConnection = require('../db/db');

/*TODOS LOS GETS*/
/*Este metodo se usa en integrado/comunidad para traer todos los cursos*/
router.get('/get_cursos-Comunidad_Integrado/:categoria', (req, res) => {
    const { categoria } = req.params;
    /*
    const { materia, fecha_c, titulo } = req.body;
    */
    let queryCursos;
    let arreglo;
    /*
    if (materia != "" && fecha_c != "", titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND fecha_c =Date(?) AND lower(titulo) like "%?%" AND privacidad= false';
        arreglo = [categoria, materia, fecha_c, titulo];
    } else if (materia != "" && fecha_c != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND fecha_c =Date(?) AND privacidad= false';
        arreglo = [categoria, materia, fecha_c];
    } else if (materia != "" && titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND lower(titulo) like "%?%" AND privacidad= false';
        arreglo = [categoria, materia,titulo];
    } else if (fecha_c != "" && titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND fecha_c =Date(?) AND lower(titulo) like "%?%" AND privacidad= false';
        arreglo = [categoria, fecha_c, titulo];
    } else if (materia != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND privacidad= false';
        arreglo = [categoria, materia];
    } else if (fecha_c != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND fecha_c =Date(?) AND privacidad= false';
        arreglo = [categoria,fecha_c];
    } else if (titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND lower(titulo) like "%?%" AND privacidad= false';
        arreglo = [categoria,  titulo];
    } else {
        */
        arreglo = [categoria];
        queryCursos = 'SELECT * FROM cursos LEFT JOIN usuarios ON usuarios.id_usuario = cursos.id_creador WHERE cursos.categoria=? AND cursos.privacidad= false';
    /*}*/
    mysqlConnection.query(queryCursos, arreglo, (err, rows, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
        }
    });
});
/*Este metodo trae la información de un curso*/
router.get('/get_cursos-Comunidad_Integrado/Curso/:id', (req, res) => {
    const { id } = req.params;
    let queryTraerCurso = 'SELECT * FROM cursos WHERE id=?';
    mysqlConnection.query(queryTraerCurso, [id], (err, rows, fields) => {
        if (err) {
            console.err(err);
        } else {
            res.json(rows);
        }
    });
});

/*Este metodo trae todos los cursos creados*/
router.get('/get_cursos_Mis_cursos/Creados/:id_creador', (req, res) =>{
    const {id_creador} = req.params;
    let queryTraerCurso2 = 'SELECT * FROM cursos WHERE id_creador=?';
    mysqlConnection.query(queryTraerCurso2, [id_creador], (err, rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*Este get trae los cursos que hacen parte de una clase*/
router.get('/get_cursos_informacion/Clase/:id_clase', (req, res) =>{
    const {id_clase} = req.params;
    let queryTraerCurso3 = 'SELECT * FROM cursos WHERE id_clase=?';
    mysqlConnection.query(queryTraerCurso3, [id_clase], (err, rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*Este get trae la id de un curso al crearlo*/
router.get('/get_cursos_id/misCursos_Clase_CreateCurso/:id_creador&:fecha_c', (req,res)=>{
    const {id_creador, fecha_c} = req.params;
    let queryGetIdCursoCreado = 'SELECT id FROM `cursos` WHERE id_creador=? AND fecha_c=?'
    mysqlConnection.query(queryGetIdCursoCreado, [id_creador, fecha_c], (err, rows, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*Este get trae el contenido teorico de un curso para modificarlo*/
router.get('/get_cursos_id-ContenidoT/crearContenidoTeorico/:id', (req, res) =>{
    const {id} = req.params;
    let queryTraerContT = 'SELECT contenido_t FROM cursos WHERE id=?';
    mysqlConnection.query(queryTraerContT, [id], (err, rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*Este get trae el contenido evaluativo de un curso para mostrarlo y modificarlo*/
router.get('/get_preguntas_informacion/ContenidoE/:id_curso', (req,res) =>{
    const {id_curso} = req.params;
    let queryTraerContE = 'SELECT * FROM preguntas WHERE id_curso=?';
    mysqlconection.query(queryTraerContE, [id_curso], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*Este get trae el contenido didactico de un curso para usarlo en la creación.*/
router.get('/get_cursos_contenido-e/CrearContenidoE/:id', (req,res) =>{
    const{id} = req.params;
    let queryGetContenidoE = 'SELECT contenido_d_text FROM cursos WHERE id=? AND d_permiso=1';
    mysqlconection.query(queryGetContenidoE, [id], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json(rows);
        }
    });
});
/*TODOS LOS POST*/
/*Este post permite guardar un curso nuevo en la database*/
router.post('/post_cursos_informacion/misCursos', (req, res) =>{
    const {id_creador, id_clase, fecha_c, logo} = req.body;
    let queryNewCurso = "";
    if(id_clase == null){
        queryNewCurso = 'INSERT INTO cursos(id_creador, fecha_c, logo, contenido_t, contenido_d_text) VALUES(?,?,?,"", "")';
        mysqlConnection.query(queryNewCurso, [id_creador, fecha_c,logo], (err, results, fields) =>{
            if(err){
                console.error(err);
            }else{
                res.json({message: 'Curso registrado'});
            }
        })
    }else{
        queryNewCurso = 'INSERT INTO cursos(id_creador,id_clase,fecha_c,logo, contenido_t, contenido_d_text) VALUES(?,?,?,?,"","")';
        mysqlConnection.query(queryNewCurso, [id_creador, id_clase, fecha_c,logo], (err,results,fields) =>{
            if(err){
                console.error(err);
            }else{
                res.json({message: 'Curso registrado'});
            }
        });
    }
});

router.post('/post_preguntas_curso/CrearExamen', (req, res) =>{
    const {id_curso, pregunta, respuesta, opcion1, opcion2, opcion3} = req.body;
    let queryNewCurso = "INSERT INTO cursos(id_curso, pregunta, respuesta, opcion1, opcion2, opcion3) VALUES(?,?,?,?,?,?)";
    mysqlConnection.query(queryNewCurso, [id_curso, pregunta, respuesta, opcion1, opcion2, opcion3], (err, results, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: 'Curso registrado'});
        }
    });
});
/*TODOS LOS PUTS*/
/*Actualizar curso// actualizar valoración curso*/
router.put('/put_cursos_valoracion/comunidad/:id', (req, res) =>{
    const {id} = req.params;
    const {valoracion, cant_votantes} = req.body;
    console.log(id + " " + valoracion +  " " + cant_votantes);
    let queryPutCursosValoracion = 'UPDATE cursos SET valoracion=?,cant_votantes=? WHERE id=?';
    mysqlConnection.query(queryPutCursosValoracion, [valoracion, cant_votantes, id], (err, results,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    })
});
/*Actualizar la información básica al crear un curso*/
router.put('/put_cursos_infoBasica/CrearCurso/:id', (req, res) =>{
    const {id} = req.params;
    const {titulo, tematica, materia, logo} = req.body;
    let queryPutInfoBasica = 'UPDATE cursos SET titulo=?,tematica=?,materia=?,logo=? WHERE id=?';
    mysqlConnection.query(queryPutInfoBasica, [titulo,tematica,materia,logo,id] , (err, results, fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
/*Actualizar la privacidad de un curso*/
router.put('/put_cursos_privacidad/CrearCurso/:id&:privacidad', (req, res) =>{
    const {id, privacidad} = req.params;
    let queryPutPrivacidad = 'UPDATE cursos SET privacidad=? WHERE id=?';
    mysqlConnection.query(queryPutPrivacidad, [privacidad,id], (err,results,fields)=>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
/*Actualizar el contenido teoríco de un curso*/
router.put('/put_cursos_contenido-t/CrearCursoTeorico/:id', (req,res) =>{
    const {id} = req.params;
    const {contenido_t} = req.body;
    let queryPutContenidoT = 'UPDATE cursos SET contenido_t =? WHERE id=?';
    mysqlConnection.query(queryPutContenidoT, [contenido_t, id], (err, results,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
/*Este put se utiliza en la creación de curso para colocar el contenido teoríco como null*/
router.put('/put_cursos_contenido-t_setNull/CrearCurso/:id', (req,res) =>{
    const {id} = req.params;
    let queryPutNullContenidoT = 'UPDATE cursos SET contenido_t = "" WHERE id=?';
    mysqlConnection.query(queryPutNullContenidoT, [id], (err,results,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"})
        }
    });
});
/*Este put actualiza el contenido didactico y sus derivados*/
router.put('/put_cursos_contenido-d/CrearCursoD/:id', (req,res) =>{
    const {id} = req.params;
    const {contenido_d_text, d_permiso, d_propio} = req.body;
    let queryPutContenidoD = 'UPDATE cursos SET contenido_d_text=?, d_permiso=?, d_propio=? WHERE id=?';
    mysqlconection.query(queryPutContenidoD, [contenido_d_text, d_permiso, d_propio, id], (err,results,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"});
        }
    });
});

router.put('/put_cantidad_contenido-e/CrearExamen/:id&:cant_preguntas', (req,res) =>{
    const {id, cant_peguntas} = req.params;
    let queryPutContenidoD = 'UPDATE cursos SET cant_peguntas=? WHERE id=?';
    mysqlconection.query(queryPutContenidoD, [cant_peguntas, id], (err,results,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message: "CORRECTO"});
        }
    });
});
/*TODOS LOS DELETE*/
/*Este delete se utiliza para borrar un curso creado*/
router.delete('/delete-curso-informacion/paginas/:id&:id_creador', (req,res) =>{
    const {id, id_creador} = req.params;
    let queryDeleteCurso = 'DELETE FROM cursos WHERE id=? AND id_creador=?';
    mysqlConnection.query(queryDeleteCurso, [id, id_creador], (err, rows, fields)=>{
        if(err){
            console.log(err);
        }else{
            res.json("CORRECTO")
        }
    });
});
/*Este delete sirve para eliminar las preguntas de un curso*/
router.delete('/delete-preguntas-información/CrearCurso/:id_curso', (req,res) =>{
    const {id_curso} = req.params;
    let queryDeletePreguntas = 'DELETE FROM cursos WHERE id_curso=?';
    mysqlconection.query(queryDeletePreguntas, [id_curso], (err,rows,fields) =>{
        if(err){
            console.error(err);
        }else{
            res.json({message:"CORRECTO"})
        }
    });
});
module.exports = router;