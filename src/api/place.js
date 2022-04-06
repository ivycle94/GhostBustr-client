import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllPlaces = () => {
    return axios(`${apiUrl}/spookyplaces`)
}

// index -> scary level one 

export const getScareLevelOne = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelone`)
}

// index -> scary level two

export const getScareLevelTwo = () => {
    return axios(`${apiUrl}/spookyplaces/scareleveltwo`)
}

// index -> scary level three 

export const getScareLevelThree = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelthree`)
}

// index -> scary level four

export const getScareLevelFour = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelfour`)
}

// index -> scary level five

export const getScareLevelFive = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelfive`)
}

// index -> scary level six

export const getScareLevelSix = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelsix`)
}

// index -> scary level seven

export const getScareLevelSeven = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelseven`)
}

// index -> scary level eight

export const getScareLevelEight = () => {
    return axios(`${apiUrl}/spookyplaces/scareleveleight`)
}

// index -> scary level nine

export const getScareLevelNine = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelnine`)
}

// index -> scary level ten

export const getScareLevelTen = () => {
    return axios(`${apiUrl}/spookyplaces/scarelevelten`)
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
