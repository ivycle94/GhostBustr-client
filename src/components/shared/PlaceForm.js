import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

///////////////////////////////////////////////////////////////
// This is the Shared Form to be used for a Haunted Destination
///////////////////////////////////////////////////////////////
const PlaceForm = (props) => {
    const { place, handleSubmit, handleChange, heading } = props

    return (
        <Container className="justify-content-center">
            <h3 className="spooky-places-header">{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label className="spooky-places-header">Name</Form.Label>
                <Form.Control
                    placeholder="What is your haunted destinations name?"
                    value={place.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label className="spooky-places-header">Location</Form.Label>
                <Form.Control
                    placeholder="What is the location of your haunted destination?"
                    value={place.location}
                    name='location'
                    onChange={handleChange}
                />
                <Form.Label className="spooky-places-header">Description</Form.Label>
                <Form.Control
                    placeholder="Describe the spooky encounters found here."
                    value={place.description}
                    name='description'
                    onChange={handleChange}
                />
                <Form.Label className="spooky-places-header">Image</Form.Label>
                <Form.Control
                    placeholder="Image url/jpeg"
                    value={place.image}
                    name='image'
                    onChange={handleChange}
                />
                <Form.Label className="spooky-places-header">Scare Level</Form.Label>
                <Form.Control
                    placeholder="On a scale of 1 to 5, what is the scare level?"
                    value={place.scareLevel}
                    type="number"
                    name='scareLevel'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
            <a href="javascript:history.back()"><Button variant='dark'>Back</Button></a>
        </Container>
    )
}

export default PlaceForm