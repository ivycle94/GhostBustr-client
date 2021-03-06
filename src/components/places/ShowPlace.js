import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOnePlace, updatePlace, removePlace } from '../../api/place'
import { createVisit } from '../../api/visit'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button, Form } from 'react-bootstrap'
import { showPlaceSuccess, showPlaceFailure, removePlaceSuccess, removePlaceFailure } from '../shared/AutoDismissAlert/messages'
import EditPlaceModal from './EditPlaceModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'



const ghost = <FontAwesomeIcon icon={faGhost} />

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

    const removeThePlace = () => {
        console.log("removeThePlace id", place.id)
        console.log("removeThePlace _id", place._id)
        // if (place.visitors.length)
        removePlace(user, place.id)
            .then(() => {
                msgAlert({
                    heading: 'The spooky place has been removed!',
                    message: removePlaceSuccess,
                    variant: 'success',
                })
            })
            .then(() => { navigate(`/spookyplaces`) })
            .catch(() => {
                msgAlert({
                    heading: 'Spooky Place deletion failed.',
                    message: removePlaceFailure,
                    variant: 'danger',
                })
            })
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

    function GhostRating() {
        if (parseInt(place.scareLevel) === 1) {
            return (<small><b>Scare Level:</b> <h2>{ghost}</h2></small>)
        } else if (parseInt(place.scareLevel) === 2) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost}</h2></small>)
        } else if (parseInt(place.scareLevel) === 3) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost} {ghost}</h2></small>)
        } else if (parseInt(place.scareLevel) === 4) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost} {ghost} {ghost}</h2></small>)
        } else if (parseInt(place.scareLevel) === 5) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost} {ghost} {ghost} {ghost}</h2></small>)
        }
        else {
            return (<small>Scare Level: </small>)
        }
    }

    return (
        <>
            <Container className="fluid mt-5">
                <Card>
                    <Card.Header className='card-title'><h2>{place.name}</h2></Card.Header>
                    <Card.Body className="d-flex justify-content-start">
                        <img className="show-image" src={place.image}></img>
                        <Card.Text className="show-description">
                            <small><b>Description:</b><br/> {place.description}</small><br />
                            <p></p>
                            <small><b>Location:</b><br/> {place.location}</small><br />
                            <p></p>
                            <GhostRating />

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="show-footer">
                        <a href="javascript:history.back()"><Button className="show-buttons" variant='dark'>Back</Button></a>
                        {
                            place.owner && user && (user._id === place.owner._id)
                                ?
                                <>
                                    <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                                        Edit Place
                                    </Button>
                                </>

                                :

                                null

                        }

                        {
                            user
                                ?
                                <>
                                    <Link to={`/visit/${id}`}>
                                        <Button className='btn btn-dark'>Visited!</Button>
                                    </Link>
                                </>

                                :

                                <>
                                    <Link to={`/sign-in`}>
                                        <Button className='show-buttons btn btn-dark'>Visited!</Button>
                                    </Link>
                                </>
                        }


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