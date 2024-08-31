// eslint-disable-next-line no-unused-vars
import React from 'react'
import RegistrationForm from '../components/auth/registrationForm'
import RedirectLink from '../components/auth/redirectLink'
export default function RegistrationPage() {

    return (
        <div>
            <center>
                <h2>Registration Page</h2>
                <RegistrationForm />
                <RedirectLink text="Already have an acount?" link="/login" linkText="Sign In Here." />
            </center>
        </div>
    )
}
