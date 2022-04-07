import React, { useState, useEffect } from 'react'
import { getOneVisit, updateVisited, removeVisited } from '../../api/visit'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import { showVisitedSuccess, showVisitedFailure, removeVisitSuccess, removeVisitFailure } from '../shared/AutoDismissAlert/messages'
import EditVisitedModal from './EditVisitedModal'
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'

// {/* TESTING GHOST ICON RATING : ivy */}
const ghost = <FontAwesomeIcon icon={faGhost} />
// const ghost1 = <FontAwesomeIcon icon={faGhost} />
// const ghost2 = <FontAwesomeIcon icon={faGhost} />
// const ghostArray = []

// import moment from 'moment';


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
   
    // {/* TESTING GHOST ICON RATING : ivy */}
    // console.log("this is the ghost array", ghostArray)
    // create function??
    function GhostRating () {
        // =================== TESTING WITH TERNARY ====================
        // ======== works! rating --> 1
            //test 1 without array: works.
        // return (visited.visitRating === 1 || visited.visitRating === "1") ? ghost : "No Ghost"
            // test 2 with array: doesn't work. icon doesn't render and rating+1 each time you go to same
        // return (visited.visitRating === 1 || visited.visitRating === "1") ? ghostArray.push(ghost) : "No Ghost"
        // === doesn't work! rating --> 2
            // :(visited.visitRating === 2 || visited.visitRating === "2") ? ghost ghost : "Rating is NOT 1"
        // ================= TESTING WITH CONDITIONALS =================
        // if (visited.visitRating === 1) {
        //     return ghost
            // return ghost.$$typeof (doesn't work, renders blank)
        // } else if (visited.visitRating === 2) {
        //     // return ghostArray.push(ghost)
            // console.log("this is the spooky ghost object", ghost)
            // console.log("spooky ghost type test", ghost.$$typeof)

            // return ghost + ghost
            // return {ghost.$$typeof} + {ghost.$$typeof}
        // } else if (visited.visitRating === 3) {

        if (visited.visitRating === 1) {
            return (<small>Rating: {ghost}</small>)
        } else if (visited.visitRating === 2) {
            return (<small>Rating: {ghost} {ghost}</small>)
        } else if (visited.visitRating === 3) {
            return (<small>Rating: {ghost} {ghost} {ghost}</small>)
        } else if (visited.visitRating === 4) {
            return (<small>Rating: {ghost} {ghost} {ghost} {ghost}</small>)
        } else if (visited.visitRating === 5) {
            return (<small>Rating: {ghost} {ghost} {ghost} {ghost} {ghost}</small>)
        } else {
            return "Rating: Please enter a number 1 - 5"
        }
    }
    // console.log("this is the visited object",visited)
    // console.log("this is the visited rating", {visited.rating})
    
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>
                        Visit to {visited.destination.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Description: {visited.description}</small><br />
                            <small>rating: {visited.visitRating}</small><br />

                            {/* TESTING GHOST ICON RATING : ivy */}

                            {/* {visited.rating === 1 ? ghost : null }<br/> */}
                            {/* Ternary working for rating 1 */}
                            {/* {(visited.visitRating === 2 || visited.visitRating === "2") ? ghost + ghost : "Rating is NOT 1"  }<br/> */}
                            {/* ternary function */}
                            {/* <small>rating: {ghostRate()} </small><br /> */}
                            <GhostRating /><br/>
                            <small>Date from: <Moment format="MMMM do, YYYY">{visited.visitFromDate}</Moment></small><br/>
                            <small>Date to: <Moment format="MMMM do, YYYY">{visited.visitToDate}</Moment></small><br/>
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