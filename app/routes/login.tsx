import { Form } from "@remix-run/react"
import { Link } from "react-router-dom"

export default function LogIn() {
  return (
    <div>
      <Form method="post">
        Dont have an account? <Link to="/signup">Register here</Link>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required/>
        </div>
        <div>
          <button type="submit" name="submit" value="intent">Log In</button>
        </div>
      </Form>
    </div>
  )
}
