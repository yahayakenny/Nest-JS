import { TaskStatusValidationPipe } from "../pipes/task-status-validation.pipe";

export class GetTaskFilterDto {
    status: TaskStatusValidationPipe;
    searchTerm: string;
}