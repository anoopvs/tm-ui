import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/v1/tmservice';
   constructor(private http:HttpClient) { }

getAllTasks() {
    return this.http.get<Task[]>(`${this.baseUrl}/task`);
}

addTask(task: Task) : Observable<any> {
  return this.http.post(`${this.baseUrl}/task/create`, task);
}

updateTask(task: Task): Observable<any> {
  return this.http.put(`${this.baseUrl}/task/update/${task.taskId}`, task);
}
endTask(task: Task): Observable<any> {
  return this.http.put(`${this.baseUrl}/task/endtask/${task.taskId}`, task);
}
}
