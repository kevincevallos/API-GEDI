;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])
let fs = require('fs')
let path = require('path')


let subirPdf =async (req, res) => {
    let idUser = req.body.idUser
    let codUser = req.body.codUser
    let codDoc = req.body.codDoc
    
    console.log('Data',idUser,codDoc,codUser, req.files.upload)
    let files = req.files.upload
    let url = files.path
    console.log(url)
    urlPdf = url.split('\\')
    console.log('---------------')
    console.log(urlPdf[1])
    pathPdf = urlPdf[1]
    console.log(pathPdf)
    
    if( codUser === undefined){
        let datos = [{idUsuario:idUser,codigo_documento:codDoc,path:pathPdf}]
        console.log(datos)
        await db('documentos').insert(datos).then(registros =>{
            return res.status(200).json({
                ok: true,
                mensaje: 'documento guardado correctamente'
            })
        })
        .catch(error =>{
           
            return res.status(500).json({
                ok: false,
                error
            })
        })
        
    } else {

        let datos = [{idUsuario:idUser,codigo_user:codUser,codigo_documento:codDoc,path:pathPdf}]
        console.log(datos)

    await db('documentos').insert(datos).then(registros =>{
        return res.status(200).json({
            ok: true,
            mensaje: 'documento guardado correctamente'
        })
    })
    .catch(error =>{
       
        return res.status(500).json({
            ok: false,
            error
        })
    }) 
    }
    
}

//Traeme documento del path
let verPdf = (req,res) =>{
    let pdf = req.params.pdf
    let rutaPdf = `./pdfDirectorio/${pdf}`
    
    fs.exists(rutaPdf, (exists) =>{
        if (exists) {
            res.status(200).sendFile(path.resolve(rutaPdf))
        } else {
            return res.status(404).send({mensaje:'pdf no encontrado'})
        }
    })
}

//Devuelve documento donde el código sea igual al del front
let getPdf=(req,res)=>{
    let cond = req.body.cond//{"cond":"ACTA o Soli con =>% al final"}

    db.select('*').from('documentos').where('codigo_documento','like',cond).andWhere('estado','true')
    .then(registros =>{
        return res.status(200).json({
            txt: true,
            datos:registros,
            msg: `${registros.length} registros encontrados`
        })
    })
    .catch(error=>{
        return res.status(404).json({
            txt:false,
            error
        })
    })
}

updatePdf= async (req, res) => {
    let cod = req.body.cod
    let files = req.files.upload
    let url = files.path
    let fecha = new Date()
    console.log(url)
    urlPdf = url.split('\\')
    console.log('---------------')
    console.log(urlPdf[1])
    pathPdf = urlPdf[1]
    console.log(pathPdf)
    console.log(cod)
    console.log(fecha)

    await db('documentos').where('codigo_documento',cod).update({path:pathPdf,fechaModificacion:fecha}).
    then(resultado =>{
        return res.status(200).json({
            txt: true,
            data: resultado,
            mensaje: 'documento actualizado'
       })
    })
    .catch(error=>{
        return res.status(404).json({
            txt:false,
            error
        })
    }) 


}

deletePdf = (req,res) =>{
        var cod = req.body.cod
    
        db('documentos').where('codigo_documento',cod).update({estado:false})
        .then( resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}` 
            })
        })
        
}
    
//SetDocumentoCode
let setDocumentoCode =async (req, res) => {
    id = req.body.idUsuario
    codigoDoc = req.body.codigoDocumento
    codigoUsr = req.body.codigoUsuario
    console.log('id y códigos_: ',id, codigoDoc, codigoUsr)

    let datos = [{idUsuario:id,codigo_user:codigoUsr,
                  codigo_documento:codigoDoc}]

    await db('documentos').insert(datos).then(registros =>{
        return res.status(200).json({
            ok: true,
            mensaje: 'documentoCode Guardado!'
        })
    })
    .catch(error =>{
       
        return res.status(500).json({
            ok: false,
            error
        })
    })
    
}
//SetDocumentoNonCode
let setDocumentoNonCode =async (req, res) => {
    id = req.body.idUsuario
    codigoDoc = req.body.codigoDocumento
    console.log('id y código_: ',id, codigoDoc)
    let datos = [{idUsuario:id,codigo_documento:codigoDoc}]

    await db('documentos').insert(datos).then(registros =>{
        return res.status(200).json({
            ok: true,
            mensaje: 'documentoNonCode Guardado!'
        })
    })
    .catch(error =>{
       
        return res.status(500).json({
            ok: false,
            error
        })
    })
    
}

module.exports ={

    subirPdf,
    verPdf,
    getPdf,
    updatePdf,
    deletePdf

}