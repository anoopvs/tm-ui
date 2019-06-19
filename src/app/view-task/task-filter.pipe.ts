import { Pipe, PipeTransform } from '@angular/core';
import { TaskService } from '../task-service.service';
import { Task } from '../Task';
@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[], searchTasks: any,searchPriority:any, searchParentTasks: any,searchStartDate:any,searchEndDate:any){
    if (tasks && tasks.length){
        return tasks.filter(task =>{
            if (searchTasks && task.task.toLowerCase().indexOf(searchTasks.toLowerCase()) === -1){
                return false;
            }
            if (searchParentTasks && task.parentTask.toLowerCase().indexOf(searchParentTasks.toLowerCase()) === -1){
                return false;
            }
            var strPriority = task.priority.toString();
            if (searchPriority && strPriority.indexOf(searchPriority) === -1){
              return false;
          }
          var startDate = task.startDate.toString();
          if (searchStartDate && startDate.indexOf(searchStartDate) === -1){
              return false;
          }
          var endDate = task.endDate.toString();
          if (searchEndDate && endDate.indexOf(searchEndDate) === -1){
              return false;
          }
            return true;
      })
    }
    else{
        return tasks;
    }
  }
}
