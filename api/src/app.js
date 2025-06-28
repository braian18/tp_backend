import express from 'express';
import { envs } from './config/envs.js';
import { usersController } from './controllers/user.Controller.js';
import { tareaController } from './controllers/tarea.Controller.js';
import { matriculaController } from './controllers/matricula.Controller.js';
import { materiaController } from './controllers/materia.Controller.js';


const app = express();

app.set('port', envs.PORT);

app.get('/users', usersController.getUsers)
app.get('/tarea', tareaController.getTarea)
app.get('/matricula', matriculaController.getMatricula)
app.get('/materia', materiaController.getMateria)
app.get('/users', usersController.getProfesores)
app.get('/users', usersController.getAlumnos)

export default app;