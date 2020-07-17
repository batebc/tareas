import { Todo } from "../class";
import { todoList } from '../index'

// Referencias  en el html 
const divTodoList   = document.querySelector('.todo-list');
const txtInput      =  document.querySelector('.new-todo');
const btnBoorar     =  document.querySelector('.clear-completed');
const ulFiltros     =  document.querySelector('.filters');
const anchorFiltros =  document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ ( todo.completado ) ? 'completed' : ''  }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : ''  }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;

}



txtInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ){

        const todo = new Todo( txtInput.value );
        todoList.nuevoTodo( todo );
        crearTodoHtml(todo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click' , ( event ) => {

    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }else if ( nombreElemento.includes('button')){
        todoList.eliminar( todoId );
        divTodoList.removeChild( todoElemento );
    }

});

btnBoorar.addEventListener('click', () => {

    //todoList.eliminarCompletados();

    // for( let i = 0; i < divTodoList.children.length  ; i++ ){
    //     const elemento = divTodoList.children[i];
    //     if ( elemento.classList.contains('completed') ){
    //         console.log(i);
    //         console.log(divTodoList.children.length);
           
    //         divTodoList.removeChild(elemento);
    //     }            console.log(divTodoList.children.length);
    // }

    for( let i = divTodoList.children.length - 1; i >= 0  ; i-- ){
         
        const elemento = divTodoList.children[i];
        if ( elemento.classList.contains('completed') ){
           // console.log(i);
           // console.log(divTodoList.children.length);
            divTodoList.removeChild(elemento);
        }
        //
    }
});

ulFiltros.addEventListener('click', ( event ) => {

    const filtro = event.target.text
    if ( !filtro ) return;

    anchorFiltros.forEach( elemento => elemento.classList.remove('selected'));
    event.target.classList.add('selected');

    for( let elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if( !completado ){
                   elemento.classList.add('hidden');
                }
                break;
        }
    }

});