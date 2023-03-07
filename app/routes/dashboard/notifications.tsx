import {
    ActionArgs,
    json,
    LoaderArgs,
    redirect,
  } from "@remix-run/node"; 
import { Link, useLoaderData } from "@remix-run/react";
import { getUser, signOut } from "~/server/auth.server";


export const handle = {
    breadcrumb: "Notifications"
};

export default function Notifications() {
    return (
        <h1>Notifications</h1>
    )
}