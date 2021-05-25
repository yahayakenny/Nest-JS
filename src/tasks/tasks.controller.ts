import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksService } from './tasks.service';
import {Task} from './task.entity'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status-enum';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
// import { Task } from './tasks.model';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get(':id')
    findTask(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.findTask(id)
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
       return this.tasksService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status',TaskStatusValidationPipe)
        status: TaskStatus
        ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Get()   
    getTasks(@Query() filterDto: GetTaskFilterDto ){ 
        return this.tasksService.getTasks(filterDto);
    }

    









}


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

  
    // @Get(':id')
    // findTask(@Param('id') id: string): Task{
    //     return this.tasksService.findTask(id)
    // }

 
    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string,  @Body('status', new TaskStatusValidationPipe()) body)  {
    //     return this.tasksService.updateTaskStatus(id, body.status)
    // }

