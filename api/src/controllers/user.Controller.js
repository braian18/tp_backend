import { getConnection } from "../database/database.js";
import { request, response } from "express";

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

const getProfesores = async (req=request, res=response) => {
    try{
        const connection = await getConnection();

        const[users, fields] = await connection.query('SELECT * FROM usuarios WHERE rol = "profesor"')
        res.status(200).json({ ok: true, result: users, msg: 'Approved'});
    }catch(err){
        res.status(400).json({ok: false, err, msg: 'Some error'})
    }
};

/*const getAlumnos = async (req=request, res=response) =>{
    try{
        const connection = await getConnection();
        const [users, fields] = await connection.query('SELECT * FROM usuarios WHERE rol = alumno')
        res.status(200).json({ ok: true, result: users, msg: 'Approved'});
    } catch(err){
        res.status(400).json({ok: false, err, msg: 'Some error'})
    }
};*/


const getAlumnos = async (req=request, res=response) => {
    try{
        const connection = await getConnection();

        const {rol} = req.body;

        if (rol != "profesor" || rol != "admin") {
            res.status(400).json({ ok: false, err, msg: 'Acceso Denegado' })
        }
        const[users] = await connection.query('SELECT * FROM usuarios WHERE rol = "alumno"')
        res.status(200).json({ ok: true, result: users, msg: 'Approved'});
    }catch(err){
        res.status(400).json({ok: false, err, msg: 'Some error'})
    }
};


export const usersController = {getUsers,getAlumnos,getProfesores};