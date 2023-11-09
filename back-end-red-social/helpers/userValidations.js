
import validator from 'validator';

const validarUsuario = (parametros) => {
    let validar_nombre = !validator.isEmpty(parametros.nombre) &&
        validator.isLength(parametros.nombre, { min: 3, max: undefined });
    let validar_apellido = !validator.isEmpty(parametros.apellido)&&
        validator.isLength(parametros.apellido, { min: 3, max: undefined });
    let validar_correo_electronico = !validator.isEmpty(parametros.correo_electronico)&&
        validator.isLength(parametros.correo_electronico, { min: 10, max: undefined });
    let validar_contrasena = !validator.isEmpty(parametros.contrasena)&&
        validator.isLength(parametros.contrasena, { min: 10, max: 20 });
    let validar_biografia = !validator.isEmpty(parametros.biografia)&&
        validator.isLength(parametros.contrasena, { min: 1, max: undefined });    
  

    if (!validar_nombre) {
        throw new Error("No se ha validado el nombre !");
    }

    if (!validar_apellido) {
        throw new Error("No se ha validado el apellido!");
    }

    if (!validar_correo_electronico) {
        throw new Error("No se ha validado el correo electrónico !!");
    }

    if (!validar_contrasena) {
        throw new Error("No se ha validado la contraseña");
    }
    if (!validar_biografia) {
        throw new Error("No se ha validado la biografia");
    }
   
}



const validarLogin = (parametros) => {
    const { correo_electronico, contrasena } = parametros;

    if (!correo_electronico || !contrasena) {
        throw new Error("Faltan datos de inicio de sesión");
    }
}

export { validarUsuario, validarLogin };


