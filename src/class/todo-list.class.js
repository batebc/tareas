import { Todo } from './todo.class';

export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStoage();
    }

    eliminar( id ){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStoage();
    }

    marcarCompletado( id ){
        
        for( let todo of this.todos ){
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStoage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStoage();
    }

    guardarLocalStoage(){
        localStorage.setItem('todo', JSON.stringify( this.todos ));
    }

    cargarLocalStorage(){
        this.todos =  localStorage.getItem('todo') ? JSON.parse( localStorage.getItem('todo') ) : [];

        this.todos = this.todos.map(  Todo.fromJson );

    }

}