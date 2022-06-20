const express = require('express');
const router = express.Router();

const empleados = require('../controllers/empleado.controller');

router.get('/', empleados.getEmpleados);

//Crear un empleado
router.post('/', empleados.createEmpleado);

//Obtener un empleado
router.get('/:id', empleados.getEmpleado);

//Actualizar un empleado
router.put('/:id', empleados.updateEmpleado);

//Eliminar un empleado
router.delete('/:id', empleados.deleteEmpleado);
module.exports = router;