import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
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
        <div className="flex flex-col h-full space-y-5 relative">
            <div className="flex sticky top-0 h-36 bg-red-300">
                    <div className="grid place-content-center h-12 w-12 rounded-md bg-blue-500">
                        <Bars3CenterLeftIcon className="text-white h-8 w-8"/>
                    </div>
                    <div className="ml-4">
                        <div className="text-lg truncate">{workspace.title}</div>
                        <div className="flex text-xs items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${new Date(workspace.endDate) > new Date(Date.now()) ? "bg-green-500" : "bg-red-500"}`}></div>
                            <div>{ new Date(workspace.endDate) > new Date(Date.now()) ? "In Progress" : "Past Due" }</div>
                        </div>
                    </div>
            </div>
            <div className="flex flex-row flex-wrap grow bg-green-500 rounded-lg pb-4">
            </div>
        </div>
    )
}