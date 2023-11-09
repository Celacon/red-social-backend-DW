import multer from 'multer';

import express from 'express';
import { createPhoto, deletePhoto, getAllPhotos, getPhoto, updatePhoto,getPhotoUsuario} from '../controllers/photoController.js';

/// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\Users\\lacon\\Desktop\\imagenesDW\\photo'); // o usa 'C:/Users/lacon/Desktop/imagenesDW'
        // cb(null, '../uploads/photo'); 
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, Date.now() + '_' + file.originalname); // Nombre de archivo único
    }
});


// Función de filtro para aceptar solo archivos con extensiones de imágenes
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const ext = file.originalname.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb('Solo se permiten archivos con extensiones de imágenes: jpg, jpeg, png, gif', false);

    }
};



const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const routerPhoto = express.Router()

routerPhoto.get('/photos', getAllPhotos)
routerPhoto.get('/getPhoto/:photo_id', getPhoto)
routerPhoto.post('/createPhoto', upload.single('url'), createPhoto)
routerPhoto.put('/updatePhoto/:photo_id',  updatePhoto)
routerPhoto.delete('/deletePhoto/:photo_id', deletePhoto)
routerPhoto.get('/photoUser/:user_id', getPhotoUsuario)




export default routerPhoto











