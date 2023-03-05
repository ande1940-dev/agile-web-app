import { Task, User, Workspace } from "@prisma/client"

export interface UserWithWorkspaces extends User {
    workspaces: Omit<WorkspaceWithRelations, "owner" | "members" | "tasks">[]
}

export interface UserWithRelations extends User {
    workspaces: WorkspaceWithRelations[]
}

export interface WorkspaceWithRelations extends Omit<Workspace, "endDate"> {
    endDate: string | null
    owner: User,
    members: User[],
    tasks: TaskWithRelations[]
}

export interface TaskWithRelations extends Omit<Task, "endDate" | "createdAt"| "updatedAt"> {
    assignee: User | null
    endDate: string | null
    createdAt: string | null
    updatedAt: string | null
}