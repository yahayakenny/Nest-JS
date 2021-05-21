import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any){
        console.log(value)
        return value
    }

    isStatusValid(status: any){
        
    }
};