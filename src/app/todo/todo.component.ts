import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../services/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo: Todo
  userName:string
  updateMessageSuccess:string
  updateMessageFail:string
  successfulResponse: boolean = false
  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.todo = new Todo(this.id,"", false, new Date())
    
    if(this.id == -1){
      // Do Nothing
    } else {
      this.todoService.getTodoById('himanshu', this.id).subscribe(
        response => this.successResponse(response)
      ) 
    }
    
  }

  successResponse(response) {
    this.todo = response
  }

  saveTodo(todo) {

    if(this.id == -1 || this.id == 0){
      this.todoService.saveTodo('himanshu', this.todo).subscribe(
        response => {
          // this.successfulResponse = true
          this.updateMessageSuccess = `Todo Created successfully!`
        },
        error => {
          // this.successfulResponse = false
          this.updateMessageFail = `Some error occured. Operation Failed!`
        }
      )
    }
    else {
      this.todoService.updateTodo('himanshu',this.id, this.todo).subscribe(
        response => {
          // this.successfulResponse = true
          this.updateMessageSuccess = `Operation Completed successfully!`
        },
        error => {
          // this.successfulResponse = false
          this.updateMessageFail = `Some error occured. Operation Failed!`
        }
      )
    }
    
  }

}
