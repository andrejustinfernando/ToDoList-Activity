import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'http://localhost:5000/tasks';
  constructor(private http: HttpClient) {}

  //To retrieve the tasks for display
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  //Deletes a task from the json server given the task itself
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.url}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  //Edits a specific task
  editTask(task: Task): Observable<Task> {
    const url = `${this.url}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  //Adds a task to the json server
  addItem(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task, httpOptions);
  }
}
