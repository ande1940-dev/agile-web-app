import { Task, User, Workspace } from "@prisma/client"

export interface UserWithWorkspaces extends User {
    workspaces: Omit<WorkspaceWithRelations, "owner" | "members" | "tasks">[],
    joinedWorkspaces: Omit<WorkspaceWithRelations, "owner" | "members" | "tasks">[]
}

export interface UserWithRelations extends User {
    workspaces: WorkspaceWithRelations[]
}

export interface WorkspaceWithRelations extends Omit<Workspace, "dueDate"> {
    dueDate: string | null
    owner: User,
    members: User[],
    tasks: TaskWithRelations[]
}

export interface TaskWithRelations extends Omit<Task, "dueDate" | "createdAt"| "updatedAt"> {
    assignee: User | null
    dueDate: string | null
    createdAt: string | null
    updatedAt: string | null
}