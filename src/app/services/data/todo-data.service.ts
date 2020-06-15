import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTodos(userName) {
    let API_URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
    return this.http.get<Todo[]>(`${API_URL}${APPROOT}/users/${userName}/todos`);
  }

  deleteTodo(userName, id) {
    let API_URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
    return this.http.delete(`${API_URL}${APPROOT}/users/${userName}/todos/${id}`)
  }

  getTodoById(userName, id) {
    let API_URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
    return this.http.get<Todo>(`${API_URL}${APPROOT}/users/${userName}/todos/${id}`)
  }

  saveTodo(userName, todo) {
    let API_URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
      return this.http.post(`${API_URL}${APPROOT}/users/${userName}/todos`, todo)  
  }
   
  updateTodo(userName, id, todo) {
    let API_URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
    return this.http.put(`${API_URL}${APPROOT}/users/${userName}/todos/${id}`, todo)
  }

}
