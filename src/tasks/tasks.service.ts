import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './tasks.model';
// import {v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {Task} from './task.entity'
import { TaskStatus } from './task-status-enum';
 
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
        ){}

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

    
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto)
    }

    // findTask(id: string): Task {
    //     const taskFound = this.tasks.find(task => task.id == id)

    //     if (!taskFound){
    //        throw new NotFoundException(`Task with ${id} not found`);
    //     }
    //     return taskFound;
    // }

    async findTask(id: number): Promise<Task> {
        const taskFound = await this.taskRepository.findOne(id);

        if (!taskFound){
           throw new NotFoundException(`Task with ${id} not found`);
        }
        return taskFound;
    }

    // deleteTask(id: string): void {
    //     this.tasks = this.tasks.filter(task => task.id !== id)
    // } 

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)
        console.log(result);
    }

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
}
