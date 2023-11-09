import userModel from '../models/user.js';
import photoModel from '../models/photos.js';
import { validarUsuario, validarLogin } from '../helpers/userValidations.js';
import bcrypt from 'bcrypt';
import validator from 'validator';



//mostrar todos los registros*/
export const getAllUsers =async (req, res) => {
    try {
        const users = await userModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({message: error.message})
    }
    }

    //mostrar un registro */

export const getUser = async (req,res) => {
    try {
       const user = await userModel.findAll({
            where:{
                user_id:req.params.user_id
            }
        })
        res.json(user[0])
    } catch (error) {
        res.json({message: error.message})
    }
}



export const createUser = async (req, res) => {
    let parametros = req.body;
  
    if (req.file) {
        // Obtener la URL de la imagen cargada
        const foto_perfil_url = req.file.path;
        // Guardar la URL de la foto de perfil en la base de datos
        parametros.foto_perfil = foto_perfil_url;     
    }else {
        parametros.foto_perfil = 'default.png'
    }

     //Validar los datos
     try {
     //   console.log(parametros);
        validarUsuario(parametros);
       
    } catch (error) {

        console.log(error)
        return res.status(400).json({
            status: "error",
            mensaje: "faltan datos por enviar"
        });
    }
    
    try {
        // Buscar al usuario en la base de datos por su correo electrónico
        const user = await userModel.findOne({
            where: {
                correo_electronico: parametros.correo_electronico
            }
        });

        if (user) {
            return res.status(401).json({
                status: "error",
                mensaje: "El usuario ya existe"
            });
        } } catch (error) {
            res.status(500).json({ message: error.message });
        }

    // Generar un valor de sal único para el usuario
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    // Hashear la contraseña del usuario junto con el valor de sal
    const password = parametros.contrasena;
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Sustituir la contraseña en parametros con el hashedPassword
    parametros.contrasena = hashedPassword;





    try {
       await userModel.create(parametros)
       res.json({
        "message":"registro creado correctamente"
       })
    } catch (error) {
        res.json({message: error.message})
    }
}

//actualizar un registro*/

export const updateUser = async (req,res) => {

    let parametros = req.body;
    let validar_contrasena = validator.isEmpty(parametros.contrasena);
    if (validar_contrasena) {
        parametros.contrasena="no cambiará"
    }
    if (req.file) {
        // Obtener la URL de la imagen cargada
        const foto_perfil_url = req.file.path;
        // Guardar la URL de la foto de perfil en la base de datos
        parametros.foto_perfil = foto_perfil_url;     
    }else {
        parametros.foto_perfil = 'default.png'
    }

     //Validar los datos
     try {
        //   console.log(parametros);
           validarUsuario(parametros);
          
       } catch (error) {
           return res.status(400).json({
               status: "error",
               mensaje: "faltan datos por enviar o no cumplen la validacion"
           });
       }

       try {
        // Buscar al usuario en la base de datos por su correo electrónico
        const user = await userModel.findOne({
            where: {
                correo_electronico: parametros.correo_electronico
            }
        });
        if (validar_contrasena) {
            parametros.contrasena=user.contrasena
        }else{

            // Generar un valor de sal único para el usuario
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    // Hashear la contraseña del usuario junto con el valor de sal
    const password = req.body.contrasena;
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Sustituir la contraseña en parametros con el hashedPassword
    req.body.contrasena = hashedPassword;

        }
       
    } catch (error) {
            res.status(500).json({ message: error.message });
        }


    try {
       await userModel.update(req.body,{
            where:{ user_id:req.params.user_id}
        })
        res.json({
            "message":"registro actualizado correctamente"
           })

    } catch (error) {
        res.json({message: error.message})
    }
}

//eliminar un registro*/
export const deleteUser = async (req, res) => {
    try {
        await photoModel.destroy({
            where: { user_id : req.params.user_id }
        })
       
    } catch (error) {
        res.json({message: error.message})
    }

    try {
        await userModel.destroy({
            where: { user_id : req.params.user_id }
        })
        res.json({
            "message":"registro borrado correctamente"
           })
    } catch (error) {
        res.json({message: error.message})
    }
}


// Función para autenticar un usuario
export const loginUser = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    // Validar los datos
    try {
        validarLogin({ correo_electronico, contrasena });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar o los datos no son válidos."
        });
    }

    try {
        // Buscar al usuario en la base de datos por su correo electrónico
        const user = await userModel.findOne({
            where: {
                correo_electronico: correo_electronico
            }
        });

        if (!user) {
            return res.status(401).json({
                status: "error",
                mensaje: "El usuario no existe"
            });
        }
   // Verificar la contraseña utilizando bcrypt.compare
   const isPasswordCorrect = bcrypt.compareSync(contrasena, user.contrasena);
        // Verificar la contraseña
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: "error",
                mensaje: "Credenciales incorrectas"
            });
        }

        // Si llegamos aquí, el usuario se autenticó correctamente
        res.json({
            status: "success",
            mensaje: "Inicio de sesión exitoso",
            usuario: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}