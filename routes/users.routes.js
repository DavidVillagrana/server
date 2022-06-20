const express = require('express');
const router = express.Router();

const users = require('../controllers/user.controller');

//Obtener todos los usuarios
router.get('/',users.getUsers);
//Agregar un usuario
router.post('/',users.createUser)
//Eliminar un usuario
router.delete('/:id',users.deleteUser);
//Actualizar un usuario
router.put('/:id',users.updateUser);
//Obtener un usuario
router.get('/:id',users.getUser);
module.exports = router;
