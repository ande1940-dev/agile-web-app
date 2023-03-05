import { User, Workspace } from "@prisma/client"
import { TaskWithRelations, WorkspaceWithRelations } from "~/server/types.server"

interface WorkspaceProps {
    workspace: WorkspaceWithRelations
}

export default function WorkspaceContent({workspace}: WorkspaceProps) {
    return (
        <div>
            <div>{workspace.name}</div>
            <div>{workspace.description}</div>
            <div>{workspace.owner.profile.firstName + " " +  workspace.owner.profile.lastName}</div>
            {
                workspace.endDate &&
                <div>{new Date(workspace.endDate).toLocaleTimeString("en-US")}</div>
            }
            <ul>
                Members 
                {
                    [...workspace.members, workspace.owner].map((member: User) => {
                        return <h1>{member.profile.firstName + " " + member.profile.lastName}</h1>
                    })
                }
            </ul>
            <ul>
                Tasks
                {
                    workspace.tasks.map((task: TaskWithRelations) => {
                            return (
                                <div>
                                    <h1>{task.name}</h1>
                                    <h1>{task.description}</h1>
                                    { task.assignee && <h1>{task.assignee.profile.firstName}</h1>}
                                </div>
                            )
                    })
                }
            </ul>
        </div>
    )
}