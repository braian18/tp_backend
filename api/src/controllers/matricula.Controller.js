import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getMatricula = async (req = request, res = response) => {
  try {

    //creacion de la la conexion
    const connection = await getConnection();

    const [matricula, fields] = await connection.query('SELECT * FROM matricula')

    res.status(200).json({ ok: true, result: matricula, msg: 'Approved' });

  } catch (err) {
    res.status(400).json({ ok: false, err, msg: 'Some error' })
  }
};

const createMatricula = async (req = request, res = response) => {
  try {
    const connection = await getConnection();

    const { id_materia, id_alumno, id_profesor } = req.body;

    if (!id_materia || !id_alumno || !id_profesor) {
      return res.status(400).json({ ok: false, msg: 'Faltan datos' });
    }

    // 1. Verificás que la materia exista y sea del profesor
    const [materia] = await connection.query(
      'SELECT * FROM materia WHERE id_materia = ? AND id_profesor = ?',
      [id_materia, id_profesor]
    );

    if (materia.length === 0) {
      return res.status(403).json({ ok: false, msg: 'Esa materia no te pertenece o no existe' });
    }

    // 2. Verificás que el alumno exista
    const [alumno] = await connection.query(
      'SELECT * FROM usuarios WHERE id = ? AND rol = "alumno"',
      [id_alumno]
    );

    if (alumno.length === 0) {
      return res.status(404).json({ ok: false, msg: 'El alumno no existe' });
    }
    // 3. Verificás que no esté ya matriculado
    const [existe] = await connection.query(
      'SELECT * FROM matricula WHERE id_materia = ? AND id_alumno = ?',
      [id_materia, id_alumno]
    );

    if (existe.length > 0) {
      return res.status(409).json({ ok: false, msg: 'Ya está matriculado' });
    }

    // 4. Insertás la matrícula
    const [result] = await connection.query(
      'INSERT INTO matricula (id_materia, id_alumno) VALUES (?, ?)',
      [id_materia, id_alumno]
    );

    res.status(201).json({
      ok: true,
      msg: 'Alumno matriculado correctamente',
      id_matricula: result.insertId,
      id_materia,
      id_alumno
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al matricular al alumno' });
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