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
    
    console.log(idUser,codDoc,codUser)
    let files = req.files.upload
    let url = files.path
    console.log(url)
    urlPdf = url.split('\\')
    console.log('---------------')
    console.log(urlPdf[1])
    let pathPdf = urlPdf[1]
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
    //let pdf = req.body.path
    let files = req.files.upload
    let url = files.path
    let fecha = new Date()
    console.log('Primer console_: ',url)
    urlPdf = url.split('\\')
    console.log('---------------')
    console.log('Segundo console_: ',urlPdf[1])
    pathPdf = urlPdf[1]
    console.log('Tercer console_: ',pathPdf)
    console.log('Cuarto console_: ',cod)
    console.log('Quinto console_: ',fecha)

    
    await db.select('path').from('documentos').where({codigo_documento:cod})
    .then(registro =>{
        let pdf = registro[0].path
        console.log('Entra al select path from documentos_: ',pdf)
        let rutaPdf = `./pdfDirectorio/${pdf}`

    fs.unlink(rutaPdf, (error) =>{
        if(error){
            throw error;
        }
        console.log('pdf eliminado')
    })

    db('documentos').where('codigo_documento',cod).update({path:pathPdf,fechaModificacion:fecha}).
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
    })
    .catch(error =>{
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
    
traerPdf =(req,res)=>{
    cod = req.body.codigoDoc

    db.select('*').from('documentos').where({codigo_documento:cod}).andWhere({estado:true})
    .then(registro =>{
        return res.status(200).json(
            registro
        )
    })
    .catch(error =>{
        return res.status(404).json({
            datos :error
        })
    })
}

getDocumentos =(req,res )=>{
    db.select('*').from('documentos').where({estado:true}).orderBy('id')
    .then(registros =>{
        return res.status(200).json(
            registros
        )
    })
    .catch(error =>{
        return res.status(404).json({
            datos :error
        })
    })
}

module.exports ={

    subirPdf,
    verPdf,
    getPdf,
    updatePdf,
    deletePdf,
    traerPdf,
    getDocumentos
}