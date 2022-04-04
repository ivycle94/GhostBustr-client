import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllVisits = () => {
    return axios(`${apiUrl}/myvisits`)
}