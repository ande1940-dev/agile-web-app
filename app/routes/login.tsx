import type {
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node"; 
import { redirect } from "@remix-run/node"; 
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getUserSession, logIn } from "~/server/auth.server";

import { getSession, commitSession } from "~/server/session.server";

export async function loader({ request }: LoaderArgs) {
  return await getUserSession(request);
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  
  const userId = await logIn({
    email,
    password
  });

  if (!userId) {
    session.flash("error", "Incorrect email or password.");

    return redirect("/login", {
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

export default function LogIn() {
  const { error } =
    useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Form className="grid space-y-4" method="post">
        <div className="flex mb-8 place-content-center">Log In</div>
        <div className="flex space-x-2">
          <div>Dont have an account? </div>
          <Link to="/signup">Register here</Link>
        </div>
        <div className="grid space-y-2">
          <label htmlFor="email">Email Address</label>
          <input className="px-3 h-10 rounded-md border border-slate-300" type="email" name="email" id="email" required />
        </div>
        <div className="grid space-y-2">
          <label htmlFor="password">Password</label>
          <input className="px-3 h-10 rounded-md border border-slate-300" type="password" name="password" id="password" minLength={8} required/>
        </div>
        <div className="grid space-y-2">
          <button className="h-10 text-white bg-black rounded-md" type="submit" name="submit">Log In</button>
        </div>
        { error && 
          <div className="text-red-500 text-sm">{error}</div>
        }
      </Form>
    </div>
  )
}
