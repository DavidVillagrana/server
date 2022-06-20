const Empleados = require('../models/Empleados');
const empleadoController = { }
//Listar todos los empleados
empleadoController.getEmpleados = async (request, response) =>{
    const empleados = await Empleados.find();
    response.json(empleados);
}

//Crear un empleado
empleadoController.createEmpleado = async(request, response)=>{
    //Request.body contiene el empleado
    //console.log(request.body);
    //response.json("Recibido");
    const empleado = new Empleados({
        nombre : request.body.nombre,
        puesto: request.body.puesto,
        departamento: request.body.departamento,
        salario: request.body.salario
    });
    await empleado.save();
    response.json({
        'status':'Empleado Guardado'
    });
}

//Actualizar un empleado
empleadoController.updateEmpleado = async (request,response)=>{
    const { id } = request.params;
    const empleado = {
        nombre : request.body.nombre,
        puesto: request.body.puesto,
        departamento: request.body.departamento,
        salario: request.body.salario
    };
    await Empleados.findByIdAndUpdate(id, {$set: empleado},{new: true} )
    response.json({status: 'Empleado actualizado correctamente'});
}

//Consultar un empleado
empleadoController.getEmpleado = async(request,response)=>{
    //Obtenemos el id de la petición
   // console.log(request.params);
   const empleado = await Empleados.findById(request.params.id); 
   response.json(empleado);
}

//Eliminar un empleado
empleadoController.deleteEmpleado = async(request, response)=>{
    const { id } = request.params;
    await Empleados.findOneAndDelete(id);
    response.json({status: 'Empleado eliminado'});
}

module.exports= empleadoController;