import db from '../config/database.js';
import { DataTypes } from "sequelize";


const photoModel = db.define('photos',{
    photo_id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER,
        required: true},
    url: { type: DataTypes.STRING,
        required: true},
    descripcion: { type: DataTypes.STRING,
        required: true},
   // fecha_de_carga: { type: DataTypes.DATE,
     //   default: Date.now },
})

export default photoModel;