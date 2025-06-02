import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getUsers = async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [users, fields] = await connection.query('SELECT * FROM usuarios')

    res.status(200).json({ ok: true, result: users, msg: 'Approved'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

export const usersController = {getUsers};