import { Params, RouteMatch } from "@remix-run/react";

export function getWorkspace(matches: RouteMatch[], params: Params) {
    const dashboardMatch = matches.find((match) => match.pathname === "/dashboard");
    const workspaceId = params.workspaceId;

    if (!dashboardMatch || !workspaceId) {
        throw new Response("Workspace Not Found", {
            status: 404,
        });
    };

    const user = dashboardMatch.data;
    const workspace = [...user.workspaces, ...user.joinedWorkspaces].find((workspace) => workspace.id === workspaceId);

    if (!workspace) {
        throw new Response("Workspace Not Found", {
            status: 404,
        });
    };

    return workspace;
}