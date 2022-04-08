import { useNavigate } from 'react-router-dom'

import { Button, ButtonGroup } from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
    const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
        signOut(user)
            .finally(() =>
                msgAlert({
                    heading: 'Signed Out Successfully',
                    message: messages.signOutSuccess,
                    variant: 'success',
                })
            )
            .finally(() => navigate('/'))
            .finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

    return (
        <>
            <div className='row'>
                <div className='sign-out-div col-sm-10 col-md-8 mx-auto mt-5'>
                    <h2 className="sign-out-text-header spooky-places-header" >Are You Sure?</h2>
                    <p><small className="sign-out-text spooky-places-header">We hate to see you go...</small></p>
                    <ButtonGroup>
                        <Button variant='danger' onClick={onSignOut} className='sign-out-buttons btn btn-dark'>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel} className='sign-out-buttons btn btn-danger'>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </>
    )
}

export default SignOut
