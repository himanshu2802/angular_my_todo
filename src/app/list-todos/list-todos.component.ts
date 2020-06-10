import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../services/data/todo-data.service';
import { Router } from '@angular/router';


export class Todo {

  constructor(
    public id: number,
    public description: String,
    public done: boolean,
    public targetDate: Date
  ){}

}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})



export class ListTodosComponent implements OnInit {

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

    todos : Todo[]
    userName:string;
    deleteResultMessage: string
  
  // todos = [
  //   new Todo(1, 'Learn Angular', false, new Date()),
  //   new Todo(2, 'Become an Intermediate', false, new Date()),
  //   new Todo(3, 'Learn to bind Angular with Spring', false, new Date()),
  //   new Todo(4, 'Create End-to-End Application', false, new Date())
  //   // {id : 1, description : 'Learn Angular'},
  //   // {id : 2, description : 'Become an Intermediate'},
  //   // {id : 3, description : 'Learn to bind Angular with Spring'},
  //   // {id : 4, description : 'Create End-to-End Application'},
  // ]

  ngOnInit(){

    this.getAllTodosList()
  }

  getAllTodosList() {
    this.todoService.getAllTodos(this.userName).subscribe(
      response => {
        console.log(response)
        this.todos = response;
      }
    )
  }

  updateTodo(id){
    console.log(`Update todo is called for Id: ${id}`)
    this.router.navigate(["todo", id])

  }

  createTodo(){
    console.log(`create todo is called`)
    this.router.navigate(["todo", -1])

  }

  deleteTodo(id) { 
    this.todoService.deleteTodo(this.userName, id).subscribe(
      Response => {
        this.deleteResultMessage = `Todo with Id: ${id} deleted Successfully`
        this.getAllTodosList()
      },
      error => this.deleteResultMessage = `An error occured while deleting the Todo with Id: ${id}`
    )
  }

}
