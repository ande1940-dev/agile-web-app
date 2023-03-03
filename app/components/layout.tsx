import { User } from "@prisma/client";
import SidebarNav from "./sidebar-nav";

interface DashboardLayoutProps {
    user: User
    content: React.ReactNode
}

export default function DashboardLayout({ user, content }: DashboardLayoutProps) {
    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <SidebarNav user={user}/>
            {content}
        </div>
    )
}