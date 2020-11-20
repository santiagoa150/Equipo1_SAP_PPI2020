const express = require('express');
const cors = require('cors');
const app = express();
const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const clases = require('./routes/clases');
const usuarios_clases = require('./routes/usuario_clases');
const usuario_cursos = require('./routes/usuario_curso');
app.use(cors({origin: '*'}));
app.set('port', process.env.PORT || 3883);
app.use(express.json());
app.use('/Usu', usuarios);
app.use('/Cur', cursos);
app.use('/Cla', clases);
app.use('/UsuCla', usuarios_clases);
app.use('/UsuCur', usuario_cursos);
app.listen(app.get('port'), () => {
    console.log('server on port' + app.get('port'));
});