;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])
let bcrypt = require('bcrypt')
//CRUD Usuarios
let leerUsuarios = (req, res) => {
    //console.log('GetUsuarios')
    db.select('*').from('users')
        .then(registros => {
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}
let login = (request, response) => {
    console.log('LOGIN', request.body.clave)
    user = request.body.correo,
        password = request.body.clave,
        db.select('*').from('users')
            .where({
                email: request.body.correo,
                user_name: request.body.clave
            })
            .then(registros => {
                if (user == registros[0].email && password == registros[0].user_name) {
                    console.log('Hola', user, registros[0].user_name);
                    return response.status(200).json(
                        registros
                    )
                }
            })
            .catch(error => {
                return response.status(404).json({
                    datos: error
                })
            })
}
//Find by Id
let findById = (request, response) => {
    //console.log('FindById_:', request.body.id)
    id = request.body.id,
        //password = request.body.clave,
        db.select('*').from('carrera_user')
            .where({ user_id: id })
            .then(registros => {
                if (id == registros[0].user_id) {
                    console.log('Existe_:', id, registros[0].user_id, registros[0].carrera_id);
                    return response.status(200).json(
                        registros
                    )
                }
            })
            .catch(error => {
                return response.status(404).json({
                    datos: error
                })
            })
}
let updateById = (request, response) => {
        id = request.body.id,
        codigo = request.body.codigoUser,
        console.log('USER_ID_:', id),
        console.log('USER_CODE_:', codigo),
        db.select('*').from('users')
            .where({id: id})
            .update({codigo_user: codigo})
            .then(registros => {
                return response.status(200).json(
                    registros
                )
                /* if (id == registros[0].user_id) {
                    console.log('Existe_:', id, registros[0].user_id ,registros[0].carrera_id);
                    
                }  */
            })
            .catch(error => {
                return response.status(404).json({
                    datos: error
                })
            })
}

let leerDocentes = (req, res) => {

    db.select('*').from('users')
        .where({ role_id: "7" })
        .then(registros => {
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}

let ingresarUsuario = (req, res) => {
    console.log('REGISTRAR!!')
    let campos = req.body.campos
    let tabla = 'usuario'
    db(tabla).insert(campos)
        .then(resultado => {
            return res.status(200)
                .json({ mensaje: 'usuario registrado' })

        })
        .catch((error) => {
            return res.status(404).json({

                mensaje: error
            })
        })
}

/* let leerUsuarios = (req, res) => {

    db.select('*').from('usuarios')
        .then(registros => {
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
} */
let leerRoles = (req, res) => {

    db.select('*').from('roles')
        .then(registros => {
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}
let leerInstitutos = (req, res) => {

    let idIng = req.body.id
    console.log(idIng)

    db.select('carrera_id').from('carrera_user').where({user_id:idIng})
        .then(registros => {
            let carrera = registros[0].carrera_id
            console.log(carrera)
            
            db.select('instituto_id').from('carreras').where({id:carrera})
            .then( resultado =>{
                console.log(resultado[0].instituto_id)
                let inst = resultado[0].instituto_id

                db.select('nombre').from('institutos').where({id:inst})
                .then( registro =>{
                    console.log(registro[0].nombre)
                    return res.status(200).json(
                        registro[0].nombre
                    )
                })
                .catch(error => {
                    return res.status(404).json({
                        datos: error
                    })
                })

            })
            .catch(error => {
                return res.status(404).json({
                    datos: error
                })
            })

        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}
let leerCarreras = (req, res) => {

    db.select('*').from('carreras')
        .then(registros => {
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}
let leerCarrerasxUsuario = (req, res) => {

    db.select('*').from('carrera_user')
        .then(registros => {
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}

/* let leerCarrerasxUsuario = (req, res) => {

    db.select('carreras.nombre', 'users.name')
    .from('carreras')
    .join('carrera_user', 'carrera.id', '=', 'carrera_user.carrera_id')
    .join('users', 'users.id', '=', 'carrera_user.user_id')

    //select('*').from('carreras_user')
        .then(registros => {
            console.log('registros_:',registros)
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            console.log('Error:',error)

            return res.status(404).json({
                datos: error
            })
        })
} */


let leerTabla = (req, res) => {
    let campos = '*'
    let tabla = 'institutos'
    console.log(campos)
    console.log(tabla)
    db.select(campos).from(tabla)
        .then(registros => {
            return res.status(200).json({
                datos: registros
            })
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}

let leerTablaId = (req, res) => {
    let campos = req.body.campos
    let tabla = req.body.tabla
    let condicion = req.body.condicion
    db(tabla).where(condicion).select(campos)
        .then(registros => {
            return res.status(200).json({
                datos: registros
            })
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}

let ingresarRegistro = (req, res) => {
    let campos = req.body.campos
    let tabla = req.body.tabla
    console.log(campos.primerNombre)
    console.log(tabla)
    db(tabla).insert(campos)
        .then(registro => {
            return res.status(200).json({
                mensaje: "el registro due guardado"
            })
        })
        .catch(error => {
            return res.status(404).json({
                mensaje: error
            })
        })
}


let modificarRegistro = (req, res) => {
    let campos = req.body.campos
    let tabla = req.body.tabla
    let condicion = req.body.condicion
    db(tabla).where(condicion[0], condicion[1], condicion[2]).update(campos)
        .then(registro => {
            return res.status(200).json({
                mensaje: "El registro fue modificado"
            })

        })
        .catch(error => {
            return res.status(404).json({
                mensaje: error
            })
        })
}
//getDocumentos
let getDocumentos = (req, res) => {
    //console.log('GetUsuarios')
    db.select('*').from('documentos')
        .then(registros => {
            return res.status(200).json(
                registros
            )
        })
        .catch(error => {
            return res.status(404).json({
                datos: error
            })
        })
}


module.exports = {
    leerRoles,
    leerInstitutos,
    leerCarreras,
    leerTablaId,
    leerUsuarios,
    leerDocentes,
    ingresarRegistro,
    modificarRegistro,
    ingresarUsuario,
    login,
    findById,
    updateById,
    leerCarrerasxUsuario,
    getDocumentos
}