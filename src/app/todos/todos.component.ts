import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  constructor(private dataservice: DataService) {}

  ngOnInit(): void {
    this.todos = this.dataservice.getTodo();
  }

  // to add new task
  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      console.log(form.controls['text'].errors?.['required']);
      return;
    }
    this.dataservice.addTodo(new Todo(form.value.text));
    form.reset();
    // console.log(form);
  }

  // ItemEventCalled was defined in todo-item component which was output event emitter which is called by onItemClick when an item is clicked
  // so this ItemEventCall will initiate setCompleted function in todo html
  // which will called in todo component which will toggle completed and incomplete state of task
  setCompleted(todo: Todo) {
    // alert('todo was clicked');

    // now we have to set the task as completed
    // but also ensure if its already completed mark it as not complete
    // so we will use not operator to inverse current conditions
    todo.completed = !todo.completed;
  }

  editTask(todo: Todo) {
    //   // first get index of todo
    //   // then user will enter new info
    //   const index= this.todos.indexOf(todo)
    //   this.dataservice.updateTodo(index,todo)
  }

  // deleteEventCall was defined in todo-item component which was output event emitter which is called by onDeleteClick when an item is clicked
  // so this deleteEventCall will initiate deleteTask function in todo html
  // which will called in todo component which will delete following task
  deleteTask(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.dataservice.deleteTodo(index);
  }
}
