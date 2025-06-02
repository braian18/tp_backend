import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getTarea = async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [tarea, fields] = await connection.query('SELECT * FROM tarea')

    res.status(200).json({ ok: true, result: tarea, msg: 'Approved'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

export const tareaController = {getTarea};