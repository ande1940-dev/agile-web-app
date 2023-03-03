import {
    ActionArgs,
    json,
    LoaderArgs,
    redirect,
  } from "@remix-run/node"; 
  import { useCatch, useLoaderData } from "@remix-run/react";
import DashboardLayout from "~/components/layout";
  import { getUser } from "~/server/auth.server";

export async function loader({ request }: LoaderArgs) {

    const user = await getUser(request);
    if (user) {
        return json(user);
    } 
    return redirect("/login");
}

export default function Dashboard() {
    const user = useLoaderData<typeof loader>();

    return (
        <DashboardLayout/>
    )
}

