const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../db/db');

/* Traer cursos (Integrados y Comunidad)*/
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
/*Traer curso(Información)*/
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
/*Traer cursos creados*/
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
module.exports = router;