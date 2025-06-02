import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getMateria= async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [materia, fields] = await connection.query('SELECT * FROM materia')

    res.status(200).json({ ok: true, result: materia, msg: 'Approved'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

export const materiaController = {getMateria};