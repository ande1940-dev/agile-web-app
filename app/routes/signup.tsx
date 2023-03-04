import type {
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node"; 
import { redirect } from "@remix-run/node"; 
import { Form, useLoaderData } from "@remix-run/react";
import { getUserSession, signUp } from "~/server/auth.server";

import { getSession, commitSession } from "~/server/session.server";

export async function loader({ request }: LoaderArgs) {
  return await getUserSession(request);
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const form = await request.formData();
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");
  const email = form.get("email");
  const password = form.get("password");
  
  
  const userId = await signUp({
    firstName,
    lastName,
    email,
    password
  });

  if (!userId) {
    session.flash("error", "An account already exists with this email address");

    return redirect("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function SignUp() {
  const { error } =
    useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Form className="grid space-y-4" method="post">
        <div className="flex mb-8 place-content-center">
          Sign up
        </div>
        <div className="flex space-x-4">
          <div className="grid space-y-2">
            <label htmlFor="firstName">First Name</label>
            <input className="px-3 h-10 rounded-md border border-slate-300" type="firstName" name="firstName" id="firstName" required />
          </div>
          <div className="grid space-y-2">
            <label htmlFor="lastName">Last Name</label>
            <input className="px-3 h-10 rounded-md border border-slate-300" type="lastName" name="lastName" id="lastName" required/>
          </div>  
        </div>
        <div className="grid space-y-2 space-y-2">
          <label htmlFor="email">Email Address</label>
          <input className="px-3 h-10 rounded-md border border-slate-300" type="email" name="email" id="email" required />
        </div>
        <div className="grid space-y-2">
          <label htmlFor="password">Password</label>
          <input className="px-3 h-10 rounded-md border border-slate-300" type="password" name="password" id="password" required/>
        </div>
        <div className="grid">
          <button className="h-10 text-white bg-black rounded-md" type="submit" name="submit">Log In</button>
        </div>
        { error && 
        <div className="text-red-500 text-sm">{error}</div>
        }
      </Form>
    </div>
  )
}