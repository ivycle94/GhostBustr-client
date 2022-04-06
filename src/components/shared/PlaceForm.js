import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

///////////////////////////////////////////////////////////////
// This is the Shared Form to be used for a Haunted Destination
///////////////////////////////////////////////////////////////
const PlaceForm = (props) => {
    const { place, handleSubmit, handleChange, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="What is your haunted destinations name?"
                    value={place.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Location</Form.Label>
                <Form.Control
                    placeholder="what is the location of your haunted destination?"
                    value={place.location}
                    name='location'
                    onChange={handleChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder="What is the description of your haunted destination?"
                    value={place.description}
                    name='description'
                    onChange={handleChange}
                />
                <Form.Label>Image</Form.Label>
                <Form.Control
                    placeholder="Image url for this haunted destination"
                    value={place.image}
                    name='image'
                    onChange={handleChange}
                />
                <Form.Label>Scare Level</Form.Label>
                <Form.Control
                    placeholder="On a scale of 1 to 10, what is the scare level?"
                    value={place.scareLevel}
                    type="number"
                    name='scareLevel'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default PlaceForm