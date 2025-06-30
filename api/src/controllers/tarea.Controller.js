import { getConnection } from "../database/database.js";
import { request, response } from "express";

// Obtener todas las tareas
const getTarea = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const [tarea] = await connection.query("SELECT * FROM tarea");
    res.status(200).json({ ok: true, result: tarea, msg: "Aprobado" });
  } catch (err) {
    res.status(400).json({ ok: false, err, msg: "Algun error" });
  }
};

// Obtener una tarea por ID
const getTareaById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [tarea] = await connection.query("SELECT * FROM tarea WHERE id_tarea = ?", [id]);
    if (tarea.length === 0) {
      res.status(404).json({ ok: false, msg: "Tarea no encontrada" });
    } else {
      res.status(200).json({ ok: true, result: tarea[0], msg: "Aprobado" });
    }
  } catch (err) {
    res.status(400).json({ ok: false, err, msg: "Algun error" });
  }
};

// Crear nueva tarea
const crearTarea = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const { titulo, descripcion, id_alumno, id_materia } = req.body;

    if (!titulo || !descripcion || !id_alumno || !id_materia) {
      return res.status(400).json({ ok: false, msg: "Faltan datos" });
    }

    const query = "INSERT INTO tarea (titulo, descripcion, id_alumno, id_materia) VALUES (?, ?, ?, ?)";
    const [result] = await connection.query(query, [titulo, descripcion, id_alumno, id_materia]);

<<<<<<< HEAD
    res.status(201).json({
      ok: true,
      id_tarea: result.insertId,
      titulo,
      descripcion,
      id_alumno,
      id_materia,
      msg: "Tarea creada",
    });
  } catch (err) {
    res.status(500).json({ ok: false, err, msg: "Error al crear tarea" });
  }
=======
    } catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
    }
>>>>>>> c35010e547b931e9ce77eaf7e6ad545b1f16cecb
};

// Actualizar tarea
const actualizarTarea = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, id_alumno, id_materia } = req.body;

    if (!titulo || !descripcion || !id_alumno || !id_materia) {
      return res.status(400).json({ ok: false, msg: "Faltan datos" });
    }

    const connection = await getConnection();
    const query = "UPDATE tarea SET titulo = ?, descripcion = ?, id_alumno = ?, id_materia = ? WHERE id_tarea = ?";
    const [result] = await connection.query(query, [titulo, descripcion, id_alumno, id_materia, id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ ok: false, msg: "Tarea no encontrada" });
    } else {
      res.status(200).json({ ok: true, msg: "Tarea actualizada" });
    }
  } catch (err) {
    res.status(500).json({ ok: false, err, msg: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
const eliminarTarea = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();

    const [result] = await connection.query("DELETE FROM tarea WHERE id_tarea = ?", [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ ok: false, msg: "Tarea no encontrada" });
    } else {
      res.status(200).json({ ok: true, msg: "Tarea eliminada" });
    }
  } catch (err) {
    res.status(500).json({ ok: false, err, msg: "Error al eliminar tarea" });
  }
};

export const tareaController = {
  getTarea,
  getTareaById,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
