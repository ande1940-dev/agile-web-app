import {
    ActionArgs,
    json,
    LoaderArgs,
    redirect,
} from "@remix-run/node"; 

import { 
    NavLink, 
    Outlet, 
    useLoaderData, 
    useMatches, 
} from "@remix-run/react";

import { 
    Bars3Icon, 
    ChevronRightIcon, 
    Squares2X2Icon, 
    CalendarIcon, 
    BellIcon, 
    MagnifyingGlassIcon 
} from "@heroicons/react/24/solid";

// Server Functions 
import { getSession } from "~/server/session.server";
import { getUser, signOut } from "~/server/auth.server";
import { createTask } from "~/server/task.server";
import { createWorkspace } from "~/server/workspace.server";

// Components
import Breadcrumbs from "~/components/breadcrumbs";
import { useState } from "react";

export const handle = {
    breadcrumb: "Dashboard"
};

export async function loader({ request }: LoaderArgs) {
    const user = await getUser(request);
    if (!user) return redirect("/login");
    return json(user);
}

export async function action({ params, request }: ActionArgs) {
    const form = await request.formData();
    const intent = form.get("intent");

    switch(intent) {
        case "sign-out": {
            return await signOut(request);
        }
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

export default function Dashboard() {
    const user = useLoaderData<typeof loader>();
    const matches = useMatches();
    const [searchParams, setSearchParams] = useState<string>("");

    return (
        <>
            <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60">
                <div className="max-w-8xl mx-auto">
                    <div className="flex items-center p-4 border-b border-slate-900/10 lg:hidden">
                        <button className="text-slate-500 hover:text-slate-600"><Bars3Icon className="text-black w-8 h-8"/></button>
                        <Breadcrumbs matches={matches}/>
                    </div>
                </div>
            </div>
            <div>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="hidden lg:block fixed z-20 inset-0 top-0 left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 bg-white border-r">
                        <nav>
                            <div className="sticky top-0 -ml-0.5 pointer-events-none">
                                    <div className="h-8 bg-white"></div>
                                    <div className="h-12 w-12 bg-green-500 rounded-lg"></div>
                                    <div className="h-8 bg-white"></div>
                            </div>
                            <div className="lg:text-sm lg:leading-6 relative h-screen space-y-8">
                                <ul> 
                                    <li>
                                        <NavLink className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900" to="/dashboard/workspaces">
                                            <div className="grid place-content-center w-6 h-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-sky-200">
                                                <Squares2X2Icon className="text-slate-400 w-4 h-4"/>
                                            </div>
                                            Workspaces
                                        </NavLink>  
                                    </li>
                                    <li>
                                        <NavLink className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900" to="/dashboard/tasks">
                                            <div className="grid place-content-center w-6 h-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-sky-200">
                                                <CalendarIcon className="text-slate-400 w-4 h-4"/>
                                            </div>
                                            Tasks
                                        </NavLink> 
                                    </li>
                                    <li>
                                        <NavLink className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900" to="/dashboard/notifications">
                                            <div className="grid place-content-center w-6 h-6 mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 group-hover:shadow-sky-200">
                                                <BellIcon className="text-slate-400 w-4 h-4"/>
                                            </div>
                                            Notifications
                                        </NavLink> 
                                    </li>
                                </ul>
                                <div className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300">
                                    <MagnifyingGlassIcon className="w-4 h-4 mr-3 flex-none"/>
                                    <input className="focus:outline-none" type="search" name="search" id="search" placeholder="Search Workspaces" 
                                        onChange={(event) => setSearchParams(event.target.value)}
                                    />
                                </div>
                                <div className="mt-12 lg:mt-8">
                                    <ul className={`space-y-6 lg:space-y-2 ${user.joinedWorkspaces.length && "border-l"} border-slate-100`}>
                                    {   user.joinedWorkspaces.length ?
                                        user.joinedWorkspaces.filter((workspace) => 
                                                workspace.title.toLowerCase().includes(searchParams.toLowerCase())
                                            ).map((workspace) => (
                                            <li key={workspace.id}>
                                                <NavLink to={`/dashboard/workspaces/${workspace.id}`} className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 text-slate-700 hover:text-slate-900">
                                                    {workspace.title}
                                                </NavLink>
                                            </li>
                                        ))
                                        : <div className="block pl-4 -ml-px text-slate-700">Nothing to see yet!</div>
                                    }
                                    </ul>
                                </div>
                            </div>
                            <div className="h-20 absolute bottom-0 left-0 right-0 border-t">
                                <div className="flex justify-between h-full items-center px-8">
                                    <div className="flex space-x-4">
                                        <div className="h-10 w-10 rounded-full bg-slate-400"></div>
                                        <div className="flex flex-col w-40 space-y-1 leading-6">
                                            <div className="text-sm font-medium truncate">{ user.profile.firstName + " " + user.profile.lastName }</div>
                                            { user.email ? <div className="text-xs truncate">{user.email}</div> : <div className="text-xs truncate">Guest</div>}
                                        </div>
                                    </div>
                                    <ChevronRightIcon className="text-slate-400 w-5 h-5"/>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="lg:pl-[19.5rem]">
                        <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

