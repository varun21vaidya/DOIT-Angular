import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  todos: Todo[] = localStorage.getItem('datakey')
    ? JSON.parse(localStorage.getItem('datakey') || '[]')
    : [];
  // property to contain todos
  constructor() {}

  getTodo() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    localStorage.setItem('datakey', JSON.stringify(this.todos));
  }
  updateTodo(ind: number, todo: Todo) {
    this.todos[ind] = todo;
    localStorage.setItem('datakey', JSON.stringify(this.todos));
  }
  deleteTodo(ind: number) {
    this.todos.splice(ind, 1);
    localStorage.setItem('datakey', JSON.stringify(this.todos));
  }
}
