import { getConnection } from "../database/database.js";
import { request, response } from "express";



//funciones admin
const getUsers = async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [users, fields] = await connection.query('SELECT * FROM usuarios')

    res.status(200).json({ ok: true, result: users, msg: 'Aproveed'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};



//funciones profesor
const getProfesores = async (req=request, res=response) => {
    try{
        const connection = await getConnection();
        const[users, fields] = await connection.query('SELECT * FROM usuarios WHERE rol = "profesor"')
        res.status(200).json({ ok: true, result: users, msg: 'Approved'});
    }catch(err){
        res.status(400).json({ok: false, err, msg: 'Some error'})
    }
};

//Aca se crea un profesor
const createProfesor = async (req=request, res=response) => {
    try {
        const connection = await getConnection();
        
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
        res.status(500).json({ error: 'Error al crear profesor' });
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


//editar profesor
const updateProfesor = async (req= request, res=response)=>{
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const { nombre, email, rol } = req.body;
        if (!nombre || !email || !rol) {
            res.status(400).json({ok:false, err, msg: 'Falta de datos'});
        }
        const query = "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?";
        const params = [nombre, email, rol, id];
        const [result] = await connection.query(query, params);
        res.status(200).json({ok:true, msg: 'Profesor actualizado'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ok:false, err, msg: 'Error al actualizar el profesor'});
        }
}

//eliminar profesor
const deleteProfesor = async (req = request, res = response) =>{
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const query = "DELETE FROM usuarios WHERE id = ?";
        const params = [id];
        const [result] = await connection.query(query, params);
        res.status(200).json({ok:true, msg: 'Profesor eliminado'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ok:false, err, msg: 'Error al eliminar el'});
    }

}

///Funciones alumnos
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



export const usersController = {
    getUsers,
    getAlumnos,
    getProfesores,
    createProfesor,
    getProfesorById,
    updateProfesor,
    deleteProfesor};