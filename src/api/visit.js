import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllVisits = (userId) => {
    console.log('visitId', userId)
    return axios(`${apiUrl}/myvisits/${userId}`)
}

// show function
export const getOneVisit = (visitId) => {
    console.log('visitId', visitId)
    return axios(`${apiUrl}/myvisit/${visitId}`)
}

// POST -> create function
export const createVisit = (user, newVisit, placeId) => {
    // const [createdId, setCreatedId] = useState(null)
    console.log('user', user)
    console.log('this is newVisit', newVisit)
    return axios({
        url: `${apiUrl}/visit/${placeId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { visit: newVisit }
    })
}

// PATCH -> update function
export const updateVisited = (user, updatedVisit) => {
    console.log('PATCH: user:', user)
    console.log('PATCH: newVisit:', updatedVisit)
    return axios({
        url: `${apiUrl}/visit/${updatedVisit._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { visit: updatedVisit }
    })
}

// Delete -> remove function
export const removeVisited = (user, visitedId) => {
    // we need to swap out place ID with the ID of the visited
    console.log('user', user)
    return axios({
        url: `${apiUrl}/visit/${visitedId}`,
        // we need to swap out place ID with the ID of the visited
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}