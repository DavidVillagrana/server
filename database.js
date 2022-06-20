const mongoose = require('mongoose');

//Configuración de los parametros de la base de datos
//url: 'mongodb://localhost/empleados';

//Conexion a atlas MongoDB
url='mongodb+srv://sistema_empleado:SistemaEmpleados.2020@cluster0.bdcimtt.mongodb.net/?retryWrites=true&w=majority'

dbparams ={
    //useCreateIndex: true,
    useNewUrlParser:true,
    //useFindAndModify:false,
    useUnifiedTopology:true
};

mongoose.connect('mongodb://localhost/empleados', dbparams)
        .then(db=> console.log('DB esta conectada'))
        .catch(err=>console.log(err));

module.exports = mongoose;
