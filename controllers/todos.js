import{Todo} from '../models/todo.js';

class todoController{
    constructor() {
        this.todos = [];
    }
    
    createTodo(req, res) {
        const task =req.body.task;
        const newTodo = new Todo(Math.random().toString(), task)
        this.todos.push(newTodo)
        res.json({
            message: 'Created new todo object',
            newTask: newTodo
        })
    }
}

export const TodoController = new todoController()