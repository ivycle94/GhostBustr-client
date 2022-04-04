import React, { useState, useEffect } from 'react'
import { createPlace, getOnePlace, updatePlace, removePlace } from '../../api/place'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button, Form } from 'react-bootstrap'
import { showPlaceSuccess, showPlaceFailure, createPlaceSuccess, createPlaceFailure } from '../shared/AutoDismissAlert/messages'
import EditPlaceModal from './EditPlaceModal'


const ShowPlace = (props) => {

    const [place, setPlace] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { user, msgAlert } = props
    const { id } = useParams()
    const navigate = useNavigate()

    console.log('id in showPlace', id)

    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOnePlace(id)
            .then(res => setPlace(res.data.place))
            .then(() => {
                msgAlert({
                    heading: 'The spooky place has been retrieved!',
                    message: showPlaceSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed to find the spooky place',
                    message: showPlaceFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removePlace = () => {
        console.log("removeThePlace id", place.id)
        console.log("removeThePlace _id", place._id)

        removePlace(user, place._id)
            .then(() => {
                msgAlert({
                    heading: 'The spooky place has been removed!',
                    message: 'The spooky place has been deleted',
                    variant: 'success',
                })
            })
            .then(() => { navigate(`/`) })
            .catch(() => {
                msgAlert({
                    heading: 'Spooky Place deletion failed.',
                    message: 'Failed to delete the spooky place',
                    variant: 'danger',
                })
            })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createPlace(user, place)
            // if create is successful, we should navigate to the show page
            .then(res => { navigate(`/spookyplaces/mine`) })
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Place Added! Success!',
                    message: createPlaceSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createPlaceFailure,
                    variant: 'danger',
                }))
        // console.log('this is the pet', pet)
    }

    if (!place) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{place.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Desscription: {place.description}</small><br />
                            <small>Location: {place.location}</small><br />
                            <small>Scare Level: {place.scareLevel}</small><br />
                            <small>
                                Visited : {place.visited ? 'yes' : 'no'}
                            </small><br />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Place
                        </Button>
                        <Button onClick={() => removeThePlace()} className="m-2" variant="danger">
                            Delete Place
                        </Button> */}
                        {/* <Form>
                            <Form.Label>Name</Form.Label>
                            <Form.Check
                                label='has u been?'
                                name='visited'
                                defaultChecked={place.visited}
                            />
                        </Form> */}

                        <Button onClick={handleSubmit}>Faviee</Button>
                    </Card.Footer>
                </Card>
            </Container>
            <EditPlaceModal
                place={place}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updatePlace={updatePlace}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowPlace