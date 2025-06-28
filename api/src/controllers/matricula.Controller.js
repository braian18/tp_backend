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

const createMatricula = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const { nombre, apellido, curso } = req.body;
    const query = 'INSERT INTO matricula SET ?';
    const result = await connection.query(query, { nombre, apellido, curso });
    res.status(201).json({ ok: true, result, msg: 'Matrícula creada' });
  } catch (err) {
    res.status(400).json({ ok: false, err, msg: 'Error al crear matrícula' })
  }
};

const updateMatricula = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const { nombre, apellido, curso } = req.body;
    const query = 'UPDATE matricula SET ? WHERE id = ?';
    const result = await connection.query(query, [{ nombre, apellido, curso }, id]);
    res.status(200).json({ ok: true, result, msg: 'Matrícula actualizada' });
  } catch (err) {
    res.status(400).json({ ok: false, err, msg: 'Error al actualizar matrícula' })
  }
};

const deleteMatricula = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const query = 'DELETE FROM matricula WHERE id = ?';
    const result = await connection.query(query, id);
    res.status(200).json({ ok: true, result, msg: 'Matrícula eliminada' });
  } catch (err) {
    res.status(400).json({ ok: false, err, msg: 'Error al eliminar matrícula' })
  }
};

export const matriculaController = {
  getMatricula,
  createMatricula,
  updateMatricula,
  deleteMatricula
};