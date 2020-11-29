const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const clases = require('./routes/clases');
const usuarios_clases = require('./routes/usuario_clases');
const usuario_cursos = require('./routes/usuario_curso');
const notificaciones = require('./routes/notificaciones');
const Files = require('./routes/Files');
app.use(cors({origin: '*'}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3883);
app.use(express.json());
app.use('/Usu', usuarios);
app.use('/Cur', cursos);
app.use('/Cla', clases);
app.use('/UsuCla', usuarios_clases);
app.use('/UsuCur', usuario_cursos);
app.use('/Not', notificaciones);
app.use('/Fil', Files)
app.listen(app.get('port'), () => {
    console.log('server on port' + app.get('port'));
});