const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../db/db');

/* Traer cursos (Integrados y Comunidad)*/
router.get('/get_cursos-Comunidad_Integrado/:categoria', (req, res) => {
    const { categoria } = req.params;
    const { materia, fecha_c, titulo } = req.body;
    let queryCursos;
    if (materia != "" && fecha_c != "", titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND fecha_c =Date(?) AND titulo =? AND privacidad= false';
    } else if (materia != "" && fecha_c != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND fecha_c =Date(?) AND privacidad= false';
    } else if (materia != "" && titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND titulo =? AND privacidad= false';
    } else if (fecha_c != "" && titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND fecha_c =Date(?) AND titulo =? AND privacidad= false';
    } else if (materia != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND materia=? AND privacidad= false';
    } else if (fecha_c != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND fecha_c =Date(?) AND privacidad= false';
    } else if (titulo != "") {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND titulo =? AND privacidad= false';
    } else {
        queryCursos = 'SELECT * FROM cursos WHERE categoria=? AND privacidad= false';
    }
    mysqlconection.query(queryCursos, [categoria, materia, fecha_c, titulo], (err, rows, fields) => {
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
    queryTraerCurso = 'SELECT * FROM cursos WHERE id=?';
    mysqlconection.query(queryTraerCurso, [id], (err, rows, fields) => {
        if (err) {
            console.err(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;