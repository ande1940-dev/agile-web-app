import {
    ActionArgs,
    json,
    LoaderArgs,
    redirect,
  } from "@remix-run/node"; 
import { useLoaderData } from "@remix-run/react";
import DashboardLayout from "~/components/layout";
import { getUser, signOut } from "~/server/auth.server";


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
    }
}

export default function Notifications() {
    const user = useLoaderData<typeof loader>();

    return (
        <DashboardLayout user={user} content={<h1>Notifications</h1>}/>
    )
}