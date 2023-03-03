import { Form } from "@remix-run/react";

export default function SignUp() {
    return (
      <div>
        <Form>
          <div className="flex">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="firstName" name="firstName" id="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName">LastName</label>
            <input type="lastName" name="lastName" id="lastName" required/>
          </div>  
          </div>
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