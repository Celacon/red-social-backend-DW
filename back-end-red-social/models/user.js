import db from '../config/database.js';
import { DataTypes } from "sequelize";


const userModel = db.define('users',{
    user_id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING,
        required: true},
    apellido: { type: DataTypes.STRING,
        required: true},
    biografia: { type: DataTypes.STRING,
            required: true},
    correo_electronico: { type: DataTypes.STRING,
        required: true},
    contrasena: { type: DataTypes.STRING,
        required: true},
        foto_perfil: {
            type: String,
           // default: "default.png"
        },
//    google_id: { type: DataTypes.STRING,
  //      required: true},
   // google_email: { type: DataTypes.STRING,
     //   required: true}
})

export default userModel;