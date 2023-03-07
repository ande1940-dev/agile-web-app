import {
    ActionArgs,
    json,
    LoaderArgs,
    redirect,
} from "@remix-run/node"; 

import { Link, useLoaderData } from "@remix-run/react";
import { getUser, signOut } from "~/server/auth.server";

export const handle = {
    breadcrumb: "Settings"
};


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

export default function Settings() {
    const user = useLoaderData<typeof loader>();

    return (
        <h1>Settings</h1>
    )
}