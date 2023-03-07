import {
    ActionArgs
} from "@remix-run/node"; 

import { Outlet } from "@remix-run/react";
import { getSession } from "~/server/session.server";
import { createWorkspace } from "~/server/workspace.server";
export const handle = {
    breadcrumb: "Workspaces"
};


export default function Workspaces() {
    return <Outlet/>
}