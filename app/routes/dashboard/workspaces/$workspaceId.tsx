import { ActionArgs } from "@remix-run/node";
import { Params, RouteMatch, useMatches, useParams } from "@remix-run/react";
import WorkspaceContent from "~/components/workspace-content";
import { createTask } from "~/server/task.server";

export async function action({ params, request }: ActionArgs) {
    const form = await request.formData();
    const intent = form.get("intent");

    switch(intent) {
        case "create-task": {
            const title = form.get("title");
            const description = form.get("description");
            const dueDate = form.get("dueDate");
            const status = form.get("status");
            const assignee = form.get("assignee");
            return await createTask({title, description, dueDate, status, assignee, workspaceId: params?.workspaceId});
        }
    }
}

function getWorkspace(matches: RouteMatch[], params: Params) {
    const match = matches.find((match) => match.pathname === "/dashboard");
    const workspaceId = params.workspaceId;

    if (!match || !workspaceId) {
        throw new Response("Workspace Not Found", {
            status: 404,
        });
    };

    const user = match.data;
    const workspace = [...user.workspaces, ...user.joinedWorkspaces].find((workspace) => workspace.id === workspaceId);

    if (!workspace) {
        throw new Response("Workspace Not Found", {
            status: 404,
        });
    };

    return workspace;
}

export default function Workspace() {
    const params = useParams();
    const matches = useMatches();

    const workspace = getWorkspace(matches, params);

    return (
        <WorkspaceContent workspace={workspace} users={workspace.members}/>
    )
}