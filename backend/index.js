const express = require('express');
const app = express();
const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const clases = require('./routes/clases');
const usuarios_clases = require('./routes/usuario_clases');
const usuario_cursos = require('./routes/usuario_curso');
app.set('port', 3883);
app.use(express.json());
app.use('/usuarios', usuarios);
app.use('/cursos', cursos);
app.use('/clases', clases);
app.use('/usuario_clases', usuarios_clases);
app.use('/usuario_curso', usuario_cursos);
app.listen(app.get('port'), () => {
    console.log('server on port' + app.get('port'));
});