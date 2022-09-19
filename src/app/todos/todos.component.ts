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

  setCompleted(todo: Todo) {
    // alert('todo was clicked');

    // now we have to set the task as completed
    // but also ensure if its already completed mark it as not complete
    // so we will use not operator to inverse current conditions
    todo.completed = !todo.completed;
  }
}
