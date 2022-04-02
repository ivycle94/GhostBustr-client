import React, { useState } from 'react'
import { createPlace } from '../../api/place'
import {createPlaceSuccess, createPlaceFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import PlaceForm from '../shared/PlaceForm'

////////////////////////////////////////////////////////////////
// Create Place enders a form and calls the createPlace function
// When complete it navigates to the Spooky Places show page.
// props necessary are user and msgAlert
////////////////////////////////////////////////////////////////
const CreatePlace = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()

    // we'll need two states
    const [place, setPlace] = useState({name: '', location: '', description: '', 
        image: '', scareLevel: '', visited: false})

    console.log('In create place', place)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setPlace(prevPlace => {

            const name = e.target.name
            let value = e.target.value

            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)

            if(name === "visited" && e.target.checked){
                value = true
            } else if (name === "visited" && !e.target.checked){
                value = false
            }

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevPlace', prevPlace)
            console.log('updatedValue', updatedValue)

            return {...prevPlace, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createPlace(user, place)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/spookyplaces/${res.data.place._id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'The Spooky Place has been Added!',
                    message: createPlaceSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Failed to create a spooky place!',
                    message: createPlaceFailure,
                    variant: 'danger',
                }))
        // console.log('this is the spooky place', place)
    }

    return (
        <PlaceForm 
            place={place}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add a new spooky place!"
        />
    )
}

export default CreatePlace