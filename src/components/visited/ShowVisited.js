import React, { useState, useEffect } from 'react'
import { getOneVisit, removeVisited } from '../../api/visit'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import { showVisitedSuccess, showVisitedFailure } from '../shared/AutoDismissAlert/messages'
// import EditPlaceModal from './EditVisitModal'

const ShowVisited = (props) => {
    const [visited, setVisited] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { user, msgAlert } = props
    const { id } = useParams()
    const navigate = useNavigate()

    console.log('id in showVisited', id)

    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneVisit(id)
            .then(res =>

                setVisited(res.data.visit)
            )
            .then(() => {
                msgAlert({
                    heading: 'The spooky visited has been retrieved!',
                    message: showVisitedSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed to find the spooky visit',
                    message: showVisitedFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

<<<<<<< HEAD
    // const getDestination
=======
    const removeTheVisited = () => {
        console.log("removeTheVisited id", visited.id)
        console.log("removeTheVisited _id", visited._id)

        removeVisited(user, visited._id)
            .then(() => {
                msgAlert({
                    heading: 'The spooky visited has been removed!',
                    message: 'The spooky visited has been deleted',
                    variant: 'success',
                })
            })
            .then(() => { navigate(`/`) })
            .catch(() => {
                msgAlert({
                    heading: 'Spooky Visited deletion failed.',
                    message: 'Failed to delete the spooky visited',
                    variant: 'danger',
                })
            })
    }
>>>>>>> 2d5a0e3ab27201ed633398149b0dd2eddffcf654

    if (!visited) {
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
                    <Card.Header>Visit to {visited.destination.id}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Description: {visited.description}</small><br />
                            <small>rating: {visited.visitRating}</small><br />
<<<<<<< HEAD
                            <small>Date: {visited.travelToDate}</small><br />
=======
                            <small>Date from: {visited.visitFromDate}</small><br />
                            <small>Date to: {visited.visitToDate}</small><br />
>>>>>>> 2d5a0e3ab27201ed633398149b0dd2eddffcf654
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Visited
                        </Button>
                        <Button onClick={() => removeTheVisited()} className="m-2" variant="danger">
                            Delete Visited
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            {/* <EditVisitedModal
                visited={visited}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateVisited={updateVisited}
                handleClose={() => setModalOpen(false)}
            /> */}
        </>
    )
}

export default ShowVisited