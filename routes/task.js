import express from 'express';
import { deleteTask, getAllTask, newTask, updateTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/isAuth.js';


export const taskRouter = express.Router();

taskRouter.get('/all',isAuthenticated,getAllTask);
taskRouter.post('/new',isAuthenticated,newTask);

taskRouter.route('/:id').put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);