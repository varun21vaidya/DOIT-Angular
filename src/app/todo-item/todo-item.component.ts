import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  // we have to implement the functionality to complete the task
  // emit an event each time item is clicked
  // so that parent component can event bind to listen those events
  // event type is void bcz we arent going to send any data
  // its just a signal that todo was clicked
  @Output() ItemEventCall: EventEmitter<void> = new EventEmitter();
  constructor(private dataservice: DataService) {}

  ngOnInit(): void {}

  onItemClick() {
    console.log('Todo was clicked');
    this.ItemEventCall.emit();
  }
}
