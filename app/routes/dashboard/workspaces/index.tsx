import {
    ActionArgs,
} from "@remix-run/node"; 
import { RouteMatch, useMatches } from "@remix-run/react";
import { useState } from "react";
import { createWorkspace } from "~/server/workspace.server";
import { signOut } from "~/server/auth.server";
import { getSession } from "~/server/session.server";
import { WorkspaceWithRelations } from "~/server/types.server";
import CreateWorkspaceModal from "~/components/modals/create-workspace-modal";

export const handle = {
    breadcrumb: "Workspaces"
};

export async function action({ params, request }: ActionArgs) {
    const form = await request.formData();
    const intent = form.get("intent");

    switch(intent) {
        case "create-workspace": {
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
}

export default function Workspaces() {
    const [isModalOpen, toggleModalOpen] = useState<boolean>(false);

    const matches = useMatches();
    const match: RouteMatch | undefined = matches.find((match) => match.pathname === "/dashboard");
    const user = match?.data;
    const workspaces = [...user.joinedWorkspaces, ...user.workspaces];

    if (!match) {
        throw new Response("Workspaces Not Found", {
            status: 404,
        });
    };

    return (
        <div className="w-full">
            <div>
                Workspaces
                <ul>
                {
                    
                    workspaces.map((workspace: WorkspaceWithRelations) => 
                        <li key={workspace.id}>{workspace.title}</li>
                    )    
                }
                </ul>
                <button onClick={() => toggleModalOpen(true)}>Add Workspace</button>
            </div>
            <CreateWorkspaceModal open={isModalOpen} setOpen={toggleModalOpen}/>
        </div>
    )
}