import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../Task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTodo: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  constructor() {}
  ngOnInit(): void {}

  delete(item: any) {
    this.onDeleteTask.emit(item);
  }

  editTodo(item: any) {
    this.onEditTodo.emit(item);
  }
}
