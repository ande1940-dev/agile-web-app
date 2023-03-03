import SidebarNav from "./sidebar-nav";
import Workspace from "./workspace";

export default function DashboardLayout() {
    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <SidebarNav/>
            <Workspace/>
        </div>
    )
}