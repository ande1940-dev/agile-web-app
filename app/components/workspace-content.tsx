import { Status, User, Workspace } from "@prisma/client"
import { TaskWithRelations, WorkspaceWithRelations } from "~/server/types.server"
import { PlusCircleIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import CreateTaskModal from "./modals/create-task-modal";

const dateOptions: Intl.DateTimeFormatOptions = { timeZone: "UTC", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit"};

interface WorkspaceProps {
    workspace: WorkspaceWithRelations
    users: User[]
}

export default function WorkspaceContent({workspace, users}: WorkspaceProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [taskStatus, setTaskStatus] = useState<Status>(Status.TODO);

    const toDoTasks = workspace.tasks.filter((task) => task.status === Status.TODO);
    const inProgressTasks = workspace.tasks.filter((task) => task.status === Status.INPROGRESS);
    const inReviewTasks = workspace.tasks.filter((task) => task.status === Status.INREVIEW);
    const completeTasks = workspace.tasks.filter((task) => task.status === Status.COMPLETE);

    const openCreateTaskModal = (status: Status) => {
        setTaskStatus(status);
        setOpen(true);
    }

    return (
        <>
            <div className="flex flex-col w-full h-screen space-y-8">
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <div className="flex space-x-4">
                            <div className="grid place-content-center w-12 h-12 space-x-4 border rounded-lg bg-slate-500">
                                <DocumentChartBarIcon className="text-white w-6 h-6"/>
                            </div>
                            <div className="flex flex-col justify-betweeen">
                                <div className="w-72 text-lg text-black truncate">{workspace.title}</div>
                                <div className="flex items-center space-x-2">
                                    <div className={`h-2 w-2 rounded-full ${(workspace.dueDate && new Date(workspace.dueDate) > new Date(Date.now()))  || !workspace.dueDate ? "bg-green-500": "bg-slate-200"}`}></div>
                                    <div className="text-sm">{(workspace.dueDate && new Date(workspace.dueDate) > new Date(Date.now())) || !workspace.dueDate ? "In Progess": "Past Due"}</div>
                                </div>

                            </div>
                        </div>
                        {/* <div className="flex">
                            <div>{workspace.owner.profile.firstName + " " +  workspace.owner.profile.lastName}</div>
                            {
                                workspace.dueDate &&
                                <div>{new Date(workspace.dueDate).toLocaleTimeString("en-US", dateOptions)}</div>
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
                <div className="grid grid-cols-4 gap-2 h-full p-4 grow bg-slate-100 pb-10 rounded-lg">
                    <ul className="flex flex-col space-y-4 h-12 w-full justify-center">
                        <div className="flex  justify-between items-center bg-white grow border rounded-t-lg rounded-b-md p-2"> 
                            <div>To Do</div> 
                            <button onClick={() => openCreateTaskModal(Status.TODO)}><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                        {
                            toDoTasks.map((task) => {
                                return (
                                    <li className="bg-white p-2 border rounded-md">
                                        <div>{task.title}</div>
                                        { task.description && <div>{task.description}</div>}
                                        { task.assignee && <div>{task.assignee?.profile.firstName + " " + task.assignee?.profile.lastName}</div>}
                                        { task.dueDate && <div>{new Date(task.dueDate).toLocaleTimeString("en-US", dateOptions)}</div>}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="flex flex-col space-y-4 h-12 w-full justify-center">
                        <div className="flex justify-between items-center bg-white grow border rounded-t-lg rounded-b-md p-2"> 
                            <div>In Progress</div> 
                            <button onClick={() => openCreateTaskModal(Status.INPROGRESS)}><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                        {
                            inProgressTasks.map((task) => {
                                return (
                                    <li className="bg-white p-2 border rounded-md">
                                        <div>{task.title}</div>
                                        { task.description && <div>{task.description}</div>}
                                        { task.assignee && <div>{task.assignee?.profile.firstName + " " + task.assignee?.profile.lastName}</div>}
                                        { task.dueDate && <div>{new Date(task.dueDate).toLocaleTimeString("en-US", dateOptions)}</div>}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="flex flex-col space-y-4 h-12 w-full justify-center">
                        <div className="flex justify-between items-center bg-white grow border rounded-t-lg rounded-b-md p-2"> 
                            <div>In Review</div> 
                            <button onClick={() => openCreateTaskModal(Status.INREVIEW)}><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                        {
                            inReviewTasks.map((task) => {
                                return (
                                    <li className="bg-white p-2 border rounded-md">
                                        <div>{task.title}</div>
                                        { task.description && <div>{task.description}</div>}
                                        { task.assignee && <div>{task.assignee?.profile.firstName + " " + task.assignee?.profile.lastName}</div>}
                                        { task.dueDate && <div>{new Date(task.dueDate).toLocaleTimeString("en-US", dateOptions)}</div>}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="flex flex-col space-y-4 h-12 w-full justify-center">
                        <div className="flex justify-between items-center bg-white grow border rounded-t-lg rounded-b-md p-2"> 
                            <div>Complete</div> 
                            <button onClick={() => openCreateTaskModal(Status.COMPLETE)}><PlusCircleIcon className="w-6 h-6 text-slate-500"/></button>
                        </div>
                        {
                            completeTasks.map((task) => {
                                return (
                                    <li className="bg-white p-2 border rounded-md">
                                        <div>{task.title}</div>
                                        { task.description && <div>{task.description}</div>}
                                        { task.assignee && <div>{task.assignee?.profile.firstName + " " + task.assignee?.profile.lastName}</div>}
                                        { task.dueDate && <div>{new Date(task.dueDate).toLocaleTimeString("en-US", dateOptions)}</div>}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <CreateTaskModal open={open} setOpen={setOpen} taskStatus={taskStatus} users={users}/>
        </>
    )
}