import { Form } from "@remix-run/react";

export default function SignUp() {
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
            <button className="h-10 text-white bg-black" type="submit" name="submit" value="intent">Log In</button>
          </div>
        </Form>
      </div>
    )
}