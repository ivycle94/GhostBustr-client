import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlaceForm from '../shared/PlaceForm'

const EditPlaceModal = (props) => {
    const { user, show, handleClose, updatePlace, msgAlert, triggerRefresh } = props
    const [ place, setPlace ] = useState(props.place)

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

        console.log('the spooky place to submit', place)
        updatePlace(user, place)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Spooky place updated!',
                    message: 'The spooky place has been updated',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Spooky place update has failed!',
                    message: 'The spooky place has not been updated',
                    variant: 'danger',
                }))
        console.log('this is the spooky place", place)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <PlaceForm 
                    place={place}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit the Spooky Place!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditPlaceModal