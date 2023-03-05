import axios from '@/api/axios'

const getPortfolio = () => {
  return axios.get('portfolio/').then((response) => response.data)
}
const getFeedbacks = () => {
  return axios.get('feedback/').then((response) => response.data)
}
const getProject = (id) => {
  return axios.get(`portfolio/${id}/`).then((response) => response.data)
}
const getMain = () => {
  return axios.get('main/1').then((response) => response.data)
}

export default {
  getPortfolio,
  getFeedbacks,
  getProject,
  getMain,
}
