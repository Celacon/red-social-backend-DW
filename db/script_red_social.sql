drop schema if exists red_social;

create schema if not exists red_social; 

use  red_social;

CREATE USER 'charlie'@'%' IDENTIFIED BY 'charlie';
GRANT ALL PRIVILEGES ON red_social.* TO 'charlie'@'%';

-- Tabla de usuarios (users)
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
   apellido VARCHAR(255),
  correo_electronico VARCHAR(255) UNIQUE,
  contrasena VARCHAR(255) ,
   biografia VARCHAR(255) ,
    foto_perfil VARCHAR(255) ,
   createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP -- ,
 -- google_id VARCHAR(255),  -- Identificador único de la cuenta de Gmail
 -- google_email VARCHAR(255)  -- Correo electrónico de la cuenta de Gmail 
);

-- Crear la tabla de fotos (photos)
CREATE TABLE photos (
  photo_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  url VARCHAR(255),
  descripcion TEXT,
  -- fecha_carga timestamp,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

select * from users;
select * from photos;