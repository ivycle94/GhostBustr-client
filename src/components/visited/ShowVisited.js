import React, { useState, useEffect } from 'react'
import { getOneVisit, updateVisited, removeVisited } from '../../api/visit'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import { showVisitedSuccess, showVisitedFailure, removeVisitSuccess, removeVisitFailure } from '../shared/AutoDismissAlert/messages'
import EditVisitedModal from './EditVisitedModal'
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'


const ghost = <FontAwesomeIcon icon={faGhost} />


const ShowVisited = (props) => {
    const [visited, setVisited] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { user, msgAlert } = props
    const { id } = useParams()
    const navigate = useNavigate()
    // IVY -> trying to chnage time format here
    // let visitFromDate = moment(visited.visitFromDate, "DD-MM-YYYY")
    // console.log("this is the formatted date", visitFromDate)
    // console.log('id in showVisited', id)

    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneVisit(id)
            .then(res =>

                setVisited(res.data.visit)
            )
            .then(() => {
                msgAlert({
                    heading: 'The spooky visit has been retrieved!',
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

    // const getDestination
    const removeTheVisited = () => {
        // console.log("removeTheVisited id", visited.id)

        removeVisited(user, visited._id)
            .then(() => {
                msgAlert({
                    heading: 'The spooky visited has been removed!',
                    message: removeVisitSuccess,
                    variant: 'success',
                })
            })
            .then(() => { navigate(`/myvisits/${user._id}`) })
            .catch(() => {
                msgAlert({
                    heading: 'Spooky Visited deletion failed.',
                    message: removeVisitFailure,
                    variant: 'danger',
                })
            })
    }



    if (!visited) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }


    function GhostRating() {
        if (parseInt(visited.visitRating) === 1) {
            return (<small><b>Scare Level:</b> <h2>{ghost}</h2></small>)
        } else if (parseInt(visited.visitRating) === 2) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost}</h2></small>)
        } else if (parseInt(visited.visitRating) === 3) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost} {ghost}</h2></small>)
        } else if (parseInt(visited.visitRating) === 4) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost} {ghost} {ghost}</h2></small>)
        } else if (parseInt(visited.visitRating) === 5) {
            return (<small><b>Scare Level:</b> <h2>{ghost} {ghost} {ghost} {ghost} {ghost}</h2></small>)
        }
        else {
            return (<small><b>Scare Level:</b> (Enter a Number 1-5) </small>)
        }
    }

    return (
        <>
            <Container className="fluid mt-5">
                <Card>
                    <Card.Header className='text-center'>
                        <h4>Visit to {visited.destination.name}</h4>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small><b>Description:</b> {visited.description}</small><br />
                            <br/>
                            <GhostRating /><br />
                            <small><b>Date:</b> <Moment format="MMMM DD, YYYY">{visited.visitFromDate}</Moment></small>
                            <span> - </span>
                            <small> <Moment format="MMMM DD, YYYY">{visited.visitToDate}</Moment></small><br />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <a href="javascript:history.back()"><Button variant='dark'>Back</Button></a>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Visited
                        </Button>
                        <Button onClick={() => removeTheVisited()} className="m-2" variant="danger">
                            Delete Visited
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            <EditVisitedModal
                visit={visited}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateVisited={updateVisited}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowVisited