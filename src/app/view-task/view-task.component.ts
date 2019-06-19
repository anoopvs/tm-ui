import { Component, OnInit } from '@angular/core';
import { Task } from '../Task';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../task-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  taskModel:Task =new Task();
  searchTasks: any;
  searchPriority:any;
  searchParentTasks: any;
  searchStartDate:any;
  searchEndDate:any;
  errorMsg:String;
  closeResult: String;

  constructor(private router :Router,private taskService: TaskService,private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadAllTasks();
  }

  loadAllTasks(){
    this.taskService.getAllTasks()
      .subscribe(data => {
        this.tasks = data;
      },
      error => {this.errorMsg = error;}
      );
      console.log("Reloaded Details !!!");
  }
  onSubmit(data){
      this.updateTaskDetail(data);

}
private updateTaskDetail(data){
       this.taskService.updateTask(data)
        .subscribe(
          response => {
            console.log('Updated Task', response);
            this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/viewtask'])); 
       },
        );
}
editTask(content,data) {
  //console.log(">>>"+data);
  //console.log(">>>"+content);
  this.taskModel=data;
  this.modalService.open(content, {
          ariaLabelledBy: 'modal-basic-title'
        }).result.then((result) => {
    console.log("Closed::"+result);
  }, (reason) => {
    console.log("Dismissed::"+reason);
  });
}

endTask(data){
    this.taskService.endTask(data)
      .subscribe(
        response => {console.log('Updated Task', response);
        this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/viewtask"]));   
    }
      );
}

}
