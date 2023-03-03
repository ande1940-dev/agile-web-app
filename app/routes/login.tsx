import { Form } from "@remix-run/react"
import { Link } from "react-router-dom"

export default function LogIn() {
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
          <input className="px-3 h-10 rounded-md border border-slate-300" type="password" name="password" id="password" required/>
        </div>
        <div className="grid space-y-2">
          <button className="h-10 text-white bg-black" type="submit" name="submit" value="intent">Log In</button>
        </div>
      </Form>
    </div>
  )
}
