import { getConnection } from "../database/database.js";
import { request, response } from "express";



//funciones admin
const getUsers = async (req=request, res=response) => {
try{

    const connection = await getConnection();

    const [users, fields] = await connection.query('SELECT * FROM usuarios')

    res.status(200).json({ ok: true, result: users, msg: 'Aproveed'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

const createUsuario = async (req=request, res=response) => {
    try {
        const connection = await getConnection();

        const { rolVal } = req.body;

        if (rolVal !== "profesor" && rolVal !== "admin") {
            return res.status(403).json({ ok: false, msg: 'Acceso Denegado' });
        }
        
        const { nombre, email, rol } = req.body;

        if (!nombre || !email || !rol) {
            res.status(400).json({ok:false, err, msg: 'Falta de datos'});
        }
        const query = "INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)";
        const params = [nombre, email, rol];
        const [result] = await connection.query(query, params);
        res.status(200).json({
            id: result.insertId,
            nombre,
            email,
            rol
         });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error al crear Usuario' });
    }
};


const updateUsuario = async (req= request, res=response)=>{
    try {
        const connection = await getConnection();
        
         const { rolVal } = req.body;

        if (rolVal !== "profesor" && rolVal !== "admin") {
            return res.status(403).json({ ok: false, msg: 'Acceso Denegado' });
        }

        const { id } = req.params;
        const { nombre, email, rol } = req.body;
        if (!nombre || !email || !rol) {
            res.status(400).json({ok:false, err, msg: 'Falta de datos'});
        }
        const query = "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?";
        const params = [nombre, email, rol, id];
        const [result] = await connection.query(query, params);
        res.status(200).json({ok:true, msg: 'Usuario actualizado'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ok:false, err, msg: 'Error al actualizar el Usuario'});
        }
}

const deleteUsuario = async (req = request, res = response) =>{
    try {
        const connection = await getConnection();
         const { rolVal } = req.body;

        if (rolVal !== "profesor" && rolVal !== "admin") {
            return res.status(403).json({ ok: false, msg: 'Acceso Denegado' });
        }

        const { id } = req.params;
        const query = "DELETE FROM usuarios WHERE id = ?";
        const params = [id];
        const [result] = await connection.query(query, params);
        res.status(200).json({ok:true, msg: 'Usuario eliminado'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ok:false, err, msg: 'Error al eliminar el Usuario'});
    }

}

//traer todos los profesores
const getProfesores = async (req=request, res=response) => {
    try{
        const connection = await getConnection();
        const[users, fields] = await connection.query('SELECT * FROM usuarios WHERE rol = "profesor"')
        res.status(200).json({ ok: true, result: users, msg: 'Approved'});
    }catch(err){
        res.status(400).json({ok: false, err, msg: 'Some error'})
    }
};

//buscar profesor por id
const getProfesorById = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        // Consulta para obtener el profesor por ID
        const [profesor] = await connection.query('SELECT * FROM usuarios WHERE id = ? AND rol = "profesor"', [id]);
        if (profesor.length === 0) {
            return res.status(404).json({ ok: false, msg: 'Profesor no encontrado' });
        }
        res.status(200).json({ ok: true, result: profesor[0], msg: 'Profesor encontrado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, err, msg: 'Error al obtener el profesor' });
    }
};

//traer todos los alumnos
const getAlumnos = async (req=request, res=response) => {
    try {
        const connection = await getConnection();

        const { rol } = req.body;

        if (rol !== "profesor" && rol !== "admin") {
            return res.status(403).json({ ok: false, msg: 'Acceso Denegado' });
        }

        const [users] = await connection.query('SELECT * FROM usuarios WHERE rol = "alumno"');
        res.status(200).json({ ok: true, result: users, msg: 'Approved' });
    } catch (err) {
        res.status(400).json({ ok: false, err, msg: 'Some error' });
    }
};

//traer un alumno por id
const getAlumnoById = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        // Consulta para obtener el alumno por ID
        const [alumno] = await connection.query('SELECT * FROM usuarios WHERE id = ? AND rol = "alumno"', [id]);
        if (alumno.length === 0) {
            return res.status(404).json({ ok: false, msg: 'alumno no encontrado' });
        }
        res.status(200).json({ ok: true, result: alumno[0], msg: 'Alumno encontrado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, err, msg: 'Error al obtener el alumno' });
    }
};


export const usersController = {
    getUsers,
    getAlumnos,
    getProfesores,
    getProfesorById,
    updateUsuario,
    deleteUsuario,
    createUsuario,
    getAlumnoById,
    };