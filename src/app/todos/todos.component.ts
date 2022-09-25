import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  inputs!: string;
  index!: number;
  new: boolean = true;
  @Input() formData!: FormData;
  form!: FormGroup;
  constructor(private dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todos = this.dataservice.getTodo();

    this.form = this.fb.group({
      text: ['', Validators.required],
    });
    if (this.formData) {
      this.form.setValue(this.formData);
    }
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
    this.index = this.todos.indexOf(todo);
    this.dataservice.updateTodo(this.index, todo);
  }

  editTask(todo: Todo) {
    //   // first get index of todo
    //   // then user will enter new info
    // console.log('edit button was clicked');
    this.index = this.todos.indexOf(todo);
    this.new = false;
    this.form.setValue({ text: todo.text });

    // when edit button is clicked the add button changes to update
    // console.log('this button is going to be changed');

    let element = <HTMLElement>document.getElementById('buttonChange');
    // console.log('this is innertext ' + element.innerText);
    if (element.innerText == 'ADD') {
      element.innerText = 'UPDATE';
    } else {
      element.innerText = 'ADD';
    }
  }

  // deleteEventCall was defined in todo-item component which was output event emitter which is called by onDeleteClick when an item is clicked
  // so this deleteEventCall will initiate deleteTask function in todo html
  // which will called in todo component which will delete following task
  deleteTask(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.dataservice.deleteTodo(index);
  }

  // to add new task
  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      console.log(form.controls['text'].errors?.['required']);
      return;
    }
    if (this.new) {
      this.inputs = form.value.text;
      this.dataservice.addTodo(new Todo(this.inputs));
      form.reset();
    } else {
      // this means we are editing the task
      // first initial data of task appears on new task bar
      this.inputs = form.value.text;
      // console.log(this.inputs);
      this.dataservice.updateTodo(this.index, new Todo(this.inputs));
      form.reset();
      this.new = true;
      let element = <HTMLElement>document.getElementById('buttonChange');
      element.innerText = 'ADD';
    }
    // console.log(form);
  }
}
