import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()   
    getAllTasks(): Task[] {
      return this.tasksService.getAllTasks()
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        console.log('body', createTaskDto)
        return this.tasksService.createTask(createTaskDto)
    }

    @Get(':id')
    findTask(@Param('id') id: string): Task{
        return this.tasksService.findTask(id)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
       this.tasksService.deleteTask(id);
    }
}
