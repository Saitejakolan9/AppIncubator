import axios from 'axios'

const request = axios.create({
  baseURL: 'http://universities.hipolabs.com'
})


export default request