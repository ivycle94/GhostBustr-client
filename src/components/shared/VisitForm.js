import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

///////////////////////////////////////////////////////////////
// This is the Shared Form to be used for a Haunted Destination
///////////////////////////////////////////////////////////////
const VisitForm = (props) => {
    const { visit, handleSubmit, handleChange, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Visit From Date</Form.Label>
                <Form.Control
                    placeholder="When did you get there?"
                    value={visit.visitFromDate}
                    name='visitFromDate'
                    onChange={handleChange}
                />
                <Form.Label>Visit To Date</Form.Label>
                <Form.Control
                    placeholder="When did you leave?"
                    value={visit.visitToDate}
                    name='visitToDate'
                    onChange={handleChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder="What is the description of your haunted destination?"
                    value={visit.description}
                    name='description'
                    onChange={handleChange}
                />
                <Form.Label>Visit Rating</Form.Label>
                <Form.Control
                    placeholder="On a scale of 1 to 5, what is the scare level?"
                    value={visit.visitRating}
                    type="number"
                    name='visitRating'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default VisitForm