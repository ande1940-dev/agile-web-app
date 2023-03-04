import { User, Workspace } from "@prisma/client"

export interface UserWithWorkspaces extends User {
    workspaces: Workspace[]
}