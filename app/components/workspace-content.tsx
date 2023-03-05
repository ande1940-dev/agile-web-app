import { Status, User, Workspace } from "@prisma/client"
import { TaskWithRelations, WorkspaceWithRelations } from "~/server/types.server"
import { PlusCircleIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const dateOptions: Intl.DateTimeFormatOptions = { timeZone: "UTC", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit"};

interface WorkspaceProps {
    workspace: WorkspaceWithRelations
}

export default function WorkspaceContent({workspace}: WorkspaceProps) {
    const [taskStatus, setTaskStatus] = useState<Status>(Status.TODO);

    return (
        <div className="flex flex-col h-screen space-y-8">
            <div className="space-y-3">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <div className="grid place-content-center w-12 h-12 space-x-4 border rounded-lg bg-slate-500">
                            <DocumentChartBarIcon className="text-white w-6 h-6"/>
                        </div>
                        <div className="flex flex-col justify-betweeen">
                            <div className="w-72 text-lg text-black truncate">{workspace.name}</div>
                            <div className="flex items-center space-x-2">
                                <div className={`h-2 w-2 rounded-full ${(workspace.endDate && new Date(workspace.endDate) > new Date(Date.now()))  || !workspace.endDate ? "bg-green-500": "bg-slate-200"}`}></div>
                                {(workspace.endDate && new Date(workspace.endDate) > new Date(Date.now()))  || !workspace.endDate && <div className="h-2 w-2 rounded-full bg-green-200 animate-pulse"></div>}
                                <div className="text-sm">{(workspace.endDate && new Date(workspace.endDate) > new Date(Date.now())) || !workspace.endDate ? "In Progess": "Past Due"}</div>
                            </div>

                        </div>
                    </div>
                    {/* <div className="flex">
                        <div>{workspace.owner.profile.firstName + " " +  workspace.owner.profile.lastName}</div>
                        {
                            workspace.endDate &&
                            <div>{new Date(workspace.endDate).toLocaleTimeString("en-US", dateOptions)}</div>
                        }
                        <ul>
                            Members 
                            {
                                [...workspace.members, workspace.owner].map((member: User) => {
                                    return <h1 key={member.id}>{member.profile.firstName + " " + member.profile.lastName}</h1>
                                })
                            }
                        </ul>
                    </div> */}
                </div>
                <div className="text-xs w-96 truncate">{workspace.description}</div>
            </div>
            <div className="grid grid-cols-4 gap-2 h-full p-4 grow bg-slate-100 mb-10 rounded-lg">
                    <ul className="flex h-12 w-full justify-center">
                        <div className="flex justify-between items-center bg-white grow border rounded-t-md p-2"> 
                            <div>To Do</div> 
                            <button><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                    </ul>
                    <ul className="flex h-12 w-full justify-center">
                        <div className="flex justify-between items-center bg-white grow border rounded-t-md p-2"> 
                            <div>In Progress</div> 
                            <button><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                    </ul>
                    <ul className="flex h-12 w-full justify-center">
                        <div className="flex justify-between items-center bg-white grow border rounded-t-md p-2"> 
                            <div>In Review</div> 
                            <button><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                    </ul>
                    <ul className="flex h-12 w-full justify-center">
                        <div className="flex justify-between items-center bg-white grow border rounded-t-md p-2"> 
                            <div>Complete</div> 
                            <button><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                    </ul>
            </div>
        </div>
    )
}