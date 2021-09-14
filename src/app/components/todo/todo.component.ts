import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../../Task';
import { TodoService } from 'src/app/services/todo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  modalRef!: BsModalRef;
  faTimes = faTimes;
  toEdit!: Task;
  edittext: string = '';

  constructor(
    private todoservice: TodoService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.todoservice.getTasks().subscribe((todo) => (this.tasks = todo));
  }

  delete(task: Task) {
    this.todoservice
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  editTodo(task: Task, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.toEdit = task;
  }

  onSubmit() {
    if (!this.edittext) {
      alert('Please Input Item to Add');
      return;
    }

    this.toEdit.text = this.edittext;
    this.todoservice.editTask(this.toEdit).subscribe();
    this.modalRef.hide();
  }

  addItem(task: Task) {
    this.todoservice.addItem(task).subscribe((todo) => this.tasks.push(todo));
  }
}
