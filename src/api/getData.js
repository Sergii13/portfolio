import axios from '@/api/axios'

const getData = (url) => {
  return axios.get(url).then((response) => response.data)
}
export default {
  getData,
}
