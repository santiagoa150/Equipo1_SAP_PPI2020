const express = require('express');
const app = express();
app.set('port',3883);
app.use(express.json());
app.listen(app.get('port'),()=>{
    console.log('server on port'+app.get('port'));
});