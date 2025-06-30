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
app.post('/users', usersController.createUsuario)
app.put('/users/:id', usersController.updateUsuario)
app.delete('/users/:id', usersController.deleteUsuario)
app.get('/profesores', usersController.getProfesores)
app.get('/profesores/:id',usersController.getProfesorById)
app.get('/alumnos', usersController.getAlumnos)
app.get('/alumnos/:id',usersController.getAlumnoById)
app.get('/tarea', tareaController.getTarea)
app.get('/tarea/:id', tareaController.getTareaById);
app.post('/tarea', tareaController.crearTarea);
app.put('/tarea/:id', tareaController.actualizarTarea);
app.delete('/tarea/:id', tareaController.eliminarTarea);

app.get('/matricula', matriculaController.getMatricula)
//rutas de CRUD materia
app.get('/materia', materiaController.getMateria)
app.post('/materia', materiaController.crearMateria);
app.put('/materia/:id', materiaController.actualizarMateria);
app.delete('/materia/:id', materiaController.eliminarMateria);
app.post('/materia', materiaController.crearMateria);
app.put('/materia/:id', materiaController.actualizarMateria);
app.delete('/materia/:id', materiaController.eliminarMateria);

export default app;