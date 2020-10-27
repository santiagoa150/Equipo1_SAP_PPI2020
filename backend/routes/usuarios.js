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
module.exports = router;