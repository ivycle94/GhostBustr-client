import React, { useState } from 'react'
import { createVisit } from '../../api/visit'
import { createVisitSuccess, createVisitFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate, useParams } from 'react-router-dom'
import VisitForm from '../shared/VisitForm'

////////////////////////////////////////////////////////////////
// Create Place enders a form and calls the createPlace function
// When complete it navigates to the Spooky Places show page.
// props necessary are user and msgAlert
////////////////////////////////////////////////////////////////
const CreateVisit = (props) => {
    const { id } = useParams();
    const { user, msgAlert } = props
    console.log('CreateVisit: user:', user)
    const navigate = useNavigate()

    // we'll need two states
    const [visit, setVisit] = useState({
        visitFromDate: '', visitToDate: '', description: '',
        visitRating: ''
    })

    console.log('CreateVisit: the visit: ', visit)


    const handleChange = (e) => {
        // e === event
        e.persist()

        setVisit(prevVisit => {

            const name = e.target.name
            let value = e.target.value

            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)


            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevVisit', prevVisit)
            console.log('updatedValue', updatedValue)

            return { ...prevVisit, ...updatedValue }
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createVisit(user, visit, id)
            // if create is successful, we should navigate to the show page
            .then(res => { navigate(`/myvisits/${user._id}`) })
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Your visit has been added!',
                    message: createVisitSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Failed to add your visit!',
                    message: createVisitFailure,
                    variant: 'danger',
                }))
        // console.log('this is the spooky place', place)
    }

    return (
        <VisitForm
            visit={visit}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add a visit!"
        />
    )
}

export default CreateVisit