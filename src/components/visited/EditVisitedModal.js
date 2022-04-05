import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import VisitForm from '../shared/VisitForm'

const EditVisitModal = (props) => {
    const { user, show, handleClose, updateVisited, msgAlert, triggerRefresh } = props
    const [visit, setVisit] = useState(props.visit)
    console.log("EditVisitModal: props.visit:", props.visit)
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

            return {...prevVisit, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        // console.log('the visit to submit', visit)
        updateVisited(user, visit)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Visit Updated! Success!',
                    message: 'u did it',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'that aint it',
                    variant: 'danger',
                }))
        // console.log('this is the visit', visit)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <VisitForm 
                    visit={visit}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit visit!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditVisitModal