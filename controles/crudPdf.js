;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])
let fs = require('fs')
let path = require('path')


let subirPdf =async (req, res) => {
    let files = req.files.upload
    let url = files.path
    console.log(url)
    urlPdf = url.split('\\')
    console.log('---------------')
    console.log(urlPdf[1])
    pathPdf = urlPdf[1]
    console.log(pathPdf)
    let datos = [{idUsuario:1,codigo_user:'S001',codigo_documento:'ACTA-ISTBJ-2020-001',path:pathPdf}]

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

let getPdf=(req,res)=>{
    db.select('path').from('documentos')
    .then(registros =>{
        return res.status(200).json({
            txt: true,
            datos:registros,
            msg: `${registros.length} registros encontrados`
        })
    })
}

module.exports ={
subirPdf,
verPdf,
getPdf,
setDocumentoCode,
setDocumentoNonCode


}