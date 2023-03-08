import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link, Params, RouteMatch, useLoaderData, useParams } from "@remix-run/react";

interface BreadcrumbProps {
    matches: RouteMatch[]
}

function getWorkspace(matches: RouteMatch[], params: Params) {
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

export default function Breadcrumbs({ matches }: BreadcrumbProps) {
    const breadcrumbs = [...matches].filter((match) => match.handle && match.handle.breadcrumb || Object.keys(match.params).length);
    const match = breadcrumbs.pop();

    return (
        <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
            {   
                breadcrumbs.map((match, index) => 
                (   match.handle && 
                    <li key={index}className="flex items-center"> 
                        <Link to={match.pathname}>{match.handle.breadcrumb} </Link>  
                        <ChevronRightIcon className="w-3 h-6 mx-3 overflow-visible text-slate-400"/>
                    </li>
                ))
            }
            { 
               match && match.handle && match.handle.breadcrumb ?
               <li className="font-semibold text-slate-900 truncate">
                    {match.handle.breadcrumb}
                </li>
                : match && match.params && (
                    <li className="font-semibold text-slate-900 truncate">
                        {getWorkspace(matches, match.params).title}
                    </li>
                )
            }
        </ol>
    )
}