import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  URL: string = environment.baseUrl;
  APPROOT: string = environment.appRoot;

  constructor(
    private http: HttpClient
  ) { }

  getAllTodos(userName) {
    return this.http.get<Todo[]>(`${this.URL}${this.APPROOT}/users/${userName}/todos`);
  }

  deleteTodo(userName, id) {
    return this.http.delete(`${API_URL}/users/${userName}/todos/${id}`)
  }

  getTodoById(userName, id) {
    return this.http.get<Todo>(`${API_URL}/users/${userName}/todos/${id}`)
  }

  saveTodo(userName, todo) {
      return this.http.post(`${API_URL}/users/${userName}/todos`, todo)  
  }
   
  updateTodo(userName, id, todo) {
    return this.http.put(`${API_URL}/users/${userName}/todos/${id}`, todo)
  }

}
