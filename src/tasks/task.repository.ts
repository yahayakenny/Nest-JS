import { EntityRepository, Repository } from "typeorm";
import { GetTaskFilterDto } from "./dto/get-task-filter-dto";
import { TaskStatus } from "./task-status-enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(getTaskfilterDto: GetTaskFilterDto){
        const {status, searchTerm} = getTaskfilterDto;
        const query = this.createQueryBuilder('task');
        const tasks = await query.getMany();
        return tasks;

    }

    async createTask(createTaskDto): Promise<Task>{
        const{title, description} = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN
  
        await task.save();
        return task;
    };
}

