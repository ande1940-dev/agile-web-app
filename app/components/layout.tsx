import { User } from "@prisma/client";
import { UserWithWorkspaces } from "~/server/types.server";
import SidebarNav from "./sidebar-nav";

interface DashboardLayoutProps {
    user: UserWithWorkspaces
    content: React.ReactNode
}

export default function DashboardLayout({ user, content }: DashboardLayoutProps) {
    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <SidebarNav user={user}/>
            <div className="lg:pl-[19.5rem]">
                <main className="max-w-3xl mx-auto relative z-10 pt-10 xl:max-w-none">
                    {content}
                </main>
            </div>
        </div>
    )
}