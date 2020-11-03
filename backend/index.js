const express = require('express');
const app = express();
const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const clases = require('./routes/clases');
const usuarios_clases = require('./routes/usuario_clases');
const usuario_cursos = require('./routes/usuario_curso');
app.set('port', 3883);
app.use(express.json());
app.use('/', usuarios);
app.use('/', cursos);
app.use('/', clases);
app.use('/', usuarios_clases);
app.use('/', usuario_cursos);
app.listen(app.get('port'), () => {
    console.log('server on port' + app.get('port'));
});