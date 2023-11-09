/*const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.json());
const port = 8000;
// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '199725',
  database: 'red_social',
});

// Middleware para subir imágenes
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Tamaño máximo de imagen: 10MB
}).single('imagen'); // 'imagen' debe coincidir con el campo de entrada en el formulario

// Ruta para subir una nueva imagen
app.post('/subir-imagen', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send('Error al subir la imagen.');
    }

    // Procesar la imagen y guardar la información en la base de datos
    const { user_id, titulo, descripcion, url_imagen } = req.body;
    // Aquí deberías realizar las transformaciones y guardar los datos en la base de datos.

    res.status(200).json({ mensaje: 'Imagen subida con éxito' });
  });
});

app.listen(port,'localhost',() => {
  console.log('Servidor en ejecución en el puerto: '+port);
});
*/


import express from "express";
import cors from 'cors';
import db from './config/database.js';
import userRoutes from './routes/authRoutes.js';
import photoRoutes from './routes/photoRoutes.js';

const app = express()

app.use( cors())
app.use(express.json())
app.use('/user',userRoutes)
app.use('/photo',photoRoutes)

try {
    db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es:${error}`)
}

app.listen(8000,'localhost', () => {
    console.log('Server UP running in http://localhost:8000/')
})



