import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createGuestAccount, getUserSession } from "~/server/auth.server";
import { commitSession, getSession } from "~/server/session.server";

export async function loader({ request }: LoaderArgs) {
    return await getUserSession(request);
};

export async function action({ request }: ActionArgs) {
    const session = await getSession(
      request.headers.get("Cookie")
    );
    const form = await request.formData();
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");

    const userId = await createGuestAccount({firstName, lastName});

    if (userId) {
        session.set("userId", userId);

        return redirect("/dashboard", {
            headers: {
            "Set-Cookie": await commitSession(session),
            },
        });
    }
}  

export default function GuestLogin() {
    return (
        <Form method="post">
            <div className="grid space-y-2">
                <label htmlFor="firstName">First Name</label>
                <input className="px-3 h-10 rounded-md border border-slate-300" type="firstName" name="firstName" id="firstName" required />
            </div>
            <div className="grid space-y-2">
                <label htmlFor="lastName">Last Name</label>
                <input className="px-3 h-10 rounded-md border border-slate-300" type="lastName" name="lastName" id="lastName" required/>
            </div>
            <button className="h-10 text-white bg-black rounded-md" type="submit" name="submit">Continue</button>
        </Form>
    )
}