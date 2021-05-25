import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {Task} from './task.entity'
import { TaskStatus } from './task-status-enum';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

// import { GetTaskFilterDto } from './dto/get-task-filter-dto';
// import { Task, TaskStatus } from './tasks.model';
// import {v1 as uuid} from 'uuid';
 
@Injectable()
export class TasksService {
    //Here, we inject the TaskRepository into our service
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
        ){}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto)
    }

    async findTask(id: number): Promise<Task> {
        const taskFound = await this.taskRepository.findOne(id);
        if (!taskFound){
           throw new NotFoundException(`Task with ${id} not found`);
        }
        return taskFound;
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        console.log(result);

        if(result.affected === 0){
            throw new NotFoundException(`Task with ${id} not found`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task =  await this.findTask(id);
        task.status = status;
        task.save()
        return task;
    
    }

    getTasks(filterDto: GetTaskFilterDto){
        return this.taskRepository.getTasks(filterDto)

    }

    }

   

    // async getTasks(){
    //     const tasks =  await this.taskRepository.find;
    //     console.log(tasks)
    //     return tasks;
    // }
      

    // private tasks: Task[] = [];

    // getTasks(): Task[] {
    //     return this.tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const{title, description} = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }
    //     this.tasks.push(task)
    //     return task;
    // }

    // findTask(id: string): Task {
    //     const taskFound = this.tasks.find(task => task.id == id)

    //     if (!taskFound){
    //        throw new NotFoundException(`Task with ${id} not found`);
    //     }
    //     return taskFound;
    // }

    // deleteTask(id: string): void {
    //     this.tasks = this.tasks.filter(task => task.id !== id)
    // } 

   
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.findTask(id)
    //     task.status = status
    //     return task;
    // }

    // getFilteredTasks( filterDto: GetTaskFilterDto){
    //     const {status, searchTerm} = filterDto;

    //     let tasks = this.getTasks()

    //     if(status){
    //         tasks = tasks.filter(task => task.status == status)
    //     }

    //     if(searchTerm){
    //         tasks = tasks.filter(task =>
    //             task.title.includes(searchTerm) ||
    //             task.description.includes(searchTerm))
    //     }

    //     return tasks
    // } 
