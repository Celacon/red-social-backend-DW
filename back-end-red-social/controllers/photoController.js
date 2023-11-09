import photoModel from "../models/photos.js";

export const getAllPhotos =async (req, res) => {
    try {
        const photos = await photoModel.findAll()
        res.json(photos)
    } catch (error) {
        res.json({message: error.message})
    }
    }


    //mostrar un registro */

export const getPhoto = async (req,res) => {
    try {
       const photo = await photoModel.findAll({
            where:{
                photo_id:req.params.photo_id
            }
        })
        res.json(photo[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

 //mostrar un registro */

 export const getPhotoUsuario = async (req,res) => {
    try {
       const photo = await photoModel.findAll({
            where:{
                user_id:req.params.user_id
            }
        })
        res.json(photo)
    } catch (error) {
        res.json({message: error.message})
    }
}


//crear un registro */

export const createPhoto = async (req, res) => {
    if (req.file) {
        // Obtener la URL de la imagen cargada
        const foto_perfil_url = req.file.path;
        // Guardar la URL de la foto de perfil en la base de datos
        req.body.url = foto_perfil_url;     
    }

    try {
       await photoModel.create(req.body)
       res.json({
        "message":"registro creado correctamente"
       })
    } catch (error) {
        res.json({message: error.message})
    }
}

//actualizar un registro*/

export const updatePhoto = async (req,res) => {
    try {
       await photoModel.update(req.body,{
            where:{ photo_id:req.params.photo_id}
        })
        res.json({
            "message":"registro actualizado correctamente"
           })

    } catch (error) {
        res.json({message: error.message})
    }
}

//eliminar un registro*/
export const deletePhoto = async (req, res) => {
    try {
        await photoModel.destroy({
            where: { photo_id : req.params.photo_id }
        })
        res.json({
            "message":"registro borrado correctamente"
           })
    } catch (error) {
        res.json({message: error.message})
    }
}