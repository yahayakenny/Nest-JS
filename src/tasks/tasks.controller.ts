import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TasksService } from './tasks.service';
// import { Task } from './tasks.model';
import {Task} from './task.entity'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()   
    // getTasks(@Query() filterDto: GetTaskFilterDto ): Task[] {
    //     console.log(typeof filterDto);
    //     if(Object.keys(filterDto).length === 0 && filterDto.constructor === Object){
    //         return this.tasksService.getTasks()
    //     }
    //     return this.tasksService.getFilteredTasks(filterDto)
       
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task{
    //     return this.tasksService.createTask(createTaskDto)
    // }

    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto)
    }

    // @Get(':id')
    // findTask(@Param('id') id: string): Task{
    //     return this.tasksService.findTask(id)
    // }

    @Get(':id')
    findTask(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.findTask(id)
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
       return this.tasksService.deleteTask(id);
    }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string,  @Body('status', new TaskStatusValidationPipe()) body)  {
    //     return this.tasksService.updateTaskStatus(id, body.status)
    // }
}
