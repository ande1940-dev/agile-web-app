import {
    ActionArgs,
    json,
    LoaderArgs,
    redirect,
  } from "@remix-run/node"; 
import { useLoaderData } from "@remix-run/react";
import DashboardLayout from "~/components/layout";
import Workspace from "~/components/workspace-content";
import { getUser, signOut } from "~/server/auth.server";
import { getSession } from "~/server/session.server";
import { createWorkspace } from "~/server/workspace.server";

export async function loader({ request }: LoaderArgs) {
    const user = await getUser(request);
    if (user) {
        return json(user);
    } 
    return redirect("/login");
}

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const intent = form.get("intent");

    switch(intent) {
        case "sign-out":
            return await signOut(request);
        case "create-workspace": 
            const session = await getSession(
                request.headers.get("Cookie")
            );
        
            const userId = session.get("userId");
            const title = form.get("title");
            const description = form.get("description");
            const dueDate = form.get("dueDate");
            return await createWorkspace({ title, description, dueDate, userId })
    }
}

export default function Dashboard() {
    const user = useLoaderData<typeof loader>();

    return (
        <DashboardLayout user={user} content={<>Dashboard</>}/>
    )
}

