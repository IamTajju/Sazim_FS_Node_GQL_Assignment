// eslint-disable-next-line no-unused-vars
import React from 'react'
import LoginForm from "../components/auth/loginForm";
import RedirectLink from '../components/auth/redirectLink';



export default function LoginPage() {
    return (
        <div>
            <center>
                <h2>Login Page</h2>
                <LoginForm />
                <RedirectLink text="Don't have an account" link="/register" linkText="Sign Up Here." />
            </center>
        </div>
    )
}
