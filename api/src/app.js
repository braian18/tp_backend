import express from 'express';
import { envs } from './config/envs.js';
import { usersController } from './controllers/user.Controller.js';
import { tareaController } from './controllers/tarea.Controller.js';
import { matriculaController } from './controllers/matricula.Controller.js';
import { materiaController } from './controllers/materia.Controller.js';


const app = express();
app.use(express.json());
app.set('port', envs.PORT);

app.get('/users', usersController.getUsers)
app.get('/profesores', usersController.getProfesores)
app.get('/profesores/:id',usersController.getProfesorById)
app.post('/profesores', usersController.createProfesor)
app.put('/profesores/:id', usersController.updateProfesor)
app.delete('/profesores/:id', usersController.deleteProfesor)
app.get('/tarea', tareaController.getTarea)
app.get('/matricula', matriculaController.getMatricula)
app.get('/materia', materiaController.getMateria)
app.get('/alumnos', usersController.getAlumnos)

export default app;