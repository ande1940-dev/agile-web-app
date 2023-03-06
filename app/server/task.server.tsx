import { Status } from "@prisma/client"
import { prisma } from "./prisma.server"

type createTaskForm = {
    title: FormDataEntryValue | null
    description: FormDataEntryValue | null
    dueDate: FormDataEntryValue | null
    status: FormDataEntryValue | null
    assignee: FormDataEntryValue | null
    workspaceId: string | undefined
}

export async function createTask({title, description, dueDate, status, assignee, workspaceId}: createTaskForm) {
    if (title && workspaceId && status) {
        const task = await prisma.task.create({
            data: {
                title: title as string,
                description: description ? description as string : null,
                dueDate: dueDate ? new Date(dueDate as string) : null,
                status: status as string  === "TODO" ? Status.TODO : 
                        status as string  === "INPROGRESS" ? Status.INPROGRESS : 
                        status as string  === "INREVIEW" ? Status.INREVIEW : Status.COMPLETE,
                 workspace: {
                    connect: {
                        id: workspaceId ? workspaceId : undefined
                    }
                }
            }
        })
        return task;
    }
}