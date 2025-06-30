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
app.get('/tarea', tareaController.getTarea)
app.get('/matricula', matriculaController.getMatricula)
//rutas de CRUD materia
app.get('/materia', materiaController.getMateria)
app.post('/materia', materiaController.crearMateria);
app.put('/materia/:id', materiaController.actualizarMateria);
app.delete('/materia/:id', materiaController.eliminarMateria);
app.get('/profesores', usersController.getProfesores)
app.get('/alumnos', usersController.getAlumnos)
app.post('/materia', materiaController.crearMateria);
app.put('/materia/:id', materiaController.actualizarMateria);
app.delete('/materia/:id', materiaController.eliminarMateria);

export default app;