-- Estructura de la base de datos

-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS tp_backend;
USE tp_backend;

-- 2. Crear la tabla de usuarios
CREATE TABLE usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol ENUM ('admin', 'profesor', 'alumno','inactivo') NOT NULL DEFAULT 'inactivo',
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Crear la tabla de materia
CREATE TABLE materia (
    id_materia INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_materia VARCHAR(100) NOT NULL,
    id_profesor INT (11) NOT NULL,
    FOREIGN KEY (id_profesor) REFERENCES usuarios(id)
);

CREATE TABLE matricula(
    id_matricula INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT (11) NOT NULL,
    id_materia INT (11) NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES usuarios(id),
    FOREIGN KEY (id_materia) REFERENCES materia(id_materia)
);

CREATE TABLE tarea(
    id_tarea INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_entrega TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREING KEY (id_alumno) REFERENCES usuarios(id),
    FOREIGN KEY (id_materia) REFERENCES materia(id_materia)
);

-- Estructura de directorios recomendada para el proyecto
/*
/mi_proyecto/
  |-- index.php (listado de usuarios)
  |-- create.php (formulario para crear usuarios)
  |-- edit.php (formulario para editar usuarios)
  |-- delete.php (script para eliminar usuarios)
  |-- config/
  |    |-- db.php (configuración de conexión a la base de datos)
  |-- css/ (opcional - para estilos personalizados)
  |-- js/ (opcional - para scripts personalizados)
*/
