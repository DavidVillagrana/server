const mongoose = require ('mongoose');

const {Schema} = mongoose;

const EmpleadoSchema = new Schema({
    nombre: {
        type:String,
        require:true
    },
    puesto: {
        type:String,
        require:true
    },
    departamento: {
        type:String,
        require:true,
    },
    salario: {
        type:Number,
        require:true
    }
});

module.exports = mongoose.model('Empleados', EmpleadoSchema);