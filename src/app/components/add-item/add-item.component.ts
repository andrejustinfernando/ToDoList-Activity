import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  @Output() onAddItem: EventEmitter<Task> = new EventEmitter();
  text!: string;
  dt = new Date();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please Input Item to Add');
      return;
    }

    const newItem = {
      text: this.text,
      day: this.dt,
    };

    this.onAddItem.emit(newItem);

    this.text = '';
  }
}
