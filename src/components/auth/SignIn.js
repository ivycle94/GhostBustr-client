import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
    // constructor(props) {
    // 	super(props)

    // 	this.state = {
    // 		email: '',
    // 		password: '',
    // 	}
    // }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // handleChange = (event) =>
    // 	this.setState({
    // 		[event.target.name]: event.target.value,
    // 	})

    const onSignIn = (event) => {
        event.preventDefault()
        console.log('the props', props)
        const { msgAlert, setUser } = props

        const credentials = { email, password }

        signIn(credentials)
            .then((res) => setUser(res.data.user))
            .then(() =>
                msgAlert({
                    heading: 'Sign In Success',
                    message: messages.signInSuccess,
                    variant: 'success',
                })
            )
            .then(() => navigate('/spookyplaces'))
            .catch((error) => {
                setEmail('')
                setPassword('')
                msgAlert({
                    heading: 'Sign In Failed with error: ' + error.message,
                    message: messages.signInFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <>
        <img className="sign-in-image" src="https://i.imgur.com/ELwwvSs.jpg"></img>
        <div className='sign-in-container d-flex flex-row justify-content-end'>
            <div className='sign-in-div col-sm-12 col-md-12 mt-5 mx-5 ml-12'>
                <h3 className="sign-in-text-header">Sign In</h3>
                <Form onSubmit={onSignIn}>
                    <Form.Group className="sign-in-email" controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                        <Form.Group className="sign-in-password" controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                        <div className="button-container">
                        <Button className="sign-in-submit" variant='dark' type='submit'>
                             Submit
                        </Button>
                        </div>
                </Form>
                <p>Don't have an Account? <a href="/sign-up">Sign Up</a></p>
            </div>
        </div>
        </>
    )
}

export default SignIn
