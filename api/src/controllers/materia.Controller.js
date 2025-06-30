import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getMateria = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const [materia] = await connection.query("SELECT * FROM materia");
    res.status(200).json({ ok: true, result: materia, msg: "Aprobado" });
  } catch (err) {
    res.status(400).json({ ok: false, err, msg: "Algun error" });
  }
};

const getMateriaById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [materia] = await connection.query(
      "SELECT * FROM materia WHERE id_materia = ?",
      [id]
    );
    if (materia.length === 0) {
      res.status(404).json({ ok: false, msg: "Materia no encontrada" });
    } else {
      res.status(200).json({ ok: true, result: materia[0], msg: "Aprobado" });
    }
  } catch (err) {
    res.status(400).json({ ok: false, err, msg: "Algun error" });
  }
};

const crearMateria = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const { nombre_materia, id_profesor } = req.body;

    if (!nombre_materia || !id_profesor) {
      res.status(400).json({ ok: false, msg: "Faltan datos" });
    }

    const query =
      "INSERT INTO materia (nombre_materia, id_profesor) VALUES (?, ?)";
    const params = [nombre_materia, id_profesor];
    const [result] = await connection.query(query, params);
    res.status(201).json({
      id_materia: result.insertId,
      nombre_materia,
      id_profesor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: "Algun error" });
  }
};

const actualizarMateria = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const { nombre_materia, id_profesor } = req.body;

    if (!nombre_materia || !id_profesor) {
      res.status(400).json({ ok: false, msg: "Faltan datos" });
    }

    const query =
      "UPDATE materia SET nombre_materia = ?, id_profesor = ? WHERE id_materia = ?";
    const params = [nombre_materia, id_profesor, id];
    const [result] = await connection.query(query, params);

    if (result.affectedRows === 0) {
      res.status(404).json({ ok: false, msg: "Materia no encontrada" });
    } else {
      res.status(200).json({ ok: true, msg: "Actualizada" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: "Algun error" });
  }
};



export const materiaController = {
  getMateria,
  getMateriaById,
  crearMateria,
  actualizarMateria,

};
