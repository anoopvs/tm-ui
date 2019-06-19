import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../task-service.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    taskForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        ) { }

  ngOnInit() {
           this.createTaskForm();
  }
  private createTaskForm(){
       this.taskForm = this.formBuilder.group({
            task: ['', Validators.required],
            priority: ['', Validators.required],
            parentTask: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });
  }
// convenience getter for easy access to form fields
    get f() { return this.taskForm.controls; }
    
    resetForm() {
      this.createTaskForm();
      this.submitted = false;
      console.log("From Reset!!!");
    }

     onSubmit() {
          console.log("From onSubmit!!!");
        this.submitted = true;
        // stop here if form is invalid
        if (this.taskForm.invalid) {
            return;
        }
        this.taskService.addTask(this.taskForm.value)
            .pipe(first())
            .subscribe(
                data => {
                   console.log('Success!', data);
                },
                error => {
                    this.loading = false;
                });
        this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/viewtask"]));
     }

}
