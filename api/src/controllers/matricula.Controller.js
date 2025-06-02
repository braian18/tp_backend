import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getMatricula = async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [matricula, fields] = await connection.query('SELECT * FROM matricula')

    res.status(200).json({ ok: true, result: matricula, msg: 'Approved'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

export const matriculaController = {getMatricula};