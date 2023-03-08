import { Outlet } from "@remix-run/react";

export const handle = {
    breadcrumb: "Workspaces"
};

export default function Workspaces() {
    return <Outlet/>
}