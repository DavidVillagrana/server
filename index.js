const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const authorization = require('auth-header');
const Users = require('./models/Users');
const { mongoose } = require ('./database');
const bodyParser = require('body-parser');
const { request } = require('express');
//Configuraciones 
app.set('port', process.env.PORT || 3100);
app.set('secret','my_secret_1357');
//Middleware
app.use(express.urlencoded({extended:true})); //Para recibir los datos del formulario en texto
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
var tokenauth = '';
//Ruta para iniciar sesión en el api
app.post('/api/login', async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    return new Promise((resolve,reject)=>{
        Users.findOne({email:email})
        .then ((user)=>{
            if(!user){
                res.json({success:false,message:'Usuario no encontrado'})
            }else{
                if(bcrypt.compareSync(password,user.password)){
                    const expire= 3600;
                    const token= jwt.sign(
                        {user},
                        app.get('secret'),
                        { expiresIn:expire }
                    )
                    res.json({
                        success:true,
                        token: token
                    })
                    tokenauth=token;
                }else{
                    res.json({success:false,message:'Password no coincide'})
                }
            }
        })
    })
}); //Fin de /api/login

app.use((req,res,next)=>{
    if(request.get('authorization')){
        
        auth = authorization.parse(request.get('authorization'));
        if(auth.scheme == 'token-auth')
        tokenauth = auth.token;
    }
    const token = req.body.token ||
                  req.query.token ||
                  tokenauth;
    if(token){
        jwt.verify(token,app.get('secret'),(err,decoded)=>{
            if(err){
                return res.json( {success: false, message: 'fallo en la autenticacion'})
            }else{
                req.decoded = decoded; //Almacenamos en req el token decodificado
                next();
            }
        })
    }else{
        //Si no existe el token o no se ha enviado en el request
        return res.status(403).send({
            success:false,
            message: 'el token no existe'
        })
    }
});//Fin de app.use
/*
//Funciones
function ensureToken(req,res,next){
    const headerAuth = req.headers['autorization']
    console.log(headerAuth);
    //headerAuth será igual a undefiend si el usuario no ha iniciado sesión
    if (typeof headerAuth !=='undefined'){
        //Separamos el encabezado
        const auth = headerAuth.split(" ");
        const authToken = auth[1];
        req.token = authToken;
        next();
    }else{
        //Codigo 403 indica que la ruta no esta permitida hasta que el usuario se autentique
        res.sendStatus(403);
    }
}

app.get('/api/users',ensureToken, (req,res)=>{
    jwt.verify(req.token, 'my_secret_key_1357', (err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
    res.json({
        text: 'users',
        data
            })
        }
    })
})*/
//Rutas del servidor
app.use('/api/empleados', require('./routes/empleados.routes'));
app.use('/api/users',require('./routes/users.routes'));


//Iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log("Servidor corriendo en el puerto "+ app.get('port'));
});
