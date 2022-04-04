import React, { useState, useEffect } from 'react'
import { getAllVisits } from '../../api/visit'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { indexVisitSuccess, indexVisitFailure } from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexVisited = (props) => {

    const [visit, setVisit] = useState(null)
    const { msgAlert } = props

    useEffect(() => {
        getAllVisits()
            .then(res => {
                setVisit(res.data.visit)
                console.log("res.data", res.data);
                console.log("IndexVisits: visit: ", visit)
            })
            .then(() => {
                msgAlert({
                    heading: 'Visits have been retrieved!',
                    message: indexVisitSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed to retrieve visits!!',
                    message: indexVisitFailure,
                    variant: 'danger',
                })
            })
    }, [])

    if (!visit) {
        return <p>Loading ...</p>
    } else if (visit.length === 0) {
        return <p>No visits yet, better travel</p>
    }

    let visitCards

    if (visit.length > 0) {
        visitCards = visit.map(visit => (
            <Card key={visit._id} style={{ width: '30%' }} className="m-2">
                <Card.Header>Visiiiiit</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/myvisits`}>
                            View {visit.description}
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the Spooky Places You've Been</h3>
            <div style={cardContainerLayout}>
                {visitCards}
            </div>
        </>
    )
}

export default IndexVisited