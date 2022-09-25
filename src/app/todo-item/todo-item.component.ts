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

  @Output() editEventCall: EventEmitter<void> = new EventEmitter();

  @Output() deleteEventCall: EventEmitter<void> = new EventEmitter();

  constructor(private dataservice: DataService) {}

  ngOnInit(): void {}

  // ItemEventCalled was defined in todo-item component which was output event emitter which is called by onItemClick when an item is clicked
  // so this ItemEventCall will initiate setCompleted function in todo html which will called in todo component
  // which will toggle completed and incomplete state of task
  onItemClick() {
    console.log('Todo was clicked');
    this.ItemEventCall.emit();
  }

  onEditClick() {
    this.editEventCall.emit();
  }

  onDeleteClick() {
    this.deleteEventCall.emit();
  }
}
