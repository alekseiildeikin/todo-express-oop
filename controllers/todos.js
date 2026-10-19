import{Todo} from '../models/todo.js';
import { fileManager } from '../utils/files.js';

class todoController{
    constructor() {
        this.todos = [];
    }
    
    async createTodo(req, res) {
        const task =req.body.task;
        const newTodo = new Todo(Math.random().toString(), task)
        this.todos.push(newTodo)
        await fileManager.writeFile('./data/todos.json', this.todos)
        res.json({
            message: 'Created new todo object',
            newTask: newTodo
        })
    }

    async initTodos() {
        const todosData = await fileManager.readFile('./data/todos.json');
        if (todosData !== null) {
            this.todos = todosData
        } else {
            this.todos = []
        }
    }

    getTodos(req, res) {
        res.json({tasks: this.todos})
    }

    async updateTodo(req, res) {
        const todoId = req.params.id;
        const updatedTask = req.body.task;

        console.log(req.body)
        console.log(req.params)

        const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

        if(todoIndex < 0) {
            res.json({
                message: 'Could not find todo with such index'
            })
            throw new Error('Could not find todo')
        }
        
        this.todos[todoIndex] = new Todo(this.todos[todoIndex].id, updatedTask);
        await fileManager.writeFile('./data/todos.json', this.todos)
        res.json({
            message: 'Todo updated successfully',
            updatedTask: this.todos[todoIndex]
        })
    } 

    async deleteTodo(req, res) {
        const todoId = req.params.id;
        const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

        if(todoIndex < 0) {
            res.json({
                message: 'Could not find todo with such index'
            })
            throw new Error('Could not find todo')
        }

        this.todos.splice(todoIndex, 1);
        await fileManager.writeFile('./data/todos.json', this.todos)
        res.json({
            message: 'Todo deleted successfully'
        })
    }
}

export const TodoController = new todoController();
TodoController.initTodos();