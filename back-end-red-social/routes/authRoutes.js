import multer from 'multer';

import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser, loginUser } from '../controllers/userController.js';

/// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\Users\\lacon\\Desktop\\imagenesDW\\photo_perfil'); // o usa 'C:/Users/lacon/Desktop/imagenesDW'
        // cb(null, '../uploads/photo_perfil'); 
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

const router = express.Router()

router.get('/todos', getAllUsers)
router.get('/getUser/:user_id', getUser)
router.post('/create', upload.single('foto_perfil'), createUser)
router.put('/updateUser/:user_id', upload.single('foto_perfil'), updateUser)
router.delete('/deleteUser/:user_id', deleteUser)
router.post('/login', loginUser);


export default router











