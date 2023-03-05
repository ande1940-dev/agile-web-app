import { Workspace as IWorkspace } from "@prisma/client";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import DashboardLayout from "~/components/layout";
import WorkspaceContent from "~/components/workspace-content";
import { getUser, signOut } from "~/server/auth.server";
import { prisma } from "~/server/prisma.server";
import { getSession } from "~/server/session.server";
import { createWorkspace, getWorkspace } from "~/server/workspace.server";

export async function loader({ request, params }: LoaderArgs) {
    const workspace = await getWorkspace(request, params);
    if (!workspace) {
        throw new Response("Problem Getting Workspace.", {
          status: 404,
        });
    }
    const user = await getUser(request);
    if (!user) {
        throw new Response("User does not exist.", {
          status: 404,
        });
    }
    return json({workspace, user});
      
}

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const intent = form.get("intent");

    switch(intent) {
        case "sign-out":
            return await signOut(request);
        case "create-workspace": 
            const session = await getSession(
                request.headers.get("Cookie")
            );
        
            const userId = session.get("userId");
            const title = form.get("title");
            const description = form.get("description");
            const dueDate = form.get("dueDate");
            return await createWorkspace({ title, description, dueDate, userId })
    }
}
export default function Workspace() {
    const data = useLoaderData<typeof loader>();

    return (
        <DashboardLayout 
            user={data.user} 
            content={<WorkspaceContent workspace={data.workspace}/>}
        />
    )
}