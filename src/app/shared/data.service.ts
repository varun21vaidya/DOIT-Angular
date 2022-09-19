import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // property to contain todos
  todos: Todo[] = [
    new Todo('This is a test',true),
    new Todo(
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt tempore tempora aut repudiandae facere. Aliquam alias rerum, hic rem cum sunt? Maiores, beatae! Sequi iste eum, porro dolor sed hic?'
    ),
  ];
  constructor() {}

  getTodo() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }
  updateTodo(ind: number, todo: Todo) {
    this.todos[ind] = todo;
  }
  deleteTodo(ind: number) {
    this.todos.splice(ind, 1);
  }
}
