import { json, redirect } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { prisma } from "./prisma.server";
import { getSession, commitSession, destroySession } from "./session.server";

type CreateWorkspaceForm = {
    title: FormDataEntryValue | null
    description: FormDataEntryValue | null,
    dueDate: FormDataEntryValue | null,
    userId: string | undefined
}

export async function createWorkspace({ title, description, dueDate, userId}: CreateWorkspaceForm) {
    if (title && userId) {
        const workspace = await prisma.workspace.create({
            data: {
                title: title as string,
                description: description ? description as string : null,
                dueDate: dueDate ? new Date(dueDate as string) : null,
                owner: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return redirect(`/dashboard/workspaces/${workspace.id}`);
    }
    return null;
}

export async function getWorkspace(request: Request, param: Params) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    
    const workspaceId = param.workspaceId;
    const userId = session.get("userId");

    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId
        },
        include: {
            owner: true,
            members: true,
            tasks: {
                include: { assignee: true }
            }
        }
    });

    if (workspace) {
        if (workspace.ownerId === userId || workspace.memberIds.some((memberId) => memberId === userId)) {
            return workspace
        }
    };
    
    return null;
};