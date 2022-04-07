import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllPlaces = () => {
    return axios(`${apiUrl}/spookyplaces`)
}


// show function
export const getOnePlace = (placeId) => {
    return axios(`${apiUrl}/spookyplaces/${placeId}`)
}

// POST -> create function
export const createPlace = (user, newPlace) => {
    console.log('user', user)
    console.log('this is newPlace', newPlace)
    return axios({
        url: `${apiUrl}/spookyplaces`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { place: newPlace }
    })
}

// POST -> create function to push into favorites list
export const createPlaceFav = (user, newPlaceFav) => {
    console.log('user', user)
    console.log('this is newPlace', newPlaceFav)
    return axios({
        url: `${apiUrl}/spookyplaces/newfavorite`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { place: newPlaceFav }
    })
}

// PATCH -> update function
export const updatePlace = (user, updatedPlace) => {
    console.log('user', user)
    console.log('this is updatedPlace', updatedPlace)
    return axios({
        url: `${apiUrl}/spookyplaces/${updatedPlace.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { place: updatedPlace }
    })
}

// DELETE -> remove function
export const removePlace = (user, placeId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/spookyplaces/${placeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
