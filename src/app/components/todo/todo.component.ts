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
    //Retrieves the tasks on initialization through the getTasks function in the service
    this.todoservice.getTasks().subscribe((todo) => (this.tasks = todo));
  }

  //Deletes the specific task using the deleteTask functionin the service (triggered on press of the delete button on a task)
  delete(task: Task) {
    this.todoservice
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }
  //Shows the modal for editing a task
  editTodo(task: Task, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.toEdit = task;
  }

  //Edits the specified task (triggered when on press of the Edit Item button in the modal)
  onSubmit() {
    //If the field is empty, alert appears.
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
