import React, { useState, useEffect } from 'react'
import { getAllPlaces } from '../../api/place'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { indexPlacesSuccess, indexPlacesFailure } from '../shared/AutoDismissAlert/messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const eye = <FontAwesomeIcon icon={faEye} />

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexPlaces = (props) => {

    const [places, setPlaces] = useState(null)
    const { msgAlert } = props

    useEffect(() => {
        getAllPlaces ()
            .then(res => {
                setPlaces(res.data.places)
                console.log("res.data", res.data);
                console.log("IndexPlace: places: ", places)
            })
            .then(() => {
                msgAlert({
                    heading: 'Places have been retrieved!',
                    message: indexPlacesSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed to retrieve places!!',
                    message: indexPlacesFailure,
                    variant: 'danger',
                })
            })
    }, [])

    if (!places) {
        return <p>Loading ...</p>
    } else if (places.length === 0) {
        return <p>No places yet, go add some</p>
    }

    let placeCards

    if (places.length > 0) {
        placeCards = places.map(place => (
            <Card key={place._id} style={{ width: '30%' }} className="m-2">
                <Card.Header className='header-name'>{place.name}</Card.Header>
                <Card.Body className="card-body d-flex flex-column justify-content-end">

                    <p><img className="spooky-index-image" src={place.image}></img></p>

                    <Card.Text className="card-text">
                        <Link to={`/spookyplaces/${place._id}`}>
                            <Button className="eye-button" variant="dark">{eye}</Button>
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the Spooky Places</h3>
            <div style={cardContainerLayout}>
                {placeCards}
            </div>
        </>
    )
}

export default IndexPlaces