import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getMateria = async (req = request, res = response) => {
    try {

        //creacion de la la conexion
        const connection = await getConnection();

        const [materia, fields] = await connection.query('SELECT * FROM materia')

        res.status(200).json({ ok: true, result: materia, msg: 'Approved' });

    } catch (err) {
        res.status(400).json({ ok: false, err, msg: 'Some error' })
    }
};
const crearMateria = async (req = request, res = response) => {
    try {
        const connection = await getConnection();

        const { nombre_materia, id_profesor } = req.body;

        if (!nombre_materia || !id_profesor) {

            res.status(400).json({ ok: false, err, msg: 'Faltan datos' })
        }
        const query = "INSERT INTO materia (nombre_materia, id_profesor) VALUES (?, ?)";
        const params = [nombre_materia, id_profesor];

        const [result] = await connection.query(query, params);
        res.status(201).json({
            id_materia: result.insertId,
            nombre_materia,
            id_profesor
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la materia' });
    }
}

export const materiaController = { getMateria, crearMateria };