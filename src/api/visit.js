import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllVisits = () => {
    return axios(`${apiUrl}/myvisits`)
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